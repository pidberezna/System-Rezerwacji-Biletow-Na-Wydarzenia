import { Module } from '@nestjs/common';
import { UserEventsController } from './user-events.controller';
import { UserEventsService } from './user-events.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './entities/user-events.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { UserPhotosEventsController } from './user-photos-events.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '30d' },
      }),
    }),
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule,
  ],
  controllers: [UserEventsController, UserPhotosEventsController],
  providers: [UserEventsService],
})
export class UserEventsModule {}
