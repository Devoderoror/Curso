# Protótipo de Aplicativo Educacional

Este repositório contém o código-fonte de um **Protótipo de Aplicativo Educacional** focado em fornecer conteúdo de curso com forte ênfase em **gamificação** e engajamento do usuário. O aplicativo é um Single Page Application (SPA) construído com tecnologias web modernas, apresentando uma interface dinâmica e um sistema para rastrear o progresso do usuário, pontos e conquistas.

## ✨ Funcionalidades

O aplicativo foi projetado para oferecer uma experiência de aprendizado abrangente com as seguintes funcionalidades principais:

*   **Aprendizagem Modular:** O conteúdo é organizado em módulos distintos (`ModulosPage`).
*   **Questionários Interativos:** Cada módulo inclui um questionário (`QuizPage`) para testar o conhecimento.
*   **Sistema de Gamificação:** Rastreia o progresso do usuário, concede pontos e gerencia conquistas.
*   **Painel do Usuário (Dashboard):** Um painel dedicado (`DashboardPage`) para visualizar estatísticas, módulos concluídos e pontuações.
*   **Sistema de Classificação (Ranking):** Uma página de classificação simulada (`RankingPage`) para simular a competição.
*   **Página de Dicas:** Uma seção para conselhos ou recursos adicionais (`DicasPage`).
*   **Alternância de Tema:** Suporta a alternância entre os modos claro e escuro.

## 💻 Pilha de Tecnologia

O projeto é construído usando um conjunto moderno e robusto de ferramentas e bibliotecas:

| Categoria | Tecnologia | Propósito | Referência |
|-----------|------------|-----------|------------|
| **Núcleo** | React | Biblioteca JavaScript de frontend para construção de interfaces de usuário. | [2] |
| **Linguagem** | TypeScript | Superconjunto de JavaScript que adiciona tipagem estática. | [3] |
| **Ferramenta de Build** | Vite | Ferramenta de frontend de próxima geração para desenvolvimento rápido. | [4] |
| **Estilização** | Tailwind CSS | Framework CSS utility-first para desenvolvimento rápido de UI. | [5] |
| **Componentes UI** | Radix UI / shadcn/ui | Componentes de UI de alta qualidade, acessíveis e personalizáveis. | [6], [7] |
| **Estado/Dados** | Local Storage | Usado para persistir o progresso do usuário e a preferência de tema. | [14] |
| **Visualização de Dados** | Recharts | Biblioteca de gráficos componível construída com componentes React. | [9] |

## 🚀 Primeiros Passos

Siga estas etapas para configurar e executar o projeto localmente.

### Pré-requisitos

Você precisará do seguinte software instalado em sua máquina:

*   Node.js (versão LTS recomendada)
*   npm ou pnpm (pnpm é recomendado, pois é frequentemente usado em projetos modernos React/Vite)

### Instalação

1.  **Clone o repositório** (ou extraia o arquivo `Curso.zip` fornecido).
2.  **Navegue até o diretório do projeto:**
    ```bash
    cd Curso
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    # ou pnpm install
    ```

### Executando o Aplicativo

O projeto inclui dois scripts principais para desenvolvimento e produção:

| Script | Comando | Descrição |
|--------|---------|-----------|
| **Desenvolvimento** | `npm run dev` | Inicia o servidor de desenvolvimento Vite. O aplicativo estará disponível em `http://localhost:5173` (ou outra porta se a 5173 estiver em uso). |
| **Build** | `npm run build` | Compila o aplicativo para produção no diretório `dist`. |

## ⚙️ Sistema de Gamificação

O aplicativo implementa uma camada abrangente de gamificação para motivar os usuários.

### Armazenamento do Progresso do Usuário

Os dados do usuário são gerenciados por meio do utilitário `storage.ts` [14] e persistidos no **Local Storage** do navegador sob a chave `cybersecurity_app_data`. Os dados armazenados incluem:

*   `completedModulos`: Lista de IDs de módulos concluídos.
*   `scores`: Pontuação mais alta do questionário para cada módulo.
*   `totalPoints`: Total de pontos acumulados.
*   `level`: Nível atual do usuário.
*   `achievements`: Lista de IDs de conquistas desbloqueadas.
*   `quizAttempts`: Número de tentativas de questionário para cada módulo.

### Pontos e Nivelamento

O sistema de nivelamento é baseado em pontos acumulados, com a seguinte estrutura:

| Ação | Pontos Concedidos | Notas | Referência |
|------|-------------------|-------|------------|
| Concluir um Módulo | 100 | Concedido apenas na primeira conclusão. | [14] |
| Questionário Perfeito (100%) | 50 | Pontos bônus por uma pontuação perfeita. | [14] |
| Sucesso na Primeira Tentativa | 25 | Pontos bônus por passar no questionário na primeira tentativa. | [14] |
| Tentativa de Questionário | 10 | Pontos base por tentar um questionário. | [14] |

O **Nível** do usuário é calculado com base nos pontos totais, com um novo nível alcançado a cada **250 pontos** [14].

## 📂 Estrutura do Projeto

A lógica central do aplicativo reside no diretório `src`:

```
Curso/
├── node_modules/
├── index.html              # Arquivo HTML principal
├── package.json            # Dependências e scripts do projeto
├── package-lock.json
└── src/
    ├── App.tsx             # Componente principal do aplicativo e lógica de roteamento
    ├── main.tsx            # Ponto de entrada do aplicativo (raiz React)
    ├── index.css           # Importações do Tailwind CSS e estilos personalizados
    ├── components/         # Componentes de UI reutilizáveis e componentes de página
    ├── guidelines/         # Contém documentação do projeto (ex: Guidelines.md)
    └── lib/                # Funções de utilidade e dados
        ├── achievements.ts # Lógica para verificar e gerenciar conquistas
        ├── certificate-generator.ts # Utilitário para geração de certificados
        └── storage.ts      # Funções para gerenciar o progresso do usuário no Local Storage
```

## 📝 Atribuições e Licenciamento

Este projeto utiliza componentes e ativos de fontes externas:

*   **Componentes UI:** Componentes do **shadcn/ui** estão incluídos, que são usados sob a **Licença MIT** [7].
*   **Fotografia:** As fotos usadas no protótipo são provenientes do **Unsplash** e são usadas sob a Licença Unsplash [17].

---

## Referências

[1] Título do Projeto: `Prototipo de App Educacional`. Fonte: `curso_project/Curso/index.html`.

[2] Dependência React. Fonte: `curso_project/Curso/package.json`.

[3] Uso de TypeScript. Fonte: Extensões de arquivo `.tsx` e `@types/node` em `curso_project/Curso/package.json`.

[4] Dependência Vite. Fonte: `curso_project/Curso/package.json`.

[5] Dependência Tailwind CSS. Fonte: `curso_project/Curso/package.json` e `curso_project/Curso/src/index.css`.

[6] Dependências Radix UI. Fonte: `curso_project/Curso/package.json`.

[7] Atribuição shadcn/ui. Fonte: `curso_project/Curso/src/Attributions.md`.

[8] Dependência react-hook-form. Fonte: `curso_project/Curso/package.json`.

[9] Dependência Recharts. Fonte: `curso_project/Curso/package.json`.

[10] Dependência embla-carousel-react. Fonte: `curso_project/Curso/package.json`.

[11] Dependência next-themes. Fonte: `curso_project/Curso/package.json`.

[12] Dependência sonner. Fonte: `curso_project/Curso/package.json`.

[13] Dependência lucide-react. Fonte: `curso_project/Curso/package.json`.

[14] Sistema de Progresso e Pontos do Usuário. Fonte: `curso_project/Curso/src/lib/storage.ts`.

[15] Sistema de Conquistas. Fonte: `curso_project/Curso/src/App.tsx`.

[16] Scripts de Desenvolvimento. Fonte: `curso_project/Curso/package.json`.

[17] Atribuição Unsplash. Fonte: `curso_project/Curso/src/Attributions.md`.
