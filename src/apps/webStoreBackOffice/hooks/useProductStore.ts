import {collection, getDocs} from "firebase/firestore/lite";
import {selectAuth, useAppDispatch, useAppSelector} from "../store";
import {onSetActiveProduct, selectProduct, setProducts} from "../store/backOffice";
import {FirebaseDB} from "../firebase";


export const useProductStore = () => {

    const dispatch = useAppDispatch();
    const { products, activeProduct } = useAppSelector(selectProduct);
    const { uid } = useAppSelector(selectAuth);

    const setActiveArea = (product: Product | null) => {
        dispatch(onSetActiveProduct(product));
    }

    const startLoadingProducts = async () => {
        const collectionRef = collection(FirebaseDB, `${uid}/webstore/products`);
        const docs = await getDocs(collectionRef);

        const products: Product[] = [];

        docs.forEach(doc => {
            products.push({
                id: doc.id,
                ...doc.data()
            } as Product)
        });

        dispatch(setProducts(products));
    }

    return {
        // Properties
        products,
        activeProduct,


        // Methods
        startLoadingProducts,
        setActiveArea
    }
}
