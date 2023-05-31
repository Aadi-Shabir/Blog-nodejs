import express from 'express';
import { addBlog, deleteBlog, getAllBlogs, getBlogById, getByUserId, updateBlog } from '../controllers/blog';

const blogRouter=express.Router()

blogRouter.get("/",getAllBlogs)
blogRouter.get("/:id",getBlogById)
blogRouter.post("/add",addBlog)
blogRouter.put("/updateBlog/:id",updateBlog)
blogRouter.delete("/deleteBlog/:id",deleteBlog)
blogRouter.get("/getByUserId/:id",getByUserId)

export default blogRouter