import {ReactElement} from "react";

import {BaseLayout} from "./BaseLayout";

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

    return (
        <BaseLayout navLinks={navLinks}>
            {children}
        </BaseLayout>
    )
}