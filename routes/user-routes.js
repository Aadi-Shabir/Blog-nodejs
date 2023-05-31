import express from 'express';
import { getAllUsers,signup,login } from '../controllers/user-controller';
import { deletetoken, token } from '../jwt';

const router=express.Router()

router.get("/",getAllUsers)
router.post("/signup",signup)
router.post("/login",login)
router.post("/token",token)
router.post("/logout",deletetoken)
export default router