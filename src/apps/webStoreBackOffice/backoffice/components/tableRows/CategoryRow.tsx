import {Category} from "../../types";
import {useCategoryStore} from "../../../hooks";

export const CategoryRow = (category: Category) => {

    const { startDeletingCategory, startUpdatingCategory } = useCategoryStore();

    const handleEdit = async () => {
        await startUpdatingCategory(category);
    }

    const { id, title, description } = category;

    return (
        <tr>
            <td className="px-4 py-2 border">{id}</td>
            <td className="px-4 py-2 border">{title}</td>
            <td className="px-4 py-2 border">{description}</td>
            <td className="px-4 py-2 border text-left">
                <button
                    className="px-4 py-2 mr-2 w-20 text-white bg-green-600 rounded hover:bg-green-700 disabled:bg-green-400"
                    onClick={handleEdit}
                >
                    Edit
                </button>
                <button
                    className="px-4 py-2 text-white w-20 bg-red-500 rounded hover:bg-red-600 disabled:bg-red-400"
                    onClick={() => startDeletingCategory(id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}