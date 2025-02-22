// components/ListaDisciplinas.js
import React, { useContext } from 'react';
import { BiTrash } from "react-icons/bi";
import { DesvincularDisciplina } from '../../hooks/DesvincularDisciplina'; 
import { UserContext } from '../../../../services/context/user';  

export const ListaDisciplinas = ({ disciplinas, setReloadDisciplinas})=> {
  const { user } = useContext(UserContext); 

  return (
    <div>
      {disciplinas.length === 0 ? (
        <p className="text-center text-muted mt-3">
          Você ainda não tem disciplinas vinculadas. Clique em <strong>Vincular Disciplina</strong>.
        </p>
      ) : (
        <ul className="list-group">
          {disciplinas.map((disc) => (
            <li
              key={disc.id}
              className="list-group-item d-flex justify-content-between align-items-center shadow-sm"
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                borderRadius: "8px",
                padding: "12px",
                backgroundColor: "#f8f9fa",
              }}
            >
              {disc.nome}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => DesvincularDisciplina(user, disc.id, disc.nome, setReloadDisciplinas)} 
              >
                <BiTrash size={20} color="white" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
