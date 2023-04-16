import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers"
import { checkingCredentials, login, logout } from "./authSlice"


export const checkingAuthentication = ( email, password ) => {

    return async ( dispatch ) => {

        dispatch(checkingCredentials())

    }

}

export const startGoogleSignIn = () => {

    return async ( dispatch ) => {

        dispatch(checkingCredentials())
        const result = await singInWithGoogle()
        
        if ( !result.success ) return dispatch(logout(result.errorMessage))
        
        dispatch( login( result ) )

    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async ( dispatch ) => {

        dispatch(checkingCredentials());
        const {success, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({ email, password, displayName });
        
        if ( !success ) return dispatch( logout({ errorMessage }) )

        dispatch( login({ uid, displayName, email, photoURL }));

    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async ( dispatch ) => {

        dispatch(checkingCredentials());
        const {success, uid, photoURL, errorMessage, displayName} = await loginWithEmailPassword({ email, password });
        
        if ( !success ) return dispatch( logout({ errorMessage }) )

        dispatch( login({ uid, email, photoURL, displayName }));

    }
}


export const startLogout = () => {
    return async ( dispatch ) => {

       await logoutFirebase()
       dispatch(logout())
    }
}
