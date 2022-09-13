import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase/config";
import { collection, addDoc, setDoc, doc, deleteDoc } from "firebase/firestore";

const initialState = {
  documents: null,
  isPending: false,
  error: null,
  success: null,

  projectDocuments: [],

  filteredProjectDocuments: [],

  filter: "all",
};

export const updateDocument = createAsyncThunk(
  "handleData/updateDocument",
  async (data) => {
    try {
      const ref = doc(db, data.name, data.id);
      await setDoc(
        ref,
        {
          comments: [...data.prevComment, data.data],
        },
        { merge: true }
      );
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteDocument = createAsyncThunk(
  "handleData/deleteDocument",
  async (data) => {
    try {
      await deleteDoc(doc(db, data.name, data.id));
    } catch (error) {
      console.log(error);
    }
  }
);

export const addDocument = createAsyncThunk(
  "handleData/addDocument",
  async (payload) => {
    try {
      const ref = collection(db, payload.name);
      await addDoc(ref, payload.data);
    } catch (error) {
      console.log(error);
    }
  }
);

export const changeFilter = createAsyncThunk(
  "handleData/changeFilter",
  async (filter, { getState }) => {
    const state = getState();

    const filteredProject = state.handleData.projectDocuments.filter(
      (document) => {
        switch (filter) {
          case "all":
            return true;

          case "mine":
            let assignedToMe = false;
            document.assignedUsersList.forEach((u) => {
              if (u.id === state.auth.user.uid) {
                assignedToMe = true;
              }
            });
            return assignedToMe;

          case "design":
          case "development":
          case "sales":
          case "marketing":
            return document.category === filter;

          default:
            return true;
        }
      }
    );

    return { filteredProject, filter };
  }
);

export const handleDataSlice = createSlice({
  name: "handleData",
  initialState,
  reducers: {
    getCollection: (state, action) => {
      state.documents = action.payload;
    },

    setSuccess: (state) => {
      state.success = false;
    },

    fetchProjects: (state, action) => {
      state.projectDocuments = action.payload;
    },
  },

  extraReducers: {
    [addDocument.pending]: (state) => {
      state.isPending = true;
      state.success = false;
    },
    [addDocument.fulfilled]: (state) => {
      state.isPending = false;
      state.success = true;
    },
    [addDocument.rejected]: (state, action) => {
      state.isPending = false;
      state.success = false;
      state.error = "Unable to post Data";
    },
    [updateDocument.pending]: (state) => {
      console.log("updaing document pending");
    },
    [updateDocument.fulfilled]: (state) => {
      console.log("updaing document fulfilled");
    },
    [updateDocument.rejected]: (state) => {
      console.log("updaing document rejected");
    },

    [deleteDocument.pending]: (state) => {
      console.log("deleting document pending");
    },
    [deleteDocument.fulfilled]: (state) => {
      console.log("deleting document fulfilled");
    },
    [deleteDocument.rejected]: (state) => {
      console.log("deleting document rejected");
    },

    [changeFilter.pending]: (state) => {
      console.log("change filter pending");
    },
    [changeFilter.fulfilled]: (state, action) => {
      state.filteredProjectDocuments = action.payload.filteredProject;
      state.filter = action.payload.filter;
    },
    [changeFilter.rejected]: (state) => {
      console.log("deleting document rejected");
    },
  },
});

export const { getCollection, setSuccess, fetchProjects } =
  handleDataSlice.actions;
export default handleDataSlice.reducer;
