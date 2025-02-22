import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Home from "../pages/Home";
import RotaProtegida from "./RotasProtegidas";

function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route element={<RotaProtegida/> }>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;
