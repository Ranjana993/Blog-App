import express from "express";
import { createBlog, deleteBlog, getAllBlogs, getSingleBlog, updateBlog, userBlogController } from "../controller/blogController.js";


const blogRouter = express.Router();


blogRouter.get("/get-all-blog", getAllBlogs);    // getAllBlog 
blogRouter.post("/create-blog",upload.single("image"), createBlog);      // create blog 
blogRouter.get("/get-single-blog/:id", getSingleBlog)  // get Single blog 
blogRouter.put("/update-blog/:id", upload.single("image") , updateBlog);    // update blog 
blogRouter.delete("/delete-blog/:id", deleteBlog);   // delete blog 
blogRouter.get("/all-blog/:id", userBlogController)
export default blogRouter