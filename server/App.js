const express=require('express');
const app=express();
const UserRouter=require('./routers/User.router');
const PostRouter=require('./routers/Post.router');
const AuthRouter=require('./routers/Auth.router');
const body_parser=require('body-parser');
const cors=require('cors');
const multer=require('multer');
const morgan=require('morgan');
const path=require('path');
const mongoose=require('mongoose');
const DB_URL=process.env.DB_URL;
app.use('/images',express.static(path.join(__dirname,'public/images')))
app.use(body_parser.urlencoded({extended:true}))
app.use(body_parser.json());
mongoose.connect('mongodb://localhost:27017/MedSocial').then(()=>{
    console.log('data base connedted...')
});
app.use(cors());
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }
})
const upload=multer({storage:storage});
app.post('/server/upload',upload.single('file'),(req,res,next)=>{
    try{
        return res.status(200).json('file uploaded successfuly.')
    }catch(err){
        return res.status(500).json(err)
    }
})

app.use('/server/auth',AuthRouter);
app.use('/server/users',UserRouter);
app.use('/server/posts',PostRouter);
app.use(morgan('tiny'));
app.listen(8800,()=>{
    console.log('server runing in port 8800...')
})