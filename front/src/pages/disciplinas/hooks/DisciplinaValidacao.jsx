import { useState } from "react";


export function DisciplinaValidacao() {

    const validarNome = (nome) => {
        if (nome.length < 5) {
            return "Nome da disciplina deve ter pelo menos 5 caracteres"
        }
        return "";
    };

    const validarCodigoTurma = (codigo) => {
        if (codigo.length < 6) {
            return "O Código deve ter pelo menos 6 caracteres";
        }
        return "";
    };

    const validarProfessor = (nome) => {
        if (nome.length < 4) {
            return "Selecione ao menos 1 professor disponivel";
        }
        return "";
    };

    const [dadosDisciplina, setDadosDisciplina] = useState({
        NomeDisciplina: "",
        NomeProfessor: "",
        CodigoTurma: ""

    });

    const [errosDisciplina, setErrosDisciplina] = useState({
        NomeDisciplina: "",
        NomeProfessor: "",
        CodigoTurma: ""
    });

    const handleChangeDisciplina = (e) => {

        const { name, value } = e.target;

        setDadosDisciplina((prev) => ({
            ...prev,
            [name]: value,
        }));


        if (name === "NomeDisciplina") {
            setErrosDisciplina((prev) => ({ ...prev, NomeDisciplina: validarNome(value) }));
        } else if (name === "CodigoTurma") {
            setErrosDisciplina((prev) => ({ ...prev, CodigoTurma: validarCodigoTurma(value) }));
        } else if (name === "NomeProfessor") {
            setErrosDisciplina((prev) => ({ ...prev, NomeProfessor: validarProfessor(value) }));
        }
    };



    return { dadosDisciplina, errosDisciplina, handleChangeDisciplina };
}