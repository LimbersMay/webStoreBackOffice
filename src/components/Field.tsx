import {HTMLInputTypeAttribute} from "react";
import { Field as FormikField } from "formik";
import {firstCapitalLetter} from "../helpers";

interface FieldProps {
    type: HTMLInputTypeAttribute;
    name: string;
    fieldName?: string;
}

export const Field = ({ type, name, fieldName }: FieldProps ) => {

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name} className="font-bold text-white">{ fieldName ?? firstCapitalLetter(name) }</label>
            <FormikField
                type={type}
                name={name}
                placeholder={fieldName ?? firstCapitalLetter(name)}
                className="w-96 rounded-md p-2"
            />
        </div>
    )
}