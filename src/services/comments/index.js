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
    if (error.name === "ValidationError") {
      next(createError(400, error));
    } else {
      console.log(error);
      next(createError(500, "An Error ocurred while creating your comment"));
    }
  }
});

// **************** GET ALL COMMENTS ****************
commentsRouter.get('/:postId/comments', async (req, res, next) => { //get all comment
    try {
        const postId = req.params.postId
        const comments = await CommentSchema.findById(postId)

        console.log(comments)
        console.log(postId)
        if (postId && comments) {
            res.status(200).send(comments)
        } else {
            next(createError(404, `comments for post - ${postId} - cannot be found`))
        }
    } catch (error) {
        if (error.name === "validationError") {
            next(createError(400, error))
        } else {
            console.log(error)
            next(createError(500, "An Error ocurred"))
        }
    }
})

// **************** GET SINGLE COMMENT ****************
commentsRouter.get('/:commentId', async (req, res, next) => {
    try {

        const commentId = req.params.commentId
        const comment = await CommentSchema.findById(commentId)
        if (comment) {
            res.status(200).send(comment)
        } else {
            next(createError(404, `comment with id ${commentId} was not found`))
        }
    } catch (error) {
        if (error.name === "ValidationError") {
            next(createError(400, error))
        } else {
            console.log(error)
            next(createError(500, "An Error ocurred while creating your comment"))
        }
    }
})

export default commentsRouter;
