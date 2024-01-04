import { Document, Model, Schema, model } from "mongoose";
import { IUser } from "./User";

export interface IPost extends Document {
  title: string;
  content: string;
  likes: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  user: IUser['_id'];
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  likes: { type: Number, required: true },
  userID: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

const Post: Model<IPost> = model<IPost>('Post', PostSchema);

export default Post
