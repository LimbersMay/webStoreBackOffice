import {collection, doc, getDocs, setDoc, updateDoc} from "firebase/firestore/lite";
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

        // If the user cancels the modal, product will not continue
        const docRef = doc(FirebaseDB, `${uid}/webstore/store/${dirtyValues.id}`);
        await updateDoc(docRef, { ...dirtyValues });

        dispatch(updateStoreSettings(dirtyValues));
    }

    const initStoreSettings = async (userId: string) => {

        const storeSettings = {
            title: 'Default',
            description: 'Default description',
            bannerURL: 'https://s3.amazonaws.com/thumbnails.venngage.com/template/19fb13e4-a435-4bae-9bbf-ff1ed161cb31.png',
            logoURL: 'https://icon-library.com/images/products-icon/products-icon-25.jpg',
            phoneNumber: '9991112223',
            bannerName: '',
            logoName: '',
        }as StoreSettings;

        const newDoc = doc(collection(FirebaseDB, `${userId}/webstore/store`));
        await setDoc(newDoc, storeSettings);

        console.log(newDoc)

        storeSettings.id = newDoc.id;

        // dispatch
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
        bannerName,
        logoName,

        // Methods
        startLoadingStoreSettings,
        startUpdatingStoreSettings,
        initStoreSettings
    }
}