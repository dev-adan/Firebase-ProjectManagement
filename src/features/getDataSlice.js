import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import { db } from "../firebase/config";
import {collection,onSnapshot,query, where,orderBy  } from 'firebase/firestore';



const initialState = {

    documents : [],
    error : '',
    isPending : false,

}

export const getCollection = createAsyncThunk('getDataSlice/getCollection', async (collectionName,thunkAPI) => {
       
 let results = []

 const getDate = () => {

    return new Promise((resolve,reject) => {

   
        let ref =  collection(db,collectionName);
            onSnapshot(ref,(refSnapshot) => {
                refSnapshot.forEach(doc => results.push({id : doc.id, ...doc.data()}));

                const error = false;
                if(!error){
                    resolve();
                }else{
                    reject('there is som,e eerror')
                }
                
    
    })
    
    
    })

 }

 getDate().then(getResults(results))

      
         
    
    
})

export const getResults = createAsyncThunk('getDataSlice/getCollection', async (_,data) => {
    console.log('data',data)
    return data

})

export const getDataSlice = createSlice({
    name : 'getData',
    initialState,
    reducers : {




        // getCollection : (state,action) =>  {

        // }
    },

    extraReducers : {
        [getCollection.pending] : (state) => {
            state.isPending = true;
            console.log('pending running')

        },

        [getCollection.fulfilled] : (state,action) => {
            state.isPending = false;
          
            console.log(action.payload)
            console.log('fulfilled')
           

        },

        [getCollection.rejected] : (state,action) => {
            state.isPending = false;
            state.error = action.payload;
            console.log('error')


        },

        [getResults.pending] : (state) => {
           console.log('get results pending')

        },

        [getResults.fulfilled] : (state,action) => {
          
           console.log('get results',action)

        },

        [getResults.rejected] : (state,action) => {
            


        },

    }
});


// export const {getCollection} = getDataSlice.actions;
export default getDataSlice.reducer;



// let results= []

// const datafetch = () => {

// console.log(results)

// }


// let getPromise = () => {
    
//     return new Promise((resolve,reject) => {
        
//         let ref =  collection(db,action.payload);
// onSnapshot(ref,(refSnapshot) => {
//     refSnapshot.forEach(doc => results.push({id : doc.id, ...doc.data()}));

//     const error =false;

//     if(!error){
//         resolve();
//     }else{
//         reject('Some-Thing went wrong')
//     }

//     })
                
//             })

// }


// getPromise.then(datafetch).catch(error => console.log(error))