import {
    useAppSelector,
    selectStore,
    FirebaseDB,
    useAppDispatch,
    Category,
    setStoreProducts, setStoreCategories, StoreSettings, setStoreConfiguration
} from "../../webStoreBackOffice";
import {collection, getDocs} from "firebase/firestore/lite";
import {Product} from "../../webStoreBackOffice";

export const useStoreApp = () => {

    const { storeProducts, storeCategories, storeConfiguration } = useAppSelector(selectStore);
    const dispatch = useAppDispatch();

    const startLoadingStoreProducts = async (storeId: string) => {

        const collectionRef = collection(FirebaseDB, `${storeId}/webstore/products`);
        const docs = await getDocs(collectionRef);

        const products: Product[] = [];

        docs.forEach(doc => {

            products.push({
                id: doc.id,
                ...doc.data()
            } as Product)
        });

        dispatch(setStoreProducts(products));
    }

    const startLoadingStoreCategories = async (storeId: string) => {

            const collectionRef = collection(FirebaseDB, `${storeId}/webstore/categories`);
            const docs = await getDocs(collectionRef);

            const categories: Category[] = [];

            docs.forEach(doc => {

                categories.push({
                    id: doc.id,
                    ...doc.data()
                } as Category)
            });

            dispatch(setStoreCategories(categories));
    }

    const startLoadingStoreSettings = async (userId: string) => {
        const collectionRef = collection(FirebaseDB, `${userId}/webstore/store`);
        const doc = await getDocs(collectionRef);

        const storeSettings = {
            id: doc.docs[0].id,
            ...doc.docs[0].data()
        } as StoreSettings;

        dispatch(setStoreConfiguration(storeSettings));
    }

    return {
        // Properties
        storeProducts,
        storeCategories,
        ...storeConfiguration,

        // Methods
        startLoadingStoreProducts,
        startLoadingStoreCategories,
        startLoadingStoreSettings
    }
}