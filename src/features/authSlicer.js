import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, storage,db } from "../firebase/config";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {setDoc,doc } from "firebase/firestore"; 

const initialState = {
  user: null,
  authIsReady: false,
  error: false,
  isPending: false,
};

export const SignupUser = createAsyncThunk(
  "auth/SignupUser", async ({email,password,thumbnail,displayName}) => {

    try{
    const res = await createUserWithEmailAndPassword(auth, email, password);

    if (!res) {
      throw new Error("Could not complete signup");
    }

    //uploading user thumbnail
    const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
    const storageRef = ref(storage, uploadPath);
    const uploadThumbnail = await uploadBytes(storageRef, thumbnail);
   

    // Getting link of a uploaded thumbnail

    const imgUrl  = await getDownloadURL(uploadThumbnail.ref);

    //setting up a profile
    await updateProfile(res.user, { displayName, photoURL: imgUrl });
   

    //setting up a document
    await setDoc(doc(db,"users",res.user.uid),{
    online : true,
    displayName,
    photoURL : imgUrl})
   


  }catch(error){
    console.log(error)
  }

  }
  

);

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {},


  extraReducers : {

    [SignupUser.pending] : (state) => {
      state.isPending = true;
    },

    [SignupUser.fulfilled] : (state) => {
      state.isPending = false;
    },

    [SignupUser.rejected] : (state) => {
      state.isPending = false;
      state.error = 'Some kind of error occured. please check authSlicer,Signup';
    }

  }

});

// export const {  } = authSlice.actions;
export default authSlice.reducer;
