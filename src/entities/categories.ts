import { Document, Schema, model } from "mongoose";

export interface IAttribute {
  name: string;
  type: string; // String, Number, Boolean
  required: boolean;
}

export interface ICategory extends Document {
  name: string;
  attributes: IAttribute[];
}

const schema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },
    attributes: [{
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
        enum: ["String", "Number", "Boolean"],
      },
      required: {
        type: Boolean,
        required: true,
      }
    }],
  },
  {
    timestamps: true,
  }
);

export default model<ICategory>("categories", schema);