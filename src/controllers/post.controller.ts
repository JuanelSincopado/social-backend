import { Request, Response } from "express";
import Post from "../model/Post";
import User from "../model/User";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, userID } = req.body;

    if (!title || !content) {
      return res.status(400).json({ msg: 'Por favor ingrese todos los campos' });
    }

    const newPost = new Post({
      title,
      content,
      userID,
      likes: 0
    });

    await newPost.save();

    await User.findByIdAndUpdate(userID, {
      $push: { posts: newPost._id }
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
}

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
}

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ msg: 'Por favor ingrese todos los campos' });
    }

    const post = await Post.findByIdAndUpdate(req.params.id, {
      title,
      content
    });

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
}

export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'No se encontró el post' });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
}