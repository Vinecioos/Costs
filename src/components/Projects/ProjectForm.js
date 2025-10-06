import { useState, useEffect } from 'react'; // Importa hooks do React

import Input from '../form/Input'; // Importa componente de input personalizado
import Select from '../form/Select'; // Importa componente de select personalizado
import SubmitButton from '../form/SubmitButton'; // Importa componente de botão de submit
import styles from './ProjectForm.module.css'; // Importa estilos CSS do módulo

function ProjectForm({ handleSubmit, btnText, projectData }) { // Define o componente ProjectForm com props

    const [categories, setCategories] = useState([]) // Estado para armazenar categorias
    const [project, setProject] = useState(projectData || {}) // Estado para armazenar dados do projeto

    useEffect(() => { // Hook para buscar categorias ao montar o componente
        fetch("http://localhost:5000/categories", { // Faz requisição GET para buscar categorias
            method: "GET",
            headers: {
                'Content-Type': 'application / json' // Define o tipo de conteúdo (tem um espaço extra aqui)
            }
        }).then((resp) => resp.json()) // Converte resposta para JSON
            .then((data) => {
                setCategories(data) // Atualiza estado com categorias recebidas
            })
            .catch(err => console.log(err)) // Exibe erro no console caso ocorra

    }, []) // Executa apenas uma vez ao montar

    const submit = (e) => { // Função chamada ao submeter o formulário
        e.preventDefault() // Previne recarregamento da página
        handleSubmit(project) // Chama função recebida por props com dados do projeto
        /* console.log(project) */ // Linha comentada para debug
        
    }

    function handleChange(e) { // Função para atualizar estado ao mudar inputs
        setProject({ ...project, [e.target.name]: e.target.value }) // Atualiza campo correspondente no estado

    }

    function handleCategory(e) { // Função para atualizar categoria selecionada
        setProject({
            ...project, category: { // Atualiza campo category no estado
                id: e.target.value, // Id da categoria selecionada
                name: e.target.options[e.target.selectedIndex].text, // Nome da categoria selecionada
            },
        })

    }

    return (
        <form onSubmit={submit} className={styles.form}> {/* Formulário com evento de submit e classe de estilo */}
            <Input
                type="text"
                text="Nome do projeto"
                name="name"
                placeholder="Insira o nome do projeto"
                handleOnChange={handleChange}
                value={project.name ? project.name: ''} // Valor do input, se existir
            />
            <Input
                type="number"
                text="Orçamento do projeto"
                name="budget"
                placeholder="Insira o orçamento total"
                handleOnChange={handleChange}
                value={project.budget ? project.budget: ''} // Valor do input, se existir
            />
            <Select
                name='category_id'
                text='Selecio a categoria'
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id: ''} // Valor selecionado, se existir
            />
            <SubmitButton text={btnText} /> {/* Botão de submit com texto recebido por props */}
        </form>
    )

}

export default ProjectForm; // Exporta o componente
