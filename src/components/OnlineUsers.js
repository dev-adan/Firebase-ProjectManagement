import React, { useEffect } from "react";
import "./OnlineUsers.css";

import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "../components";
import { getCollection } from "../features/handleDataSlice";
import { db } from "../firebase/config";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";

const OnlineUsers = () => {
  const getdataslicer = useSelector((state) => state.handleData);
  const dispatch = useDispatch();

  const [error, setError] = React.useState("");
  useEffect(() => {
    const ref = collection(db, "users");

    const unsub = onSnapshot(
      ref,
      (usersSnapShot) => {
        let results = [];
        usersSnapShot.forEach((doc) =>
          results.push({ id: doc.id, ...doc.data() })
       
        );
        dispatch(getCollection(results)); 
        
      },
      (error) => {
        console.log(error);
        setError("could not fetch the data");
      }
    );

    return () => unsub();
  }, []);

  return (
    <div className="user-list">
      <h2>All Users</h2>

      {error && <div className="error">{error}</div>}

      {getdataslicer.documents &&
        getdataslicer.documents.map((user) => (
          <div key={user.id} className="user-list-item">
          {user.online && <span className="online-user"></span>}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL} />
          </div>
        ))}
    </div>
  );
};

export default OnlineUsers;
