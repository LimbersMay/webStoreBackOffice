import {BaseLayout} from "../../../layouts";
import {ReactElement, useEffect} from "react";
import {
    useAreaStore,
    useMenuStore,
    useOrderStore,
    useRoleStore, useTablesStore,
    useUsersStore,
    useUserStateStore
} from "../../../hooks";
export const AdminLayout = ({ children }: { children: ReactElement }) => {
    const navLinks = [
        {
            name: "Users",
            path: "/users"
        },
        {
            name: "Roles",
            path: "/roles"
        },
        {
            name: "Areas",
            path: "/areas"
        },
        {
            name: "Tables",
            path: "/tables"
        },
        {
            name: "Menus",
            path: "/menus"
        },
        {
            name: "Orders",
            path: "/orders"
        },
    ]

    // start loading the following data:
    // 1. Users who were created by the current user
    const { startLoadingUsers } = useUsersStore();
    const { startLoadingRoles } = useRoleStore();
    const { startLoadingMenus } = useMenuStore();
    const { startLoadingUserStates } = useUserStateStore();
    const { startLoadingAreas } = useAreaStore();
    const { startLoadingOrders } = useOrderStore();
    const { startLoadingTables } = useTablesStore();

    useEffect(() => {
        (async () => {
            await startLoadingUsers();
            await startLoadingRoles();
            await startLoadingUserStates();
            await startLoadingAreas();
            await startLoadingMenus();
            await startLoadingOrders();
            await startLoadingTables();
        })()
    }, []);

    return (
        <BaseLayout navLinks={navLinks}>
            {children}
        </BaseLayout>
    )
}