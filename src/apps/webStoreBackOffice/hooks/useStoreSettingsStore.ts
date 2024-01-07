import {collection, doc, getDocs, updateDoc} from "firebase/firestore/lite";
import NiceModal from "@ebay/nice-modal-react";
import {FirebaseDB} from "../firebase";
import {selectAuth, setStoreSettings, updateProduct, useAppDispatch, selectStoreSettings, useAppSelector} from "../store";
import {StoreSettings} from "../types";
import {getDirtyValues, removeImageFromFirebase, uploadImageToFirebase} from "../helpers";
import StoreSettingsModal, {StoreDTO} from "../components/modals/StoreSettingsModal";

export const useStoreSettingsStore = () => {

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

    const startUpdatingStoreSettings = async ( storeSettings: StoreSettings ) => {

        const productResult = await  NiceModal.show(StoreSettingsModal, {
            action: 'Update',
            storeSettings: storeSettings!,
        }) as StoreDTO;

        const dirtyValues = getDirtyValues<StoreDTO>(productResult, storeSettings!);

        if (Object.keys(dirtyValues).length == 0) return;

        // If you want to update the logo, we need to upload it to Firebase Storage
        if (dirtyValues.logoURL && dirtyValues.logo) {
            // First, we remove the old image
            await removeImageFromFirebase(storeSettings.logoName, `${uid}`);
            const response = await uploadImageToFirebase(dirtyValues.logo, `${uid}`);

            dirtyValues.logoURL = response.imageURL;
            dirtyValues.logoName = response.imageName;
        }

        // If you want to update the banner, we need to upload it to Firebase Storage
        if (dirtyValues.bannerURL && dirtyValues.banner) {
            // First, we remove the old image
            await removeImageFromFirebase(storeSettings.bannerName, `${uid}`);
            const response = await uploadImageToFirebase(dirtyValues.banner, `${uid}`);

            dirtyValues.bannerURL = response.imageURL;
            dirtyValues.bannerName = response.imageName;
        }

        delete dirtyValues.logo;
        delete dirtyValues.banner;

        dirtyValues.id = storeSettings?.id;

        // If the user cancels the modal, product will not continue
        const docRef = doc(FirebaseDB, `${uid}/webstore/products/${dirtyValues.id}`);
        await updateDoc(docRef, { ...dirtyValues });

        dispatch(updateProduct(dirtyValues));
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
        startUpdatingStoreSettings,
    }
}