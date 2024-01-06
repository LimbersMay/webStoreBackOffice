import {AdminLayout} from "../../layouts";

export const Categories = () => {

    return (
        <AdminLayout>
            <div className="p-10">
                <h1 className="text-4xl font-bold text-neutral-900">
                    Categorias
                </h1>

                <button className="px-4 py-2 mt-4 text-white bg-green-500 rounded hover:bg-green-600">
                    Crear Categoria
                </button>

            </div>
        </AdminLayout>
    )
}