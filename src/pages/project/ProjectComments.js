import React, { useState } from "react";
import { Timestamp } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { updateDocument } from "../../features/handleDataSlice";
import { Avatar } from "../../components";

const ProjectComments = ({ id, project }) => {
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);




  const handleSubmit = (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: Timestamp.fromDate(new Date()),
      id: Math.random(),
    };

    dispatch(
      updateDocument({
        name: "projects",
        id: id,
        data: commentToAdd,
        prevComment: project.comments,
      })
    );

    setNewComment("");
  };

  return (
    <div className="project-comments">
      <h4>Project Comments</h4>

      <ul>
        {project.comments.length > 0 &&
          project.comments.map((comment) => (
            <li key={comment.id}>
              <div className="comment-author">
                <Avatar src={comment.photoURL} />
                <p>{comment.displayName}</p>
              </div>

                
              <div className="comment-date">
                <p>date here</p>
              </div>

              <div className="comment-content">
                <p>{comment.content}</p>
              </div>
            </li>
          ))}
      </ul>

      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
       { <button className="btn">Add Comment</button> }
      </form>
    </div>
  );
};

export default ProjectComments;
