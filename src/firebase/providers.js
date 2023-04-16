
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();


export const singInWithGoogle = async () => {

    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        const { displayName, email, photoURL, uid } = result.user;
        console.log(displayName);
        console.log(displayName);
        console.log(displayName);
        return {
            success: true,
            displayName, 
            email, 
            photoURL, 
            uid 
        }

    } catch (error) {
        console.log(error);
        const errorCode = error.code;
        const errorMessages = error.message;
        return {
            success: false,
            errorMessages
        }

    }
}

export const registerUserWithEmailPassword = async ({email, password, displayName}) => {
    try {

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL } = resp.user;
        console.log(resp);

        //TODO: ACTUALIZAR EL DisplayName
        await updateProfile( FirebaseAuth.currentUser, {
            displayName
        } );


        return {
            success: true,
            displayName, 
            email, 
            photoURL, 
            uid 
        }

    } catch (error) {
        return {
            success: false,
            errorMessage: error.message
        }
    }

}

export const loginWithEmailPassword = async ({ email, password }) => {

    try {
        
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL, displayName } = resp.user;
        return {
            success: true,
            displayName, 
            email, 
            photoURL, 
            uid 
        }

    } catch (error) {
        return {
            success: false,
            errorMessage: error.message
        }
    }
}

export const logoutFirebase = async () => {

    return await FirebaseAuth.signOut();

}
