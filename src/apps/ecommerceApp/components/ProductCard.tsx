import {Product} from "../../webStoreBackOffice";

export const ProductCard = ({ title, price, imageURL, stock, description }: Product) => {

    return (
        <div
            className="flex w-72 flex-col items-center justify-between gap-5 rounded-xl border border-gray-200 bg-gray-50 p-10 shadow-xl"
        >
            {/* Product availability */}
            <div
                className="flex w-full flex-row justify-between gap-5"
            >
                {
                    stock > 0 && (
                        <p
                            className="text-sm font-bold text-green-500"
                        >
                            Disponible
                        </p>
                    )
                }

                {
                    stock === 0 && (
                        description ? (
                            <p
                                className="text-sm font-bold text-amber-600 flex flex-row"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                                </svg>

                                { description }
                            </p>
                        ) : (
                            <p
                                className="text-sm font-bold text-red-500"
                            >
                                Sin stock
                            </p>
                        )
                    )
                }

                <p
                    className="text-sm font-bold text-neutral-500"
                >
                    {stock} stock
                </p>
            </div>

            <img
                // Make sure all images have the same size
                className="w-1/2"
                src={imageURL}
                alt={title}
            />

            <div className="flex w-full flex-col items-center justify-center gap-5">
                <h1 className="text-center text-xl font-bold text-neutral-800">{ title }</h1>

                <p className="text-xl">{price}.00$ MXN</p>

                <div className="flex w-full flex-col gap-2">
                    <a
                        className="flex w-full flex-row justify-between gap-2 rounded-md bg-green-500 p-2 text-white hover:bg-green-400"
                        href={`https://wa.me/9851070105?text=${encodeURI(`Hola, me interesa este artículo: ${title}`)}`}
                    >
                        Información
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-2 inline-block h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 24 24">
                            <path
                                d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                        </svg>
                    </a>

                </div>
            </div>
        </div>
    )
}