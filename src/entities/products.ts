import { Document, Schema, model } from 'mongoose';

export interface ISpecification {
  name: string;
  value: string | number | boolean;
}

export interface IProduct extends Document {
  name: string;
  category: string;
  price: number;
  description?: string;
  specifications: ISpecification[];
}

const schema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    specifications: [{
      name: {
        type: String,
        required: true,
      },
      value: {
        type: Schema.Types.Mixed,
        required: true,
      }
    }],
  },
  {
    timestamps: true
  }
);

export default model<IProduct>('products', schema);