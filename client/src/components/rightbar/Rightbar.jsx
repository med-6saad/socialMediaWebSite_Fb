import './rightbar.css';
import {Users} from '../../Data';
import Online from '../online/Online';
import axios from 'axios';
import { useEffect,useState } from 'react';
import {Link} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {PersonAddAlt1} from '@mui/icons-material';
import {PersonRemove} from '@mui/icons-material';
export default function Rightbar({user}){
    const PL=process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends,setFriends]=useState([])
    const {user:currentUser,dispatch} = useContext(AuthContext);
    console.log('current:',currentUser)
    const [followed,setFollowed]=useState(currentUser.following.includes(user?._id));
    useEffect(()=>{
        const getFriends=async()=>{
            try{
                const friendList=await axios.get('/users/friends/'+user._id);
                setFriends(friendList.data);
            }catch(err){
                console.log(err)
            }
        }
        getFriends();
    },[user])
    useEffect(()=>{
        setFollowed(currentUser.following.includes(user?._id))
    },[currentUser,user?._id])
    const handleClick=async(e)=>{
        try{
            if(followed){
                await axios.put('/users/'+user._id+'/unfollow',{userId:currentUser._id})
                dispatch({type:"UNFOLLOW",payload:user._id})
            }else{
                await axios.put('/users/'+user._id+'/follow',{userId:currentUser._id})
                dispatch({type:"FOLLOW",payload:user._id})
            }
        }catch(err){
            console.log(err)
        }
        setFollowed(!followed);
    }
    const ProfileRightBar=()=>{
        
        return(
            <>
                {user.username!==currentUser.username&&(
                    <button className='rightbarFollowButton' onClick={handleClick}>
                        {followed?<>Unfollow<PersonRemove/></>:<>follow<PersonAddAlt1/></>}
                    </button>
                )}
                <h4 className='rightbarTitle'>
                    User information
                </h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">
                            City:
                        </span>
                        <span className="rightbarInfoValue">
                        {user.city}
                        </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">
                            From:
                        </span>
                        <span className="rightbarInfoValue">
                            {user.from}
                        </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">
                            Relationship:
                        </span>
                        <span className="rightbarInfoValue">
                            {user.relationship===1?"Single":"Married"}
                        </span>
                    </div>
                </div>
                <h4 className='rightbarTitle'>User friends</h4>
                <div className="rightbarFollowings">
                    {friends.map(friend=>(
                        <div className="rightbarFolowig">
                            <Link to={'/profile/'+friend.username}>
                                <img src={friend.profilePicture?PL+friend.profilePicture:PL+'user.jpg'} alt="" className="rightbarfollowingImg" />
                            </Link>
                            <span className="rightbarFollowingName">{friend.username}</span>
                        </div>
                    ))}
                                       
                </div>
            </>
        )
    }
    const HomeRightBar=()=>{
        return(
            <>
                <div className="birthdayContainer">
                    <img src={PL+"cadeau.jpg"} alt="" className="birthdayImg" />
                    <span className="birthdayText">
                        <b>Pola Foster</b> and <b>3 other friends</b> a birthday
                    </span>
                </div>
                <img src={PL+"frind.jpg"} alt="" className="rightbarAd" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map((u)=>(
                        <Online key={u.id} user={u}/>
                    ))}
                </ul>
            </>
        )
    }
    return (
        <div className='rightbar'>
            <div className="rightbarWrapper">
                {user ? <ProfileRightBar/> : <HomeRightBar/>}
            </div>
        </div>
    )
}