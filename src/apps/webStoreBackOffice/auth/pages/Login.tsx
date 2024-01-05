import {ErrorMessage, Form, Formik} from "formik";
import * as Yup from 'yup';
import {AuthLayout} from "../layouts";
import {Field} from "../../components";
import {useAuthStore} from "../../hooks";

interface FormValues {
    email: string;
    password: string;
}

const initialValues: FormValues = {
    email: '',
    password: ''
}

export const Login = () => {

    const { startLogin } = useAuthStore();

    const onSubmit = async (values: FormValues) => {
        await startLogin(values.email, values.password);
    }

    return (
        <AuthLayout title={"Login"}>
            <Formik
                initialValues={{...initialValues}}
                onSubmit={onSubmit}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Required'),
                    password: Yup.string()
                        .min(6, 'Must be 6 characters or more')
                        .required('Required'),

                })}
            >
                {
                    ({
                         isSubmitting,
                     }) => (
                        <Form className="flex flex-col gap-5">

                            <Field
                                type="email"
                                name="email"
                            />

                            <ErrorMessage name={"email"} component="div" className="text-red-500"/>

                            <Field
                                type="password"
                                name="password"
                            />

                            <ErrorMessage name={"password"} component="div" className="text-red-500"/>

                            <button
                                type="submit"
                                className="w-96 bg-neutral-700 hover:bg-neutral-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:pointer-events-none"
                                disabled={isSubmitting}
                            >
                                Login
                            </button>
                        </Form>
                    )
                }
            </Formik>

        </AuthLayout>
    )
}