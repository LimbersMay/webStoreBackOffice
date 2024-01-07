import {useEffect} from "react";
import {NavLink, useParams} from "react-router-dom";
import {BaseLayout} from "../layouts";
import {ProductCard} from "../components";
import {useStoreApp} from "../hooks";

export const StoreApp = () => {
    const isActiveLink = ({ isActive}: { isActive: boolean}) => {

        const baseClasses = "rounded-md";

        if (isActive) {
            return `${baseClasses} text-neutral-900 font-bold`;
        }

        return `${baseClasses} text-neutral-500 hover:text-neutral-900`;
    }

    const { storeProducts, storeCategories, startLoadingStoreProducts, startLoadingStoreCategories } = useStoreApp();

    // Get the storeId from the URL
    const { storeId } = useParams();

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

    if (categoryId) {
        productsToRender = storeProducts.filter((product) => product.categoryId === categoryId);
    }

    if (search) {
        // Use regex to search for the product title
        const regex = new RegExp(search, "i");
        productsToRender = storeProducts.filter((product) => regex.test(product.title));
    }

    return (
        <BaseLayout>
            <>
                {/* image */}
                <div className="mt-5 mr-20 ml-20 flex flex-col items-center justify-center">

                    <div
                        className="flex w-full flex-col items-center justify-center gap-5 rounded-xl bg-neutral-100"
                    >
                        <img
                            className="w-1/2 bg-neutral-50"
                            src="https://s3.amazonaws.com/thumbnails.venngage.com/template/0908b95c-252a-45ad-9f70-b8db4887070c.png"
                            alt="store"
                        />
                    </div>

                    {/* Categories section */}
                    <ul className="flex w-full justify-start gap-14 pt-10 pr-10 pb-5 pl-10">
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
                                    { category.title.toUpperCase() }
                                </NavLink>
                            ))
                        }
                    </ul>

                    {/* Product card */}
                    <div className="grid grid-cols-5 gap-10">
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