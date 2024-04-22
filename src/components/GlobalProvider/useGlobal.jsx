import { useContext } from "react";
import { GlobalContext } from "./GlobalProvider.jsx";

export default function useGlobal() {
    return useContext(GlobalContext);
}