import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserEventsService } from './user-events.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthenticatedRequest, AuthGuard } from '../auth/auth.guard';

@Controller()
export class UserPhotosEventsController {
  constructor(private readonly userEventsService: UserEventsService) {}

  @Post('upload-by-link')
  async uploadByLink(@Body('link') link: string) {
    return this.userEventsService.uploadByLink(link);
  }

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('photos', 100, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
    return this.userEventsService.uploadFile(files);
  }

  @Get('user-events')
  @UseGuards(AuthGuard)
  async showUserEvents(@Req() req: AuthenticatedRequest) {
    return await this.userEventsService.showUserEvents(req.user);
  }
}
