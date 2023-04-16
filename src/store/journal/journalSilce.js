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
    },
    setNote: (state, action) => {
        state.notes = action.payload
    },
    setSaving: (state) => {

    },
    updateNote: (state, action) => {

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
 } = journalSlice.actions
