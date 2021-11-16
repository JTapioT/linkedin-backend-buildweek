import mongoose from "mongoose";
import express from "express";
import createHttpError from "http-errors";
import PostSchema from "../posts/schema.js";

const likesRouter = express.Router();

likesRouter.post("/:postId/like", async (req, res, next) => {
  const userId = req.body.userId;
  try {
    // Lets check if the user already likes the post
    const check = await PostSchema.findOne({
      _id: req.params.postId,
      likes: userId,
    });
    let updatedPost;
    // If it's already liked, we need to remove the like
    if (check)
      updatedPost = await PostSchema.findByIdAndUpdate(
        req.params.postId,
        { $pull: { likes: userId } },
        { new: true }
      );
    // If it's not liked, we need to add the likers
    else
      updatedPost = await PostModel.findByIdAndUpdate(
        req.params.postId,
        { $push: { likes: userId } },
        { new: true }
      );
    res.json(updatedPost);
  } catch (error) {
    next(error);
  }
});

export default likesRouter;
