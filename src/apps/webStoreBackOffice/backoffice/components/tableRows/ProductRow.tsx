import {useProductStore} from "../../../hooks";

export const RoleRow = (product: Product) => {

    const { startDeletingProduct, startUpdatingProduct } = useProductStore();

    const handleEdit = async () => {
        await startUpdatingProduct(product);
    }

    const { id, title, description, price, stock, imageURL } = product;

    return (
        <tr>
            <td className="px-4 py-2 border">{id}</td>
            <td className="px-4 py-2 border">{title}</td>
            <td className="px-4 py-2 border">{description}</td>
            <td className="px-4 py-2 border">{imageURL}</td>
            <td className="px-4 py-2 border">{price}</td>
            <td className="px-4 py-2 border">{stock}</td>
            <td className="px-4 py-2 border text-left">
                <button
                    className="px-4 py-2 mr-2 w-20 text-white bg-green-600 rounded hover:bg-green-700 disabled:bg-green-400"
                    onClick={handleEdit}
                >
                    Edit
                </button>
                <button
                    className="px-4 py-2 text-white w-20 bg-red-500 rounded hover:bg-red-600 disabled:bg-red-400"
                    onClick={() => startDeletingProduct(id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}