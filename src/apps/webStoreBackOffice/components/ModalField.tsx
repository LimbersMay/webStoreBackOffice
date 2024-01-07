import {HTMLInputTypeAttribute} from "react";
import {Field} from "formik";
import {firstCapitalLetter} from "../helpers";

interface ModalFieldProps {
    name: string;
    fieldName?: string;
    type: HTMLInputTypeAttribute;
    disabled?: boolean;
    value?: any;
}

export const ModalField = ({ name, fieldName, type, disabled = false}: ModalFieldProps) => {

    return (
        <div className="flex flex-col">
            <label htmlFor={ name } className="font-bold text-green-800">{ fieldName ?? firstCapitalLetter(name) }</label>
            <Field
                type={ type }
                name={ name }
                id={ name }
                placeholder={ fieldName ?? firstCapitalLetter(name) }
                className="w-96 rounded-md border-2 p-2 disabled:bg-gray-200"
                disabled={ disabled }
            />
        </div>
    )
}