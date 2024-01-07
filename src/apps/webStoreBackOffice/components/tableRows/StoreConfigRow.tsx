import {useStoreSettingsStore} from "../../hooks";

export const StoreConfigRow = () => {

    const { startUpdatingStoreSettings } = useStoreSettingsStore();

    const storeSettings = useStoreSettingsStore();
    const { id, title, description, logoURL, bannerURL, phoneNumber } = storeSettings;

    return (
        <tr>
            <td className="border px-4 py-2">{id}</td>
            <td className="border px-4 py-2">{title}</td>
            <td className="border px-4 py-2">{description}</td>
            <td className="border px-4 py-2 overflow-hidden overflow-ellipsis text-nowrap max-h-10 max-w-10">{logoURL}</td>
            <td className="border px-4 py-2 overflow-hidden overflow-ellipsis text-nowrap max-h-10 max-w-10">{bannerURL}</td>
            <td className="border px-4 py-2">{phoneNumber}</td>
            <td className="border px-4 py-2 text-left">
                <button
                    className="mr-2 w-20 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:bg-green-400"
                    onClick={() => startUpdatingStoreSettings(storeSettings)}
                >
                    Edit
                </button>
                <button
                    className="w-20 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:bg-red-400"
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}