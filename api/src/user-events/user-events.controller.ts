import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserEventsService } from './user-events.service';
import { EventDto } from './dtos/user-events.dto';
import { AuthenticatedRequest, AuthGuard } from '../auth/auth.guard';

@Controller('account')
export class UserEventsController {
  constructor(private readonly userEventsService: UserEventsService) {}

  @Post('events')
  @UseGuards(AuthGuard)
  async createEvent(
    @Req() req: AuthenticatedRequest,
    @Body() eventDto: EventDto,
  ) {
    return this.userEventsService.createEvent(req.user, eventDto);
  }

  @Get('events')
  async showAllEvents() {
    return await this.userEventsService.showAllEvents();
  }

  @Get('events/:id')
  async showEventById(@Param('id') id: string) {
    return await this.userEventsService.showEventById(id);
  }

  @Put('events')
  @UseGuards(AuthGuard)
  async saveEvent(
    @Req() req: AuthenticatedRequest,
    @Body('id') id: string,
    @Body() eventDto: EventDto,
  ) {
    return await this.userEventsService.saveEvent(req.user, id, eventDto);
  }
}
