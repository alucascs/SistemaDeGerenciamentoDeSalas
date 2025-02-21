import { useAlocacoes } from './hooks/useAlocacoes';
import { useDisciplinas } from './hooks/useDisciplinas';
import { TabelaAlocacoes } from './components/TabelaAlocacoes';
import { ListaDisciplinas } from './components/ListaDisciplinas';
import vincularDisciplina from './hooks/VincularDisciplina';
import { useContext } from 'react';
import { UserContext } from '../../services/context/user';

function Home() {
  
  const alocacoes = useAlocacoes();
  const disciplinas = useDisciplinas();

  const { user } = useContext(UserContext); // Obtendo o usuário do contexto

  const handleVincular = () => {
      vincularDisciplina(user); // Passando o user para a função
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-8 col-md-12 col-sm-12">
          <h1 className="mb-3">Meu Horario</h1>
          <TabelaAlocacoes alocacoes={alocacoes} />
        </div>

        <div className="col-lg-4 col-md-12 col-sm-12">
          <h3 className="mb-3">Minhas Disciplinas:</h3>
          <ListaDisciplinas disciplinas={disciplinas} />
          <button
            className="btn btn-primary mt-3 w-100"
            onClick={() => handleVincular()}
          >
            <i className="bi bi-plus-circle"></i> Vincular Disciplina
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
