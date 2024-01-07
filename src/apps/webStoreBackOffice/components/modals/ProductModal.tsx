import NiceModal, {useModal}  from "@ebay/nice-modal-react";
import {ErrorMessage, Form, Formik} from "formik";
import * as Yup from "yup";
import {ModalLayout} from "../../layouts";
import {ModalField, ModalSelect} from "../";
import {Product} from "../../types";
import {useCategoryStore} from "../../hooks";

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
                    price: Yup.number()
                        .required('Required'),
                    stock: Yup.number()
                        .required('Required'),

                })}
            >
                {
                    ({
                        setFieldValue
                     }) => (
                        <Form className="flex flex-col gap-2">

                            <ModalField name="title" type="text" fieldName={"Título"}/>
                            <ErrorMessage name="title" component="div" className="font-bold text-red-500"/>

                            <ModalField name="description" type="text" fieldName={"Descripción"}/>
                            <ErrorMessage name="description" component="div" className="font-bold text-red-500"/>

                            <ModalSelect
                                name="categoryId"
                                fieldName={"Categoría"}
                                options={
                                categories.map((category) => ({
                                    value: category.id,
                                    label: category.title
                                }))}
                            />

                            <div className="mb-3">
                                <label
                                    htmlFor={"formFile"}
                                    className="mb-2 inline-block font-bold text-green-800"
                                >Imagen</label
                                >
                                <input
                                    className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-600 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-400 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                                    type="file"
                                    id="formFile"
                                    name="image"
                                    onChange={async (event) => {
                                        await setFieldValue("image", event.currentTarget.files?.[0]);
                                    }}
                                />
                            </div>

                            <ModalField name="price" type="number" fieldName={"Precio"}/>
                            <ErrorMessage name="price" component="div" className="font-bold text-red-500"/>

                            <ModalField name="stock" type="number" fieldName={"Stock"}/>
                            <ErrorMessage name="stock" component="div" className="font-bold text-red-500"/>

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

export default ProductModal;