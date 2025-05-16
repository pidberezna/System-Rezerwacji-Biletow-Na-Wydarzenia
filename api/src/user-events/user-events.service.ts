import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './entities/user-events.entity';
import { Model, Types } from 'mongoose';
import { EventDto } from './dtos/user-events.dto';
import { User } from 'src/users/entities/user.entity';
const download = require('image-downloader');

@Injectable()
export class UserEventsService {
  constructor(
    @InjectModel(Event.name)
    private eventModel: Model<Event>,
  ) {}

  async uploadByLink(link: string) {
    const newName = `photo${Date.now()}.jpg`;
    const uploadsDir = path.join(process.cwd(), 'uploads');

    try {
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const destPath = path.join(uploadsDir, newName);
      await download.image({
        url: link,
        dest: destPath,
      });

      return newName;
    } catch (error) {
      throw new InternalServerErrorException('Failed to upload image');
    }
  }

  async uploadFile(files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }
    try {
      const hasMissingPath = files.some((file) => !file.path);
      if (hasMissingPath) {
        throw new InternalServerErrorException('Failed to upload files');
      }

      return files.map((file) => file.filename);
    } catch (error) {
      throw new InternalServerErrorException('Failed to upload files');
    }
  }

  async createEvent(user: User, eventDto: EventDto) {
    const owner = new Types.ObjectId(user._id);

    try {
      return await this.eventModel.create({
        ...eventDto,
        owner,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create event');
    }
  }

  async showUserEvents(user: User) {
    try {
      const id = new Types.ObjectId(user._id);
      const userEvents = await this.eventModel.find({ owner: id });
      return userEvents;
    } catch (error) {
      throw new InternalServerErrorException('Could not retrieve events');
    }
  }

  async showAllEvents() {
    try {
      return await this.eventModel.find();
    } catch (error) {
      throw new InternalServerErrorException('Could not retrieve events');
    }
  }

  async showEventById(id: string) {
    if (!id) {
      throw new BadRequestException('Event id must be provided');
    }
    try {
      const event = await this.eventModel.findById(id);
      if (!event) {
        throw new NotFoundException('Event not found');
      }
      return event;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Could not retrieve event');
    }
  }

  async saveEvent(user: User, id: string, eventDto: EventDto) {
    try {
      const accomDoc = await this.eventModel.findById(id);
      if (!accomDoc) {
        throw new NotFoundException('Event not found');
      }
      if (user._id.toString() !== accomDoc.owner.toString()) {
        throw new ForbiddenException('You are not the owner of this event');
      }

      accomDoc.set({ ...eventDto });
      return await accomDoc.save();
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Could not update event');
    }
  }
}
