import React,{useEffect,useState} from 'react';
import './Dashboard.css';
import { useSelector,useDispatch } from 'react-redux';
import { fetchProjects } from '../../features/handleDataSlice';
import { ProjectList } from '../../components';

import { db } from "../../firebase/config";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";






const Dashboard = () => {
  const handledataslicer = useSelector(state => state.handleData);
  const dispatch = useDispatch();

  const [error,setError] = useState('');

  useEffect(() => {

    const ref = collection(db, "projects");

    const unsub =  onSnapshot(
      ref,
      (usersSnapShot) => {
        let results = [];
        usersSnapShot.forEach((doc) =>
          results.push({ id: doc.id, ...doc.data() })
       
        );
        dispatch(fetchProjects(results)); 
        
      },
      (error) => {
        console.log(error);
        setError("could not fetch the projects");
      }
    );

    return () => unsub();

  },[])



  return (
    <div>
      <h2 className='page-title'>Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {handledataslicer.projectDocuments && <ProjectList projects={handledataslicer.projectDocuments}/>}
    </div>
  )
}

export default Dashboard