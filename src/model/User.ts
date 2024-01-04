import { Document, Model, Schema, model } from "mongoose";
import { IPost } from "./Post";

export interface IUser extends Document {
  fullName: string;
  age: number;
  email: string;
  password: string;
  posts: IPost['_id'][];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

const UserSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  email: {
    type: String,
    required: true
  },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  password: { type: String, required: true }
}, {
  timestamps: true
});

const User: Model<IUser> = model<IUser>('User', UserSchema);

export default User