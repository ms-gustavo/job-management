<h1>Sistema de Gerenciamento de Vagas de Emprego</h1>
        
  <h2>Descrição do Projeto</h2>
        <p>O Sistema de Gerenciamento de Vagas de Emprego é uma aplicação web desenvolvida para facilitar a administração e organização de candidaturas a empregos. Utilizando uma stack moderna e robusta, o sistema permite que usuários registrem, visualizem e atualizem informações sobre vagas de emprego de forma eficiente e intuitiva.</p>
        
  <h2>Funcionalidades Principais</h2>
        <p>- <strong>Página Inicial:</strong> Interface de login e registro com design responsivo, otimizado para diferentes tamanhos de tela. Inclui um formulário de login, um link para registro e uma descrição do sistema.</p>

        
 ![Login light mode](https://github.com/user-attachments/assets/f5c6ab8d-3d7a-4bcf-bbdf-04321d112980)

        
 <p>- <strong>Registro de Vagas:</strong> Permite aos usuários adicionar novas vagas de emprego com informações como título, empresa, status, data de aplicação e site. O status pode ser "Análise", "Aprovado" ou "Reprovado", e a data de aplicação é preenchida automaticamente.</p>
 
 ![Registro de vagas](https://github.com/user-attachments/assets/1e4f30ff-5587-4e38-8c44-5f9ea23b044f)

        

<p>- <strong>Listagem de Vagas:</strong> Exibe as vagas em cards organizados responsivamente. Os usuários podem filtrar e ordenar as vagas por status ou data de aplicação.</p>

![Lista de vagas](https://github.com/user-attachments/assets/236b98fe-7657-4fba-baa1-398d79bc02d0)

<p>- <strong>Edição de Status:</strong> Permite alterar o status da vaga diretamente na listagem através de um menu suspenso, com alterações salvas automaticamente.</p>
<p>- <strong>Exclusão de Vagas:</strong> Inclui um botão de exclusão para remover vagas do sistema.</p>

![Lista de vagas light mode](https://github.com/user-attachments/assets/1774ece2-48c1-4a7a-bda7-c5e84457ed45)

        
  <h2>Rotas da API</h2>
        <ul>
            <li><strong>Deletar Vaga:</strong> <code>DELETE /api/jobs/${id}</code> - Remove uma vaga do sistema.</li>
            <li><strong>Atualizar Status da Vaga:</strong> <code>PUT /api/updatejobs/${id}</code> - Atualiza o status da vaga com o ID fornecido.</li>
            <li><strong>Logar Usuário:</strong> <code>POST /api/login</code> - Realiza o login do usuário com base nas credenciais fornecidas.</li>
            <li><strong>Registrar Nova Vaga:</strong> <code>POST /api/new-job</code> - Adiciona uma nova vaga ao sistema com as informações fornecidas.</li>
            <li><strong>Registrar Novo Usuário:</strong> <code>POST /api/register</code> - Registra um novo usuário com as informações fornecidas.</li>
            <li><strong>Pegar Dados do Usuário:</strong> <code>GET /api/user-data</code> - Obtém os dados do usuário autenticado.</li>
        </ul>
        
   <h2>Tecnologias Utilizadas</h2>
        <p>- <strong>Frontend:</strong> React, Next.js, Tailwind CSS e TypeScript proporcionam uma experiência de usuário dinâmica e responsiva.</p>
        <p>- <strong>Backend:</strong> Prisma para gerenciamento do banco de dados, facilitando operações de criação, atualização e exclusão de registros.</p>
        <p>- <strong>Autenticação e Gerenciamento:</strong> Context API para gerenciamento de estado e autenticação de usuários.</p>
        <p>- <strong>Testes:</strong> Jest para garantir a qualidade e confiabilidade do código.</p>
        
   <h2>Instalação e Configuração</h2>
        <ol>
            <li><strong>Clone o repositório:</strong></li>
            <pre><code>git clone https://github.com/ms-gustavo/job-management.git
cd job-management</code></pre>
            <li><strong>Instale as dependências:</strong></li>
            <pre><code>npm install</code></pre>
            <li><strong>Configure as variáveis de ambiente:</strong></li>
            <pre><code>Crie um arquivo <code>.env</code> na raiz do projeto e adicione as seguintes variáveis:

DATABASE_URL="sua_url_do_banco_de_dados"
TOKEN_SECRET_KEY="sua_chave_secreta"</code></pre>
            <li><strong>Configure o banco de dados:</strong></li>
            <pre><code>npx prisma migrate dev</code></pre>
            <li><strong>Inicie o servidor de desenvolvimento:</strong></li>
            <pre><code>npm run dev</code></pre>
            <p>O aplicativo estará disponível em <code>http://localhost:4000</code>.</p>
        </ol>
        
   <h2>Scripts Disponíveis</h2>
        <ul>
            <li><code>npm run dev</code>: Inicia o servidor de desenvolvimento.</li>
            <li><code>npm run build</code>: Compila o projeto para produção.</li>
            <li><code>npm run start</code>: Inicia o servidor de produção.</li>
            <li><code>npm run lint</code>: Executa o linter para verificar o código.</li>
            <li><code>npm run test</code>: Executa os testes.</li>
        </ul>
        
  <h2>Aprimoramentos</h2>
        <p>- Adicionar testes automatizados para garantir a qualidade e a confiabilidade do código.</p>
        
  <h2>Contribuição</h2>
        <p>Se você deseja contribuir para este projeto, por favor, faça um fork do repositório e envie um pull request com suas melhorias ou correções.</p>
