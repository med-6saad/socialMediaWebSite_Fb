import './sidebar.css';
import {RssFeed,Chat,VideoStable,Groups,Bookmarks,QuestionAnswer,Work,Event,GolfCourse} from '@mui/icons-material';
import CloseFriend from '../closeFriend/CloseFriend';
import { Users } from '../../Data';
export default function Sidebar(){
    return (
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className='sidebarIcon'/>
                        <span className="sidebarListItemText">
                            Feed
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <Chat className='sidebarIcon'/>
                        <span className="sidebarListItemText">
                            Chats
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <VideoStable className='sidebarIcon'/>
                        <span className="sidebarListItemText">
                            Videos
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <Groups className='sidebarIcon'/>
                        <span className="sidebarListItemText">
                            Groups
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <Bookmarks className='sidebarIcon'/>
                        <span className="sidebarListItemText">
                            Bookmarks
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <QuestionAnswer className='sidebarIcon'/>
                        <span className="sidebarListItemText">
                            Questions
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <Work className='sidebarIcon'/>
                        <span className="sidebarListItemText">
                            Jobs
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <Event className='sidebarIcon'/>
                        <span className="sidebarListItemText">
                            Events
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <GolfCourse className='sidebarIcon'/>
                        <span className="sidebarListItemText">
                            Courses
                        </span>
                    </li>
                </ul>
                <button className='sidebarButton'>Show more</button>
                <hr className='sidebarHr'/>
                <ul className="sidebarFriendList">
                    {Users.map((u)=>(
                        <CloseFriend key={u.id} user={u}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}