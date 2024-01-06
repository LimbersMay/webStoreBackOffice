import {NavLink} from "react-router-dom";
import {ReactElement} from "react";
import {useAuthStore} from "../hooks";

interface NavLink {
    name: string,
    path: string
}

interface BaseLayoutProps {
    children: ReactElement,
    navLinks: NavLink[]
}

export const BaseLayout = ({ children, navLinks }: BaseLayoutProps ) => {

    const { displayName , startLogout } = useAuthStore();

    const handleLogout = () => {
        startLogout();
    }

    const isActiveLink = ({ isActive}: { isActive: boolean}) => {

        const baseClasses = "rounded-md p-2";

        if (isActive) {
            return `${baseClasses} bg-neutral-800 text-neutral-100`;
        }

        return `${baseClasses} hover:bg-neutral-800 hover:text-neutral-100 text-neutral-400`;
    }

    return (
        <div>
            <header className="flex justify-between bg-neutral-900 p-4 text-xl">

                <div className="self-center font-bold">
                    <NavLink
                        to="/"
                        className={isActiveLink}
                    >
                        Ecommerce Online
                    </NavLink>
                </div>

                <div className="flex items-center gap-5 font-bold">
                    {
                        navLinks.map(({ path, name }) => (
                            <NavLink
                                key={path}
                                to={path}
                                className={isActiveLink}
                            >
                                {name}
                            </NavLink>
                        ))
                    }

                    {
                        displayName && (
                            <div className="flex flex-row">
                                <button className="rounded-md p-2 hover:bg-neutral-800 hover:text-neutral-100 text-neutral-400" onClick={handleLogout}>
                                    Logout
                                </button>

                                <div className="self-center text-sm text-neutral-400">
                                    { displayName }
                                </div>
                            </div>
                        )
                    }
                </div>
            </header>

            { children }
        </div>
    )
}