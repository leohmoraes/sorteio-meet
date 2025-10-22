
# SorteioMeet - Sorteio de Nomes

## 📖 Descrição

SorteioMeet é uma aplicação web simples e intuitiva para criar e gerenciar sorteios privados. Com ela, um administrador pode gerar um link de participação exclusivo, que pode ser compartilhado para que outras pessoas se inscrevam. O administrador tem controle total sobre o evento, podendo abrir/fechar as inscrições, definir a quantidade de vencedores e sortear nomes de forma aleatória e justa, sem repetições.

A ferramenta é ideal para sorteios em equipes de trabalho, eventos, promoções ou qualquer situação que precise de uma lista de nomes e um sorteio transparente. Toda a gestão é feita no lado do cliente, utilizando o `localStorage` do navegador para persistir os dados, o que a torna rápida e sem a necessidade de um backend.

---

## ✨ Principais Funcionalidades

- **Criação de Sorteios Privados**: Gere um evento com um link (hash de 6 dígitos) único e privado.
- **Página de Inscrição**: Participantes podem se inscrever com seu nome através do link compartilhado.
- **Validação de Nomes**: Impede o registro de nomes duplicados (ignorando maiúsculas/minúsculas e espaços).
- **Painel do Administrador**: Controle total sobre o sorteio.
  - Abrir e fechar inscrições a qualquer momento.
  - Visualizar a lista completa de participantes e a contagem de inscritos.
  - Definir o número de ganhadores a serem sorteados.
  - Sortear um ou mais ganhadores de uma vez.
  - Sortear um ganhador adicional (+1) quando necessário.
- **Lista de Vencedores**: Os nomes sorteados são movidos para uma lista de vencedores e não podem ser sorteados novamente.
- **Tags Personalizadas**: O administrador pode adicionar uma tag editável (ex: "Prêmio A", "Contato") ao lado do nome de cada vencedor.
- **Persistência de Dados**: Os dados do sorteio são salvos localmente no navegador, permitindo que o administrador feche e reabra a página sem perder informações.
- **Design Responsivo**: Interface limpa e funcional em desktops e dispositivos móveis.

---

## 🖼️ Telas da Aplicação

| Tela Inicial | Painel do Administrador | Página de Inscrição |
| :---: | :---: | :---: |
| ![Tela Inicial](./screenshots/tela-inicial.png "Crie um novo sorteio com um título.") | ![Painel do Administrador](./screenshots/admin.png "Gerencie participantes, configurações e sorteie os vencedores.") | ![Página de Inscrição](./screenshots/user1.png "Participantes se inscrevem aqui.") |

---

## 📝 Documento de Requisitos do Produto (PRD)

### 1. Visão Geral
O SorteioMeet visa fornecer uma solução de código aberto, gratuita e fácil de usar para a criação e gestão de sorteios baseados em listas de nomes. O projeto resolve a necessidade comum de realizar sorteios rápidos e justos em ambientes corporativos, educacionais ou sociais, sem a complicação de usar planilhas ou ferramentas complexas.

### 2. Personas de Usuário

-   **Carlos, o Organizador (Administrador)**:
    -   **Quem é**: Um líder de equipe que quer sortear prêmios no final do trimestre.
    -   **Necessidades**: Precisa de uma forma rápida para que todos da equipe se inscrevam, quer garantir que o sorteio seja justo e transparente, e precisa registrar quem ganhou cada prêmio.
    -   **Objetivo**: Criar o sorteio em menos de 1 minuto, compartilhar um link no grupo da equipe e realizar o sorteio durante a reunião trimestral.

-   **Ana, a Participante**:
    -   **Quem é**: Membro da equipe do Carlos.
    -   **Necessidades**: Quer uma forma simples de adicionar seu nome à lista, sem precisar de cadastros ou logins.
    -   **Objetivo**: Clicar no link enviado por Carlos, digitar seu nome e ter a certeza de que está concorrendo.

### 3. Requisitos Funcionais (User Stories)

#### Épico: Criação do Sorteio
-   **Como** um Administrador, **eu quero** criar um novo sorteio fornecendo um título, **para que** eu possa iniciar um novo evento.
-   **Como** um Administrador, **eu quero** que um link de administração único seja gerado automaticamente, **para que** eu possa gerenciar meu sorteio de forma privada.

#### Épico: Gestão do Sorteio (Visão do Administrador)
-   **Como** um Administrador, **eu quero** ver um link de participação compartilhável e um botão para copiá-lo, **para que** eu possa convidar pessoas facilmente.
-   **Como** um Administrador, **eu quero** um botão para abrir ou fechar as inscrições, **para que** eu tenha controle sobre quem e quando pode entrar no sorteio.
-   **Como** um Administrador, **eu quero** visualizar a lista de todos os participantes inscritos e a contagem total, **para que** eu possa acompanhar o engajamento.
-   **Como** um Administrador, **eu quero** definir quantos vencedores sortear de uma vez, **para que** eu possa adaptar o sorteio à quantidade de prêmios.
-   **Como** um Administrador, **eu quero** um botão para "Sortear Ganhadores", **para que** eu possa selecionar os vencedores de forma aleatória da lista de participantes restantes.
-   **Como** um Administrador, **eu quero** um botão para "Sortear +1 Ganhador", **para que** eu possa sortear vencedores adicionais, se necessário.
-   **Como** um Administrador, **eu quero** que os vencedores sejam movidos para uma lista separada e não possam ser sorteados novamente, **para que** o sorteio seja justo.
-   **Como** um Administrador, **eu quero** adicionar e editar uma tag de texto ao lado de cada vencedor, **para que** eu possa anotar informações adicionais (ex: prêmio, status).

#### Épico: Participação no Sorteio (Visão do Participante)
-   **Como** um Participante, **eu quero** acessar uma página de inscrição através de um link, **para que** eu possa entrar no sorteio correto.
-   **Como** um Participante, **eu quero** inserir meu nome em um campo de texto, **para que** eu possa me identificar na lista.
-   **Como** um Participante, **eu quero** ser impedido de registrar um nome que já existe (sem diferenciar maiúsculas/minúsculas), **para que** não haja duplicidade.
-   **Como** um Participante, **eu quero** receber uma mensagem de confirmação após me inscrever, **para que** eu saiba que minha participação foi registrada.
-   **Como** um Participante, **eu quero** ver uma mensagem informando que as inscrições estão encerradas se eu tentar me inscrever fora do prazo, **para que** eu entenda por que não posso participar.

### 4. Requisitos Não-Funcionais
-   **Usabilidade**: A interface deve ser limpa, intuitiva e exigir o mínimo de cliques para completar as ações principais.
-   **Performance**: A aplicação deve ser rápida, com feedback visual imediato para as ações do usuário, já que todas as operações são no cliente.
-   **Compatibilidade**: Deve funcionar corretamente nos navegadores modernos (Chrome, Firefox, Safari, Edge).
-   **Persistência**: O estado do sorteio (participantes, vencedores, configurações) deve ser salvo no `localStorage` do navegador para sobreviver a recarregamentos de página.

### 5. Escopo Futuro (Fora da v1.0)
-   Possibilidade de remover um participante da lista.
-   Funcionalidade para reiniciar um sorteio (limpar vencedores e manter participantes).
-   Exportar a lista de participantes e/ou vencedores para CSV.
-   Autenticação para administradores para proteger os sorteios com senha.
-   Suporte a um backend para sorteios persistentes entre diferentes dispositivos.

---

## 🛠️ Tecnologias Utilizadas

-   **Frontend**: [React](https://react.dev/) (com TypeScript)
-   **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
-   **Roteamento**: [React Router](https://reactrouter.com/)
-   **Armazenamento**: [Web Storage API (localStorage)](https://developer.mozilla.org/pt-BR/docs/Web/API/Web_Storage_API)

