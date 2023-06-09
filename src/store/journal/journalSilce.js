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
    updateNote: (state, action) => {

      state.isSaving = false;
      state.notes = state.notes.map( note => {

        if ( note.id === action.payload.id ) {
            return action.payload;
        }

        return note;
      })

      state.messageSaved = `${action.payload.title}, actualizada correctamente`;

    },

    setPhotosToActiveNote: ( state, action ) => {

      state.active.imageUrls = [ ...state.active?.imageUrls, ...action.payload ];
      state.isSaving = false;

    },

    clearNotesLogout: (state) => {

      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.active = null;

    },

    deleteNoteById: (state, action) => {

      // 1. forma mas larga de eliminar
      // state.active = null;
      // const indice = state.notes.findIndex( note => note.id === action.payload )
      // state.notes.splice(indice, 1)

      // 2. forma mas corta de eliminar
      state.active = null;
      state.notes = state.notes.filter( note => note.id !== action.payload)

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
    deleteNoteById,
    setPhotosToActiveNote,
    clearNotesLogout
 } = journalSlice.actions
