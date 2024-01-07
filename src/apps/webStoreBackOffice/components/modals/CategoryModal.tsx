import NiceModal, {useModal}  from "@ebay/nice-modal-react";
import {ErrorMessage, Form, Formik} from "formik";
import * as Yup from "yup";
import {ModalLayout} from "../../../layouts";
import {ModalField} from "../";
import {Category} from "../../types";

interface CategoryModalProps {
    action: 'Create' | 'Update' | 'Select';
    category: Omit<Category, 'id'>;
}

const CategoryModal = NiceModal.create(({action, category}: CategoryModalProps) => {

    const modal = useModal();

    const onSubmit = async (values: Omit<Category, 'id'>) => {
        modal.resolve(values);
        modal.remove();
    }

    return (
        <ModalLayout
            action={action}
            onClose={ modal.remove }
        >
            <Formik
                initialValues={category}
                onSubmit={onSubmit}
                validationSchema={Yup.object({
                    title: Yup.string()
                        .required('Required'),
                    description: Yup.string()
                        .required('Required'),
                })}
            >
                {
                    ({}) => (
                        <Form className="flex flex-col gap-2">

                            <ModalField name="title" type="text" fieldName={"Título"}/>
                            <ErrorMessage name="title" component="div" className="font-bold text-red-500"/>

                            <ModalField name="description" type="text" fieldName={"Descripción"}/>
                            <ErrorMessage name="description" component="div" className="font-bold text-red-500"/>

                            <button
                                type="submit"
                                className="mt-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                            >
                                {
                                    action
                                }
                            </button>
                        </Form>
                    )
                }
            </Formik>
        </ModalLayout>
    )
})

export default CategoryModal;