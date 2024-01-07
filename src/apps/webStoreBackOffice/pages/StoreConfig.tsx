import {AdminLayout} from "../layouts";
import {CrudTable, StoreConfigRow} from "../components";

export const StoreConfig = () => {

    const headers = ["ID", "Título", "Descripción", "Logo URL", "Banner URL", "Teléfono", "Acciones"];

    return (
        <AdminLayout>
                <div
                    className="py-20 px-20 flex flex-col gap-5"
                >
                    <h1 className="text-4xl text-neutral-800 font-bold">
                        Configuración de la tienda
                    </h1>

                    <CrudTable headers={headers}>
                        <StoreConfigRow />
                    </CrudTable>
                </div>
        </AdminLayout>
    )
}