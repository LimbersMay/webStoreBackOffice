import {AdminLayout} from "../layouts";
import {useCategoryStore} from "../hooks";
import {CategoryRow, CrudTable} from "../components";

export const Categories = () => {

    const headers = [
        "ID",
        "Nombre",
        "Descripción",
        "Acciones"
    ]

    const { categories, startCreatingCategory } = useCategoryStore();

    return (
        <AdminLayout>
            <div className="p-10">
                <h1 className="text-4xl font-bold text-neutral-900">
                    Categorias
                </h1>

                <button
                    className="mt-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                    onClick={startCreatingCategory}
                >
                    Crear Categoria
                </button>

                <CrudTable headers={headers}>
                    {
                        categories.map((category) => (
                            <CategoryRow key={category.id} {...category} />
                        ))
                    }
                </CrudTable>
            </div>
        </AdminLayout>
    )
}