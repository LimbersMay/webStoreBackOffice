import {ReactElement, useEffect} from "react";
import {useProductStore, useCategoryStore, useStoreSettingsStore} from "../hooks";
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
    const { startLoadingStoreSettings } = useStoreSettingsStore();

    useEffect(() => {
        (async () => {
            await startLoadingCategories();
            await startLoadingProducts();
            await startLoadingStoreSettings();
        })()
    }, []);

    return (
        <BaseLayout navLinks={navLinks}>
            {children}
        </BaseLayout>
    )
}