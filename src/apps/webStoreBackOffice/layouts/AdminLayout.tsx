import {ReactElement, useEffect} from "react";
import {useProductStore} from "../hooks";
import {BaseLayout} from "./";
import {useCategoryStore} from "../hooks/useCategoryStore.ts";

export const AdminLayout = ({ children }: { children: ReactElement }) => {
    const navLinks = [
        {
            name: "Productos",
            path: "/products"
        },
        {
            name: "Categorías",
            path: "/categories"
        }
    ]

    const { startLoadingProducts } = useProductStore();
    const { startLoadingCategories } = useCategoryStore();

    useEffect(() => {
        (async () => {
            await startLoadingCategories();
            await startLoadingProducts();
        })()
    }, []);

    return (
        <BaseLayout navLinks={navLinks}>
            {children}
        </BaseLayout>
    )
}