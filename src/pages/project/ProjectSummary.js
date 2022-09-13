import React from "react";
import { Avatar } from "../../components";
import './Project.css'
import { useSelector,useDispatch } from "react-redux";
import { deleteDocument } from "../../features/handleDataSlice";
import { useNavigate } from "react-router-dom";

const ProjectSummar = ({ project,id }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick =  (e) => {
    e.preventDefault();

    dispatch(deleteDocument({name : 'projects',id : id}));
    navigate('/')

  }
 
  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p>By {project.createdBy.displayName}</p>
        <p className="due-date">
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">{project.details}</p>
        <h4>Projct is assigned to:</h4>
        <div className="assigned-users">
        {project.assignedUsersList.map(user => (
          <div key={user.id}>
            <Avatar src={user.photoURL}/>
          </div>
        ))} 

        </div>
      </div>
      {user.uid === project.createdBy.id && <button className="btn" onClick={handleClick}>Mark as complete</button>}

    </div>
  );
};

export default ProjectSummar;
