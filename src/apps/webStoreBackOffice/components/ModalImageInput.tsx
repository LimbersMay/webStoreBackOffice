import {ChangeEvent} from "react";
import {firstCapitalLetter} from "../helpers";

interface ModalFieldProps {
    name: string;
    fieldName?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const ModalImageInput = ({ name, fieldName, onChange }: ModalFieldProps) => {
    return (
        <div className="mb-3">
            <label
                htmlFor={name}
                className="mb-2 inline-block font-bold text-green-800"
            >
                {fieldName ?? firstCapitalLetter(name)}
            </label
            >
            <input
                className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-600 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-400 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                type="file"
                id={name}
                name={name}
                onChange={onChange}
            />
        </div>
    )
}