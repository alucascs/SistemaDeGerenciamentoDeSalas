import { useState, useEffect } from "react";
import { buscarSalas, buscarSalaById, editarSala,deletarSala } from "../../../services/salas/SalasService";
import Swal from "sweetalert2";
import styles from "../styles.module.css";


function validarSala(sala) {

  if (sala.nome.length < 5) {
    return false;
  }

  if (sala.codigo.length < 6) {
    return false;
  }

  return true;
}

export function useSalas() {
  const [salas, setSalas] = useState([]);
  const fetchSalas = async () => {

    const data = await buscarSalas();
    setSalas(data);
  };

  useEffect(() => {
    fetchSalas();
  }, []);

  return { salas, setSalas, fetchSalas };
}



export async function SwalEditarSala(id,fetchSalas) {
  const sala = await buscarSalaById(id);

  Swal.fire({
    title: 'Editar Sala',
    html: `
      <div class="${styles.formGroup}">
        <label for="nome" class="${styles.label}">Nome da Sala</label>
        <input 
          id="nome" 
          class="${styles.inputLogin}" 
          value="${sala.nome}" 
          placeholder="Nome da Sala"
        />
      </div>
      <div class="${styles.formGroup}">
        <label for="codigo" class="${styles.label}">Código da Sala</label>
        <input 
          id="codigo" 
          class="${styles.inputLogin}" 
          value="${sala.codigo}" 
          placeholder="Código da Sala"
        />
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
      return { nome, codigo };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const { nome, codigo } = result.value;
      const salaEditada = {
        id: id,
        nome: nome,
        codigo: codigo
      }

      EditarSala(salaEditada,fetchSalas);

    }
  });
}

export async function SwalDeletarSala(id,fetchSalas) {
  const sala = await buscarSalaById(id);

  Swal.fire({
    title: 'Editar Sala',
    html: `
      <div class="${styles.formGroup}">
        <label for="nome" class="${styles.label}">Nome da Sala</label>
        <input 
        disabled
          id="nome" 
          class="${styles.inputLogin}" 
          value="${sala.nome}" 
          placeholder="Nome da Sala"
        />
      </div>
      <div class="${styles.formGroup}">
        <label for="codigo" class="${styles.label}">Código da Sala</label>
        <input 
        disabled
          id="codigo" 
          class="${styles.inputLogin}" 
          value="${sala.codigo}" 
          placeholder="Código da Sala"
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
     
      DeletarSala(id,fetchSalas);

    }
  });
}

export async function DeletarSala(id,fetchSalas) {
  try {  
      const responseStatus = await deletarSala(id);

      if (responseStatus === 204) {
        Swal.fire("Feito", "Sala removida com sucesso!", "success");
        fetchSalas();

      } else {
        Swal.fire("Erro", "Salas vinculadas não podem ser deletadas", "error");
      }   
  } catch (error) {
    Swal.fire("Erro", `Erro ao editar Sala: ${error}`, "error");
  }
}


export async function EditarSala(salaDTO,fetchSalas) {
  try {
    if (!validarSala(salaDTO)) {
      Swal.fire("Erro", "Preencha os campos corretamente", "error");
    } else {
      const response = await editarSala(salaDTO);

      if (response.status === 200) {
        Swal.fire("Feito", "Sala editada com sucesso!", "success");
        fetchSalas();

      } else {
        Swal.fire("Erro", "Erro ao editar sala", "error");
      }

    }

  } catch (error) {
    Swal.fire("Erro", `Erro ao editar sala: ${error}`, "error");
  }
}


