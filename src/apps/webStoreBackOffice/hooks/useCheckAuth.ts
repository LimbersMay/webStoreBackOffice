import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {onAuthStateChanged} from "firebase/auth";
import {FirebaseAuth} from "../firebase/config";
import {login, logout, selectAuth, useAppSelector} from "../store";


export const useCheckAuth = () => {

    const { status } = useAppSelector(selectAuth);
    const dispatch = useDispatch();

    useEffect(() => {

        onAuthStateChanged(FirebaseAuth, async(user) => {
            if (!user) return dispatch(logout(null));

            const { uid, email, displayName } = user;

            dispatch(login({ uid, email, displayName }));
        });

    }, []);

    return status
}
