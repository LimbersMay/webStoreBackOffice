import {collection, deleteDoc, doc, getDocs, setDoc, updateDoc} from "firebase/firestore/lite";
import {
    deleteProduct,
    selectAuth,
    selectProduct,
    setProduct,
    setProducts,
    updateProduct,
    useAppDispatch,
    useAppSelector
} from "../store";
import {FirebaseDB} from "../firebase";
import NiceModal from "@ebay/nice-modal-react";
import ProductModal from "../components/modals/ProductModal.tsx";
import {removeImageFromFirebase, uploadImageToFirebase, getDirtyValues} from "../helpers";
import {Product} from "../types";


export const useProductStore = () => {

    const dispatch = useAppDispatch();
    const { products } = useAppSelector(selectProduct);
    const { uid } = useAppSelector(selectAuth);

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
        const product = await  NiceModal.show(ProductModal, {
            action: 'Create',
            product: {
                title: '',
                description: '',
                categoryId: '',
                imageURL: '',
                price: 0,
                stock: 0,
                imageName: '',
            }
        }) as Product;

        // If the user cancels the modal, product will not continue
        // First, we upload the image to Firebase Storage

        if (product.image) {
            const response = await uploadImageToFirebase(product.image, `${uid}`);

            product.imageURL = response.imageURL;
            product.imageName = response.imageName;
        }

        delete product.image;

        const newDoc = doc(collection(FirebaseDB, `${uid}/webstore/products`))
        await setDoc(newDoc, product);

        product.id = newDoc.id;

        // dispatch
        dispatch(setProduct(product));
    }

    const startUpdatingProduct = async ( product: Product ) => {
        const productResult = await  NiceModal.show(ProductModal, {
            action: 'Update',
            product: product!,
        }) as Product;

        const dirtyValues = getDirtyValues<Product>(productResult, product!);

        if (Object.keys(dirtyValues).length == 0) return;

        // If you want to update the image, we need to upload it to Firebase Storage
        if (dirtyValues.image) {
            // First, we remove the old image
            await removeImageFromFirebase(product.imageName, `${uid}`);
            const response = await uploadImageToFirebase(dirtyValues.image, `${uid}`);

            dirtyValues.imageURL = response.imageURL;
            dirtyValues.imageName = response.imageName;
        }

        delete dirtyValues.image;

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

        // Methods
        startLoadingProducts,
        startCreatingProduct,
        startDeletingProduct,
        startUpdatingProduct,
    }
}
