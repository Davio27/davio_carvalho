# Data Engineering Portfolio
## Projetos desenvolvidos entre Maio/2025 e Março/2026

Este repositório apresenta um conjunto de soluções desenvolvidas ao longo da minha atuação na área de **Analytics e Engenharia de Dados**, abrangendo automação de processos, construção de pipelines de dados, monitoramento de plataformas analíticas, governança de dados e garantia de qualidade das informações.

Os projetos aqui descritos foram desenvolvidos entre **08 de Maio de 2025 e 06 de Março de 2026**, durante minha evolução profissional de **Assistente de Analytics para Analista Jr. de Engenharia de Dados**.

O objetivo principal dessas iniciativas foi **estruturar e fortalecer o ecossistema de dados da organização**, promovendo maior confiabilidade das informações, automação de processos críticos e autonomia para áreas de negócio.

---

# Arquitetura Tecnológica Utilizada

Os projetos foram construídos utilizando um stack moderno de engenharia de dados baseado em cloud e ferramentas de orquestração.

### Cloud & Data Platform
- BigQuery
- Dataflow
- Dataform
- Data Lake (camadas Land / Raw / Trusted)

### Orquestração
- Apache Airflow

### Desenvolvimento
- Python
- Flask
- SQL

### BI e Visualização
- Power BI

### DevOps & Testes
- Pytest
- Coverage

### Integrações
- Jira
- Confluence
- APIs internas
- Sistemas operacionais corporativos

---

# Projetos

## 1. Indicador de Integridade de Dados

### Objetivo
Garantir a confiabilidade das informações entre o **banco de produção e o Data Lake**, identificando divergências automaticamente.

### Descrição
Foi desenvolvido um sistema de **comparação de dados entre ambiente operacional e analítico**, permitindo validar se as cargas de dados estão consistentes após os processos de ingestão.

O sistema executa validações periódicas entre os dados armazenados no **Data Lake** e o banco de **produção**, gerando métricas de integridade.

### Funcionalidades

- Comparação automática entre origem e destino
- Pipeline de atualização diária
- Cálculo de métricas de integridade
- Monitoramento via dashboard
- Visualização de divergências

### Tecnologias

- BigQuery
- Airflow
- Power BI
- SQL

### Resultado

- Maior confiança nas informações analíticas
- Detecção rápida de inconsistências
- Monitoramento contínuo da qualidade de dados

---

# 2. Automação do Gerenciamento de Demandas (Jira + Confluence)

### Objetivo
Automatizar o fluxo completo de acompanhamento de demandas entre equipes técnicas e solicitantes.

### Descrição

Foi desenvolvida uma automação integrada entre **Jira e Confluence** que acompanha o ciclo de vida das demandas e comunica automaticamente os solicitantes sobre o progresso das atividades.

A automação utiliza o status das tarefas no Jira e o estado da documentação no Confluence para atualizar automaticamente o usuário responsável.

### Status Monitorados

No **Jira**:

- Não Iniciado
- Backlog
- Em Desenvolvimento
- Homologação
- Concluído

No **Confluence**:

- Documentação de Briefing
- Documentação Final
- Documentação de Processo

### Funcionalidades

- Notificação automática de mudanças de status
- Comunicação direta com o solicitante
- Envio de documentação final
- Geração de cartão personalizado de conclusão
- Envio automático de PDF com documentação

### Resultado

- Redução de comunicação manual
- Maior transparência no acompanhamento de demandas
- Padronização do processo de entrega

---

# 3. Automação da Produtividade Logística

### Objetivo
Eliminar processos manuais de cálculo e atualização da produtividade logística.

### Descrição

Foi desenvolvido um pipeline completo de dados que automatiza o cálculo e a atualização dos indicadores de produtividade logística.

Todos os cálculos anteriormente realizados manualmente passaram a ser executados automaticamente na camada de transformação do Data Lake.

### Funcionalidades

- Automação de cálculos de produtividade
- Atualização diária de dados
- Pipeline de ingestão e transformação
- Dados já calculados disponíveis para consumo analítico

### Arquitetura

Camadas utilizadas no Data Lake:


### Resultado

- Eliminação de processos manuais
- Padronização dos indicadores
- Dados prontos para análise

---

# 4. Migração do Sistema RM para o Data Lake

### Objetivo
Migrar completamente a base de dados do sistema **RM** para o ecossistema de dados da empresa.

### Descrição

Foi implementada uma arquitetura completa de **pipelines ELT**, responsável pela ingestão, transformação e disponibilização dos dados no ambiente analítico.

### Componentes da Arquitetura

**Ingestão**

- Dataflow executando cargas Full e Incrementais

**Orquestração**

- Airflow gerenciando execução dos pipelines

**Transformação**

- Dataform responsável pela modelagem e transformação dos dados

### Estratégia de Execução

Para modelos **Full (Bucket)** foi criada uma DAG no Airflow contendo:

- Task Groups
- Uma task por tabela
- Execução Full no Dataflow
- Trigger automático de transformação no Dataform

Fluxo do pipeline:


### Resultado

- Centralização dos dados no Data Lake
- Padronização das transformações
- Estrutura escalável de ingestão

---

# 5. Data Catalog Explorer (Em Desenvolvimento)

### Objetivo
Facilitar a descoberta de dados dentro da organização.

### Descrição

O **Data Catalog Explorer** é uma aplicação corporativa para busca e exploração de metadados, permitindo que analistas encontrem rapidamente tabelas e colunas relevantes.

O sistema conecta múltiplas fontes de metadados.

### Fontes de Dados

- BigQuery
- Banco Consinco Oracle

### Funcionalidades

- Busca de tabelas
- Busca de colunas
- Exploração de metadados
- Navegação simplificada
- Interface amigável para usuários de negócio

### Benefícios

- Redução do tempo de descoberta de dados
- Maior autonomia para analistas
- Padronização da consulta de metadados

---

# 6. Airflow DAG Monitoring

### Objetivo
Monitorar o status e a performance das DAGs do Airflow.

### Descrição

Foi desenvolvido um painel de monitoramento que coleta métricas de execução das DAGs diretamente do ambiente de dados e apresenta essas informações em uma interface segura.

### Funcionalidades

Monitoramento de DAGs:

- Status ativo/inativo
- Sucesso
- Falha
- Pausado
- Inativo

Métricas:

- Tempo médio de execução
- Histórico de execuções
- Status atual das pipelines

### Segurança

Sistema de autenticação utilizando:

- Flask-Login
- Proteção de rotas
- Controle de acesso

### Testes

- Testes automatizados com Pytest
- Coverage para análise de cobertura de testes

---

# 7. Workspace Dataflows Monitoring

### Objetivo
Centralizar o monitoramento de **Dataflows do Power BI**.

### Descrição

Foi desenvolvida uma aplicação que monitora execuções de Dataflows, fornecendo métricas de integridade, performance e histórico de falhas.

### Funcionalidades

#### Métricas de Integridade

- Taxa de sucesso baseada nos últimos 30 dias

#### Monitoramento de Performance

- Tempo médio de execução
- Evolução histórica de execução

#### Ranking de Falhas

Identificação automática de:

- Dataflows com maior incidência de erro
- Falhas nos últimos 7 dias

#### Detecção de Inatividade

Alertas automáticos para:

- Dataflows sem execução há mais de 15 dias

#### Logs de Erro

- Visualização detalhada de logs técnicos
- Histórico de execuções
- Interface com modais interativos

### Arquitetura

Backend:

- Python
- Flask

Armazenamento:

- BigQuery

Frontend:

- Dashboard interativo

---

# 8. Correction System Table

## O que é

O **Correction System Table** é uma solução corporativa desenvolvida para garantir a integridade entre sistemas operacionais e analíticos.

O sistema automatiza processos de verificação e correção de inconsistências entre bases de dados.

### Objetivos

- Reduzir divergências entre ambientes
- Automatizar processos de correção
- Garantir rastreabilidade
- Melhorar a confiabilidade dos dados

### Fluxo de Funcionamento

1. Validação de acesso do usuário
2. Comparação de dados entre ambientes
3. Identificação de inconsistências
4. Remoção de registros divergentes
5. Recuperação de registros faltantes
6. Execução do processamento final
7. Monitoramento em tempo real

### Funcionalidades

- Interface de execução controlada
- Monitoramento de status
- Logs detalhados de execução
- Modo emergencial para múltiplas tabelas

### Benefícios

- Correção automatizada de dados
- Redução de retrabalho manual
- Transparência no processo de correção

---

# Impacto Geral das Soluções

As soluções implementadas contribuíram para:

- Estruturação da plataforma de dados
- Automação de processos operacionais
- Aumento da confiabilidade das informações
- Redução de tarefas manuais
- Melhor observabilidade da infraestrutura de dados
- Maior autonomia para analistas e áreas de negócio

---

# Evolução Profissional

Esses projetos foram desenvolvidos durante minha evolução profissional dentro da área de dados, atuando na construção de soluções que envolvem:

- Engenharia de Dados
- Automação de Processos
- Observabilidade de Pipelines
- Qualidade de Dados
- Governança de Dados

---

# Próximos Passos

Evoluções planejadas incluem:

- Expansão do **Data Catalog Explorer**
- Ampliação das métricas de observabilidade
- Automação adicional de validação de qualidade de dados
- Integração com novas fontes de dados

---

# Contato

Caso queira conversar sobre arquitetura de dados, engenharia de pipelines ou automação de plataformas analíticas, fique à vontade para entrar em contato.