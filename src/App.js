import "./App.css";
import { useEffect } from "react";
import { Dashboard, Login, Create, Signup, Project } from "./pages/index";
import { Navbar, Sidebar, OnlineUsers } from "./components";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { AuthStateChange } from "./features/authSlicer";
import { useDispatch } from "react-redux";

import {Navigate} from "react-router-dom"

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch(AuthStateChange(user));
      unsub();
    });
  }, []);

  const authslicer = useSelector((state) => state.auth);
  
  return (
    <div className="App">
      {authslicer.authIsReady && (
        <>
          {authslicer.user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Routes>
              <Route path="/" element={authslicer.user ? <Dashboard /> : <Navigate to='/login' />} />
              <Route path="/create" element={authslicer.user ? <Create /> : <Navigate to='/login' />} />
              <Route path="/projects/:id" element={authslicer.user ? <Project /> : <Navigate to='/login' />} />
              <Route path="/login" element={authslicer.user ? <Navigate to='/' /> : <Login/> } />
              <Route path="/Signup" element={authslicer.user ? <Navigate to='/login' /> : <Signup/>} />
            </Routes>
          </div>

          {authslicer.user && <OnlineUsers/>}
        </>
      )}
    </div>
  );
}

export default App;
