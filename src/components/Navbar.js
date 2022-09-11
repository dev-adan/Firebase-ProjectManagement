import React from 'react'
import './Navbar.css'
import Temple from '../assets/temple.svg'
import { Link } from 'react-router-dom'
import authSlicer, { LogoutUser } from '../features/authSlicer'
import { useDispatch, useSelector } from 'react-redux'

const Navbar = () => {
  const authslicer = useSelector((state) => state.auth);


  const dispatch = useDispatch();
  return(
    <div className='navbar'>
        <ul>
            <li className='logo'>
                <img src={Temple} alt='dojo logo'/>
                <span>The Dojo</span>
            </li>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/signup'>Signup</Link></li>
            <li>
            {!authSlicer.isPending && <button className='btn' onClick={() => dispatch(LogoutUser())}>Logout</button> }
            {authSlicer.isPending && <button className='btn' disabled >Logging out...</button> }
            </li>
        </ul>
    </div>
  )
}

export default Navbar