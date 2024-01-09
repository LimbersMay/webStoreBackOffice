import {enqueueSnackbar} from "notistack";
import {Product} from "../../webStoreBackOffice";
import {useStoreApp} from "../hooks";

export const ProductCard = ({ id, title, price, imageURL, stock, description }: Product) => {

    const { phoneNumber } = useStoreApp();

    const getProductLinkToShare = (isForWhatsapp: boolean = false) => {

        const searchQueryParam = new URLSearchParams(window.location.search).get("search");
        const categoryIdQueryParam = new URLSearchParams(window.location.search).get("categoryId");

        if (categoryIdQueryParam) {

            if (isForWhatsapp) {
                return `${window.location.href}${encodeURIComponent("&")}search=${id}`;
            }

            return `${window.location.href}&search=${encodeURI(title)}`;
        }

        if (searchQueryParam) {
            return window.location.href;
        }

        return `${window.location.href}?search=${encodeURI(id)}`;
    }

    const handleShare = () => {

        // Check if the browser supports the Web Share API
        if (navigator.share) {
            navigator.share({
                title,
                text: `Mira este artículo que encontré!: ${title}`,
                url: getProductLinkToShare()
            })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        } else {
            // Copy to clipboard
            navigator.clipboard.writeText(getProductLinkToShare())
                .then(() => {
                    enqueueSnackbar("Enlace copiado al portapapeles", {
                        variant: 'success'
                    });
                })
                .catch(() => {
                    enqueueSnackbar("No se pudo copiar el enlace al portapapeles", {
                        variant: 'error'
                    });
                });
        }

    }

    return (
        <div
            className="flex h-full flex-col items-center justify-between gap-5 rounded-xl border border-gray-200 bg-gray-50 p-5 shadow-xl lg:w-72"
        >
            {/* Product availability */}
            <div
                className="flex w-full justify-between gap-5 text-xs lg:text-sm"
            >
                {
                    stock > 0 && (
                        <p
                            className="font-bold text-green-500"
                        >
                            Disponible
                        </p>
                    )
                }

                {
                    stock === 0 && (
                        description ? (
                            <p
                                className="font-bold text-amber-600 flex flex-row items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                                </svg>

                                { description }
                            </p>
                        ) : (
                            <p
                                className="font-bold text-red-500"
                            >
                                Sin stock
                            </p>
                        )
                    )
                }

                <p
                    className="font-bold text-neutral-500"
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
                <h1 className="text-center text-xs font-bold text-neutral-800 md:text-base">{ title }</h1>

                <p className="text-sm md:text-base">{price}.00$ MXN</p>

                <div className="flex w-full flex-col gap-2">
                    <a
                        className="flex w-full items-center flex-row justify-between rounded-md bg-zinc-800 p-2 text-white hover:bg-zinc-950"
                        href={`https://wa.me/${ phoneNumber }?text=Hola, me interesa este artículo: ${getProductLinkToShare(true)}`}
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

                    {/* Share button */}
                    <button
                        className="flex w-full items-center flex-row justify-between gap-2 rounded-md bg-teal-500 p-2 text-white hover:bg-teal-600"
                        onClick={handleShare}
                    >
                        Compartir
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                        </svg>
                    </button>



                </div>
            </div>
        </div>
    )
}