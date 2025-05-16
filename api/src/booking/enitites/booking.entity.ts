import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Booking {
  @Prop({ required: true, ref: 'Event' })
  event: Types.ObjectId;

  @Prop({ required: true, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ type: String })
  date: string;

  @Prop({ type: String })
  time: string;

  @Prop({ required: true })
  numberOfGuests: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, ref: 'User' })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  price: number;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
