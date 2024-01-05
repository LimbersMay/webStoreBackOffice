import {AdminLayout} from "../layouts";
import tiaKaua from "../../../assets/tiaKaua.jpeg";

export const Home = () => {

    return (
        <AdminLayout>
            <div className="flex p-10 flex-col items-center justify-center">

                <img src={tiaKaua} alt="tiaKaua" className="w-96"/>

                <h1 className={"text-4xl text-neutral-900"}>
                    Sistema de administración de la tia de kaua
                </h1>
            </div>
        </AdminLayout>
    )
}