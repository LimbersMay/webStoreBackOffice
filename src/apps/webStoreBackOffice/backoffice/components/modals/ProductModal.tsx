import NiceModal, {useModal}  from "@ebay/nice-modal-react";
import {ErrorMessage, Form, Formik} from "formik";
import * as Yup from "yup";
import {ModalLayout} from "../../../layouts";
import {ModalField, ModalSelect} from "../";
import {Product} from "../../types";
import {useCategoryStore} from "../../../hooks";

interface ProductModalProps {
    action: 'Create' | 'Update' | 'Select';
    product: Omit<Product, 'id'>;
}

const ProductModal = NiceModal.create(({action, product}: ProductModalProps) => {

    const modal = useModal();
    const { categories } = useCategoryStore();

    const onSubmit = async (values: Omit<Product, 'id'>) => {
        modal.resolve(values);
        modal.remove();
    }

    return (
        <ModalLayout
            action={action}
            onClose={ modal.remove }
        >
            <Formik
                initialValues={product}
                onSubmit={onSubmit}
                validationSchema={Yup.object({
                    title: Yup.string()
                        .required('Required'),
                    description: Yup.string()
                        .required('Required'),
                    imageURL: Yup.string()
                        .required('Required'),
                    price: Yup.number()
                        .moreThan(0, 'Must be greater than 0')
                        .required('Required'),
                    stock: Yup.number()
                        .moreThan(0, 'Must be greater than 0')
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

                            <ModalSelect
                                name="categoryId"
                                options={
                                categories.map((category) => ({
                                    value: category.id,
                                    label: category.title
                                }))}
                            />

                            <ModalField name="imageURL" type="text" fieldName={"URL de la imagen"}/>
                            <ErrorMessage name="imageURL" component="div" className="font-bold text-red-500"/>

                            <ModalField name="price" type="number" fieldName={"Precio"}/>
                            <ErrorMessage name="price" component="div" className="font-bold text-red-500"/>

                            <ModalField name="stock" type="number" fieldName={"Stock"}/>
                            <ErrorMessage name="stock" component="div" className="font-bold text-red-500"/>

                            <button
                                type="submit"
                                className="px-4 py-2 mt-4 text-white bg-green-500 rounded hover:bg-green-600"
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

export default ProductModal;