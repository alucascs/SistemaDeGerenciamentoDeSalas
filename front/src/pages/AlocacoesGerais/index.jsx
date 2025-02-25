import { useState, useEffect } from "react";
import { TabelaAlocacoesGerais } from "./Components/TabelaAlocacoesGeral";
import Swal from "sweetalert2";
import { API_ALOCACAO } from "../../services/api";
import { ListarSalasComAulas } from "../../rotas/RotasSalas"

function AlocacoesGerais() {
    const diasSemana = ["SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA"];
    const [diaSelecionado, setDiaSelecionado] = useState("SEGUNDA");
    const [alocacoes, setAlocacoes] = useState([]);

    const buscarAlocacoes = async (dia) => {
        try {
            let url = ListarSalasComAulas.replace("{diaSemana}", dia);
            const response = await API_ALOCACAO.get(url);
            setAlocacoes(response.data || []);
        } catch (error) {
            Swal.fire("Erro", "Falha ao carregar as alocações!", "error");
        }
    };

    useEffect(() => {
        buscarAlocacoes(diaSelecionado);
    }, [diaSelecionado]);

    return (
        <div className="container mt-4">
            <h1 className="mb-3">Salas e suas aulas</h1>

            <ul className="nav justify-content-center gap-3 mb-3">
                {diasSemana.map((dia) => (
                    <li className="nav-item" key={dia}>
                        <button
                            className={`nav-link ${dia === diaSelecionado ? "active" : ""} 
                                py-2 px-3 font-weight-bold text-uppercase`}
                            style={{
                                backgroundColor: dia === diaSelecionado ? "#007bff" : "transparent",
                                color: dia === diaSelecionado ? "#fff" : "#007bff",
                                borderRadius: "30px",
                                transition: "all 0.3s ease",
                            }}
                            onClick={() => setDiaSelecionado(dia)}
                        >
                            {dia.charAt(0) + dia.slice(1).toLowerCase()}
                        </button>
                    </li>
                ))}
            </ul>
            <TabelaAlocacoesGerais alocacoes={alocacoes} />
        </div>
    );
}

export default AlocacoesGerais;
