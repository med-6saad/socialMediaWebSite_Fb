import './share.css'
import {PermMedia,Label,Room,EmojiEmotions} from '@mui/icons-material';
import { useContext } from 'react';
import {AuthContext} from '../../context/AuthContext';
import {Link} from 'react-router-dom';
import { useRef,useState } from 'react';
import {Cancel} from '@mui/icons-material';
import axios from 'axios';
export default function Share() {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const currentUser=useContext(AuthContext);
    const [file,setFile]=useState(null)
    const desc=useRef()
    const submitHandler= async(e)=>{
        e.preventDefault();
        const newPost={
            userId:currentUser.user._id,
            desc:desc.current.value
        }
        if(file){
            const data=new FormData();
            const fileName=Date.now()+file.name;
            data.append("name",fileName);
            data.append("file",file)
            newPost.img=fileName
            try{
                await axios.post('/upload',data)
            }catch(err){
                console.log(err)
            }
        }
        try{
            await axios.post('/posts',newPost)
            window.location.reload();
        }catch(err){
            console.log(err)
        }
    }
  return (
    <div className='share'>
        <div className="shareWrapper">
            <div className="shareTop">
                <Link to={'/profile/'+currentUser.user.username}>
                    <img src={currentUser.user.profilePicture?PF+currentUser.user.profilePicture:PF+'/user.jpg'} alt="" className="shareProfileImg" />
                </Link>
                <input ref={desc} placeholder={"Wat's in your ming "+currentUser.user.username+" ?"}className='shareInput' />
            </div>
            <hr className='shareHr'/>
            {file&&(
                <div className="shareImgContainer">
                    <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                    <Cancel className='shareCancelImg' onClick={()=>setFile(null)}/>
                </div>
            )}
            <form className="shareButton" onSubmit={submitHandler}>
                <div className="shareOptions">
                    <label htmlFor='file' className="shareOption">
                        <PermMedia htmlColor='tomato' className='shareIcon'/>
                        <span className='shareoptionText'>Photo or video</span>
                        <input type="file" id='file' name='file' accept='.png,.jpeg,.jpg' style={{display:'none'}} onChange={(e)=>setFile(e.target.files[0])}/>
                    </label>
                    <div className="shareOption">
                        <Label htmlColor='blue' className='shareIcon'/>
                        <span className='shareoptionText'>Tag</span>
                    </div>
                    <div className="shareOption">
                        <Room htmlColor='green' className='shareIcon'/>
                        <span className='shareoptionText'>Location</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotions htmlColor='goldenrod' className='shareIcon'/>
                        <span className='shareoptionText'>Feeling</span>
                    </div>
                </div>
                <button className='shareBtn' type='submit'>
                    Share
                </button>
            </form>
        </div>
    </div>
  )
}
