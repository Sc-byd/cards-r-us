import mongoose from 'mongoose';
import { Texture } from '../../client/components/Card/Card';

export interface CardData {
  id: string;
  image: {
    src: string;
    alt: string;
  };
  backgroundColor: string;
  banner: {
    enabled: boolean;
    color: string;
  };
  texture: {
    pattern: Texture;
    intensity: number;
  };
  text: {
    front: {
      value: string;
      color: string;
      position: 'top' | 'middle' | 'bottom';
    };
    back: {
      value: string;
      color: string;
    };
  };
  authorId: string;
  ownerId: string;
  createdAt: Date;
}

const cardSchema = new mongoose.Schema<CardData>(
  {
    image: {
      src: { type: String, required: true },
      alt: { type: String, required: true },
    },
    backgroundColor: { type: String, required: true },
    banner: {
      enabled: { type: Boolean, required: true, default: false },
      color: { type: String, required: true },
    },
    texture: {
      pattern: { type: String, required: true },
      intensity: { type: Number, required: true },
    },
    text: {
      front: {
        value: { type: String, required: true },
        color: { type: String, required: true },
        position: { type: String, required: true },
      },
      back: {
        value: { type: String, required: true },
        color: { type: String, required: true },
      },
    },
    authorId: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const CardModel =
  (mongoose.models.Card as mongoose.Model<CardData>) ||
  mongoose.model('Card', cardSchema);

export default CardModel;
