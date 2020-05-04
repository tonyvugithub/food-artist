import React, {useEffect} from 'react'
import {Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {logout} from 'store/slides/auth/authSlide';

const LogOut = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(logout());
  },[dispatch]);

  return <Redirect to='/login'/>
}

export default LogOut;
