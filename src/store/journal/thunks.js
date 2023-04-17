import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNote, setSaving, updateNote } from "./journalSilce";
import { loadNotes } from "../../helpers/loadNotes";

export const startNewNote = () => {
    return async ( dispatch, getState ) => {

        dispatch(savingNewNote())

        const { uid } = getState().auth;

        const newNote = {
            title: 'a',
            body: 'a',
            date: new Date().getTime()
        }

        const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes`) )
        await setDoc( newDoc, newNote )

        newNote.id = newDoc.id

        dispatch( addNewEmptyNote(newNote) )
        dispatch( setActiveNote(newNote) )
    }   
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        if( !uid) throw new Error('El UID del usuario no existe')

        const notes = await loadNotes(uid)
        dispatch(setNote(notes))
    }
}

export const startSaveNote = () => {
    return async ( dispatch, getState ) => {

        dispatch(setSaving())

        const { uid } = getState().auth;

        const {active: note} = getState().journal;

        const noteToFireStore = {...note}
        delete noteToFireStore.id;
        (noteToFireStore.imageUrls) ? noteToFireStore.imageUrls : delete noteToFireStore.imageUrls;

        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${note.id}` )
        await setDoc( docRef, noteToFireStore, { merge: true } )

        dispatch(updateNote(note));

    }
}
