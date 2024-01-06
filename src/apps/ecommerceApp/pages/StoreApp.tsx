import {BaseLayout} from "../layouts";
import {ProductCard} from "../components/ProductCard.tsx";
import {useStoreApp} from "../hooks/useStoreApp.ts";
import {useEffect} from "react";

export const StoreApp = () => {

    const navLinks = [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Products",
            path: "/products",
        },
    ];

    const storeId = new URLSearchParams(window.location.search).get("id");
    const { storeProducts, storeCategories, startLoadingStoreProducts, startLoadingStoreCategories } = useStoreApp();

    useEffect(() => {
        if (storeId) {
            (async () => {
                await startLoadingStoreProducts(storeId);
                await startLoadingStoreCategories(storeId);
            })();
        }
    }, []);

    const isActiveLink = ({isActive}: { isActive: boolean }) => {

        const baseClasses = "rounded-md p-2";

        if (isActive) {
            return `${baseClasses} bg-neutral-800 text-neutral-100`;
        }

        return `${baseClasses} hover:bg-neutral-800 hover:text-neutral-100 text-black-800`;
    }

    return (
        <BaseLayout
            navLinks={navLinks}
        >
            <>

                {/* image */}
                <div className="mt-5 mr-20 ml-20 flex flex-col items-center justify-center">

                    <div
                        className="flex w-full flex-col items-center justify-center gap-5 rounded-xl bg-neutral-100"
                    >
                        <img
                            className="w-1/2 bg-neutral-50"
                            src="https://queue-it.com/media/ppcp1twv/product-drop.jpg"
                            alt="store"
                        />
                    </div>

                    {/* Categories section */}
                    <ul className="flex w-full justify-start gap-14 pt-10 pr-10 pb-5 pl-10">
                        <li
                        >
                            TODO
                        </li>
                        {
                            storeCategories.map((category) => (
                                <li
                                    key={category.id}
                                >
                                    { category.title.toUpperCase() }
                                </li>
                            ))
                        }
                    </ul>

                    {/* Product card */}
                    <div className="grid grid-cols-5 gap-10">
                        {
                            storeProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    {...product}
                                />
                            ))
                        }
                    </div>

                </div>
            </>
        </BaseLayout>
    )
}