import {
    checkingCredentials,
    login,
    logout,
    selectAuth,
    setCategories,
    setProducts, setStoreSettings,
    useAppDispatch,
    useAppSelector
} from "../store";
import {loginLocal, logoutFirebase, signInLocal, signInWithGoogle} from "../firebase";
import {authStatusTypes} from "../auth/types";


interface CreatingUserProps {
    displayName: string;
    email: string;
    password: string;
}

export const useAuthStore = () => {

    const {uid, displayName, email} = useAppSelector(selectAuth);

    const dispatch = useAppDispatch();

    const startGoogleSignIn = async () => {
        dispatch(checkingCredentials());

        const result = await signInWithGoogle();

        if (!result.ok) return dispatch(logout( result.errorMessage ));

        return dispatch(login({
            uid: result.uid,
            displayName: result.displayName,
            email: result.email,
            status: authStatusTypes.authenticated
        }))
    }

    const startCreatingUser = async ({displayName, email, password}: CreatingUserProps) => {

        const { ok, uid, errorMessage } = await signInLocal({ displayName, email, password });

        console.log({ok, uid, errorMessage})

        if (!ok) return dispatch(logout( errorMessage ));

        dispatch(login({uid, displayName, email }));
    }

    const startLoginUser = async (email: string, password: string) => {
        dispatch(checkingCredentials());

        const { ok, uid, displayName, errorMessage } = await loginLocal({email, password});

        if (!ok) return dispatch(logout( errorMessage));

        // Assert uid and displayName are not null
        if (uid && displayName)
            dispatch(login({uid, displayName, email }));
    }

    const startLogout = async () => {
        dispatch(checkingCredentials());

        await logoutFirebase();

        // Clean the store
        dispatch(logout(null));
        dispatch(setProducts([]));
        dispatch(setCategories([]));
        dispatch(setStoreSettings({
            id: '',
            title: 'Default',
            description: 'Default description',
            bannerURL: 'https://s3.amazonaws.com/thumbnails.venngage.com/template/19fb13e4-a435-4bae-9bbf-ff1ed161cb31.png',
            logoURL: 'https://icon-library.com/images/products-icon/products-icon-25.jpg',
            phoneNumber: '9991112223',
            bannerName: '',
            logoName: '',
        }));
    }

    return {
        // properties
        uid,
        displayName,
        email,

        // methods
        startGoogleSignIn,
        startCreatingUser,
        startLoginUser,
        startLogout
    }
}
