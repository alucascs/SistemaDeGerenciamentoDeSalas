import { useState } from "react";


export function AulaValidacao() {

    const validarDuracao = (duracao) => {
        if (duracao.length == 0) {
            return "Selecione uma duração para a aula;"
        }
        return "";
    };

    const validarHora = (hora) => {
        if (hora < "07:00" || hora > "22:00") {
            return "Escolha uma hora valida para a aula";
        }
        return "";
    };

    const validarDisciplina = (disciplina) => {
        if (disciplina === "") {
            return "Selecione uma disciplina para a aula";
        }
        return "";
    };

    const validarSala = (sala) => {
        if (sala === "") {
            return "Selecione uma sala para a aula";
        }
        return "";
    };

    const validarDia = (dia) => {
        if (dia === "") {
            return "Selecione um dia para a aula";
        }
        return "";
    };

    const [dadosAula, setDadosAula] = useState({
        HoraInicio: "",
        DiaSemana: "",
        SalaID: "",
        DisciplinaID: "",
        Duracao: ""

    });

     const [errosAula, setErrosAula] = useState({
        HoraInicio: "",
        DiaSemana: "",
        NomeSala: "",
        NomeDisciplina: "",
        Duracao: ""
    });

    const handleChangeAula = (e) => {
        const { name, value } = e.target;
         setDadosAula((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "SalaID") {
            setErrosAula((prev) => ({ ...prev, NomeSala: validarSala(value) }));
        } else if (name === "DisciplinaID") {
            setErrosAula((prev) => ({ ...prev, NomeDisciplina: validarDisciplina(value) }));
        } else if (name === "HoraInicio") {
            setErrosAula((prev) => ({ ...prev, HoraInicio: validarHora(value) }));
        } else if (name === "Duracao") {
            setErrosAula((prev) => ({ ...prev, Duracao: validarDuracao(value) }));
        } else if (name === "DiaSemana") {
            setErrosAula((prev) => ({ ...prev, DiaSemana: validarDia(value) }));
        }
    
    };
    
return { dadosAula, errosAula, handleChangeAula };
}