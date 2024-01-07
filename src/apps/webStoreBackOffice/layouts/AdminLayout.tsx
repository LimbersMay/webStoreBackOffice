import {ReactElement, useEffect} from "react";
import {useProductStore, useCategoryStore} from "../hooks";
import {BaseLayout} from "./";

export const AdminLayout = ({ children }: { children: ReactElement }) => {

    const navLinks = [
        {
            name: "Productos",
            path: "/products"
        },
        {
            name: "Categorías",
            path: "/categories"
        },
        {
            name: "Tienda",
            path: `/store-config`
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