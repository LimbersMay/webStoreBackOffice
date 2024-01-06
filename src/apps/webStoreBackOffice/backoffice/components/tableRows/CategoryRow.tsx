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
            <td className="border px-4 py-2">{id}</td>
            <td className="border px-4 py-2">{title}</td>
            <td className="border px-4 py-2">{description}</td>
            <td className="border px-4 py-2 text-left">
                <button
                    className="mr-2 w-20 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:bg-green-400"
                    onClick={handleEdit}
                >
                    Edit
                </button>
                <button
                    className="w-20 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:bg-red-400"
                    onClick={() => startDeletingCategory(id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}