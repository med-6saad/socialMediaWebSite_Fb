const router=require('express').Router();
const User=require('../models/User.model')

router.get('/',async(req,res,next)=>{
    const userId=req.query.userId;
    const username=req.query.username;
    console.log('userId:',userId)
    try{
        const user=userId ? await User.findById(userId)
        :await User.findOne({username:username});
        const {password,updateAt,...other}=user._doc;
        res.status(200).json(other)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})
router.get('/getUsers/:userId',async(req,res,next)=>{
    try{
        const user=await User.findById(req.params.userId)
        res.status(200).json(user)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})
//get friends (njibo ghir img o uesrname o id )
router.get('/friends/:userId',async(req,res,next)=>{
    try{
        const user=await User.findById(req.params.userId);
        const friends=await Promise.all(//hadi nkhadmo biha ki ndiro loops 3la data base 
                        //ma3naha njibo data ch3al mn mara b loop mn data base
            user.following.map(friendId=>{
                return User.findById(friendId);
            })
        )
        let friendList=[];
        friends.map(friend=>{
            const {_id,username,profilePicture}=friend;
            friendList.push({_id,username,profilePicture})
        })
        res.status(200).json(friendList)
    }catch(err){
        res.status(500).json(err)
    }
})
router.put('/:id/follow',async(req,res)=>{
    if(req.body.userId!==req.params._id){
        try{
            const user=await User.findById(req.params.id)
            const currentUser=await User.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers:req.body.userId}})
                await currentUser.updateOne({$push:{following:req.params.id}})
                res.status(200).json('user has been followed')
            }else{
                res.status(403).json('you allready follow this user')
            }
        }catch(err){
            res.status(403).json('you cant follow your self')
        }
    }
})


router.put('/:id/unfollow',async(req,res)=>{
    if(req.body.userId!==req.params.id){
        try{
            const user=await User.findById(req.params.id);
            const currentUser=await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers:req.body.userId}});
                await currentUser.updateOne({$pull:{following:req.params.id}});
                res.status(200).json('user has been unfollowed');
            }else{
                res.status(403).json('user has been unfollowed')
            }
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json('you cant unfollow yourself')
    }
})
module.exports=router;