const asyncHandler = require("express-async-handler");
const User =require("../models/userModel");
const generateToken = require("../config/generateToken");


const registerUser=asyncHandler(async (req,res)=>{
    const {name,email, password,pics} = req.body;

    if(!name|| !email || !password ){
        res.status(400);
        throw new Error("Please Entry all the fields");
    }
    const userExists= await User.findOne({email});
    if (userExists){
        res.status(400);
        throw new Error("user Already exists");
    }
    const user=await User.create({
        name,email, password,pics
    });

    if (user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            password:user.password,
            pics:user.pic,
            token:generateToken(user._id),
        })
    }else {
        res.status(400);
        throw new Error("Failed to create user");
    }
})
const authUser = asyncHandler(async (req,res)=>{
    const {password,email} = req.body;
    const user = await User.findOne({email});
    if (user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            password: user.password,
            pic: user.pic,
            token: generateToken(user._id),
        })
    } else {
        throw new Error("Invalid Email");
    }
})

const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
                {name: {$regex: req.query.search, $options: "i"}},
                {email: {$regex: req.query.search, $options: "i"}},
            ],
        }
        : {};

    const users = await User.find(keyword).find({_id: {$ne: req.user._id}});

    res.send(users);
});
module.exports = {registerUser, authUser, allUsers}