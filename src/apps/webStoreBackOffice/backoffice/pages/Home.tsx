import {AdminLayout} from "../../layouts/AdminLayout.tsx";

export const Home = () => {

    return (
        <AdminLayout>
            <div className="flex p-10 flex-col items-center justify-center">

                <h1 className={"text-4xl text-neutral-900"}>
                    Administración de la tienda online
                </h1>
            </div>
        </AdminLayout>
    )
}