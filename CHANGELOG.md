# Changelog

## [0.1.0] - 2024-02-09

### Added
- Configuração inicial do projeto com Docker e Docker Compose
  - Multi-container setup com PostgreSQL, Backend e Frontend
  - Hot-reload configurado para desenvolvimento
  - Healthcheck para PostgreSQL

- Backend (NestJS):
  - Autenticação completa com JWT
  - Sistema de login e registro de usuários
  - CRUD de usuários com validações
  - CRUD de tarefas com estados (PENDING, IN_PROGRESS, COMPLETED)
  - Migrations automatizadas para PostgreSQL
  - Testes unitários para Users e Auth
  - Testes E2E para API
  - Logger configurado para ambiente de desenvolvimento

- Frontend (Next.js 14):
  - Sistema de autenticação com context
  - Páginas de login e registro com validações
  - Layout responsivo com Material-UI
  - Tema customizado com suporte a modo escuro
  - Formulários com validação usando React Hook Form + Zod
  - Indicador de força de senha
  - Componentes reutilizáveis

### Security
- Implementação de bcrypt para hash de senhas
- Proteção de rotas com Guards
- Validação de dados com class-validator
- Middleware de autenticação no frontend

### Infrastructure
- Docker Compose com volumes persistentes
- Configuração de ambiente de desenvolvimento
- Scripts de inicialização e migrations