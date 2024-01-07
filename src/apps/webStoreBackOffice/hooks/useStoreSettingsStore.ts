import {collection, doc, getDocs, updateDoc} from "firebase/firestore/lite";
import NiceModal from "@ebay/nice-modal-react";
import {FirebaseDB} from "../firebase";
import {
    selectAuth,
    setStoreSettings,
    useAppDispatch,
    selectStoreSettings,
    useAppSelector, updateStoreSettings
} from "../store";
import {StoreSettings} from "../types";
import {getDirtyValues, uploadImageToFirebase2} from "../helpers";
import StoreSettingsModal, {StoreDTO} from "../components/modals/StoreSettingsModal";

export const useStoreSettingsStore = () => {

    const { uid } = useAppSelector(selectAuth);
    const { id, title, bannerURL, logoURL, description, phoneNumber, bannerName, logoName } = useAppSelector(selectStoreSettings);

    const dispatch = useAppDispatch();

    const startLoadingStoreSettings = async () => {
        const collectionRef = collection(FirebaseDB, `${uid}/webstore/store`);
        const doc = await getDocs(collectionRef);

        if (doc.docs.length == 0) return;

        const storeSettings = {
            id: doc.docs[0]?.id,
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
        if (dirtyValues.logo) {
            // First, we remove the old image
            const response = await uploadImageToFirebase2({
                oldImageName: storeSettings.logoName,
                image: dirtyValues.logo,
                userId: `${uid}`
            })

            dirtyValues.logoURL = response.imageURL;
            dirtyValues.logoName = response.imageName;
        }

        // If you want to update the banner, we need to upload it to Firebase Storage
        if (dirtyValues.banner) {
            // First, we remove the old image
            const response = await uploadImageToFirebase2({
                oldImageName: storeSettings.bannerName,
                image: dirtyValues.banner,
                userId: `${uid}`
            })

            dirtyValues.bannerURL = response.imageURL;
            dirtyValues.bannerName = response.imageName;
        }

        delete dirtyValues.logo;
        delete dirtyValues.banner;

        dirtyValues.id = storeSettings?.id;
        console.log(dirtyValues)

        // If the user cancels the modal, product will not continue
        const docRef = doc(FirebaseDB, `${uid}/webstore/store/${dirtyValues.id}`);
        await updateDoc(docRef, { ...dirtyValues });

        dispatch(updateStoreSettings(dirtyValues));
    }

    return {
        // Properties
        id,
        title,
        bannerURL,
        logoURL,
        description,
        phoneNumber,
        bannerName,
        logoName,

        // Methods
        startLoadingStoreSettings,
        startUpdatingStoreSettings,
    }
}