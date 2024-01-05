import {Navigate, Route, Routes} from "react-router-dom";

export const EcommerceRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<div>Ecommerce</div>}/>

            <Route path="/*" element={<Navigate to="/store" />}/>
        </Routes>
    )
}