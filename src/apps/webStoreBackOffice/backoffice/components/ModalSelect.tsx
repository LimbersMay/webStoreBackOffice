import {Field} from "formik";
import {firstCapitalLetter} from "../../../helpers/firstCapitalLetter.ts";

interface Option {
    value: string;
    label: string;
}

interface ModalFieldProps {
    name: string;
    fieldName?: string;
    options: Option[];
}

export const ModalSelect = ({ name, fieldName, options }: ModalFieldProps) => {

    return (
        <div className="flex flex-col">
            <label htmlFor={ name } className="font-bold text-green-800">{ fieldName ?? firstCapitalLetter(name) }</label>
            <Field
                type="text"
                name={ name }
                id={ name }
                placeholder={ fieldName ?? firstCapitalLetter(name) }
                className="w-96 rounded-md p-2 border-2"
                as="select"
            >
                <option value="">Select an option</option>
                {
                    options.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))
                }
            </Field>
        </div>
    )
}