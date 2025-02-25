import { useState, useEffect } from "react";
import { buscarDisciplinaByID, buscarDisciplinas, editarDisciplina, deletarDisciplina } from "../../../services/Disciplina/DisciplinaService";
import {buscarProfessores} from "../../../services/usuario/UsuarioService";

import Swal from "sweetalert2";
import styles from "../styles.module.css";


function validarDisciplina(diciplina) {

  if (diciplina.nome.length < 5) {
    return false;
  }

  if (diciplina.codigoTurma.length < 6) {
    return false;
  }

  if (diciplina.nomeProfessor.length < 4) {
    return false;
  }

  return true;
}

export function useDisciplinas() {
  const [disciplinas, setDisciplinas] = useState([]);
  const fetchDisciplinas = async () => {

    const data = await buscarDisciplinas();
    setDisciplinas(data);
  };

  useEffect(() => {
    fetchDisciplinas();
  }, []);

  return { disciplinas, setDisciplinas, fetchDisciplinas };
}


export async function SwalEditarDisciplina(id,fetchDisciplina,professores) {
  
  const disciplina = await buscarDisciplinaByID(id);
  const optionsHtml = professores.map(professor => `
    <option value="${professor.nome}">${professor.nome}</option>
  `).join('');

  Swal.fire({
    title: 'Editar Disciplina',
    html: `
      <div class="${styles.formGroup}">
        <label for="nome" class="${styles.label}">Nome da Disciplina</label>
        <input 
          id="nome" 
          class="${styles.inputLogin}" 
          value="${disciplina.nome}" 
          placeholder="Nome da Disciplina"
        />
      </div>
      <div class="${styles.formGroup}">
        <label for="codigo" class="${styles.label}">Código da Turma</label>
        <input 
          id="codigo" 
          class="${styles.inputLogin}" 
          value="${disciplina.codigoTurma}" 
          placeholder="Código da Turma"
        />
      </div>
    <div class="${styles.formGroup}">
      <label for="professor" class="${styles.label}">Nome do Professor</label>
      <select id="professor" class="${styles.inputLogin}">
        <option value="">Selecione um professor</option>
        ${optionsHtml}
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
      const nome = document.getElementById('nome').value;
      const codigo = document.getElementById('codigo').value;
      const professor = document.getElementById('professor').value;
      return { nome, codigo, professor };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const { nome, codigo,professor } = result.value;
      const disciplinaEditada = {
        id: id,
        nome: nome,
        codigoTurma: codigo,
        nomeProfessor : professor
      }

      EditarDisciplina(disciplinaEditada,fetchDisciplina);

    }
  });
}


export async function SwalDeletarDisciplina(id,fetchDisciplina) {
  
  const disciplina = await buscarDisciplinaByID(id);

  Swal.fire({
    title: 'Deletar Disciplina',
    html: `
      <div class="${styles.formGroup}">
        <label for="nome" class="${styles.label}">Nome da Disciplina</label>
        <input 
        disabled 
          id="nome" 
          class="${styles.inputLogin}" 
          value="${disciplina.nome}" 
          placeholder="Nome da Disciplina"
        />
      </div>
      <div class="${styles.formGroup}">
        <label for="codigo" class="${styles.label}">Código da Turma</label>
        <input
             disabled  
          id="codigo" 
          class="${styles.inputLogin}" 
          value="${disciplina.codigoTurma}" 
          placeholder="Código da Turma"
        />
      </div>
        <div class="${styles.formGroup}">
        <label for="professor" class="${styles.label}">Nome do Professor</label>
        <input 
             disabled 
          id="professor" 
          class="${styles.inputLogin}" 
          value="${disciplina.nomeProfessor}" 
          placeholder="Nome do Professor"
        />
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Deletar',
    cancelButtonText: 'Cancelar',
    customClass: {
      confirmButton: `${styles.btnConfirmDelete}`,
      cancelButton: `${styles.btnCancel}`,
    }
  }).then((result) => {
    if (result.isConfirmed) {
  
      DeletarDisciplina(id,fetchDisciplina);

    }
  });
}

export async function DeletarDisciplina(id,fetchDisciplinas) {
  try {
   
      const responseStatus = await deletarDisciplina(id);

      if (responseStatus === 204) {
        Swal.fire("Feito", "Disciplina removida com sucesso!", "success");
        fetchDisciplinas();

      } else {
        Swal.fire("Erro", "Disciplinas vinculadas não podem ser deletadas", "error");
      }   
  } catch (error) {
    Swal.fire("Erro", `Erro ao editar disciplina: ${error}`, "error");
  }
}

export async function EditarDisciplina(disciplinaDTO,fetchDisciplinas) {
    try {
      if (!validarDisciplina(disciplinaDTO)) {
        Swal.fire("Erro", "Preencha os campos corretamente", "error");
      } else {
        const response = await editarDisciplina(disciplinaDTO);
  
        if (response.status === 200) {
          Swal.fire("Feito", "Disciplina editada com sucesso!", "success");
          fetchDisciplinas();
  
        } else {
          Swal.fire("Erro", "Erro ao editar disciplina", "error");
        }
  
      }
  
    } catch (error) {
      Swal.fire("Erro", `Erro ao editar disciplina: ${error}`, "error");
    }
  }

  export function useProfessores() {
    const [professores, setProfessores] = useState([]);
    const fetchProfessores = async () => {
  
      const data = await buscarProfessores();
      setProfessores(data);
    };
  
    useEffect(() => {
      fetchProfessores();
    }, []);
  
    return { professores, setProfessores, fetchProfessores };
  }

