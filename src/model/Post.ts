import { Document, Model, Schema, model } from "mongoose";
import { IUser } from "./User";

interface UserData {
  id: IUser['_id'];
  userName: IUser['userName'];
}

export interface IPost extends Document {
  title: string;
  content: string;
  likes: IUser['_id'][];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  user: UserData;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  user: {
    id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true }
  },
  deletedAt: { type: Date, default: null }
}, {
  timestamps: true
});

const Post: Model<IPost> = model<IPost>('Post', PostSchema);

export default Post
