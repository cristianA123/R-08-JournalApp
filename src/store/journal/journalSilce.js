import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isSaving: false,
  messageSaved: '',
  notes: [],
  active: {
    // id: 'ABC123',
    // title: 'nuevo',
    // body: '',
    // date: '123456',
    // imageUrls: [],
  }
}

export const journalSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    savingNewNote: (state, action) => {
        state.isSaving = true
    },

    addNewEmptyNote: (state, action) => {

        state.notes.push( action.payload );
        state.isSaving = false
    },
    setActiveNote: (state, action) => {
        state.active = action.payload
        state.messageSaved = ``;
    },
    setNote: (state, action) => {
        state.notes = action.payload
    },
    setSaving: (state) => {
      state.isSaving = true
      state.messageSaved = ``;

    },
    updateNote: (state, {payload}) => {

      state.isSaving = false;
      state.notes = state.notes.map( note => {

        if ( note.id === action.payload.id ) {
            return action.payload;
        }

        return note;
      })

      state.messageSaved = `${payload.title}, actualizada correctamente`;

    },

    setPhotosToActiveNote: ( state, action ) => {

      state.active.imageUrls = [ ...state.active?.imageUrls, ...action.payload ];
      state.isSaving = false;

    },

    deleteNodeById: (state, action) => {

    },
   
  },
})


export const {  
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNote,
    setSaving,
    updateNote,
    deleteNodeById,
    setPhotosToActiveNote
 } = journalSlice.actions
