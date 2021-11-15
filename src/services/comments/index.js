import express, { Router } from "express";
import createError from "http-errors";
import CommentSchema from "../comments/schema.js";
import PostSchema from "../posts/schema.js";

const commentsRouter = Router();

// **************** POST A NEW COMMENT ****************
commentsRouter.post("/:postId/post", async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await PostSchema.findById(postId);
    if (post) {
      const newComment = new CommentSchema(req.body);
      newComment.postID = postId;
      const { _id } = await newComment.save();
      post.comments.push(_id);
      await post.save();

      res.status(201).send(newComment);
    } else {
      next(createError(404, `post with id ${postId} was not found`));
    }
  } catch (error) {
    console.log(error);
    if (error.name === "validationError") {
      next(createError(400, error));
    } else {
      console.log(error);
      next(createError(500, "An Error ocurred while creating your comment"));
    }
  }
});

export default commentsRouter;
