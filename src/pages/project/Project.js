import React,{useEffect,useState} from 'react'
import {
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from '../../firebase/config';
import { useParams } from 'react-router-dom';
import ProjectSummary from './ProjectSummary';
import ProjectComments from './ProjectComments';

const Project = () => {
  const [document,setDocument] = useState();
  const [error,setError] = useState('');
  const {id} = useParams();

  useEffect(() => {

    const project = doc(db,'projects',id);
    
    const unsub =  onSnapshot(
      project,
      (snapshot) => {
        if(snapshot.data()){
          setDocument({...snapshot.data(),id : snapshot.id})
        }else{
          setError('No such document exists.')
        }
      
      }, (error) => {
        console.log(error);
        setError("could not fetch the project");
      }
  
    );

    return () => unsub();



  },[])

  if(error){
    return(<div className='error'>{error}</div>)
  }

  if(!document){
    return (
      <div className='loading'>Loading...</div>
    )
  }


  return (
    <div className='project-details'>
      <ProjectSummary project={document} id={id}/>
      <ProjectComments id={id} project={document}/>

    </div>
  )
}

export default Project