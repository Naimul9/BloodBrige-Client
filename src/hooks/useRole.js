import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";


const useRole = () => {

    const {user} = useContext(AuthContext)

    return (
        

    );
};

export default useRole;