import React,{useState} from 'react'
import { Timestamp } from 'firebase/firestore';
import { useSelector } from 'react-redux';

const ProjectComments = () => {
    const [newComment,setNewComment] = useState('');

    const user = useSelector(state => state.auth.user)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentToAdd =  {
            displayName : user.displayName,
            photoURL : user.photoURL,
            content : newComment,
            createdAt : Timestamp.fromDate(new Date()),
            id : Math.random()
        }

    }




  return (
    <div className='project-comments'>
    <h4>Project Comments</h4>

    <form className='add-comment' onSubmit={handleSubmit}>

        <label>
            <span>Add new comment:</span>
            <textarea
            required
            onChange={e => setNewComment(e.target.value)}
            value ={newComment}
            >

            </textarea>
        </label>
            <button className='btn'>Add Comment</button>
    </form>

    </div>
  )
}

export default ProjectComments