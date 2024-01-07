import {AdminLayout} from "../../layouts";
import {useProductStore} from "../../hooks";
import {CrudTable, ProductRow} from "../components";
import {useState} from "react";

export const Products = () => {

    const headers = [
        'ID',
        'Título',
        'Descripción',
        'Categoría',
        'URL de la imagen',
        'Precio',
        'Stock'
    ]

    const { products, startCreatingProduct } = useProductStore();

    const totalPages = Math.ceil(products.length / 5);
    const end = 8;

    const [range, setRange] = useState({
        start: 0,
        end,
        current: 1
    });

    return (
        <AdminLayout>
            <div className="p-10">
                <h1 className="text-4xl font-bold text-neutral-900">
                    Productos
                </h1>

                <button className="mt-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600" onClick={startCreatingProduct}>
                    Crear Producto
                </button>

                <CrudTable headers={headers}>
                    {
                        products.slice(range.start, range.end).map((product) => (
                            <ProductRow key={product.id} {...product} />
                        ))
                    }
                </CrudTable>

                <div className="mt-4 flex justify-center">
                    <button className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 disabled:bg-gray-400" onClick={() => setRange({
                        start: range.start - end,
                        end: range.end - end,
                        current: range.current - 1
                    })}
                            disabled={range.current === 1}
                    >
                        Anterior
                    </button>

                    <span className="px-4 py-2 font-bold text-gray-800">
                        {range.current} de {totalPages}
                    </span>

                    <button className="ml-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:bg-green-400" onClick={() => setRange({
                        start: range.start + end,
                        end: range.end + end,
                        current: range.current + 1
                    })}
                            disabled={range.current === totalPages}
                    >
                        Siguiente
                    </button>

                </div>

            </div>
        </AdminLayout>
    )
}