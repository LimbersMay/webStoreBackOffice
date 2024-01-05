import {checkingCredentials, login, logout, selectAuth, useAppDispatch, useAppSelector} from "../store";
import {belgsoftApi} from "../api";
import {useNavigate} from "react-router-dom";


interface CreatingUserProps {
    name: string;
    email: string;
    password: string;
}

export const useAuthStore = () => {

    const {uid, branchId, displayName, role, email, userType} = useAppSelector(selectAuth);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const startCreatingUser = async ({name, email, password}: CreatingUserProps) => {
        dispatch(checkingCredentials());

        // Async call to create user
        await belgsoftApi.post('/auth/register', {
            name,
            email,
            password
        });

        // navigate to login page
        navigate('/login');
    }

    const startLogin = async (email: string, password: string) => {
        dispatch(checkingCredentials());

        try {
            const response = await belgsoftApi.post('/auth/login', {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const {user, token} = response.data;

            // Save token in local storage
            localStorage.setItem('token', token);

            dispatch(login({
                branchId: user.branchId,
                uid: user.id,
                displayName: user.name,
                email: user.email,
                role: user.role,
                userType: user.userType,
            }));
        } catch (error) {
            dispatch(logout(null));
        }
    }

    const startLogout = () => {
        localStorage.removeItem('token');
        dispatch(logout(null));
    }

    return {
        // properties
        uid,
        displayName,
        role,
        email,
        userType,
        branchId,

        // methods
        startCreatingUser,
        startLogin,
        startLogout
    }
}
