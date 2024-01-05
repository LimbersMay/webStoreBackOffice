import {
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from "firebase/auth";

import {FirebaseAuth} from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        const { displayName, email, uid } = result.user;

        return {
            ok: true,
            // User info
            displayName, email, uid
        }
    } catch (error: any) {
        console.log(error);

        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        }
    }
}

interface SignInLocalProps {
    displayName: string;
    email: string;
    password: string;
}

export const signInLocal = async({ displayName, email, password }: SignInLocalProps ) => {
    try {
        const res = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = res.user;

        if (FirebaseAuth.currentUser) {
            await updateProfile(FirebaseAuth.currentUser, {displayName});
        }

        return {
            ok: true,
            uid,
            photoURL,
            email,
            displayName
        }

    } catch (error: any) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

interface LoginLocalProps {
    email: string;
    password: string;
}

export const loginLocal = async({ email, password }: LoginLocalProps ) => {
    try {
        const res = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL, displayName } = res.user;

        return {
            ok: true,
            uid, photoURL, displayName, email
        }

    } catch ( error: any ){
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}