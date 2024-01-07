import {Navigate, Route, Routes} from "react-router-dom";
import {Categories, Home, Products, StoreConfig} from "../pages";

export const WebStoreBackOfficeRouter = () => {

    return (
        <Routes>
            <Route path="/webStore" element={<Home />}/>

            <Route
                path="/products"
                element={<Products />}
            />

            <Route
                path="/categories"
                element={<Categories />}
            />

            <Route
                path="/store-config"
                element={<StoreConfig />}
            />

            <Route path="/*" element={<Navigate to="/webStore" />}/>
        </Routes>
    )
}