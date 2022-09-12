import {configureStore} from '@reduxjs/toolkit';
import authReducer from './features/authSlicer';
import handleDataReducer from './features/handleDataSlice'



export const store = configureStore({

    reducer : {
        auth : authReducer,
        handleData : handleDataReducer,
    },



    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    
   
})