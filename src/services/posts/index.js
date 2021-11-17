import mongoose from "mongoose";
import express from "express";
import createHttpError from "http-errors";
import q2m from "query-to-mongo";
import PostsSchema from "../posts/schema.js";
import ProfileSchema from "../profile/schema.js";
import { uploadPostPicture } from "../../utils/imageUpload.js";

const postsRouter = express.Router();

// *************** CREATE A NEW POST *************

// ******************* CREATE A NEW POST *************
postsRouter.post("/", async (req, res, next) => {
  try {
    const newPost = new PostsSchema(req.body);
    const { _id } = await newPost.save();

    res.status(201).send({
      data: {
        _id,
        ...req.body,
      },
    });
  } catch (err) {
    next(createHttpError(500, "Error occurred while creating new post"));
  }
});

// ******************* Get All POST *************
postsRouter.get("/", async (req, res, next) => {
  //http://localhost:3001/posts?limit=2&sort=-author&offset=15
  ///posts?limit=5&sort=-author&offset=10

  try {
    const mongoQuery = q2m(req.query);
    console.log(mongoQuery);
    const total = await PostsSchema.countDocuments(mongoQuery.criteria);
    const posts = await PostsSchema.find(mongoQuery.criteria)
      .limit(mongoQuery.options.limit)
      .skip(mongoQuery.options.skip)
      .sort(mongoQuery.options.sort)
      .populate({
        path: "user",
        /*  select: "name surname email bio title area image userName", */
      });

    res.send({
      links: mongoQuery.links("/posts", total),
      pageTotal: Math.ceil(total / mongoQuery.options.limit),
      total,
      posts,
    });
  } catch (error) {
    next(error);
  }
});

//*********POSTING WITH USERNAME FOR CREATING A NEW POST ***** */
postsRouter.post("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    console.log("here is user", userId);
    // const user = await ProfileSchema.findOne({ _id: userId });
    console.log({ ...req.body, user: userId });
    const newPost = new PostsSchema({ ...req.body, user: userId });
    //newPost.user = user._id;

    await newPost.save();
    if (newPost) {
      res.status(201).send(newPost);
    } else {
      next(createHttpError(404, `unable to post`));
    }
  } catch (err) {
    next(createHttpError(500, "Error occurred while creating new post"));
  }
});

postsRouter.get("/:postId", async (req, res, next) => {
  try {
    const id = req.params.postId;

    const post = await PostsSchema.findById(id).populate({
      path: "user",
    });
    if (post) {
      res.send(post);
    } else {
      next(createHttpError(404, `User with id ${id} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

/************* POST with Image ******* */
postsRouter.post(
  "/:postId/uploadPic",
  uploadPostPicture,
  async (req, res, next) => {
    try {
      console.log(req.file.path);
      const editedPost = await PostsSchema.findByIdAndUpdate(
        { _id: req.params.postId },
        { image: req.file.path },
        { new: true }
      );

      if (editedPost) {
        res.send({ message: "Image updated successfully.", editedPost });
      } else {
        next(
          createHttpError(
            404,
            `No experience found with id: ${req.params.postId}`
          )
        );
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

postsRouter.put("/:postId", async (req, res, next) => {
  try {
    const id = req.params.postId;
    const upDatedPost = await PostsSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (upDatedPost) {
      res.send(upDatedPost);
    } else {
      next(createHttpError(404, `User with id ${id} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

postsRouter.delete("/:postId", async (req, res, next) => {
  try {
    const id = req.params.postId;

    const deletedPost = await PostsSchema.findByIdAndDelete(id);
    if (deletedPost) {
      res.status(204).send();
    } else {
      next(createHttpError(404, `User with id ${id} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

/* postsRouter.put("/:postId/like", async (req, res, next) => {
  try {
    const id = req.params.postId;
    console.log(id);
    const post = await PostsSchema.findById(id);
    if (post) {
      const liked = await PostsSchema.findOne({
        _id: id,
        likes: new mongoose.Types.ObjectId(req.body.authorId),
      });
      console.log(liked);

      if (!liked) {
        await PostsSchema.findByIdAndUpdate(
          id,
          {
            $push: { likes: req.body.authorId },
          },
          { new: true }
        );
      } else {
        await PostsSchema.findByIdAndUpdate(id, {
          $pull: { likes: req.body.authorId },
        });
      }
    } else {
      next(createHttpError(404, `post with this id ${id} not found`));
    }
})
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    next(error);
  }
});
 */
export default postsRouter;
