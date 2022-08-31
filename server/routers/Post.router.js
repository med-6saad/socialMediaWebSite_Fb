const router=require('express').Router();
const { json } = require('body-parser');
const body_parser=require('body-parser');
const Post=require('../models/Post.model');
const User=require('../models/User.model');
router.post('/',async(req,res,next)=>{
    console.log(req.body)
    newPost=new Post(req.body)
    try{
        const savedPost=await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        console.log(err)
        res.status(500).json(err);
    }
})
router.post('/addPost',async (req,res,next)=>{
    const newPost= new Post(req.body);
    try{
        const savedPost=await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(5000).json(err);
    }
})
router.put('/:id/like',async(req,res,next)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.currentUser)){
            await post.updateOne({$push:{likes:req.body.currentUser}});
            const post2=await Post.findById(req.params.id);
            res.status(200).json(post2);
        }else{
            await post.updateOne({$pull:{likes:req.body.currentUser}});
            const post2=await Post.findById(req.params.id);
            res.status(200).json(post2);
        }
    }catch(err){
        res.status(500).json(err);
    }
})
router.get('/timeline/:userId',async(req,res,next)=>{
    try{
        const currentUser=await User.findById(req.params.userId)
        const userPosts=await Post.find({userId:currentUser._id})
        const friendPosts=await Promise.all(
            currentUser.following.map( async(friendId)=>{
                return await Post.find({userId:friendId});
            })
        )
        res.status(200).json(userPosts.concat(...friendPosts))
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})
//get usr's all posts
router.get('/profile/:username',async(req,res,next)=>{
    try{
        const user=await User.find({username:req.params.username})
        const posts=await Post.find({userId:user[0]._id})
        res.status(200).json(posts)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports=router;