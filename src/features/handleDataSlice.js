import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { db } from "../firebase/config";
import { useDispatch } from 'react-redux';
import {
  collection,
  onSnapshot,
  addDoc
} from "firebase/firestore";

const initialState = {


    documents : null,
    isPending : false,
    error : null,
    success : null,

}

export const addDocument = createAsyncThunk("handleData/addDocument",async (payload,{getState}) => {

        try{
            const ref = collection(db,payload.name);
             await addDoc(ref,payload.data);
         
        }
        catch(error){
            console.log(error)
        }
    
})


export const handleDataSlice = createSlice({
    name : 'handleData',
    initialState,
    reducers : {

        getCollection : (state,action ) => {
            state.documents = action.payload;
        },

        setSuccess : (state) => {
            state.success = false;
        }

   
    },

    extraReducers : {
        [addDocument.pending] : (state) => {
            state.isPending = true;
            state.success = false;
        },
        [addDocument.fulfilled] : (state) => {
            state.isPending = false;
            state.success = true;
        },
        [addDocument.rejected] : (state,action) => {
            state.isPending = false;
            state.success = false;
            state.error = 'Unable to post Data';
        },
    }

});


export const {getCollection,setSuccess} = handleDataSlice.actions;
export default handleDataSlice.reducer;

// addDocument : (state,{payload}) => {
//     state.isPending = true;
//     const ref = collection(db,payload.name);
//     try{
//         addDoc(ref,payload.data);
//         state.isPending = false;
//     }
//     catch(error){
//         state.error = error;
//     }
// },