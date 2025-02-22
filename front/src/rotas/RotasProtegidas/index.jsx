import { Navigate, Outlet } from "react-router-dom";
import Swal from "sweetalert2";

const RotaProtegida = () => {
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

    return <Outlet />;
};

export default RotaProtegida;
