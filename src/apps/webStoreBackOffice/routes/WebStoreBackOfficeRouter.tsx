import {Navigate, Route, Routes} from "react-router-dom";
import {Home, Products} from "../backoffice";

export const WebStoreBackOfficeRouter = () => {

    return (
        <Routes>
            <Route path="/webStore" element={<Home />}/>

            <Route
                path="/products"
                element={<Products />}
            />

            <Route path="/*" element={<Navigate to="/webStore" />}/>
        </Routes>
    )
}