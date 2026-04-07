# QuoteHub

Landing page de captacao de orcamentos com painel administrativo autenticado para triagem, acompanhamento e resposta de solicitacoes.

## Visao Geral

O QuoteHub foi construido para equipes que precisam transformar pedidos comerciais em um fluxo operacional simples:

- o visitante acessa a landing page e envia um orcamento;
- os dados sao gravados no Supabase;
- administradores autenticados acessam `/admin`;
- o time filtra, acompanha o historico e responde cada solicitacao;
- a resposta e salva no banco e enviada por e-mail com Resend.

O projeto usa App Router do Next.js, autenticacao via Supabase Auth e uma area administrativa protegida por sessao.

## Principais Recursos

- Landing page institucional com CTA direto para o formulario de orcamento.
- Formulario publico com validacao basica e opcoes dinamicas vindas do Supabase.
- Painel administrativo com autenticacao por e-mail e senha.
- Filtros por status e periodo, com paginacao server-side.
- Historico de mensagens por orcamento.
- Resposta ao cliente com persistencia no banco e envio de e-mail.
- Protecao de rotas administrativas com `proxy.ts`.

## Stack

| Camada | Tecnologia |
| --- | --- |
| Frontend | Next.js 16, React 19, TypeScript |
| Estilo | Tailwind CSS v4 + estilos customizados |
| Banco e Auth | Supabase |
| E-mail transacional | Resend |
| UI | Lucide React, Radix UI Toast |
| Qualidade | ESLint |

## Estrutura do Projeto

```text
app/
  admin/                   # pagina administrativa protegida
  api/admin/replies/       # rota para salvar resposta e disparar e-mail
  components/
    admin/                 # dashboard e modal do admin
    landing/               # hero, servicos, processo e formulario
    ui/                    # componentes utilitarios
  hooks/                   # hooks de opcoes, estilos e utilidades
  lib/
    resend.ts              # integracao com Resend
    quote-types.ts         # tipos do dominio
    supabase/              # clientes browser/server e sessao
  login/                   # autenticacao do painel
  services/                # acesso aos dados do formulario
supabase/
  admin-policies.sql       # politicas RLS usadas no projeto
proxy.ts                   # guarda de rota para /admin e /login
```

## Fluxo Funcional

1. O usuario preenche o formulario publico em `/`.
2. A aplicacao busca `project_types`, `budget_ranges` e `timelines` no Supabase.
3. Ao enviar, o registro e inserido na tabela `quotes`.
4. Um administrador autenticado entra em `/login` e acessa `/admin`.
5. O dashboard lista os orcamentos, exibe status, resumo, filtros e historico.
6. Ao responder um orcamento, a aplicacao:
   - grava a mensagem em `quote_messages`;
   - atualiza o status do orcamento para `answered`;
   - envia um e-mail ao cliente usando Resend.

## Variaveis de Ambiente

Crie um arquivo `.env` na raiz com as chaves abaixo:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
RESEND_REPLY_TO_EMAIL=
```

### O que cada variavel faz

| Variavel | Obrigatoria | Descricao |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Sim | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Sim | Chave publica usada no browser e no server client |
| `RESEND_API_KEY` | Sim | Token da API do Resend para envio de e-mails |
| `RESEND_FROM_EMAIL` | Sim | Endereco remetente validado no Resend |
| `RESEND_REPLY_TO_EMAIL` | Nao | Reply-To padrao; no painel, o sistema prioriza o e-mail do admin autenticado |

## Setup Local

### 1. Instale as dependencias

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

## Scripts Disponiveis

| Comando | Descricao |
| --- | --- |
| `npm run dev` | inicia o ambiente de desenvolvimento |
| `npm run build` | gera a build de producao |
| `npm run start` | sobe a aplicacao em modo producao |
| `npm run lint` | executa o ESLint |

## Banco de Dados Esperado

O repositorio inclui politicas RLS em `supabase/admin-policies.sql`, mas nao inclui a criacao completa das tabelas. Antes de rodar o sistema, o Supabase precisa ter pelo menos estas estruturas:

### `quotes`

| Campo | Tipo sugerido | Observacao |
| --- | --- | --- |
| `id` | `uuid` | chave primaria |
| `name` | `text` | obrigatorio |
| `email` | `text` | obrigatorio |
| `company` | `text` | opcional |
| `project_type_id` | `uuid` ou `text` | referencia a `project_types` |
| `budget_range_id` | `uuid` ou `text` | referencia a `budget_ranges` |
| `timeline_id` | `uuid` ou `text` | referencia a `timelines` |
| `description` | `text` | opcional |
| `status` | `text` | recomendado iniciar com `pending` |
| `created_at` | `timestamptz` | recomendado com valor padrao |
| `updated_at` | `timestamptz` | atualizado no painel |

### `quote_messages`

| Campo | Tipo sugerido | Observacao |
| --- | --- | --- |
| `id` | `uuid` | chave primaria |
| `quote_id` | `uuid` ou `text` | vinculo com `quotes` |
| `user_id` | `uuid` | vinculo com `auth.users` |
| `message` | `text` | conteudo da resposta |
| `created_at` | `timestamptz` | data de criacao |

### Tabelas auxiliares

`project_types`, `budget_ranges` e `timelines` devem conter pelo menos:

| Campo | Tipo sugerido |
| --- | --- |
| `id` | `uuid` ou `text` |
| `label` | `text` |
| `value` | `text` |
| `icon` | `text` opcional |

## Politicas e Seguranca

O arquivo `supabase/admin-policies.sql` aplica RLS para o fluxo atual:

- visitantes podem inserir em `quotes`;
- visitantes podem ler tabelas auxiliares de opcoes;
- usuarios autenticados podem ler e atualizar `quotes`;
- usuarios autenticados podem ler e inserir em `quote_messages`.

Isso permite captacao publica de leads sem abrir leitura irrestrita da base de orcamentos.

## Autenticacao do Admin

O acesso ao painel depende do Supabase Auth com login por e-mail e senha.

- `/admin` redireciona para `/login` quando nao ha sessao;
- `/login` redireciona para `/admin` quando o usuario ja esta autenticado;
- a protecao de rota e feita em `proxy.ts`;
- a pagina administrativa tambem confirma o usuario no server-side antes de renderizar.

Para usar o painel, crie ao menos um usuario administrativo no Supabase Auth.

## Envio de E-mail

As respostas do painel passam pela rota `POST /api/admin/replies`.

Ela executa tres passos:

1. valida a sessao do admin;
2. salva a mensagem em `quote_messages` e atualiza o status do orcamento;
3. envia o e-mail pelo Resend.

Se o e-mail falhar, a resposta continua salva no banco e o frontend informa a falha operacional.

## Rotas Importantes

| Rota | Funcao |
| --- | --- |
| `/` | landing page publica |
| `/login` | autenticacao do painel |
| `/admin` | dashboard administrativo |
| `/api/admin/replies` | persistencia de resposta + envio de e-mail |
