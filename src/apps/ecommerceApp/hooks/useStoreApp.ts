import {useAppSelector} from "../../webStoreBackOffice";
import {selectStore} from "../../webStoreBackOffice/store/ecommerceApp/useStore.ts";

export const useStore = () => {
    const { } = useAppSelector(selectStore);

}