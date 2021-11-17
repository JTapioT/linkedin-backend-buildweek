import express from "express";
import mongoose from "mongoose";
import createError from "http-errors";
import CommentSchema from "../comments/schema.js";
import PostSchema from "../posts/schema.js";

const commentsRouter = express.Router();

// **************** POST A NEW COMMENT ****************
commentsRouter.post("/:postId/comment", async (req, res, next) => {
  {
    const postId = req.params.postId;
    const newComment = new CommentSchema({ ...req.body, postId });
    try {
      const createdComment = await newComment.save();
      res.status(201).json(createdComment);
    } catch (error) {
      next(createError(400, error));
    }
  }
});

// **************** GET ALL COMMENTS ****************
commentsRouter.get("/:postId/comments", async (req, res, next) => {

  try {
    const comments = await CommentSchema.find({ postId: req.params.postId })
    res.json(comments)
  } catch (error) {
    next(createError(500, error))
  }

  // try {
  //   const postId = req.params.postId;
  //   const comments = await PostSchema.findById(postId);

  //   console.log(comments);
  //   console.log(postId);
  //   if (postId && comments) {
  //     res.status(200).send(comments);
  //   } else {
  //     next(createError(404, `comments for post - ${postId} - cannot be found`));
  //   }
  // } catch (err) {
  //   next(createError(500, "Error occurred while getting all the post"));
  // }
});

// **************** GET SINGLE COMMENT ****************
commentsRouter.get("/:commentId", async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const comment = await CommentSchema.findById(commentId);
    if (comment) {
      res.status(200).send(comment);
    } else {
      next(createError(404, `Comment with id ${commentId} was not found`));
    }
  } catch (err) {
    next(createError(500, "Error occurred while getting a single post"));
  }
});

// *************** EDIT A COMMENT ***************
commentsRouter.put("/:commentId/edit", async (req, res, next) => {
  try {
    const commentId = req.params.commentId;

    const updatedComment = await CommentSchema.findByIdAndUpdate(
      commentId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (updatedComment) {
      res.status(204).send(updatedComment);
    } else {
      next(createError(404, `post with id ${postId} was not found`));
    }
  } catch (err) {
    next(createError(500, "Error occurred while updating the post"));
  }
});

// ******************* DELETE COMMENTS *******************
commentsRouter.delete("/:postId/:commentId/delete", async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const post = await PostModel.findById(postId);
    const comment = await CommentModel.findById(commentId);
    if (post && comment) {
      await CommentModel.findByIdAndDelete(commentId);
      res.status(204).send(`deleted`);
    } else {
      next(createError(404, `An Error ocurred while deleting your comment`));
    }
  } catch (err) {
    next(createError(500, "Error occurred while deleting the post"));
  }
});

export default commentsRouter;
