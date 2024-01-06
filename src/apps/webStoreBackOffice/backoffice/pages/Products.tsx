import {AdminLayout} from "../../layouts";
import {useProductStore} from "../../hooks";
import {CrudTable, RoleRow} from "../components";

export const Products = () => {

    const headers = [
        'ID',
        'Título',
        'Descripción',
        'URL de la imagen',
        'Precio',
        'Stock'
    ]

    const { products, startCreatingProduct } = useProductStore();

    return (
        <AdminLayout>
            <div className="p-10">
                <h1 className="text-4xl font-bold text-neutral-900">
                    Productos
                </h1>

                <button className="px-4 py-2 mt-4 text-white bg-green-500 rounded hover:bg-green-600" onClick={startCreatingProduct}>
                    Crear producto
                </button>

                <CrudTable headers={headers}>
                    {
                        products.map((product) => (
                            <RoleRow key={product.id} {...product} />
                        ))
                    }
                </CrudTable>
            </div>
        </AdminLayout>
    )
}