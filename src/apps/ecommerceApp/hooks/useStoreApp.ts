import {
    useAppSelector,
    selectStore,
    FirebaseDB,
    useAppDispatch,
    Category,
    setStoreProducts, setStoreCategories
} from "../../webStoreBackOffice";
import {collection, getDocs} from "firebase/firestore/lite";
import {Product} from "../../webStoreBackOffice";

export const useStoreApp = () => {

    const { storeProducts, storeCategories } = useAppSelector(selectStore);
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

    return {
        // Properties
        storeProducts,
        storeCategories,

        // Methods
        startLoadingStoreProducts,
        startLoadingStoreCategories
    }
}