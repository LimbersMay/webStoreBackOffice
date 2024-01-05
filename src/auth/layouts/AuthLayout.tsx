import {ReactElement} from "react";
import {BaseLayout} from "../../layouts";

export const AuthLayout = ({ children, title }: { children: ReactElement, title: string }) => {

    const navLinks = [
        {
            name: "Login",
            path: "/auth/login"
        },
        {
            name: "Register",
            path: "/auth/register"
        }
    ]

    return (
        <BaseLayout navLinks={navLinks}>

            {/* Main container */}
            <div className="flex justify-center">

                {/* Form container */}
                <div className="mt-10 mb-4 flex w-fit flex-col gap-5 rounded bg-neutral-800 p-4 px-8 pt-6 pb-8 shadow-md">

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-white">
                        { title }
                    </h1>

                    {
                        children
                    }
                </div>
            </div>
        </BaseLayout>
    )
}