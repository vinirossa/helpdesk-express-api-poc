*   [ ] Mandar projeto para o Github

*   [x] Enum de profile

*   [x] FluentValidation para view models

*   [ ] Banco de Dados

    *   [ ] Encerrar aplicação de se n conseguir connectar no banco de dados

    *   [x] Postgres

        *   [x] campo email ser unique

    *   [x] TypeORM

        *   [x] **Configurar migration**

        *   [x] Min, Max, DataTypes nos moels

        *   [ ] Criar seeds?

        *   [x] Colar credenciais no arquivo .env

        *   [ ] Rodar migrations de novo para pegar "SMALLINT"

    *   [ ] Prisma futuramente?

*   [ ] User

    *   [x] Repassar request para o service tbm

    <!---->

    *   [x] **único (banco, service e controller**)

    *   [x] Decidir dilemas do CheckEmail (nome, o que retorna, como retorna, etc.) + retornando sem details?

    *   [x] **Nomenclatura (controller, service, repository... find vs get)**

    *   [x] Decidir se realmente não vou ter interface determinando meus serviços, controllers e services (mais para forçar regras, mas tbm é meio inutil se eu n for usar, e na vdd é tudo estático, deixa quieto)

    *   [x] **Criptografar a senha (entender o salt e como ele descobre depois)**

    *   [x] Uso de diversas view models (uma pra ver, outra pra inserir, outra pra alterar geral + mini alterações)

    *   [x] Criar validation para o service

    *   [x] ChangePassword(model novo) != das antigas (nova tabela para ficar histórico de senhas do usuário)

    *   [x] ForgotPassword(email + disparar email com um código ou link)

    *   [x] Envio de email no Forgot Password

    *   [x] email de confirmação de conta (rota 'post confirm-email' + campo "emailConfirmed") + send-again (SEM FLODAR) === usando token

    *   [x] UserPasswordHistory (no change password e no reset password) + ~~remover o active do passwordHistory~~

    *   [x] UserForgotHistory? (lastPasswordReset - data) - checar no forgot-password

    *   [x] remover email do update? - rota só pra isso

    *   [x] enum valido

    *   [ ] n vai existir rota para deletar usuário, só ativar / desativar (soft delete no futuro?)

    *   [x] Enum controller para o front pegar as listagens (localizar os enums também)

        *   [x] Verificação de existe ou n para excluir ou alterar deve ser no repository ou service?

        <!---->

        *   [x] **Repository Tratar campos antes de salvar no banco (trim, etc)**

        *   [x] Paginação

            *   [x] Cast dos parâmetros (Number vs parse vs +) + todos lugares q faz diferença float e int e signed e unsigned

            *   [x] Validação dos parâmetros

            *   [x] Retornar count dizendo quantos registros foram encontrados naquela página

            *   [x] Geração dos links (get current base url + self e regras de HATEOAS?)

            *   [ ] Criação dos objetos de order e filter (cuidado do SQL Injection)

        *   [ ] Criar rota login (+ refresh token + BD?) + setar o usuário logado (middleware para setar na request ou locals)

        *   [ ] Criar rota logout

        *   [ ] Verificar necessidade e, se for o caso, remover as colunas confimrationToken e resetToken do banco (secret já basta)

        *   [ ] Enviar email quando a senha foi alterada e quando foi redefinida

        *   [ ] Detectar se estão fazendo login em outro lugar (2FA, sms)

        *   [ ] Criar conta com o Google tbm? + Facebook + Apple

        *   [ ] Gravar mais informações do usuário (telefone, endereço?)

*   [x] Escrever COMP.md

*   [ ] Criar htmls de email + mensagens localizadas

*   [x] Testar com email que n existe e ver se vai precisar de tratamento de erro

*   [x] Setar | null em todos models que podem ser nulos no banco (sem ? ou undefined)

*   [ ] ~~Passar validator dos models para um decorator nos controllers~~ (meio que inviável)

*   [ ] Tratar path no http-method decorator (/, sem barra, etc.)

*   [x] Mover dtos para as pastas de feature?

*   [x] ~~Forçar res.status a user enum~~

*   [ ] Resolver problema de import dot env em tudo que usa process.env

*   [x] Melhorar error handler com padrões HTTP

*   [x] \~\~Encontrar alternativa melhor para criar o context das requests? (continous-local-storage, reflect.metadata, \~\~[~~async-context~~](https://github.com/nodejs/node/commit/9c702922cdcf830cedb92d51e5dc9f956584c3ee))

*   [x] \*Swagger e docs (com TS) ABANDONAR - SÓ NO TSOA OU NESTJS

*   [x] Tratar erro melhor de Json inválido SyntaxError - Unexpected token JSON...

*   [x] Melhorar class Server

*   [x] Refatorar validators do User

*   [ ] Authentication

*   [ ] Authorize Decorator

*   [ ] Cookies (só o token?)

*   [ ] Cache (como funciona?)

*   [ ] Middleware de Timeout

*   [ ] Health Check

*   [ ] Graceful Shutdown

*   [ ] Redirection

*   [ ] Transformar em interface as classes que não tem construtor ou métodos?

*   [ ] Timezone da view model baseado na request, timezone que vai pro banco sempre uma

*   [ ] Log (MongoDB, Serilog, Sentry.io, LogRocket)

    *   [ ] Adicionar informaç\~pes de localização e dispositivo nos logs + (a partir dai setar a timezone da request para retornarmos as datas) - request-ip e geoip-lite

*   [ ] Tirar os middlewares das pastas? (corrigir imports)

*   [ ] Criar base controller (problema do router), base service e base repository

*   [ ] Criar testes unitários para o User e os Base (Jest)

*   [ ] Forma de não expor os guids para o client?

*   [ ] Tornar pasta functions em primitive type extensions de fato

*   [ ] Tornar i18n acessível no error-handler

*   [x] Overwrite X-Powered by

*   [ ] SQL Injection

    *   [ ] Express-sanitizer como middleware

*   [x] Localização

    *   [ ] uso de cookies

    *   [ ] problema dos gêneros (sobrepor namespace)?

*   [ ] Validator

    *   [ ] **Tratar emojis 😧**

    <!---->

    *   [ ] Must be...

    *   [ ] Please enter...

    *   [ ] Try again...

    *   [ ] Artigo? Campo? acho q n

    *   [ ] Nome

        *   [x] Validacao de minimo (2) e maximo (500)?

        *   [x] Symbols and punctuation

        *   [x] numbers

        *   [ ] unusual capitalization

        *   [ ] repeating characters

        *   [ ] Offensive or suggestive content of any kind (bad-words)

        *   [ ] Characters from multiple languages

        *   [ ] Titles of any kind (ex: professional, religious, etc)

    *   [x] Email

        *   [x] Validacao de minimo 3 e maximo 320

        *   [x] válido (regex)

    *   [x] Senha

        *   [x] Validacao de minimo (10)

        *   [x] 1 uppercase, 1 lowercase, 1 symbol, 1 number (forte)

*   [ ] Refatorar nome dos endpoints seguindo todos padrões RESTful

*   [ ] Melhorar imports - Começar a criar arquivos index.ts para exportar em massa como módulo?

*   [ ] Melhorar estrutura de pastas

*   [ ] Melhorar package.json scripts

*   [ ] .env VS config.json

*   [ ] VSCode

    *   [ ] Pin no VSCode

    *   [ ] Atalhos no VSCode (configurar Settings JSON)

    *   [ ] Reconfigurar extensões e extension packs

    *   [x] Melhorar ícones das pastas

    *   [ ] Configurar o Settings Sync

    *   [ ] Melhorar questão dos regions e collapses

<!---->

*   [x] DateHelper?

*   [x] Adicionar timezone nas datas do banco?

*   [ ] *Auditoria (MongoDB? Como será melhor fazer? Modelo ideal é tipo TID)*

*   [ ] ***INCIDENTES***

    *   [ ] HATEOAS para incidentes relacionados

*   [x] Problema das classes estáticas?

*   [ ] Seguir padrões

    *   [ ] Clean ARCH

    *   [ ] SOLID

    *   [ ] DDD

    *   [x] REST

    *   [x] RESTful

*   [ ] Explorar ESLint

*   [ ] Explorar tsconfig

*   [ ] Criar gerador de Swagger automático (swagger-autogen não deu certo, só se for uma lib própria)

*   [ ] NestJS?

*   [ ] Docker

*   [ ] Elastic

*   [x] AutoMapper

    *   [ ] História do base.profile...
