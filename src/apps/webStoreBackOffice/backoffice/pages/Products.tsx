import {AdminLayout} from "../../layouts/AdminLayout.tsx";
import {useProductStore} from "../../hooks/useProductStore.ts";
import {CrudTable, RoleRow} from "../components";

export const Products = () => {

    const headers = [
        'ID',
        'Title',
        'Description',
        'ImageURL',
        'Price',
        'Stock'
    ]

    const { products } = useProductStore();


    return (
        <AdminLayout>
            <div className="p-10">
                <h1 className="text-4xl font-bold text-neutral-900">
                    Products
                </h1>

                <button className="px-4 py-2 mt-4 text-white bg-green-500 rounded hover:bg-green-600">
                    Create Role
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