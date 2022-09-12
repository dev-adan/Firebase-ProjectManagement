import React,{useEffect} from 'react'
import './OnlineUsers.css'

import { useSelector,useDispatch } from 'react-redux'
import {Avatar} from '../components'
import { getCollection } from '../features/getDataSlice'

const OnlineUsers = () => {

  const getdataslicer = useSelector(state => state.getData);
  const dispatch = useDispatch();

  useEffect(() => {
   
    dispatch(getCollection('users'))
    
  }, []);

  return (
    <div className='user-list'>
      <h2>All Users</h2>

      {getdataslicer.error && <div className='error'>{getdataslicer. error}</div>}

      {getdataslicer.documents && getdataslicer.documents.map(user => (
        <div key={user.id} className='user-list-item'>
          <span>{user.displayName}</span>
          <Avatar src={user.photoURL}/>
        </div>
      ))}
    </div>
  )
}

export default OnlineUsers