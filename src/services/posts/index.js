import mongoose from "mongoose";
import express from "express";
import createHttpError from "http-errors";
import q2m from "query-to-mongo";
import PostsSchema from "../posts/schema.js";

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
                ...req.body
            }
        });
    } catch (err) {
        next(createHttpError(500, "Error occurred while creating new post"));
    }
})

export default postsRouter;