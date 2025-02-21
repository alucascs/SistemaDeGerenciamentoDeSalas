import { useAlocacoes } from './hooks/useAlocacoes';
import useDisciplinas from './hooks/useDisciplinas';
import { TabelaAlocacoes } from './components/TabelaAlocacoes';
import { ListaDisciplinas } from './components/ListaDisciplinas';
import vincularDisciplina from './hooks/VincularDisciplina';
import { useContext, useState } from 'react';
import { UserContext } from '../../services/context/user';

function Home() {

  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  
    const alocacoes = useAlocacoes();
    const disciplinas = useDisciplinas(user);
  

    useState(() => {
        if (disciplinas !== undefined) {
            setLoading(false);
        }
    }, [disciplinas]);

    const handleVincular = () => {
        vincularDisciplina(user);
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-8 col-md-12 col-sm-12">
                    <h1 className="mb-3">Meu Horário</h1>
                    <TabelaAlocacoes alocacoes={alocacoes} />
                </div>

                <div className="col-lg-4 col-md-12 col-sm-12">
                    <h3 className="mb-3">Minhas Disciplinas:</h3>
                    {loading ? (
                        <p className="text-center text-muted">Carregando disciplinas...</p>
                    ) : disciplinas.length === 0 ? (
                        <p className="text-center text-muted">
                            Você ainda não tem disciplinas vinculadas, clique em vincular.
                        </p>
                    ) : (
                        <ListaDisciplinas disciplinas={disciplinas} />
                    )}
                    <button
                        className="btn btn-primary mt-3 w-100"
                        onClick={handleVincular}
                    >
                        <i className="bi bi-plus-circle"></i> Vincular Disciplina
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
