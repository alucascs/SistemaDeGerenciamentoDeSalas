// components/ListaDisciplinas.js
import React, { useContext } from 'react';
import { BiTrash } from "react-icons/bi";
import { DesvincularDisciplina } from '../../hooks/DesvincularDisciplina'; 
import { UserContext } from '../../../../services/context/user';  

export const ListaDisciplinas = ({ disciplinas }) => {
  const { user } = useContext(UserContext); 

  return (
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
            onClick={() => DesvincularDisciplina(user, disc.id, disc.nome)} 
          >
            <BiTrash size={20} color="white" />
          </button>
        </li>
      ))}
    </ul>
  );
};
