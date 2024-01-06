import {collection, doc, getDocs, setDoc, deleteDoc, updateDoc } from "firebase/firestore/lite";
import {
    deleteProduct,
    onSetActiveProduct,
    selectProduct,
    setProduct,
    setProducts,
    selectAuth,
    useAppDispatch,
    useAppSelector, updateProduct
} from "../store";
import {FirebaseDB} from "../firebase";
import NiceModal from "@ebay/nice-modal-react";
import CreateProductModal from "../backoffice/components/modals/CreateProductModal.tsx";
import {getDirtyValues} from "../helpers";


export const useProductStore = () => {

    const dispatch = useAppDispatch();
    const { products, activeProduct: product } = useAppSelector(selectProduct);
    const { uid } = useAppSelector(selectAuth);

    const setActiveProduct = (product: Product | null) => {
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

    const startCreatingProduct = async () => {
        const product = await  NiceModal.show(CreateProductModal, {
            action: 'Create',
            product: {
                title: '',
                description: '',
                imageURL: '',
                price: 0,
                stock: 0
            }
        }) as Product;

        // If the user cancels the modal, product will not continue

        const newDoc = doc(collection(FirebaseDB, `${uid}/webstore/products`))
        await setDoc(newDoc, product);

        product.id = newDoc.id;

        // dispatch
        dispatch(setProduct(product));
    }

    const startUpdatingProduct = async ( product: Product ) => {
        const productResult = await  NiceModal.show(CreateProductModal, {
            action: 'Update',
            product: product!,
        }) as Product;

        const dirtyValues = getDirtyValues<Product>(productResult, product!);

        if (Object.keys(dirtyValues).length == 0) return;

        dirtyValues.id = product?.id;

        // If the user cancels the modal, product will not continue
        const docRef = doc(FirebaseDB, `${uid}/webstore/products/${dirtyValues.id}`);
        await updateDoc(docRef, { ...dirtyValues });

        dispatch(updateProduct(dirtyValues));
    }

    const startDeletingProduct = async (id: string) => {
        const docRef = doc(FirebaseDB, `${uid}/webstore/products/${id}`);
        await deleteDoc(docRef);

        dispatch(deleteProduct(id));
    }

    return {
        // Properties
        products,
        activeProduct: product,


        // Methods
        startLoadingProducts,
        startCreatingProduct,
        startDeletingProduct,
        startUpdatingProduct,
        setActiveProduct
    }
}
