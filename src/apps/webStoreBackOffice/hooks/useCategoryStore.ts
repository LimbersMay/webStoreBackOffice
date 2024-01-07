import {collection, doc, getDocs, setDoc, deleteDoc, updateDoc } from "firebase/firestore/lite";
import {
    selectAuth,
    useAppDispatch,
    useAppSelector, selectCategory, setCategories, setCategory, updateCategory, deleteCategory
} from "../store";
import {FirebaseDB} from "../firebase";
import NiceModal from "@ebay/nice-modal-react";
import {getDirtyValues} from "../helpers";
import {Category, Product} from "../types";
import CategoryModal from "../components/modals/CategoryModal";


export const useCategoryStore = () => {

    const dispatch = useAppDispatch();
    const { categories } = useAppSelector(selectCategory);
    const { uid } = useAppSelector(selectAuth);

    const startLoadingCategories = async () => {
        const collectionRef = collection(FirebaseDB, `${uid}/webstore/categories`);
        const docs = await getDocs(collectionRef);

        const categories: Category[] = [];

        docs.forEach(doc => {
            categories.push({
                id: doc.id,
                ...doc.data()
            } as Category)
        });

        dispatch(setCategories(categories));
    }

    const startCreatingCategory = async () => {
        const category = await  NiceModal.show(CategoryModal, {
            action: 'Create',
            category: {
                title: '',
                description: ''
            }
        }) as Category;

        // If the user cancels the modal, product will not continue

        const newDoc = doc(collection(FirebaseDB, `${uid}/webstore/categories`))
        await setDoc(newDoc, category);

        category.id = newDoc.id;

        // dispatch
        dispatch(setCategory(category));
    }

    const startUpdatingCategory = async ( category: Category ) => {
        const productResult = await  NiceModal.show(CategoryModal, {
            action: 'Update',
            category: category,
        }) as Category;

        const dirtyValues = getDirtyValues<Product>(productResult, category);

        if (Object.keys(dirtyValues).length == 0) return;

        dirtyValues.id = category.id;

        // If the user cancels the modal, product will not continue
        const docRef = doc(FirebaseDB, `${uid}/webstore/categories/${dirtyValues.id}`);
        await updateDoc(docRef, { ...dirtyValues });

        dispatch(updateCategory(dirtyValues));
    }

    const startDeletingCategory = async (id: string) => {
        const docRef = doc(FirebaseDB, `${uid}/webstore/categories/${id}`);
        await deleteDoc(docRef);

        dispatch(deleteCategory(id));
    }

    return {
        // Properties
        categories,

        // Methods
        startLoadingCategories,
        startCreatingCategory,
        startUpdatingCategory,
        startDeletingCategory
    }
}
