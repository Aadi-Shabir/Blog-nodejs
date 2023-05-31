import {} from 'dotenv/config'
import express from 'express';
import jwt from 'jsonwebtoken';
const app= express()
app.use(express.json())
let refreshTokens=[]

export const token=async (req,res,next)=>{
    const refreshToken=req.body.token
    if (refreshToken== null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(error,user)=>{
        if (error) return res.sendStatus(403)
        const accessToken=generateAccesstoken({name:user.name})
        res.json({accessToken:accessToken})

    })
    next()
}
export const deletetoken=(req,res, next)=>{
    refreshTokens=refreshTokens.filter(token=>token!==req.body.token)
    console.log(refreshTokens)
    res.sendStatus(202)
    
}

export const generatetoken=(emailexists)=>{
    const userName=emailexists
    const user ={name:userName}
    const accessToken=generateAccesstoken(user)
    const refreshToken=jwt.sign(user,process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    console.log(refreshToken)
    return {accessToken:accessToken,refreshToken:refreshToken}
}

function generateAccesstoken(user){
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'60s'})
}

export const authenticationToken= (req,res,next)=>{

    const authHeader= req.headers['authorization']
    const token=authHeader && authHeader.split(' ')[1]
    if (token== null)return res.sendStatus(201)
    
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(error,user)=>{
    if (error) return res.sendStatus(403)
        req.user=user
        next()
    
    })
    
}
// const authHeader= req.headers["authorization"]
//     const token =authHeader && authHeader.split(" ")[1]
//     if (token == null) return