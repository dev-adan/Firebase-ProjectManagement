import React, { useState } from 'react'
import './Signup.css'

import { useSelector,useDispatch } from 'react-redux';
import {SignupUser} from '../../features/authSlicer';

const Signup = () => {

  const authslicer = useSelector((state) => state.auth);


  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [displayName,setDisplayName] = useState('');
  const [thumbnail,setThumbnail] = useState('');
  const [thumbnailError,setThumbnailError] = useState('');

  const distpatch = useDispatch();

  const handleFileChange = (e) => {
  
    setThumbnail(null);
    let selected = e.target.files[0];

    if(!selected){
      setThumbnail('Please Select a file.')
      return;
    }

    if(!selected.type.includes('image')){
      setThumbnailError('Selected file must be image.');
      return;
    }

    if(selected.size > 100000){
      setThumbnailError('Image File size must be less then 100KB.');
      return;
    }

    setThumbnailError(null);

    setThumbnail(selected);

    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    distpatch(SignupUser({email,password,thumbnail,displayName}))
  }

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Sign up</h2>

      <label>
        <span>email:</span>
        <input
          required
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}

        />
      </label>

      <label>
        <span>password:</span>
        <input
          required
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}

        />
      </label>

      <label>
        <span>display name:</span>
        <input
          required
          type='text'
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}

        />
      </label>

      <label>
        <span>profile picture:</span>
        <input
          required
          type='file'
          onChange={handleFileChange}
        />
        {thumbnailError && <div className='error'>{thumbnailError}</div>}
      </label>
    {!authslicer.isPending && <button className='btn'>Sign Up</button>}
    {authslicer.isPending && <button className='btn' disabled>Loading...</button>}
    {authslicer.error && <div className='error'>{authslicer.error}</div>}

    </form>
  )
}

export default Signup