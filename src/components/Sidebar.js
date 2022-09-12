import React from 'react'
import './Sidebar.css'
import DashboardIcon from '../assets/dashboard_icon.svg';
import AddIcon from '../assets/add_icon.svg';
import { NavLink } from 'react-router-dom';
import {Avatar} from '../components';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const avatarImage = useSelector(state => state.auth.user.photoURL);
  const displayName = useSelector(state => state.auth.user.displayName);

  return (
    <div className='sidebar'>
        <div className='sidebar-content'>

            <div className='user'>
                <Avatar src={avatarImage} />
                <p>Hey {displayName}</p>
            </div>

            <nav className='links'>
            <ul>
                <li>
                <NavLink to='/'>
                <img src={DashboardIcon} alt='dashboard icon'/>
                <span>Dashboard</span>
                </NavLink>

                <NavLink to='/create'>
                <img src={AddIcon} alt='Add Project Icon'/>
                <span>New Project</span>
                </NavLink>
                </li>
            </ul>

            </nav>

        </div>

    </div>
  )
}

export default Sidebar