import { useState, useEffect } from 'react';

export function useDisciplinas() {
  const [disciplinas, setDisciplinas] = useState([]);

  useEffect(() => {
    const GetDisciplinasUsuario = async () => {
      const data = [
        { id: 1, nome: 'Matemática', codigoTurma: '2025.1', professor: 'zézinho' },
        { id: 2, nome: 'Lógica de Programação', codigoTurma: '2025.1', professor: 'jorginho' },
        { id: 3, nome: 'Química', codigoTurma: '2025.1', professor: 'mariazinha' },
      ];
      setDisciplinas(data);
    };

    GetDisciplinasUsuario();
  }, []);

  return disciplinas;
}
