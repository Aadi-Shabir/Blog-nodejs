import { generatetoken } from '../jwt';
import User from '../models/user'
import bcrypt from 'bcryptjs'

export const getAllUsers= async (req,res,next)=>{
    let users;
    try{
    users=await User.find()
    } catch (err){
       return console.log(err)
    }
    if (!users){
        return res.status(404).json({message:"user not found"})
    }
    return res.status(200).json({users})
}
export const signup=async (req,res,next)=>{
    const {name,email,password,}=req.body
    let existingUser;
    try{
        existingUser=await User.findOne({email})
    }catch (err){
        return console.log(err)
    }
    if (existingUser){
        return res.status(400).json({message:"user already exists instead login"})
    }
    const hashPassword=bcrypt.hashSync(password)
    const user=new User(
        {
            name,
            email,
            password:hashPassword,
            blogs:[]
        }
    )
    try{
       await user.save()
    }
    catch (err){
       return console.log(err)
    }
    return res.status(200).json({user})
}

export const login= async (req,res,next)=>{
    const{email,password}=req.body
    let emailexists;

    try{
        emailexists=await User.findOne({email})
    }catch(err){
        return console.log(err)
    }
    if (!emailexists){
        return res.status(404).json({message:"email doesn't exist"})
    }
    const isPasswordCorrect=bcrypt.compareSync(password,emailexists.password)
    if (!isPasswordCorrect){
        return res.status(400).json({message:"password incorrect"})
    }
    const accessToken=generatetoken(emailexists)
    // accessToken.push(emailexists)
    return res.status(200).json({accessToken})

}