import './post.css';
import {MoreVert} from '@mui/icons-material';
import { useState,useEffect } from 'react';
import {format} from 'timeago.js';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {useContext} from 'react';
import { AuthContext } from '../../context/AuthContext';
export default function Post({post}) {
    const [like,setLike]=useState(post.likes.length);
    const [isLiked,setIsLiked]=useState(false);
    const [user,setUser]=useState({});
    const currentUser=useContext(AuthContext);
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const handleLike=()=>{
        try{
            axios.put('/posts/'+post._id+'/like',{currentUser:currentUser.user._id}).then((result)=>{
                setLike(result.data.likes.length);
            })
            setIsLiked(post.likes.includes(currentUser._id))
        }catch(err){
            console.log(err)
        }
    }
    //fetchUser
    useEffect( () => {
        const fetchUser=async()=>{
            const res=await axios.get('/users?userId='+post.userId)
            setUser(res.data)
        }
        fetchUser();
    },[post.userId]);
    //fetchLikes
  return (
    <div className='post'>
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={'/profile/'+user.username}>
                        <img src={user.profilePicture?PF+user.profilePicture:PF+'user.jpg'} alt="" className="postProfileImg" />
                    </Link>
                    <span className="postUsername">{user.username}</span>
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">
                    {post?.desc}
                </span>
                <img className='postImg' src={PF+post.img} alt="" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img src={PF+"like.png"} alt="" onClick={handleLike} className="likeIcon" />
                    <img src={PF+"heart.png"} alt="" className="likeIcon" />
                    <span className="postLikeCounter">{like} people like it</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">
                        {post.comment} comments
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}
