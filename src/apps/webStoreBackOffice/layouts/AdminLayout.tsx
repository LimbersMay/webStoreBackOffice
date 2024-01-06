import {ReactElement, useEffect} from "react";
import {useProductStore} from "../hooks";
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
        }
    ]

    const { startLoadingProducts } = useProductStore();
    useEffect(() => {
        (async () => {
            await startLoadingProducts();
        })()
    }, []);

    return (
        <BaseLayout navLinks={navLinks}>
            {children}
        </BaseLayout>
    )
}