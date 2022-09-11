import React, { useEffect, useState } from 'react'
import './Login.css'
import { useSelector,useDispatch} from 'react-redux';
import {ErrorHandler} from '../../features/authSlicer'
import { LoginUser } from '../../features/authSlicer';

const Login = () => {

  const authslicer = useSelector((state) => state.auth);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginUser({email,password}))

  }

  useEffect(() => {

    dispatch(ErrorHandler())

  },[])

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Login</h2>

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
    {!authslicer.isPending && <button className='btn'>Login</button>}
    {authslicer.isPending && <button className='btn' disabled>Logging in...</button>}
    {authslicer.error && <div className='error'>{authslicer.error}</div>}

    </form>
  )
}

export default Login