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

    const { startLoginUser } = useAuthStore();

    const onSubmit = async (values: FormValues) => {
        await startLoginUser(values.email, values.password);
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
                                className="w-96 rounded bg-neutral-700 px-4 py-2 font-bold text-white hover:bg-neutral-600 disabled:pointer-events-none disabled:opacity-50"
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