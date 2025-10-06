# 💰 Costs - Gerenciador de Projetos e Custos

Este projeto é uma aplicação **SPA (Single Page Application)** desenvolvida com React para gerenciar projetos, orçamentos e custos de serviços associados.

O objetivo principal é permitir ao usuário cadastrar projetos e, em seguida, adicionar serviços a esses projetos, garantindo que o custo total dos serviços não exceda o orçamento definido.

## 🚀 Tecnologias Utilizadas

* **Frontend:** ReactJS (com Hooks, Context API)
* **Rotas:** React Router Dom
* **Dados (Mock API):** JSON Server (utilizando o arquivo `db.json`)
* **Estilização:** CSS Módulos

## ✨ Funcionalidades Principais

* **Criação de Projetos:** Definição do nome, orçamento e categoria.
* **Gestão de Serviços:** Adicionar e remover serviços (com seus respectivos custos) dentro de cada projeto.
* **Validação de Orçamento:** O sistema impede que o custo total dos serviços ultrapasse o orçamento inicial do projeto.
* **Exclusão de Projetos:** Remoção completa de um projeto e seus serviços.

## ⚙️ Como Rodar o Projeto Localmente

Para iniciar o projeto na sua máquina, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/Vinecioos/Costs.git](https://github.com/Vinecioos/Costs.git)
    cd Costs
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie a Mock API (JSON Server):**
    Abra um terminal e execute o comando para iniciar o banco de dados falso.
    ```bash
    npm run backend
    ```

4.  **Inicie o Frontend:**
    Abra **outro terminal** e execute o comando para iniciar a aplicação React.
    ```bash
    npm start
    ```

O projeto será aberto em seu navegador, geralmente em `http://localhost:3000/`.

## 🧑‍💻 Créditos e Referência

Este projeto foi desenvolvido como parte do curso e material didático do canal:

* **Matheus Battisti - Hora de Codar**

---
