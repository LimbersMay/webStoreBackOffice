import {Navigate, Route, Routes} from "react-router-dom";
import {StoreApp} from "../pages";

export const EcommerceRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<StoreApp />}/>

            <Route path="/*" element={<Navigate to="/store" />}/>
        </Routes>
    )
}