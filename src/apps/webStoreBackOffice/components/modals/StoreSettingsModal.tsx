import {ErrorMessage, Form, Formik} from "formik";
import * as Yup from "yup";
import NiceModal, {useModal}  from "@ebay/nice-modal-react";
import {ModalLayout} from "../../layouts";
import {ModalField, ModalImageInput} from "../";
import {StoreSettings} from "../../types";

export interface StoreDTO extends StoreSettings{
    logo: File;
    banner: File;
}

interface StoreSettingsModalProps {
    action: 'Create' | 'Update' | 'Select';
    storeSettings: Omit<StoreSettings, 'id'>;
}

export const StoreSettingsModal = NiceModal.create(({action, storeSettings}: StoreSettingsModalProps) => {

    const modal = useModal();

    const onSubmit = async (values: Omit<StoreSettings, 'id'>) => {
        modal.resolve(values);
        modal.remove();
    }

    return (
        <ModalLayout
            action={action}
            onClose={ modal.remove }
        >
            <Formik
                initialValues={storeSettings}
                onSubmit={onSubmit}
                validationSchema={Yup.object({
                    title: Yup.string()
                        .required('Required'),
                    description: Yup.string()
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

                            <ModalImageInput
                                name="logo"
                                fieldName="Logo"
                                onChange={async (event) => {
                                    await setFieldValue("logo", event.currentTarget.files?.[0]);
                                }}
                            />

                            <ModalImageInput
                                name="banner"
                                fieldName="Banner"
                                onChange={async (event) => {
                                    await setFieldValue("banner", event.currentTarget.files?.[0]);
                                }}
                            />

                            <ModalField
                                name="phoneNumber"
                                type="text"
                                fieldName={"Teléfono"}
                            />

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

export default StoreSettingsModal;