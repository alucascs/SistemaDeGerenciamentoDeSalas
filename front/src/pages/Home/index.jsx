import { useAlocacoes } from './hooks/useAlocacoes';
import { useDisciplinas } from './hooks/useDisciplinas';
import { TabelaAlocacoes } from './components/TabelaAlocacoes';
import { ListaDisciplinas } from './components/ListaDisciplinas';
import { vincularDisciplina } from './hooks/VincularDisciplina';
import { UserContext } from '../../services/context/user';
import { useContext, useState } from 'react';

function Home() {
    const { user } = useContext(UserContext);
    const [disciplinas, setDisciplinas] = useState([]);
    const [alocacoes, setAlocacoes] = useState([]);
    const [reloadDisciplinas, setReloadDisciplinas] = useState(false);

    useDisciplinas(user, setDisciplinas, reloadDisciplinas);
    useAlocacoes(setAlocacoes, disciplinas);

    const handleVincular = () => {
        vincularDisciplina(user, disciplinas, setReloadDisciplinas);
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
                    {disciplinas.length === 0 ? (
                        <p className="text-center text-muted">
                            Você ainda não tem disciplinas vinculadas, clique em vincular.
                        </p>
                    ) : (
                        <ListaDisciplinas disciplinas={disciplinas} setReloadDisciplinas={setReloadDisciplinas} />
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
