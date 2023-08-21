import { useContext } from "react";
import { Context } from "../components/context/AppContext";



export const useAppContext = () => {

    const { state, dispatch } = useContext(Context);

}