# Marson Psicologia — Sistema de Anamnese

Aplicação Angular 17 com arquitetura **Component + Service (MVVM)**, organizada por features.

---

## 🗂 Estrutura do Projeto

```
src/app/
├── core/
│   ├── models/          # Interfaces: Question, Answer, PatientRecord
│   └── services/
│       ├── question.service.ts   # Gerencia perguntas (signals + localStorage)
│       ├── patient.service.ts    # Gerencia pacientes (signals + localStorage + mock data)
│       ├── pdf.service.ts        # Exportação PDF via jsPDF
│       └── toast.service.ts      # Notificações globais
├── features/
│   ├── home/                     # Tela inicial (seleção de acesso)
│   ├── patient/
│   │   ├── patient-form/         # Formulário de anamnese (2 etapas: nome → perguntas)
│   │   └── patient-success/      # Tela de confirmação
│   └── psychologist/
│       ├── psych-login/          # Login do psicólogo
│       ├── psych-panel/          # Painel: gerenciar perguntas + lista de pacientes
│       └── patient-detail/       # Respostas do paciente + export PDF
├── shared/
│   └── components/toast/         # Componente global de notificação
└── styles/
    └── _shared.scss              # Variáveis de cores, botões e elementos globais
```

---

## 🚀 Como Rodar

### Pré-requisitos
- **Node.js** 18 ou superior → https://nodejs.org
- **npm** 9 ou superior (já vem com o Node)

### Passos

```bash
# 1. Entre na pasta do projeto
cd marson-psicologia

# 2. Instale as dependências
npm install

# 3. Rode o servidor de desenvolvimento
npm start
```

O browser abrirá automaticamente em **http://localhost:4200**

---

## 🔐 Acesso ao Painel do Psicólogo

Senha padrão: **`psico123`**

---

## 👥 Dados Mock (pré-carregados)

3 pacientes já cadastrados para testar imediatamente:
- **Ana Beatriz Souza** — 10/04/2026
- **Carlos Eduardo Lima** — 14/04/2026
- **Fernanda Oliveira** — 18/04/2026

Os dados são salvos no **localStorage** do navegador. Para resetar, abra o DevTools → Application → Local Storage → limpar as chaves `mp_questions` e `mp_patients`.

---

## 🧠 Funcionalidades

| Feature | Descrição |
|---|---|
| Acesso Paciente | Formulário de anamnese em 2 etapas |
| Perguntas texto livre | Campo de resposta aberta |
| Perguntas múltipla escolha | Escolha única ou múltipla seleção |
| Acesso Psicólogo | Login com senha |
| Gerenciar perguntas | Adicionar e excluir perguntas |
| Lista de pacientes | Visualizar todos os registros |
| Detalhe do paciente | Ver todas as respostas |
| Export PDF | Gera PDF formatado com identidade Marson Psicologia |
| Persistência | Dados salvos em localStorage |

---

## 🏗 Decisões de Arquitetura

- **Standalone Components** — Angular 17, sem NgModules
- **Signals** — estado reativo sem RxJS desnecessário
- **Lazy loading** — cada rota carrega seu componente sob demanda
- **SCSS com partial compartilhado** — `_shared.scss` centraliza variáveis e classes reutilizáveis
- **Services como única fonte de verdade** — componentes apenas leem e disparam ações
