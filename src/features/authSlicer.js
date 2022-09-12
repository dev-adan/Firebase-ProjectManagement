import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, storage, db } from "../firebase/config";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc} from "firebase/firestore";
import { signOut,signInWithEmailAndPassword } from "firebase/auth";




const initialState = {
  user: null,
  authIsReady: false,
  error: '',
  isPending: false,
};

export const SignupUser = createAsyncThunk(
  "auth/SignupUser",
  async ({ email, password, thumbnail, displayName }) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (!res) {
        throw new Error("Could not complete signup");
      }

      //uploading user thumbnail
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
      const storageRef = ref(storage, uploadPath);
      const uploadThumbnail = await uploadBytes(storageRef, thumbnail);

      // Getting link of a uploaded thumbnail

      const imgUrl = await getDownloadURL(uploadThumbnail.ref);

      //setting up a profile
      await updateProfile(res.user, { displayName, photoURL: imgUrl });

      //setting up a document
      await setDoc(doc(db, "users", res.user.uid), {
        online: true,
        displayName,
        photoURL: imgUrl,
      });

      return { res };

    } catch (error) {
      console.log(error);
    }
  }
);




export const LogoutUser = createAsyncThunk(
  "auth/LogoutUser",
  async (arg, thunkAPI) => {

    const state = thunkAPI.getState();
    try {
      await setDoc(doc(db, "users", state.auth.user.uid), { online: false },{ merge:true });
      await signOut(auth);
      window.location.reload();
      
    } catch (error) {
      console.log(error);
    }
  }
);


export const LoginUser  = createAsyncThunk('auth/LoginUser', async ({email,password}) => {

  try{
    
    const res = await signInWithEmailAndPassword(auth,email,password);
    await setDoc(doc(db,'users',res.user.uid),{online : true},{merge: true});

    return {res}

  }catch(error){
      return error
  }



})

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    ErrorHandler : (state) => {
      state.error = '';
    },

    AuthStateChange : (state,action) => {

      state.authIsReady = true;
      if(action.payload){
        state.user = action.payload;
      }

    }

  },

  extraReducers: {
    [SignupUser.pending]: (state) => {
      state.isPending = true;   
    },

    [SignupUser.fulfilled]: (state, action) => {
      state.isPending = false;
      state.user = action.payload.res.user;
    },

    [SignupUser.rejected]: (state) => {
      state.isPending = false;
      state.error =
        "Some kind of error occured. please check authSlicer-Signup";
    },

    [LogoutUser.pending]: (state) => {
      state.isPending = true;
    },

    [LogoutUser.fulfilled]: (state) => {
      // state.user = null;
      state.isPending = false;
    },
    [LogoutUser.rejected]: (state) => {
      state.isPending = false;
      state.error =
        "Some kind of error occured. please check authSlicer,Logout";
    },


    [LoginUser.pending]: (state) => {
      state.isPending = true;
    },

    [LoginUser.fulfilled]: (state,action) => {
  
    state.isPending = false;
    state.user = action.payload.res.user;
    },
    [LoginUser.rejected]: (state,action) => {
      state.isPending = false;
      if(action.payload.code){
        state.error = action.payload.code;
      }
    },


  

  },
});

export const { ErrorHandler,AuthStateChange  } = authSlice.actions;
export default authSlice.reducer;

