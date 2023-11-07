---
title: Metodologia
---

_Atualizado: 8 de agosto de 2023_

# Metodologia

Esta metodologia descreve as etapas que foram percorridas para obter dados da IATI num formato útil para os governos dos países parceiros. Identifica o modo como os dados são recolhidos, reprocessados, harmonizados e, finalmente, convertidos em produtos finais. As etapas alinham-se amplamente com as percorridas no trabalho prévio descrito na [subsecção 1.3](/pt/introduction/#13-trabalho-previo-para-disponibilizar-dados-no-formato-excel). Esta metodologia será ainda aperfeiçoada e atualizada no decurso deste trabalho, em concordância com o Secretariado da IATI.

2.1 Recolhimento de dados da IATI
--------------------------

Após experiências iniciais com várias API, a abordagem acordada consiste em descarregar todos os dados e processá-los sem utilizar a IATI Datastore ou outra API. Essa abordagem é preferível, dado que este exercício, em qualquer caso, descarrega substancialmente todos os dados da IATI. Através desta abordagem, é possível alcançar melhorias de desempenho significativas.

A descarga de dados do [IATI Data Dump](https://iati-data-dump.codeforiati.org/) demora 53 segundos para um arquivo comprimido de 537 MB (9 GB sem compressão) que contém todos os dados da IATI.

Os dados são recolhidos uma vez por dia.

2.2 Seleção de atividades
---------------------------

Estão incluídas todas as atividades na versão 2.01 ou superior da IATI. 94% dos arquivos atualmente publicados no registo da IATI usam a versão 2.01 ou superior. A limitação do processamento a esses arquivos reduz o custo de manutenção futuro do software e é provável que exclua uma quantidade muito pequena de dados desatualizados ou de baixa qualidade.

Os dados não estão sujeitos a nenhum processo de validação. Ou seja, usamos dados validados e invalidados. Nos casos em que se encontrem questões de qualidade, estas serão geralmente suscitadas junto do divulgador relevante e não resolvidas pela tentativa de aplicação de atalhos técnicos.

2.3 Extração de dados relevantes
-------------------------

Cada arquivo é processado para extrair vários campos de cada transação ou orçamento. Em alguns casos, recorremos a dados fornecidos ao nível da atividade, quando os mesmos não são fornecidos na transação ou no orçamento.

### 2.3.1 Extração de dados da atividade

O identificador da IATI e a organização relatora são extraídos da atividade em todos os casos.

#### Identificador da IATI

O identificador único para a atividade:

```xml
iati-activity/iati-identifier/text()
```

#### Título

O título da atividade. Tentámos obter a versão do idioma relevante, quando disponível, para os nossos idiomas suportados (inglês, francês, espanhol e português). Para cada idioma, recorremos ao título em inglês ou, em alternativa, ao primeiro título disponível::

```xml
iati-activity/title/narrative[not(@xml:lang) ou @xml:lang='en']/text()
```

#### Organização relatora

O nome da organização que publica estes dados da IATI. Fazemos o levantamento destas organizações relatoras a partir da lista de organizações relatoras registadas no Registo da IATI e disponibilizadas na lista de códigos (não oficial) [ReportingOrganisation](https://codelists.codeforiati.org/ReportingOrganisation/)::

```xml
iati-activity/reporting-org/text()
```

#### Tipo de organização relatora

O tipo de organização relatora que publica estes dados da IATI:

```xml
iati-activity/reporting-org/@type
```

### 2.3.2 Extração de dados da transação

Os campos seguintes são extraídos para cada transação. Nos casos em que não existam estes quatro campos, a transação não é processada.

#### Valor

O valor da transação na moeda publicada:

```xml
transaction/value/text()
```

#### Data da transação

A data da transação (utilizada na agregação das transações e no produto final):

```xml
transaction/transaction-date/@iso-date
```

#### Data-valor da transação[^1]

A data-valor da transação na moeda publicada (utilizada como data para a conversão cambial):

```xml
transaction/value/@value-date
```

#### Tipo de transação

O tipo de transação (por exemplo: compromisso, desembolso, despesa):

```xml
transaction/transaction-type/@code
```

Nota: inicialmente, foram rejeitadas transações que não eram entradas de fundos, compromissos, desembolsos e despesas. Esta decisão pode ser subsequentemente revista, dependendo da procura e sujeita à necessidade de manter o tempo de processamento num nível razoável.

### 2.3.3 Extração de dados da transação ou da atividade

Para alguns campos, os dados provêm da transação ou da atividade, dependendo dos dados do relator.

#### Moeda

A moeda da transação ou a moeda pré-definida da atividade:

```xml
transaction/@currency ou iati-activity/@default-currency
```

#### Tipo de ajuda

O tipo de ajuda da transação ou o tipo de ajuda pré-definido da atividade (só estão incluídos tipos de ajuda do CAD):

```xml
transaction/aid-type[not(@vocabulary) ou @vocabulary='1'] /@code ou iati-activity/default-aid-type[not(@vocabulary) ou @vocabulary='1'] /@code
```

#### Tipo de financiamento

O tipo de financiamento da transação ou o tipo de financiamento pré-definido da atividade:

```xml
transaction/finance-type/@code ou iati-activity/default-finance-type/@code
```

#### Tipo de fluxo

O tipo de fluxo da transação ou o tipo de fluxo pré-definido da atividade:

```xml
transaction/flow-type/@code ou iati-activity/default-flow-type/@code
```

#### Organização provedora

A organização provedora da transação ou a organização relatora da atividade:

```xml
transaction/provider-org/text()
```

#### Organização destinatária

A organização destinatária da transação ou a(s) organização(ões) implementadora(s) da atividade:

```xml
transaction/provider-org/text()
```

#### Alternativas ao nível da atividade para organizações provedoras e destinatárias

Sempre que não houver uma organização provedora ou destinatária ao nível da transação, utilizamos uma organização de outra parte da atividade. Utilizamos alternativas diferentes, dependendo do tipo de transação que estamos processando:

<div class="table">

Tipo de transação | Org. provedora | Org. destinatária
--- | --- | ---
1 - Entrada de fundos | Org. financiadora | Org. relatora
2 - Compromisso de saída | Org. relatora | Org. implementadora
3 - Desembolso | Org. relatora | Org. implementadora
4 - Despesa | Org. relatora | Org. implementadora

</div>

Nos casos em que há várias organizações financiadoras ou implementadoras, estas são concatenadas (ligadas) através de vírgulas.

Para a organização relatora, utilizamos:

```xml
iati-activity/reporting-org/text()
```

Para a organização financiadora:

```xml
iati-activity/participating-org[@role='1']/text()
```

Para a organização implementadora:

```xml
iati-activity/participating-org[@role='4']/text()
```

### 2.3.4 Extração de dados da transação ou da atividade com valores potencialmente múltiplos

Por último, dois campos (país/região e setor destinatários) são extraídos da transação ou da atividade. Ao nível da atividade, estes podem ser publicados várias vezes com repartições percentuais. A metodologia para lidar com valores múltiplos está descrita na seção seguinte.

#### País ou região

O país destinatário da transação ou a lista de países destinatários da atividade (nos casos em que houver vários países, foi adicionada uma coluna para indicar que a transação faz parte de um projeto plurinacional):

```xml
transaction/recipient-country/@code ou iati-activity/recipient-country/@code
```

Alternativamente, se não houver países destinatários, procuramos regiões do CAD:

```xml
transaction/recipient-rergion[not(@vocabulary) ou @vocabulary='1']/@code ou iati-activity/recipient-region[not(@vocabulary) ou @vocabulary='1']/@code
```

#### Setor

O setor da transação ou a lista de setores da atividade (Observação: só estão incluídos setores do CAD):

```xml
transaction/sector[not(@vocabulary) ou @vocabulary='1']/@code ou iati-activity/ sector[not(@vocabulary) ou @vocabulary='1']/@code
```

#### Humanitária

A referência humanitária da transação ou a referência humanitária da atividade:

```xml
transaction/@humanitarian ou iati-activity/@humanitarian
```

* Se a transação tiver uma referência humanitária (“1”), “humanitária” será marcada com “1”.
* Se a transação tiver uma referência não humanitária (“0”), “humanitária” será marcada com “0”.

Se não houver referências ao nível da transação:

* Se a atividade tiver uma referência humanitária (“1”), “humanitária” será marcada com “1”.
* Se a atividade tiver uma referência não humanitária (“0”), “humanitária” será marcada com “0”.


2.4 Divisão de transações por vários setores e países
-------------------------------------------------------------

Conforme descrito na seção anterior, as transações individuais podem ser atribuídas a vários países e setores. Em cada caso, a transação é, portanto, repartida segundo o valor proporcional à porcentagem dessa transação para cada país e setor (Observação: nos casos em que não houver países ou regiões do CAD, a transação é rejeitada. Nos casos em que não houver setores, o setor fica em branco, dependendo de qual a abordagem mais clara).

Em alguns casos, as porcentagens publicadas podem também não estar corretas. Por exemplo, podem não totalizar 100 ou pode haver vários setores sem porcentagem especificada. Em tais casos, as porcentagens foram ajustadas e recalculadas para totalizarem 100%. Por exemplo:

<div class="table">

Setor| Porcentagem (publicada) | Porcentagem (corrigida)
--- | --- | ---
12220 Cuidados de saúde básicos | 100% | 50%
11220 Educação primária | 100% | 50%

</div>

Uma transação única de 100 USD seria então repartida por duas linhas: uma para 50 USD para cuidados de saúde básicos e outra para 50 USD para educação primária. Se a mesma atividade estivesse classificada com dois países destinatários, seria repartida de novo, agora em quatro linhas.

É necessário cuidado ao corrigir porcentagens por países. A orientação da IATI tem sido interpretada de maneira diferente por diferentes organizações. Algumas interpretaram a orientação como afirmando que todos os países e todas as regiões têm de totalizar 100%, ao passo que outras entenderam que os países têm de totalizar 100% e as regiões têm (separadamente) de totalizar 100%. Aplica-se a lógica seguinte:


* A. Se existir um país destinatário e uma região destinatária e o país destinatário não tiver porcentagem: assumir apenas o país destinatário;
  * por exemplo:
  ```xml
  <recipient-country code="LR" />
  <recipient-region code="298" />
  ```
  * Aplicar 100% do valor da transação à Libéria (LR).
* B. Se o país destinatário e a região destinatária ambos tiverem porcentagens, mas as porcentagens dos países destinatários ou as porcentagens das regiões destinatárias totalizarem cerca de 100%: considerar apenas o país destinatário;
  * por exemplo:
  ```xml
  <recipient-country code="TD" percentage="70" />
  <recipient-country code="LR" percentage="30" />
  <recipient-region code="298" percentage="100" />
  ```
  * Aplicar 70% do valor da transação ao Chade (TD) e 30% do valor da transação à Libéria (LR).
* C. Noutro caso, assumir o país destinatário e a região destinatária.
  * por exemplo:
  ```xml
  <recipient-country code="TD" percentage="50" />
  <recipient-region code="298" percentage="50" />
  ```
  * Aplicar 50% do valor da transação ao Chade (TD) e 50% do valor da transação à África Subsariana (298).

2.5 Conversão cambial
-----------------------

Uma vez que os dados são publicados em diferentes moedas (dependendo do divulgador), as transações individuais têm de ser convertidas para USD, euros e moedas locais aplicando a data da taxa de câmbio mais próxima da data-valor da transação. Mensalmente são obtidas taxas de câmbio para 169 moedas a partir das Estatísticas Financeiras Internacionais do FMI.[^2]

2.6 Tratamento dos orçamentos
--------------------

É importante, também, registar dados sobre a despesa futura. É um desafio maior, já que, ao contrário das transações, os orçamentos não são classificados por setor ou país, não sendo possível indicar especificamente a proporção de um orçamento que se destina a um determinado país ou setor. Para efetuar essa avaliação, é necessário aplicar aos dados orçamentais certos dados ao nível da transação ou da atividade. Por exemplo, nos casos em que não houver setores ao nível da atividade, a proporção do valor das transações de compromisso para diferentes setores é utilizada para aplicar repartições setoriais aos orçamentos de maneira semelhante, conforme descrito na Secção 2.3 acima.

Este processo de cálculo da proporção dos compromissos é utilizado para:


* Tipo de ajuda
* Tipo de financiamento
* Tipo de fluxo
* Setor
* País

Para o campo “Organização provedora”, é utilizada a organização relatora da atividade. Para o campo “Organização destinatária”, é(são) utilizada(s) a(s) organização(ões) implementadora(s) da atividade.

Nos casos que abrangem mais de um trimestre, os orçamentos são divididos em várias linhas atribuídas exatamente a um trimestre. O valor é repartido proporcionalmente.[^3] Tal ação é necessária para manter a comparabilidade entre transações (marcadas com uma data única) e orçamentos (que abrangem um período e podem não estar alinhados com o ano fiscal do governo).

Nos casos em que sejam publicados orçamentos revistos e originais para o mesmo período, são utilizados os orçamentos revistos em vez dos originais.

2.7 Transações acumuladas
---------------------------

As transações são agregadas numa linha por trimestre nos casos em que os seguintes outros campos sejam todos idênticos:


* Identificador da IATI
* Organização relatora
* Tipo de organização relatora
* Tipo de transação
* Tipo de ajuda
* Tipo de financiamento
* Tipo de fluxo
* Organização provedora
* Organização destinatária
* Setor
* País

A data de transação é definida como o último dia do trimestre.

2.8 Conversão para a moeda e o período fiscal de destino
---------------------------------------------------

As moedas de destino são definidas como o USD e o euro para todos os países. É também incluída uma moeda local adicional (por exemplo, o xelim queniano para o produto final do Quénia). A moeda é determinada pelo país beneficiário. A data da taxa de câmbio é o último dia do trimestre.

2.9 Idioma
------------

Os dados estão disponíveis em inglês, francês, espanhol e português. Todos os títulos disponíveis nesses idiomas são extraídos para os produtos finais juntamente com todos os códigos. Alguns títulos e organizações provedoras e destinatárias só estão disponíveis em inglês.

2.10  Processamento dos dados
-----------------------

Os ficheiros foram previamente processados no Github Actions e armazenados no Github Pages (ambos serviços gratuitos). No entanto, ocorreram problemas devido aos limites de utilização do Github.

2.11  Licenciamento
--------------

Todos os produtos finais são publicados no GitHub e são licenciados abertamente de acordo com a Licença Pública Geral Affero (AGPL) GNU v3.0.[^4]


[^1]: Observação: aparentemente, alguns divulgadores estão utilizando o último dia em que atualizaram os seus dados como data-valor das transações. Em tais casos, continuamos a aplicar a data-valor e sinalizamos a situação como uma questão a discutir junto aos relatores através do serviço de Apoio da IATI.

[^2]: [https://data.imf.org/?sk=4C514D48-B6BA-49ED-8AB9-52B0C1A0179B](https://data.imf.org/?sk=4C514D48-B6BA-49ED-8AB9-52B0C1A0179B) (abre uma janela nova)

[^3]: Se um orçamento não abranger perfeitamente trimestres completos, mas partes de trimestres, o número de dias de cada parte de trimestre é utilizado para calcular a proporção do valor a atribuir a cada trimestre.

[^4]: [https://www.gnu.org/licenses/agpl-3.0.en.html](https://www.gnu.org/licenses/agpl-3.0.en.html) (abre uma janela nova)

