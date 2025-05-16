import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Event {
  @Prop({ required: true, ref: 'User' })
  owner: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  address: string;

  @Prop({ type: [String], default: [] })
  photos: string[];

  @Prop({ required: true })
  description: string;

  @Prop()
  extraInfo: string;

  @Prop({ type: String, required: true })
  date: string;

  @Prop({ type: String, required: true })
  time: string;

  @Prop({ required: true })
  price: number;
}

export const EventSchema = SchemaFactory.createForClass(Event);
