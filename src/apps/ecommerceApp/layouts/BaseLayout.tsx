import {FormEvent, ReactElement, useEffect, useState} from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useStoreApp} from "../hooks";

interface BaseLayoutProps {
    children: ReactElement,
}

export const BaseLayout = ({children}: BaseLayoutProps) => {

    const [ productTitleToSearch, setProductTitleToSearch ] = useState<string>("");
    const { startLoadingStoreSettings, title, logoURL } = useStoreApp();

    const navigation = useNavigate();

    // Get the storeId from the URL
    const {storeId} = useParams();

    const isActiveLink = ({isActive}: { isActive: boolean }) => {

        const baseClasses = "rounded-md p-2";

        if (isActive) {
            return `${baseClasses} text-neutral-900 font-bold`;
        }

        return `${baseClasses} text-neutral-500 hover:text-neutral-900`;
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        navigation(`/store/${storeId}?search=${productTitleToSearch}`);
    }

    useEffect(() => {
        (async () => {
            await startLoadingStoreSettings(`${storeId}`);
        })();
    }, []);

    useEffect(() => {
        document.title = title;

        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            // @ts-ignore
            link.rel = 'icon';
            document.getElementsByTagName('head')[0].appendChild(link);
        }
        // @ts-ignore
        link.href = logoURL;
    }, [title, logoURL]);


    return (
        <div>
            <header className="flex justify-around p-3 text-xl">

                <div className="self-center">
                    <NavLink
                        to={`/store/${storeId}`}
                        className={isActiveLink}
                    >
                        {
                            title
                        }
                    </NavLink>
                </div>


                {/* Search */}
                <form
                    onSubmit={onSubmit}
                >
                    <div className="flex justify-center items-center px-4 sm:px-6 lg:px-8">
                        <input type="text"
                               className="h-14 w-96 pr-8 pl-5 rounded focus:shadow focus:outline-none focus:text-neutral-800"
                               placeholder="Buscar producto..."
                               value={productTitleToSearch}
                               onChange={(e) => setProductTitleToSearch(e.target.value)}
                        />

                        <svg
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                            className="w-6 h-6 relative right-10 text-gray-500 hover:text-gray-700 cursor-pointer"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                </form>

            </header>

            {children}
        </div>
    )
}