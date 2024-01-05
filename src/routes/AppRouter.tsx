import {Navigate, Route, Routes} from "react-router-dom";
import {
    AuthRouter,
    authStatusTypes,
    CheckingAuth,
    useCheckAuth,
    WebStoreBackOfficeRouter
} from "../apps/webStoreBackOffice";
import {EcommerceRouter} from "../apps/ecommerceApp";

export const AppRouter = () => {

    const status = useCheckAuth();

    if (status === authStatusTypes.checking) {
        return <CheckingAuth />;
    }

    return (
        <Routes>
            {
                status === authStatusTypes.authenticated
                    ? <>
                        <Route path="/*" element={<WebStoreBackOfficeRouter />}/>
                    </>
                    : <>
                        <Route path="/auth/*" element={<AuthRouter />}/>
                    </>
            }

            <Route path="/store/*" element={<EcommerceRouter />}/>
            <Route path="/*" element={<Navigate to="/auth/login" />}/>
        </Routes>
    )
}
