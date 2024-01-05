import {authStatusTypes} from "../auth/types";

export const useCheckAuth = () => {
    return authStatusTypes.notAuthenticated;
}
