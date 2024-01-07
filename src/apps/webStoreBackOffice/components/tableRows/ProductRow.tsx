import {useProductStore, useCategoryStore} from "../../hooks";
import {Product} from "../../types";

export const ProductRow = (product: Product) => {

    const { startDeletingProduct, startUpdatingProduct } = useProductStore();
    const { categories } = useCategoryStore();

    const handleEdit = async () => {
        await startUpdatingProduct(product);
    }

    const { id, title, description, categoryId, price, stock, imageURL } = product;
    const categoryTitle = categories.find((category) => category.id === categoryId)?.title;

    return (
        <tr>
            <td className="border px-4 py-2">{id}</td>
            <td className="border px-4 py-2">{title}</td>
            <td className="border px-4 py-2">{description}</td>
            <td className="border px-4 py-2">{categoryTitle}</td>
            <td className="border px-4 py-2 overflow-hidden overflow-ellipsis text-nowrap max-h-10 max-w-10">{imageURL}</td>
            <td className="border px-4 py-2">{price}</td>
            <td className={`px-4 py-2 border ${ stock > 0 ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>{stock}</td>
            <td className="border px-4 py-2 text-left">
                <button
                    className="mr-2 w-20 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:bg-green-400"
                    onClick={handleEdit}
                >
                    Edit
                </button>
                <button
                    className="w-20 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:bg-red-400"
                    onClick={() => startDeletingProduct(id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}