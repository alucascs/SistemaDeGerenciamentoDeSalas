import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Login from "../pages/login/Login"
import Home from "../pages/Home";
import RotaProtegida from "./RotasProtegidas";
import Navbar from "../components/Navbar";

function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route element={<RotaProtegida/> }>
                    <Route path="/" element={
                        <>
                        <Navbar/>
                        <Home />
                        </>
                        }
                     />
                    <Route path="/home" element={
                        <>
                        <Navbar/>
                        <Home />
                        </>
                        }
                     />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;
