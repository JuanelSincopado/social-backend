import { Router } from 'express';
import { createPost, deletePost, getAllPosts, updatePost } from '../controllers/post.controller';
import auth from '../middleware/auth';

const postRouter = Router();

postRouter.get('/', getAllPosts)
postRouter.post('/', auth, createPost)
postRouter.put('/:id', auth, updatePost)
postRouter.delete('/:id', auth, deletePost)

export default postRouter;