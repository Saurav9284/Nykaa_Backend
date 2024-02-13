const express = require('express')
const bcrypt = require('bcrypt')
const UserModel = require('../Models/User')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../Config/db')

const userController = express.Router()

// Signup 

userController.post('/register', async (req,res)=>{
    const {name,avatar,email,password} = req.body;
    if(!name || !avatar || !email || !password){
        return res.status(400).send({msg:'Please fill all the details!!'})
    }
    try {
        const emailexist = await UserModel.findOne({email})
        if(emailexist){
            return res.status(400).send({msg:'User Already exist!! Please login'})
        }
        bcrypt.hash(password,5, async (err,hash)=>{
            if(err){
                return res.status(500).send({msg:'Something went wrong'})
            }
            try {
                const user = await UserModel.create({
                    name:name,
                    avatar:avatar,
                    email:email,
                    password:hash
                })
                res.status(201).send({msg:'User Created!!'})
                console.log(user)
            } catch (error) {
                console.log(error)
                res.status(500).send({msg:'Something went wrong'})
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:'Something went wrong'})
    }
});

// Login

userController.post('/login', async (req,res)=>{
    const {email , password} = req.body;
    if(!email || !password){
        return res.status(400).send({msg:'Please fill all the details'})
    }
    try {
        const user = await UserModel.findOne({email})
        if(!email){
            return res.status(400).send({msg:'Please Signup first!!'})
        }
        bcrypt.compare(password,user.password, function (err,result){
                if(result){
                    const token = jwt.sign({userId: user._id},JWT_SECRET)
                    return res.status(201).send({
                        msg: "login succcessful",
                        userData: {
                          token: token,
                          name: user.name,
                        },
                      });
                }
                else{
                    res.status(401).send({msg:'Wrong Credentials!!'})
                }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:'Something went wrong'})
    }
});

module.exports = userController
