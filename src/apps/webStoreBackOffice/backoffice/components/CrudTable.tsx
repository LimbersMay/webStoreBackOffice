import {ReactElement} from "react";

interface CrudTableProps {
    headers: string[];
    children: ReactElement | ReactElement[];
}

export const CrudTable = ({ headers, children }: CrudTableProps) => {
    return (
        <div className="mt-8">
            <table className="w-full table-auto">
                <thead>
                <tr>

                    {
                        headers.map((header) => (
                            <th key={header} className="px-4 py-2 text-left">{header}</th>
                        ))
                    }

                </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    )
}