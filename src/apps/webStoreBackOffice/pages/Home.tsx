import {AdminLayout} from "../layouts";

export const Home = () => {

    return (
        <AdminLayout>
            <div className="flex flex-col items-center justify-center p-10">

                <h1 className={"text-4xl text-neutral-900"}>
                    Administración de la tienda online
                </h1>
            </div>
        </AdminLayout>
    )
}