import { useState } from "react";
import { useEffect } from "react";
import { buscarAulas, buscarAulaById, editarAula, deletarAula } from "../../../services/aula/AulaService";
import Swal from "sweetalert2";
import styles from "../styles.module.css";



export async function SwalEditarAula(id, fetchAula, salas, disciplinas) {
  const aula = await buscarAulaById(id);

  const optionsHtmlSala = salas.map(sala => `
    <option value="${sala.id}" ${sala.id === aula.sala.id ? "selected" : ""}>
      ${sala.codigo + " - " + sala.nome}
    </option>
  `).join('');

  const optionsHtmlDisciplina = disciplinas.map(disciplina => `
    <option value="${disciplina.id}" ${disciplina.id === aula.disciplina.id ? "selected" : ""}>
      ${disciplina.codigoTurma + " - " + disciplina.nome}
    </option>
  `).join('');

  Swal.fire({
    title: 'Editar aula',
    html: `
    
      <div class="${styles.formGroup}">
        <label for="hora" class="${styles.label}">Hora de Início</label>
     <select
          class="${styles.inputLogin}"
          name="HoraInicio"
          id="hora"
        >
          <option value="17:00" ${aula.horarioInicio === "17:00:00" ? "selected" : ""}>17:00</option>
          <option value="17:50" ${aula.horarioInicio === "17:50:00" ? "selected" : ""}>17:50</option>
          <option value="18:40" ${aula.horarioInicio === "18:40:00" ? "selected" : ""}>18:40</option>
          <option value="19:30" ${aula.horarioInicio === "19:30:00" ? "selected" : ""}>19:30</option>
          <option value="20:20" ${aula.horarioInicio === "20:20:00" ? "selected" : ""}>20:20</option>
          <option value="21:10" ${aula.horarioInicio === "21:10:00" ? "selected" : ""}>21:10</option>
        </select>
      </div>
      <div class="${styles.formGroup}">
        <label for="sala" class="${styles.label}">Sala</label>
        <select id="sala" class="${styles.inputLogin}">
          <option value="">Selecione uma Sala</option>
          ${optionsHtmlSala}
        </select>
      </div>
      <div class="${styles.formGroup}">
        <label for="disciplina" class="${styles.label}">Disciplina</label>
        <select id="disciplina" class="${styles.inputLogin}">
          <option value="">Selecione uma Disciplina</option>
          ${optionsHtmlDisciplina}
        </select>
      </div>
      <div class="${styles.formGroup}">
        <label for="duracao" class="${styles.label}">Duração</label>
        <select id="duracao" class="${styles.inputLogin}">
          <option value="">Selecione uma Duração</option>
          <option value="50" ${aula.duracao == 50 ? "selected" : ""}>50 minutos</option>
          <option value="100" ${aula.duracao == 100 ? "selected" : ""}>100 minutos</option>
          <option value="150" ${aula.duracao == 150 ? "selected" : ""}>150 minutos</option>
          <option value="200" ${aula.duracao == 200 ? "selected" : ""}>200 minutos</option>
          <option value="250" ${aula.duracao == 250 ? "selected" : ""}>250 minutos</option>
          <option value="300" ${aula.duracao == 300 ? "selected" : ""}>300 minutos</option>
        </select>
      </div>
      <div class="${styles.formGroup}">
        <label for="diaSemana" class="${styles.label}">Dia da Semana</label>
        <select id="diaSemana" class="${styles.inputLogin}">
          <option value="">Selecione um Dia</option>
          <option value="SEGUNDA" ${aula.diaSemana === "SEGUNDA" ? "selected" : ""}>Segunda-Feira</option>
          <option value="TERÇA" ${aula.diaSemana === "TERÇA" ? "selected" : ""}>Terça-Feira</option>
          <option value="QUARTA" ${aula.diaSemana === "QUARTA" ? "selected" : ""}>Quarta-Feira</option>
          <option value="QUINTA" ${aula.diaSemana === "QUINTA" ? "selected" : ""}>Quinta-Feira</option>
          <option value="SEXTA" ${aula.diaSemana === "SEXTA" ? "selected" : ""}>Sexta-Feira</option>
          <option value="SABADO" ${aula.diaSemana === "SABADO" ? "selected" : ""}>Sábado</option>
        </select>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Salvar',
    cancelButtonText: 'Cancelar',
    customClass: {
      confirmButton: `${styles.btnConfirm}`,
      cancelButton: `${styles.btnCancel}`,
    },
    preConfirm: () => {
      const hora = document.getElementById('hora').value;
      const sala = document.getElementById('sala').value;
      const disciplina = document.getElementById('disciplina').value;
      const duracao = document.getElementById('duracao').value;
      const diaSemana = document.getElementById('diaSemana').value;

      return { hora, sala, disciplina, duracao, diaSemana };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const { hora, sala, disciplina, duracao, diaSemana } = result.value;
      const AulaDTO = {
        disciplina: { id: Number(disciplina) },
        sala: { id: Number(sala) },
        diaSemana: diaSemana,      
        horarioInicio: hora, 
        duracao: Number(duracao),
        id:id
       
      };

      EditarAula(AulaDTO, fetchAula);
    }
  });
}

export async function EditarAula(aulaDTO,fetchAula) {
    try {
      if (!validarAula(aulaDTO)) {
        Swal.fire("Erro", "Preencha os campos corretamente", "error");
      } else {
        const response = await editarAula(aulaDTO);
  
        if (response == 200) {
          Swal.fire("Feito", "Aula editada com sucesso!", "success");
          fetchAula();
  
        } else if (response == 409) {
          Swal.fire("Erro", "Conflito de horario com outra disciplina", "error");
        }
  
      }
  
    } catch (error) {
      Swal.fire("Erro", `Erro ao editar disciplina: ${error}`, "error");
    }
  }

  function validarAula(aula) {

    if (aula.disciplina.id.length == 0) {
      return false;
    }
  
    if (aula.sala.id.length == 0) {
      return false;
    }
  
    if (aula.horarioInicio.length == 0) {
      return false;
    }

    if (aula.diaSemana.length == 0) {
      return false;
    }

    if (aula.duracao.length == 0) {
      return false;
    }
  
    return true;
  }

export function useAulas() {
  const [Aulas, setAulas] = useState([]);
  const fetchAulas = async () => {

    const data = await buscarAulas();
    setAulas(data);
  };

  useEffect(() => {
    fetchAulas();
  }, []);

  return { Aulas, setAulas, fetchAulas };
}

export async function SwalDeletarAula(id, fetchAula, salas, disciplinas) {
  const aula = await buscarAulaById(id);

  const optionsHtmlSala = salas.map(sala => `
    <option value="${sala.id}" ${sala.id === aula.sala.id ? "selected" : ""}>
      ${sala.codigo + " - " + sala.nome}
    </option>
  `).join('');

  const optionsHtmlDisciplina = disciplinas.map(disciplina => `
    <option value="${disciplina.id}" ${disciplina.id === aula.disciplina.id ? "selected" : ""}>
      ${disciplina.codigoTurma + " - " + disciplina.nome}
    </option>
  `).join('');

  Swal.fire({
    title: 'Deletar Aula',
    html: `
      <div class="${styles.formGroup}">
        <label for="hora" class="${styles.label}">Hora de Início</label>
        <select class="${styles.inputLogin}" name="HoraInicio" id="hora" disabled>
          <option value="17:00" ${aula.horarioInicio === "17:00:00" ? "selected" : ""}>17:00</option>
          <option value="17:50" ${aula.horarioInicio === "17:50:00" ? "selected" : ""}>17:50</option>
          <option value="18:40" ${aula.horarioInicio === "18:40:00" ? "selected" : ""}>18:40</option>
          <option value="19:30" ${aula.horarioInicio === "19:30:00" ? "selected" : ""}>19:30</option>
          <option value="20:20" ${aula.horarioInicio === "20:20:00" ? "selected" : ""}>20:20</option>
          <option value="21:10" ${aula.horarioInicio === "21:10:00" ? "selected" : ""}>21:10</option>
        </select>
      </div>
      <div class="${styles.formGroup}">
        <label for="sala" class="${styles.label}">Sala</label>
        <select disabled id="sala" class="${styles.inputLogin}">
          <option value="">Selecione uma Sala</option>
          ${optionsHtmlSala}
        </select>
      </div>
      <div class="${styles.formGroup}">
        <label for="disciplina" class="${styles.label}">Disciplina</label>
        <select disabled id="disciplina" class="${styles.inputLogin}">
          <option value="">Selecione uma Disciplina</option>
          ${optionsHtmlDisciplina}
        </select>
      </div>
      <div class="${styles.formGroup}">
        <label for="duracao" class="${styles.label}">Duração</label>
        <select disabled id="duracao" class="${styles.inputLogin}">
          <option value="">Selecione uma Duração</option>
          <option value="50" ${aula.duracao == 50 ? "selected" : ""}>50 minutos</option>
          <option value="100" ${aula.duracao == 100 ? "selected" : ""}>100 minutos</option>
          <option value="150" ${aula.duracao == 150 ? "selected" : ""}>150 minutos</option>
          <option value="200" ${aula.duracao == 200 ? "selected" : ""}>200 minutos</option>
          <option value="250" ${aula.duracao == 250 ? "selected" : ""}>250 minutos</option>
          <option value="300" ${aula.duracao == 300 ? "selected" : ""}>300 minutos</option>
        </select>
      </div>
      <div class="${styles.formGroup}">
        <label for="diaSemana" class="${styles.label}">Dia da Semana</label>
        <select disabled id="diaSemana" class="${styles.inputLogin}">
          <option value="">Selecione um Dia</option>
          <option value="SEGUNDA" ${aula.diaSemana === "SEGUNDA" ? "selected" : ""}>Segunda-Feira</option>
          <option value="TERÇA" ${aula.diaSemana === "TERÇA" ? "selected" : ""}>Terça-Feira</option>
          <option value="QUARTA" ${aula.diaSemana === "QUARTA" ? "selected" : ""}>Quarta-Feira</option>
          <option value="QUINTA" ${aula.diaSemana === "QUINTA" ? "selected" : ""}>Quinta-Feira</option>
          <option value="SEXTA" ${aula.diaSemana === "SEXTA" ? "selected" : ""}>Sexta-Feira</option>
          <option value="SABADO" ${aula.diaSemana === "SABADO" ? "selected" : ""}>Sábado</option>
        </select>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Deletar',
    cancelButtonText: 'Cancelar',
    customClass: {
      confirmButton: `${styles.btnConfirmDelete}`,
      cancelButton: `${styles.btnCancel}`,
    },
  }).then((result) => {
    if (result.isConfirmed) {
      

      DeletarAula(id, fetchAula); // Aqui você deve passar a função DeletarAula
    }
  });
}


export async function DeletarAula(id,fetchAula) {
  try {
   
      const responseStatus = await deletarAula(id);

      if (responseStatus === 204) {
        Swal.fire("Feito", "Aula removida com sucesso!", "success");
        fetchAula();

      } else {
        Swal.fire("Erro", "Erro ao remover Aula", "error");
      }   
  } catch (error) {
    Swal.fire("Erro", `Erro ao remover Aula: ${error}`, "error");
  }
}