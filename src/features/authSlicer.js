import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user : null,
    authIsReady :  false,
}

export const authSlice = createSlice({
    name : 'auth',
    initialState,

    reducers : {

    }
})

// export const {functions...} = authSlice.actions;
export default authSlice.reducer;