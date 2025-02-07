# TaskFlow Manager

Uma aplicação web moderna e intuitiva para gerenciamento de tarefas, construída com as melhores práticas e tecnologias atuais.

## 🚀 Tecnologias

- **Backend**: NestJS + TypeScript + PostgreSQL
- **Frontend**: NextJS + React + Material-UI
- **Infraestrutura**: Docker + Docker Compose

## ✨ Funcionalidades

- Autenticação completa de usuários
- Gerenciamento de tarefas (CRUD)
- Interface responsiva e moderna
- API RESTful documentada
- Testes automatizados

## 🛠️ Pré-requisitos

- Docker
- Docker Compose
- Node.js 20.x
- npm ou yarn

## 🚀 Como executar

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/taskflow-manager.git
cd taskflow-manager
```

2. Configure as variáveis de ambiente
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

3. Inicie os containers
```bash
docker compose up -d
```

4. A aplicação estará disponível em:
-Frontend: http://localhost:3000
-Backend: http://localhost:4000

