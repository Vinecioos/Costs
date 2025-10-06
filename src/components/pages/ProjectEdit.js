import styles from './ProjectEdit.module.css'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import ProjectForm from '../Projects/ProjectForm'
import Load from '../layout/Load';
import Container from '../layout/Container'
import Message from '../layout/Message'

function ProjectEdit() {
    const { id } = useParams(); // Obtém o parâmetro 'id' da URL
    const [projectEdit, setProjectEdit] = useState(null); // Inicializa com null
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    // Efeito para buscar os dados do projeto
    useEffect(() => {
        // Faz uma requisição GET para buscar os dados do projeto
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(resp => resp.json()) // Converte a resposta para JSON
            .then((data) => {
                setProjectEdit(data); // Atualiza o estado com os dados do projeto
            })
            .catch(err => console.log(err)); // Exibe erro no console em caso de falha
    }, [id]); // A dependência é o 'id', que muda quando o projeto é editado ou selecionado

    function editPost(projectEdit) {
        setMessage('')


        if (projectEdit.budget < projectEdit.costs) {
            setMessage('O orçamento não podeser menor que o custo do projeto!')
            setType('error')
            return false
        }
        fetch(`http://localhost:5000/projects/${projectEdit.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectEdit),
        })
            .then(resp => resp.json())
            .then((data) => {

                setProjectEdit(data)
                setShowProjectForm(false)
                setMessage('Projeto atualizado!')
                setType('success')
            })
            .catch(err => console.log(err))
    }


    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm); // Alterna a visibilidade do formulário
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm); // Alterna a visibilidade do formulário
    }

    // Renderiza o componente
    return (
        <>
            {projectEdit ? ( // Verifica se os dados foram carregados corretamente
                <div className={styles.projectEdit_details}>
                    <Container customClass='column'>
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Projeto : {projectEdit.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {projectEdit.category.name}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento:</span> R${projectEdit.budget}
                                    </p>
                                    <p>
                                        <span>Total utilizado:</span> R${projectEdit.costs}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm handleSubmit={editPost} btnText='Concluir Edição' projectData={projectEdit} />
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adcione um serviço</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adcionar Serviço' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (<div>Formulário do Serviço</div>)}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            <p>Serviço</p>
                        </Container>
                    </Container>
                </div>
            ) : (
                // Caso o projeto ainda esteja sendo carregado, exibe o componente de loading
                <Load />
            )}
        </>
    );
}

export default ProjectEdit;
