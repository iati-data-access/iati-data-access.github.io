---
title: Contexto
---

# Contexto

1.1 Apoio aos governos dos países parceiros para melhorar o acesso e a utilização de dados da IATI
-----------------------------------------------------------------------------

Desde a sua criação em 2008, a Iniciativa Internacional para a Transparência da Ajuda (IATI, ou International Aid Transparency Initiative) testemunhou um aumento substancial no volume e na qualidade dos dados publicados. Mais de 1200 organizações já publicaram dados sobre as suas atividades de desenvolvimento de acordo com um padrão internacionalmente acordado para dados de desenvolvimento, a Norma IATI.[^1] Permaneceram dúvidas persistentes em torno da qualidade desses dados nos últimos anos. Porém, o influente Índice de Transparência da Ajuda, divulgado pela Publish What You Fund em junho de 2020, observou uma “melhoria significativa na transparência geral dos doadores em relação a 2018”.[^2]

Dado o aumento do volume e da qualidade dos dados da IATI, a atenção foi transferida para a melhoria da capacidade dos principais utilizadores para acessarem dados da IATI e os utilizarem. O Plano Estratégico 2020-2025 da IATI realça que “para ter sucesso na concretização dos seus objetivos, a IATI tem de dar prioridade aos desafios e necessidades de dados específicos dos países parceiros”.[^3] Nos seus parágrafos de abertura, a Declaração de Acra da IATI de 2008, o documento fundador da iniciativa, sublinha as ligações entre a divulgação pública de informações pelos doadores e os processos de gestão financeira dos governos dos países parceiros.[^4]

Existem atualmente diversas ferramentas para tornar os dados da IATI acessíveis a públicos mais vastos. O mais conhecido é o d-portal, que oferece um acesso facilitado a dados da IATI. Porém, o d-portal oferece produtos finais muito limitados em termos de dados em formato Excel. O Balanço Técnico da IATI de 2020 recomendava a criação de “uma camada de dados semânticos opinativos”, “um novo conjunto de dados organizado que proporciona uma versão ‘opinativa’ dos dados, mais fácil de utilizar” por quem não esteja familiarizado com o formato IATI-XML.[^5] Em julho de 2020, o Conselho da IATI aprovou essa proposta e mandatou o Secretariado da IATI elaborar uma abordagem ao desenvolvimento, como parte de um plano de implementação mais vasto.[^6]

Essa nova camada de dados semânticos necessariamente demorará algum tempo para ser entregue . Como medida provisória, o PNUD contratou um consultor para realizar um  trabalho preliminar destinado a alimentar o processo de desenvolvimento da nova camada semântica, explorando o modo como os dados devem ser gerados para atender às necessidades desse grupo de interesse essencial: os governos dos países parceiros. O trabalho proporciona ao Secretariado da IATI a capacidade de responder a pedidos de apoio recebidos de países parceiros a respeito do acesso a dados da IATI. Os produtos finais incluem uma metodologia pormenorizada para as transformações empreendidas e uma gama de conjuntos de dados atualizados automaticamente.

1.2 Fundamentação:
-------------

Idealizou-se, originalmente, que o mecanismo principal para acesso dos países parceiros a dados da IATI seria por meio de Sistemas de Gestão de Informação sobre Ajuda (SGIA). Há três fornecedores principais de software de SGIA: a Catalpa International, a Development Gateway e a Synergy International Systems. Existem vários outros sistemas adaptados ou criados localmente; por exemplo, em Bangladesh, em Laos, na Libéria e na Somália. Um esforço recente documentou 63 Implementações de SGIA conhecidas;[^7] muitos outros países têm outros processos baseados no Excel para o registo de dados semelhantes.

Os dados são geralmente recolhidos nesses sistemas por meio de pedidos periódicos aos doadores (por exemplo, a cada trimestre) para envio de dados sobre desembolsos ocorridos desde o pedido anterior. Tais sistemas também solicitam dados sobre projeções dos doadores (muitas vezes conhecidas como projeções QDMP[^8]), que são particularmente úteis para fundamentar o processo orçamental. Os sistemas também solicitam normalmente outros dados, como os locais dos projetos, os resultados e as classificações setoriais, dependendo do contexto e das necessidades locais. Alguns governos também solicitam dados dos parceiros de implementação (por exemplo, as ONGs), ao passo que outros focam nos doadores oficiais.

A intenção original era que estes sistemas importassem automaticamente dados da IATI, reduzindo significativamente o volume de trabalho humano que tem de ser realizado por meio de pedidos de dados manuais. Essa intenção mantém-se. Porém, apesar do trabalho substancial de alguns governos e fornecedores,[^9] a integração desses dados com os sistemas tem-se mantido baixa. Os motivos para tal ultrapassam o âmbito deste trabalho de consultoria, mas uma questão fundamental é a dificuldade de compreensão da natureza dos dados da IATI, dada a sua complexidade e o fato de serem disponibilizados no formato IATI-XML. Note-se que não se trata de uma crítica ao formato XML; este é essencial para possibilitar a comunicação pelos atores do desenvolvimento de um conjunto de dados rico e pormenorizado. Porém, para robustecer a aceitação dos dados da IATI, estes têm de ser apresentados em formatos que sejam familiares aos utilizadores potenciais. Só então os utilizadores poderão fazer uma avaliação informada dos benefícios potenciais do avanço rumo a uma integração mais automatizada de dados da IATI nos seus sistemas.

A disponibilização de dados da IATI no formato Excel também tem vantagens imediatas além da socialização e da conscientização. Os países com SGIA existentes poderão aproveitar dados da IATI em formato Excel para “preencher os espaços em branco” nos casos em que os parceiros de desenvolvimento locais não respondem aos pedidos de dados ou não sejam residentes (nem tenham escritórios no país). O fornecimento de dados em formato Excel também será útil para os países sem um SGIA existente pelo mesmo motivo.

1.3 Trabalho prévio para disponibilizar dados no formato Excel
--------------------------------------------------------

Há vários trabalhos que oferecem percepções sobre o modo como os dados da IATI podem ser disponibilizados de maneira útil no formato Excel:


* Aid on Spreadsheets[^10] – desenvolvido em 2018 pelo Overseas Development Institute, disponibiliza dados da IATI para a Uganda e a Libéria em formato Excel. Os dados incluem desembolsos trimestrais e projeções QDMP. O site está disponível em inglês e francês, embora atualmente algumas páginas não estejam funcionando.
* Protótipo de visualização para a COVID-19[^11] – desenvolvido em 2020 pela Development Initiatives, disponibiliza dados da IATI para atividades sinalizadas de acordo com a orientação sobre a publicação de dados da COVID-19 da IATI em formato Excel. Os dados incluem transações reais, desagregadas nos casos em que há vários países e sectores. Os dados são atualizados todas as noites.
* Steps for Querying and Processing Data from the IATI Datastore Query Builder[^12] – realizada em 2020 pelo Secretariado da IATI, esta apresentação para o Grupo de Trabalho de Utilização de Dados da IATI descrevia uma abordagem à extração de dados para gastos anteriores  no Chade no período 2016-2020, seguindo  um pedido do governo. Os dados da IATI Datastore são reprocessados em R (uma linguagem de programação) e depois disponibilizados em formato Excel.

1.4 Produtos finais
-----------

Este trabalho fornece vários produtos finais para melhorar a acessibilidade dos dados da IATI a curto e médio prazo, até que fique concluído o trabalho da camada de dados semânticos. Os produtos finais estão disponíveis pública e gratuitamente para que qualquer pessoa os descarregue, mas estão concebidos para atender às necessidades dos governos dos países parceiros. Os produtos finais incluem:


* A metodologia para acesso e processamento dos dados;
* Um arquivo de dados para cada país em cada idioma, incluindo:
  * Valores agregados trimestrais de orçamentos, compromissos, desembolsos e despesas;
  * Valores agregados por organização relatora (e tipo), setor, tipo de ajuda, financiamento, tipo e organização implementadora;
* Uma interface para acesso aos dados e à metodologia.


[^1]: Registo da IATI, consultado em 23/10/2020: [https://iatiregistry.org](https://iatiregistry.org)

[^2]: Publish What You Fund (2020) – “Índice de Transparência da Ajuda 2020”: [https://www.publishwhatyoufund.org/the-index/2020/](https://www.publishwhatyoufund.org/the-index/2020/)

[^3]: IATI (2020) – Plano Estratégico 2020-2025 da IATI, p. 21: [https://iatistandard.org/en/governance/iati-strategic-plan-2020-2025/](https://iatistandard.org/en/governance/iati-strategic-plan-2020-2025/)

[^4]: IATI (2008) – Declaração de Acra da IATI: [https://iatistandard.org/media/documents/archive/2009/06/iati-accra-statement-p1.pdf](https://iatistandard.org/media/documents/archive/2009/06/iati-accra-statement-p1.pdf)

[^5]: IATI (2020) – Reunião do conselho diretivo de julho de 2020, documento 3, Balanço Técnico: [https://docs.google.com/document/d/1I44X10hj3dh8dKTSrnCCmfChSfS8NwVa5A7tWm1-7vU/edit](https://docs.google.com/document/d/1I44X10hj3dh8dKTSrnCCmfChSfS8NwVa5A7tWm1-7vU/edit)

[^6]: IATI (2020) – Reunião do conselho diretivo de julho de 2020, ata: [https://iatistandard.org/documents/10450/Board\_minutes\_15\_July\_2020.pdf](https://iatistandard.org/documents/10450/Board_minutes_15_July_2020.pdf)

[^7]: Leigh Mitchell (2017) – Systematically Tracking the Aid Tracking Systems (atualizado em maio de 2018): [https://medium.com/@leighmitchell/tracking-the-tracking-systems-ddd3d6578fef](https://medium.com/@leighmitchell/tracking-the-tracking-systems-ddd3d6578fef)

[^8]: O QDMP, quadro da despesa de médio prazo, é um processo utilizado em vários países para planejamento dos gastos a médio prazo (muitas vezes em ciclos de 3 anos). Os dados disponíveis no elemento do “orçamento” da IATI estão concebidos para serem úteis no sentido de contribuírem para estes processos.

[^9]: Incluindo projetos-piloto da IATI em 2010 na RD Congo e em Ruanda, o módulo de Importação da IATI da Development Gateway (apoiado em parte pelo Grupo de Trabalho de Utilização de Dados da IATI), a ferramenta IATI Sync da Catalpa, o módulo de importação da IATI de Bangladesh, o SGIA da Somália e o painel de projetos da Libéria.

[^10]: [http://spreadsheets.aidonbudget.org/](http://spreadsheets.aidonbudget.org/) – NB: o autor desenvolveu esta ferramenta.

[^11]: [https://covid19.humportal.org/activities](https://covid19.humportal.org/activities) – NB: o autor desenvolveu esta ferramenta.

[^12]: PNUD (2020) – “Past Spending Data: Steps for Querying and Processing Data from the Datastore QB”: [https://www.yammer.com/undp-externalnetwork/uploaded\_files/752280010752](https://www.yammer.com/undp-externalnetwork/uploaded_files/752280010752)
