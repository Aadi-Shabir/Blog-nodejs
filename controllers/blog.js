import mongoose from 'mongoose';
import Blog from '../models/blog'
import User from '../models/user'

export const getAllBlogs= async (req,res,next)=>{
    let blogs;
    try{
    blogs=await Blog.find()
    } catch (err){
       return console.log(err)
    }
    if (!blogs){
        return res.status(404).json({message:"blog not found"})
    }
    return res.status(200).json({blogs})
};
export const addBlog=async (req,res, next)=>{
   const {title ,description,image,user}=req.body
    let existinguser;
    try{
        existinguser= await User.findById(user)
    }catch(err){
      
        return console.log (err)
    }
    if (!existinguser){
        return res.status(400).json({message:" user not found"})
    }
   const blog= new Blog({
    title,
    description,
    image,
    user
 });
   try {
        const session= await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existinguser.blogs.push(blog);
        await existinguser.save({session})
      await session.commitTransaction();
   }catch(err){
    console.log(err)
    return res.status(500).json({message:err})
   }
   
   return res.status(200).json({blog})
};
export const updateBlog= async (req,res,next)=>{
    console.log(req)
    const blogId=req.params.id
    const {title,description}=req.body

    let blog;
try{
    blog= await Blog.findByIdAndUpdate(blogId,{
        title,
        description
    })
    }catch(error){
        return console.log(error);
    }
    if (!blog){
        return res.status(404).json({message:'requested blog not found'})
    }
    return res.status(200).json({blog})
}
 
 export const getBlogById= async (req,res,next)=>{
    const blogId=req.params.id
    let blog;
try{
    blog= await Blog.findByIdAndUpdate(blogId)

    }catch(error){
        return console.log(error);
    }
    if (!blog){
        return res.status(500).json({message:'requested blog not found'})
    }
    return res.status(200).json({blog})
}

export const deleteBlog=async (req,res,next)=>{
    const blogId=req.params.id
    let blog;
    try{
        blog= await Blog.findByIdAndRemove (blogId).populate('user');
        
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        
        }catch(error){
            return console.log(error);
        }
        if (!blog){
            return res.status(500).json({message:'requested blog not found'})
        }
        return res.status(200).json({blog})
 }

 export const getByUserId=async (req,res,next)=>{
    const id=req.params.id
    let userBlogs;
    try{
        userBlogs=await User.findById(id).populate("blogs")
        console.log("user-blogs",userBlogs)
    }catch (err){
        return console.log(err)
    }
    if (!userBlogs){
        return res.status(404).json({message:"user not found"})
    }
    return res.status(200).json({blogs:userBlogs})
}