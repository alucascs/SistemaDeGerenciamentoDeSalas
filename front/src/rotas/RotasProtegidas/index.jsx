import { Navigate, Outlet } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../../services/context/user';
import Swal from "sweetalert2";

const RotaProtegida = ({ requiredRole }) => {

    const token = sessionStorage.getItem("authToken");


    if (!token) {
        Swal.fire({
            toast: true,
            icon: "warning",
            title: "Você precisa estar logado para acessar esta página.",
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        return <Navigate to="/login" replace />;
    }

    const { user } = useContext(UserContext);
    const userRole = user.role;

    if (requiredRole && userRole !== requiredRole) {
        Swal.fire({
            toast: true,
            icon: "error",
            title: "Você não tem permissão para acessar esta página.",
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
};

export default RotaProtegida;
