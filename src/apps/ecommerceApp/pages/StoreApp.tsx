import {useEffect} from "react";
import {NavLink, useParams} from "react-router-dom";
import {BaseLayout} from "../layouts";
import {ProductCard} from "../components";
import {useStoreApp} from "../hooks";

export const StoreApp = () => {
    const isActiveLink = ({isActive}: { isActive: boolean }) => {

        const baseClasses = "rounded-md";

        if (isActive) {
            return `${baseClasses} text-neutral-900 font-bold`;
        }

        return `${baseClasses} text-neutral-500 hover:text-neutral-900`;
    }

    const {
        storeProducts,
        storeCategories,
        startLoadingStoreProducts,
        startLoadingStoreCategories,
        bannerURL,
        bannerName
    } = useStoreApp();

    // Get the storeId from the URL
    const {storeId} = useParams();

    // Get the query params from the URL
    const categoryId = new URLSearchParams(window.location.search).get("categoryId");
    const search = new URLSearchParams(window.location.search).get("search");

    useEffect(() => {
        if (storeId) {
            (async () => {
                await startLoadingStoreProducts(storeId);
                await startLoadingStoreCategories(storeId);
            })();
        }
    }, []);

    let productsToRender = storeProducts;

    if (search && categoryId) {
        // Use regex to search for the product title
        const regex = new RegExp(search, "i");
        productsToRender = storeProducts.filter((product) => regex.test(product.title) && product.categoryId === categoryId || product.id === search);
    } else {
        if (search) {
            // Use regex to search for the product title
            const regex = new RegExp(search, "i");
            productsToRender = storeProducts.filter((product) => regex.test(product.title) || product.id === search);
        }

        if (categoryId) {
            productsToRender = storeProducts.filter((product) => product.categoryId === categoryId);
        }
    }


    return (
        <BaseLayout>
            <>

                {/* image */}
                <div className="flex flex-col items-center justify-center md:mr-20 md:ml-20">

                    <div
                        className="flex w-full flex-col items-center justify-center gap-5 rounded-xl bg-neutral-100"
                    >
                        <img
                            className="w-full md:w-1/2 md:rounded-xl"
                            src={bannerURL}
                            alt={bannerName}
                        />
                    </div>

                    {/* Categories section */}
                    <ul className="flex w-full justify-start gap-14 pt-10 pr-10 pb-5 pl-10 overflow-x-auto">
                        <NavLink
                            to={`/store/${storeId}`}
                            className={
                                isActiveLink({
                                    isActive: !categoryId
                                })
                            }
                        >
                            TODO
                        </NavLink>
                        {
                            storeCategories.map((category) => (
                                <NavLink
                                    key={category.id}
                                    to={`/store/${storeId}/?categoryId=${category.id}`}
                                    className={
                                        isActiveLink({
                                            isActive: category.id === categoryId
                                        })
                                    }
                                >
                                    {category.title.toUpperCase()}
                                </NavLink>
                            ))
                        }
                    </ul>

                    {/* Product card */}
                    <div className="grid grid-cols-2 mt-5 gap-1 md:grid-cols-2 lg:grid-cols-5 md:gap-10">
                        {

                            productsToRender.map((product) => (
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