import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Login from "../pages/login/Login"
import Home from "../pages/Home";
import RotaProtegida from "./RotasProtegidas";
import Navbar from "../components/Navbar";
import Salas from "../pages/salas/index";
import Disciplinas from "../pages/disciplinas/index";
import AlocacoesGerais from "../pages/AlocacoesGerais";

function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />


                <Route element={<RotaProtegida />}>
                    <Route path="/" element={
                        <>
                            <Navbar />
                            <Home />
                        </>
                    }
                    />
                    <Route path="/home" element={
                        <>
                            <Navbar />
                            <Home />
                        </>
                    }
                    />
                    <Route path="/alocacoes" element={
                        <>
                            <Navbar />
                            <AlocacoesGerais />
                        </>
                    }
                    />
                </Route>
                <Route element={<RotaProtegida requiredRole="PROFESSOR" />}>
                    <Route path="/salas" element={
                        <>
                            <Navbar />
                            <Salas />
                        </>
                    }
                    />
                    <Route path="/disciplinas" element={
                        <>
                            <Navbar />
                            <Disciplinas />
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
