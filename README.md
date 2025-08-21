# Sistema de Consultoria em Tempo Real

Este projeto é uma plataforma de consultoria online desenvolvida para conectar clientes com dúvidas a consultores disponíveis para respondê-las em tempo real. A principal característica do sistema é o mecanismo de reivindicação de perguntas, que garante que cada dúvida seja atendida por apenas um consultor, evitando duplicidade de esforços e otimizando o fluxo de atendimento.

## 💡 Contexto

A plataforma foi criada para resolver um cenário comum em sistemas de suporte: múltiplos agentes tentando responder à mesma pergunta simultaneamente. Com este sistema:

1.  Um cliente envia uma pergunta.
2.  Todos os consultores online recebem a pergunta em tempo real.
3.  O primeiro consultor que decide atender, "reivindica" a pergunta, bloqueando-a para os demais.
4.  Após a resposta, a interação é salva no histórico tanto do cliente quanto do consultor.

## 🚀 Tecnologias Utilizadas

A aplicação foi construída utilizando uma stack moderna e robusta, focada em performance e comunicação em tempo real.

-   **Back-end:** [Node.js](https://nodejs.org/) com [NestJS](https://nestjs.com/)
-   **Front-end:** [Next.js](https://nextjs.org/) com [Tailwind CSS](https://tailwindcss.com/)
-   **Comunicação em Tempo Real:** [WebSockets](https://developer.mozilla.org/pt-BR/docs/Web/API/WebSockets_API) (via [Socket.IO](https://socket.io/))
-   **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
-   **Ambiente de Execução:** [Docker](https://www.docker.com/)

## ⚙️ Como Executar o Projeto

Para rodar a aplicação localmente, você precisará ter o **Docker** e o **Docker Compose** instalados. Siga os passos abaixo:

### 1. Clonar o Repositório

Primeiro, clone este repositório para a sua máquina local.

```bash
git clone https://github.com/Lusquiinha/SistemaConsultoria.git
cd SistemaConsultoria
```

### 2. Configurar as Variáveis de Ambiente

O projeto utiliza arquivos `.env` para gerenciar as configurações sensíveis. Você precisará criar três arquivos de ambiente a partir dos exemplos fornecidos.

-   **Para o Back-end:**
    Copie o arquivo `back.env.example` e renomeie a cópia para `back.env`.
    ```bash
    cp back.env.example back.env
    ```

-   **Para o Front-end:**
    Copie o arquivo `front.env.example` e renomeie a cópia para `front.env`.
    ```bash
    cp front.env.example front.env
    ```

-   **Para o Banco de Dados:**
    Copie o arquivo `database.env.example` e renomeie a cópia para `database.env`.
    ```bash
    cp database.env.example database.env
    ```

**Importante:** Se necessário, ajuste os valores dentro dos arquivos `.env` recém-criados, especialmente as credenciais do banco de dados no `database.env` e os secrets e credenciais de email no `back.env`. Os valores padrão devem funcionar em um ambiente de desenvolvimento padrão.

### 3. Construir e Iniciar os Contêineres (Primeira Vez)

Na primeira vez que for executar o projeto, você precisa construir as imagens Docker e iniciar os contêineres. O comando a seguir fará todo o processo.

```bash
docker compose up --build -d
```

O `-d` (detached mode) executa os contêineres em segundo plano.

### 4. Iniciar os Contêineres (Vezes Subsequentes)

Após a primeira execução, você não precisa mais usar o `--build`, a menos que tenha feito alterações nas dependências ou na configuração do Docker. Para simplesmente iniciar a aplicação, use:

```bash
docker compose up -d
```

Para parar a aplicação, execute:

```bash
docker compose down
```

### 5. Acessando a Aplicação

Depois que os contêineres estiverem em execução, você poderá acessar:

-   **Front-end (Aplicação do Cliente/Consultor):** `http://localhost:3001`
-   **Back-end (API):** `http://localhost:3000`


