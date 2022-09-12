import {configureStore} from '@reduxjs/toolkit';
import authReducer from './features/authSlicer';
import getDataReducer from './features/getDataSlice'



export const store = configureStore({

    reducer : {
        auth : authReducer,
        getData : getDataReducer,
    },



    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    
   
})