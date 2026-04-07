# 📦 QuoteHub

> **Landing page para captação de orçamentos** com painel administrativo autenticado – triagem, acompanhamento e resposta de solicitações.

## Visão Geral

O **QuoteHub** foi construído para equipes que precisam transformar pedidos comerciais em um fluxo operacional simples:

- O visitante acessa a landing page e envia um orçamento.
- Os dados são gravados no **Supabase**.
- Administradores autenticados acessam `/admin`.
- A equipe filtra, acompanha o histórico e responde cada solicitação.
- A resposta é salva no banco e enviada por e‑mail com **Resend**.

O projeto utiliza **App Router** do Next.js, autenticação via **Supabase Auth** e uma área administrativa protegida por sessão.

## Principais Recursos

- ✅ Landing page institucional com CTA direto para o formulário de orçamento.
- ✅ Formulário público com validação básica e opções dinâmicas vindas do Supabase.
- ✅ Painel administrativo com autenticação por e‑mail e senha.
- ✅ Filtros por *status* e período, com paginação *server-side*.
- ✅ Histórico de mensagens por orçamento.
- ✅ Resposta ao cliente com persistência no banco e envio de e‑mail.
- ✅ Proteção de rotas administrativas com `proxy.ts`.

## Stack

| Camada         | Tecnologia                                |
|----------------|-------------------------------------------|
| Frontend       | Next.js 16, React 19, TypeScript          |
| Estilo         | Tailwind CSS v4 + estilos customizados    |
| Banco e Auth   | Supabase                                  |
| E‑mail transacional | Resend                                 |
| UI             | Lucide React, Radix UI Toast              |
| Qualidade      | ESLint                                    |

## Estrutura do Projeto

```text
app/
  admin/                   # página administrativa protegida
  api/admin/replies/       # rota para salvar resposta e disparar e‑mail
  components/
    admin/                 # dashboard e modal do admin
    landing/               # hero, serviços, processo e formulário
    ui/                    # componentes utilitários
  hooks/                   # hooks de opções, estilos e utilidades
  lib/
    resend.ts              # integração com Resend
    quote-types.ts         # tipos do domínio
    supabase/              # clientes browser/server e sessão
  login/                   # autenticação do painel
  services/                # acesso aos dados do formulário
supabase/
  admin-policies.sql       # políticas RLS usadas no projeto
proxy.ts                   # guarda de rota para /admin e /login
```

## Fluxo Funcional

1. O usuário preenche o formulário público em `/`.
2. A aplicação busca `project_types`, `budget_ranges` e `timelines` no Supabase.
3. Ao enviar, o registro é inserido na tabela `quotes`.
4. Um administrador autenticado entra em `/login` e acessa `/admin`.
5. O *dashboard* lista os orçamentos, exibe *status*, resumo, filtros e histórico.
6. Ao responder um orçamento, a aplicação:
   - grava a mensagem em `quote_messages`;
   - atualiza o *status* do orçamento para `answered`;
   - envia um e‑mail ao cliente usando **Resend**.

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz com as chaves abaixo:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
RESEND_REPLY_TO_EMAIL=
```

### O que cada variável faz

| Variável                       | Obrigatória | Descrição                                                                 |
|--------------------------------|-------------|---------------------------------------------------------------------------|
| `NEXT_PUBLIC_SUPABASE_URL`     | Sim         | URL do projeto Supabase                                                   |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`| Sim         | Chave pública usada no browser e no *server client*                       |
| `RESEND_API_KEY`               | Sim         | Token da API do Resend para envio de e‑mails                              |
| `RESEND_FROM_EMAIL`            | Sim         | Endereço remetente validado no Resend                                     |
| `RESEND_REPLY_TO_EMAIL`        | Não         | *Reply-To* padrão; no painel, o sistema prioriza o e‑mail do admin autenticado |

## Setup Local

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure o ambiente

Preencha o `.env` com as credenciais do Supabase e do Resend.

### 3. Suba o projeto

```bash
npm run dev
```

Abra `http://localhost:3000`.

## Scripts Disponíveis

| Comando         | Descrição                               |
|-----------------|-----------------------------------------|
| `npm run dev`   | Inicia o ambiente de desenvolvimento    |
| `npm run build` | Gera a *build* de produção              |
| `npm run start` | Sobe a aplicação em modo produção       |
| `npm run lint`  | Executa o ESLint                        |

## Banco de Dados Esperado

O repositório inclui políticas RLS em `supabase/admin-policies.sql`, mas **não** inclui a criação completa das tabelas. Antes de rodar o sistema, o Supabase precisa ter pelo menos estas estruturas:

### `quotes`

| Campo               | Tipo sugerido      | Observação                                      |
|---------------------|--------------------|-------------------------------------------------|
| `id`                | `uuid`             | Chave primária                                  |
| `name`              | `text`             | Obrigatório                                     |
| `email`             | `text`             | Obrigatório                                     |
| `company`           | `text`             | Opcional                                        |
| `project_type_id`   | `uuid` ou `text`   | Referência a `project_types`                    |
| `budget_range_id`   | `uuid` ou `text`   | Referência a `budget_ranges`                    |
| `timeline_id`       | `uuid` ou `text`   | Referência a `timelines`                        |
| `description`       | `text`             | Opcional                                        |
| `status`            | `text`             | Recomendado iniciar com `pending`               |
| `created_at`        | `timestamptz`      | Recomendado com valor padrão                    |
| `updated_at`        | `timestamptz`      | Atualizado no painel                            |

### `quote_messages`

| Campo        | Tipo sugerido      | Observação                        |
|--------------|--------------------|-----------------------------------|
| `id`         | `uuid`             | Chave primária                    |
| `quote_id`   | `uuid` ou `text`   | Vínculo com `quotes`              |
| `user_id`    | `uuid`             | Vínculo com `auth.users`          |
| `message`    | `text`             | Conteúdo da resposta              |
| `created_at` | `timestamptz`      | Data de criação                   |

### Tabelas auxiliares

`project_types`, `budget_ranges` e `timelines` devem conter pelo menos:

| Campo | Tipo sugerido      |
|-------|--------------------|
| `id`  | `uuid` ou `text`   |
| `label`| `text`            |
| `value`| `text`            |
| `icon` | `text` (opcional)  |

## Políticas e Segurança

O arquivo `supabase/admin-policies.sql` aplica **RLS** para o fluxo atual:

- Visitantes podem **inserir** em `quotes`.
- Visitantes podem **ler** as tabelas auxiliares de opções.
- Usuários autenticados podem **ler e atualizar** `quotes`.
- Usuários autenticados podem **ler e inserir** em `quote_messages`.

Isso permite captação pública de *leads* sem abrir leitura irrestrita da base de orçamentos.

## Autenticação do Admin

O acesso ao painel depende do Supabase Auth com login por e‑mail e senha.

- `/admin` redireciona para `/login` quando não há sessão.
- `/login` redireciona para `/admin` quando o usuário já está autenticado.
- A proteção de rota é feita em `proxy.ts`.
- A página administrativa também confirma o usuário no *server-side* antes de renderizar.

Para usar o painel, crie ao menos um usuário administrativo no **Supabase Auth**.

## Envio de E‑mail

As respostas do painel passam pela rota `POST /api/admin/replies`.

Ela executa três passos:

1. Valida a sessão do admin.
2. Salva a mensagem em `quote_messages` e atualiza o *status* do orçamento.
3. Envia o e‑mail pelo **Resend**.

Se o e‑mail falhar, a resposta continua salva no banco e o frontend informa a falha operacional.

## Rotas Importantes

| Rota                     | Função                                      |
|--------------------------|---------------------------------------------|
| `/`                      | Landing page pública                        |
| `/login`                 | Autenticação do painel                      |
| `/admin`                 | *Dashboard* administrativo                  |
| `/api/admin/replies`     | Persistência de resposta + envio de e‑mail  |

---