import './profile.css';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';
import { useEffect,useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
export default function Profile() {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const [user,setUser]=useState({});
    const params=useParams();
    useEffect(()=>{
        const fetchUser=async()=>{
            const res=await axios.get('http://localhost:8800/server/users?username='+params.username);
            setUser(res.data);
        }
        fetchUser()
    },[params.username])
    return (
        <>
            <Topbar/>
            <div className="profile">
                <Sidebar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                           <img src={user.coverPicture?PF+user.coverPicture:PF+'coverNotFound.png'} alt="" className="profileCoverImg"/>                            {user.profilePicture?<img src={PF+user.profilePicture} alt="" className="profileUserImg" />:
                            <img src={PF+'user.jpg'} alt="" className="profileUserImg" />}
                        </div>
                        <div className="profileInfo">
                            <h4 className='profileInfoName'>{user.username}</h4>
                            <span className="profileInfoDesc">
                                {user.desc}
                            </span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={params.username}/>
                        <Rightbar user={user}/>
                    </div>
                </div>
            </div>
        </>
    )
}
