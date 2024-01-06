import {NavLink} from "react-router-dom";
import {ReactElement} from "react";

interface NavLink {
    name: string,
    path: string
}

interface BaseLayoutProps {
    children: ReactElement,
    navLinks: NavLink[]
}

export const BaseLayout = ({ children, navLinks }: BaseLayoutProps ) => {

    const isActiveLink = ({ isActive}: { isActive: boolean}) => {

        const baseClasses = "rounded-md p-2";

        if (isActive) {
            return `${baseClasses} bg-neutral-800 text-neutral-100`;
        }

        return `${baseClasses} hover:bg-neutral-800 hover:text-neutral-100 text-black-800`;
    }

    return (
        <div>
            <header className="flex justify-around bg-white p-4 text-xl">

                <div className="self-center font-bold">
                    <NavLink
                        to="/"
                        className={isActiveLink}
                    >
                        Ecommerce App
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
                </div>
            </header>

            { children }
        </div>
    )
}