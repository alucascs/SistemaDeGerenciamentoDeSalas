import { useEffect } from 'react';

export function useAlocacoes(setAlocacoes, disciplinas) {
  useEffect(() => {
    const getAlocacoes = async () => {
      const data = [
        { disciplina: 'Matemática', sala: '101', horario: '17:00', diaSemana: 'Segunda-feira' },
        { disciplina: 'Matemática', sala: '101', horario: '17:50', diaSemana: 'Segunda-feira' },
        { disciplina: 'Lógica de Programação', sala: '102', horario: '18:40', diaSemana: 'Terça-feira' },
        { disciplina: 'Lógica de Programação', sala: '102', horario: '19:30', diaSemana: 'Terça-feira' },
        { disciplina: 'Química', sala: '103', horario: '20:20', diaSemana: 'Quarta-feira' },
        { disciplina: 'Química', sala: '103', horario: '21:10', diaSemana: 'Quarta-feira' },
      ];
      setAlocacoes(data);
    };

    getAlocacoes();
  }, [disciplinas]);
}
