# 📌 Plataforma RH: Cadastro de Vagas e Currículos com Acesso Autenticado

Este projeto é um protótipo funcional de uma **aplicação de gestão de recrutamento** desenvolvida com **Angular** e **json-server**, com autenticação, autorização e funcionalidades específicas para **usuários comuns** e **administradores**.

---

## 📖 Descrição

A aplicação **RH Connect** foi criada para simular um sistema interno de recrutamento, permitindo:
- **Usuários Comuns**: registrar conta, fazer login, cadastrar currículo e visualizar vagas.
- **Administradores**: cadastrar, editar e excluir vagas, além de visualizar currículos enviados.
- **Listagem pública de vagas**: disponível mesmo sem login.

O sistema utiliza **autenticação** (login/registro) e **autorização por tipo de usuário** (Admin e Comum) com **guardas de rota** no Angular, e um **back-end simulado** com `json-server`.

---

## 🎯 Objetivos

### Objetivo Geral
Desenvolver uma aplicação SPA (Single Page Application) funcional que simule um sistema real de RH com login, autorização por perfil e CRUD de vagas/currículos.

### Objetivos Específicos
- Compreender a diferença entre autenticação e autorização.
- Implementar guardas de rota no Angular.
- Utilizar formulários reativos com validação.
- Simular um back-end com `json-server`.
- Criar componentes reutilizáveis e organização de código.
- Aplicar layout responsivo com SCSS customizado.

---

## 📂 Estrutura de Dados (`db.json`)

```json
{
  "usuarios": [
    {
      "id": 1,
      "email": "admin@rh.com",
      "senha": "admin123",
      "tipo": "admin"
    }
  ],
  "curriculos": [],
  "vagas": []
}
```

## Esboço

### 📌 Funcionalidades
> Usuário Comum
        - Cadastro de conta.
        - Login.
        - Cadastro de currículo.
        - Visualização de vagas.

> Administrador
        - Login.
        - Cadastro, edição e exclusão de vagas.
        - Visualização de currículos.

### 📜 Fluxos
> Fluxo de Autenticação
        - Usuário acessa a tela de login/registro.
        - Sistema valida credenciais no json-server.
        - Guarda de rota verifica o tipo de usuário.
        - Redirecionamento para área correspondente.

> Fluxo de Navegação por Perfil
        - Admin → Área administrativa de vagas.
        - Usuário → Área de envio e consulta de currículo.


### 🛠️ Ferramenta sugerida para prototipagem: Figma.

### 🔗 Diagramas
    - Diagrama de Fluxo: autenticação e navegação por perfil.
    - Diagrama de Classes: relação entre entidades.
    - Diagrama de Uso: casos de uso para Admin e Usuário.
    (Incluir imagens ou links para diagramas criados.)


### 👥 Público-Alvo
    - Candidatos (usuários comuns)
    - Administradores da empresa RH Connect

### 📌 Observações
    - O sistema é apenas protótipo e não possui back-end real; todos os dados são armazenados localmente no db.json.