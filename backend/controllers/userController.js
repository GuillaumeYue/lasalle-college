import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

//@desc    注册一个新用户
//@route   Post/api/users
//@access  公开
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    const userExists = await User.findOne({email})
    //用户已注册
    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    //注册新用户
    const user = await User.create({name, email, password})
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        }) 
        }else{
            res.status(400)
            throw new Error('Invalid user data') 
        }
    })

//@desc    用户身份验证 & 获取Token
//@route   Post/api/users/login
//@access  公开
const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})




//@desc    获取登陆成功的用户详情
//@route   GET/api/users/profile
//@access  私密
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else{
        res.status(404)
        throw new Error('User not found')
    }
})

//@desc    更新用户资料
//@route   PUT/api/users/profile
//@access  私密
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    
    //获取更新后的资料
    if(user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if(req.body.password) {
          user.password = req.body.password
      }
      const updatedUser = await user.save()
      res.json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          token: generateToken(updatedUser._id)
      })
    } else{
        res.status(404)
        throw new Error('User not found')
    }
})

export {registerUser, authUser, getUserProfile, updateUserProfile}