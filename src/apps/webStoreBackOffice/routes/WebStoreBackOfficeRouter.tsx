
export const AppRouter = () => {

    const status = useCheckAuth();

    if (status === authStatusTypes.checking) {
        return <CheckingAuth />;
    }

    return (
        <Routes>
            {
                status === authStatusTypes.authenticated
            ? <Route path="/*" element={<div>Authenticated</div>}/>
: <>
        <Route path="/auth/*" element={<AuthRouter />}/>
    </>
}

    <Route path="/*" element={<Navigate to="/auth/login" />}/>
    </Routes>
)
}