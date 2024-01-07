import {selectAuth, setStoreSettings, useAppDispatch, useAppSelector} from "../store";
import {selectStoreSettings} from "../store";
import {collection, getDocs} from "firebase/firestore/lite";
import {FirebaseDB} from "../firebase";
import {StoreSettings} from "../types";

export const useStoreSettings = () => {

    const { uid } = useAppSelector(selectAuth);
    const { id, title, bannerURL, logoURL, description, phoneNumber } = useAppSelector(selectStoreSettings);

    const dispatch = useAppDispatch();

    const startLoadingStoreSettings = async () => {
        const collectionRef = collection(FirebaseDB, `${uid}/webstore/store`);
        const doc = await getDocs(collectionRef);

        const storeSettings = {
            id: doc.docs[0].id,
            ...doc.docs[0].data()
        } as StoreSettings;

        dispatch(setStoreSettings(storeSettings));
    }

    return {
        // Properties
        id,
        title,
        bannerURL,
        logoURL,
        description,
        phoneNumber,

        // Methods
        startLoadingStoreSettings,
    }
}