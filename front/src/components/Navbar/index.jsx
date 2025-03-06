import { Link, useNavigate } from "react-router-dom";
import { useEffect, useContext, useRef } from "react";
import { UserContext } from '../../services/context/user';
import Swal from "sweetalert2";
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";

const Navbar = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const tourInstance = useRef(null); // Armazena uma única instância do tour
    const tourIniciado = useRef(false); // Previne múltiplos disparos

    useEffect(() => {
        if (user?.id && !tourIniciado.current) {
            const tutorialKey = `tutorial_visto_${user.id}`;
            const tutorialVisto = localStorage.getItem(tutorialKey);

            if (!tutorialVisto) {
                tourIniciado.current = true; // Marca como iniciado
                exibirBoasVindasEIniciarTutorial(tutorialKey);
            }
        }
    }, [user]);

    const exibirBoasVindasEIniciarTutorial = (tutorialKey) => {
        Swal.fire({
            title: `Bem-vindo, ${user?.nome || 'usuário'}!`,
            text: "Vamos te mostrar um rápido tour pela plataforma.",
            icon: "info",
            confirmButtonText: "Vamos lá!"
        }).then((result) => {
            if (result.isConfirmed) {
                iniciarTutorial();
                localStorage.setItem(tutorialKey, "visto");
            }
        });
    };

    const iniciarTutorial = () => {
        tourInstance.current = new Shepherd.Tour({
            useModalOverlay: true,
            defaultStepOptions: {
                scrollTo: { behavior: 'smooth', block: 'center' },
                cancelIcon: { enabled: true },
                classes: 'custom-shepherd-step',
                popperOptions: {
                    modifiers: [{ name: 'offset', options: { offset: [0, 12] } }]
                }
            }
        });

        adicionarEtapasDoTour();
        tourInstance.current.start();
    };

    const adicionarEtapasDoTour = () => {
        const addStep = (id, header, text, footer, element, placement) => {
            tourInstance.current.addStep({
                id,
                text: `
                <div class="custom-shepherd-step-header">${header}</div>
                <div class="shepherd-text">${text}</div>
                <div class="custom-shepherd-step-footer">${footer}</div>
            `,
                attachTo: { element, on: placement },
                buttons: [
                    { text: 'Próximo', action: tourInstance.current.next, classes: 'custom-shepherd-button' }
                ]
            });
        };

        addStep(
            'logo',
            'Painel Inicial',
            'Clique no <strong>IFBA</strong> para voltar à página inicial.',
            'Dica: este é seu ponto de partida.',
            '.navbar-brand',
            'bottom'
        );

        addStep(
            'home',
            'Painel Inicial',
            'Acesse a <strong>Home</strong> para visualizar suas disciplinas vinculadas e seus respectivos horários.',
            '',
            '.nav-link[href="/home"]',
            'bottom'
        );

        addStep(
            'alocacoes',
            'Alocações',
            'Consulte todas as salas e suas <strong>alocações de aulas</strong> nesta aba.',
            'Aqui você encontra uma visão geral de tudo.',
            '.nav-link[href="/alocacoes"]',
            'bottom'
        );

        if (user?.role === "PROFESSOR") {
            addStep(
                'disciplinas',
                'Disciplinas',
                'Gerencie suas <strong>disciplinas</strong> aqui.',
                'Professores podem adicionar, editar ou até mesmo excluir suas matérias.',
                '.nav-link[href="/disciplinas"]',
                'bottom'
            );

            addStep(
                'salas',
                'Salas',
                'Gerencie as <strong>salas</strong> para suas aulas.',
                'Professores podem adicionar, editar ou excluir salas.',
                '.nav-link[href="/salas"]',
                'bottom'
            );

            addStep(
                'aulas',
                'Aulas',
                'Gerencie seus <strong>horários de aula</strong> aqui.',
                'Aqui será possível visualizar um painel geral das aulas cadastradas, assim como gerenciá-las.',
                '.nav-link[href="/aulas"]',
                'bottom'
            );
        }

        addStep(
            'logout',
            'Sair do Sistema',
            'Sempre lembre-se de <strong>fazer logout</strong> ao sair.',
            'Segurança é fundamental! 🔒',
            '.BtnLogout',
            'bottom'
        );
    };

    const handleAuth = () => {
        sessionStorage.removeItem("authToken");
        navigate("/login");
        Swal.fire({
            toast: true,
            icon: "success",
            title: "Logout realizado com sucesso!",
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container d-flex justify-content-between align-items-center w-100">
                <Link className="navbar-brand fw-bold" to="/">IFBA</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/alocacoes">Alocações Gerais</Link>
                        </li>
                        {user?.role === "PROFESSOR" && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/disciplinas">Disciplinas</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/salas">Salas</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/aulas">Aulas</Link>
                                </li>
                            </>
                        )}
                        <li className="nav-item">
                            <button className="BtnLogout" onClick={handleAuth}>
                                <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                                <div className="text">Logout</div>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
