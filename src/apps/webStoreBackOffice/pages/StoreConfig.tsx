import {AdminLayout} from "../layouts";
import {CrudTable, StoreConfigRow} from "../components";
import {useAuthStore} from "../hooks";

export const StoreConfig = () => {

    const headers = ["ID", "Título", "Descripción", "Logo URL", "Banner URL", "Teléfono", "Acciones"];
    const { uid } = useAuthStore();

    return (
        <AdminLayout>
                <div
                    className="py-20 px-20 flex flex-col gap-5"
                >
                    <div className="flex justify-between">
                        <h1 className="text-4xl text-neutral-800 font-bold">
                            Configuración de la tienda
                        </h1>

                        {/* Ver tienda */}
                            <a
                                className="bg-blue-500 text-white px-5 py-2 rounded-md flex gap-5 hover:bg-blue-600"
                                href={`/store/${uid}`}
                                target="_blank"
                            >
                                Ir a la tienda

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                </svg>
                            </a>
                    </div>

                    <CrudTable headers={headers}>
                        <StoreConfigRow />
                    </CrudTable>
                </div>
        </AdminLayout>
    )
}