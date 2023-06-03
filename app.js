import {} from 'dotenv/config'
import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes';
import blogRouter from './routes/blog-route';
import { authenticationToken } from './jwt';

// const mongoose=require('mongoose')
const app= express();
app.use(express.json());
app.use('/api/user',router);
app.use('/api/blog',authenticationToken, blogRouter)
// const url="mongodb://localhost:27017/Blog"

// mongoose.connect(url,{}).then
// (()=>app.listen(5000)).then
// (()=>console.log('server is running on port 5000')).catch
// ((err)=>console.log(err));
    

mongoose.connect(process.env.DB_CONNECTION).then
// mongoose.connect("mongodb://admin:admin@0.0.0.0:27017/Blog").then
(()=>app.listen(5000)).then
(()=>console.log('connected to db and server is running on port 5000')).catch
((err)=>console.log(err));
    