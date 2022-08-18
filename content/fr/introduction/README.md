---
title: Introduction
---

# Introduction

1.1 Aider les gouvernements des pays partenaires à accéder aux données de l’IITA et à mieux les utiliser
-----------------------------------------------------------------------------

Depuis sa création en 2008, l’Initiative internationale pour la transparence de l’aide (IITA) a connu une forte augmentation à la fois du volume et de la qualité des données publiées. Plus de 1 200 organisations ont publié des données relatives à leurs activités de développement en suivant une norme pour les données sur le développement convenue à l’échelle internationale, la norme de l’IITA[^1]. Des interrogations demeurent quant à la qualité de ces données au cours des dernières années. Cependant, l’indice influent de la transparence de l’aide, publié par Publish What You Fund en juin 2020, a souligné une « importante amélioration dans la transparence globale des donateurs par rapport à 2018 »[^2].

Étant donné le volume et la qualité grandissants des données de l’IITA, l’attention est maintenant accordée à l’amélioration de la capacité des utilisateurs principaux à accéder à ces données et à les utiliser. Le Plan stratégique de l’IITA pour la période 2020-2025 insiste sur le fait que, «[p]our réussir à atteindre ses objectifs, l’IITA doit accorder la priorité aux besoins et défis particuliers des pays partenaires en matière de données, tout en reconnaissant qu’il n’y a pas de solution unique »[^3]. Dans les paragraphes introductifs de la Déclaration d’Accra de l’IITA de 2008, le document fondateur de l’IITA, l’accent est mis sur les liens entre la divulgation au grand public d’informations par les donateurs et les processus de gestion financière des gouvernements des pays partenaires[^4].

Actuellement, un certain nombre d’outils ont vocation à rendre les données de l’IITA accessibles à davantage de personnes. Le plus connu d’entre eux est la plateforme d-portal, qui fournit un accès facile à ces données. En revanche, les produits de données au format Excel fournis par la plateforme demeurent très limités. Dans le bilan technique 2020 de l’IITA, des recommandations ont été formulées pour créer « un niveau de données sémantiques arrêté », « un nouvel ensemble sélectionné de données de l’IITA qui offre une version arrêtée des données plus facile à utiliser » pour les utilisateurs non familiarisés avec le langage XML[^5]. En juillet 2020, le Conseil d’administration de l’IITA a approuvé cette proposition et a confié au Secrétariat de l’IITA le mandat visant à élaborer une stratégie de conception, au sein d’un plan de mise en œuvre plus large[^6].

Il faudra évidemment un peu de temps pour livrer ce nouveau niveau de données sémantiques. En attendant, le PNUD a recruté un consultant qui effectuera des travaux préliminaires afin d’alimenter les processus de création du nouveau niveau sémantique. À cette fin, il cherchera la manière dont les données devraient être traitées pour pouvoir répondre aux besoins de cette catégorie essentielle de membres, les gouvernements des pays partenaires. Ce travail donne la capacité au Secrétariat de l’IITA de répondre aux demandes d’assistance envoyées par les pays partenaires au sujet de l’accès aux données de l’IITA. Les produits incluent à la fois une méthodologie détaillée des transformations adoptées et une série d’ensembles de données mis à jour automatiquement.

1.2 Raison d’être
-------------

À l’origine, il a été envisagé que le dispositif principal d’accès par les pays partenaires aux données de l’IITA soit un système de gestion de l’information sur l’aide (SGIA). Les trois principaux fournisseurs de logiciels SGIA sont : Catalpa International, Development Gateway, et Synergy International Systems. D’autres systèmes personnalisés selon le lieu ou conçus en interne existent, par exemple au Bangladesh, au Laos, au Libéria et en Somalie. Dernièrement, 63 mises en œuvres connues de SGIA ont été documentées[^7] ; de nombreux autres pays utilisent d’autres processus Excel pour recueillir des données similaires.

Les données sont généralement collectées dans ces systèmes par des appels de données périodiques (par exemple, par trimestre) visant à demander aux donateurs les données relatives aux décaissements depuis l’appel précédent. Ces systèmes demandent également des données relatives aux prévisions des donateurs (souvent appelées les prévisions MTEF[^8]), qui sont particulièrement utiles pour alimenter le processus budgétaire. D’habitude, les systèmes demandent également d’autres données, telles que l’emplacement des projets, les résultats ou les classifications sectorielles, selon le contexte et les besoins locaux. Certains gouvernements demandent aussi des données aux partenaires de mise en œuvre (par exemple, les ONG), tandis que d’autres se concentrent sur les donateurs officiels.

L’objectif de base était que ces systèmes importent automatiquement les données de l’IITA, réduisant ainsi grandement la quantité de travail manuel devant être effectué par des appels de données manuels. Cet objectif reste inchangé. Cependant, malgré l’important travail fourni par certains gouvernements et fournisseurs[^9], l’intégration de ces données dans les systèmes reste faible. Cela est dû à des raisons qui outrepassent la portée de cette étude, mais l’un des problèmes majeurs est la difficulté à comprendre la nature des données de l’IITA, étant donné leur complexité et le fait qu’elles soient disponibles au format XML. Veuillez noter qu’il ne s’agit pas d’une critique du format XML. En effet, ce dernier est essentiel pour permettre aux acteurs du développement de transmettre des ensembles de données riches et détaillés. Cependant, afin de renforcer l’utilisation des données de l’IITA, elles doivent être présentées dans des formats que les utilisateurs potentiels connaissent. Il s’agit du seul moyen pour les utilisateurs d’évaluer en connaissance de cause les avantages possibles d’une migration vers une intégration plus automatisée des données de l’IITA dans leurs systèmes.

La disponibilité des données au format Excel présente également des avantages immédiats qui dépassent la socialisation et la sensibilisation. Les pays utilisant déjà un SGIA pourraient tirer profit des données de l’IITA au format Excel afin de « remplir les vides » lorsque les partenaires de développement locaux ne répondent pas aux demandes de données ou ne sont pas des résidents (et n’ont pas de bureaux dans les pays concernés). La fourniture de données au format Excel sera aussi utile, pour les mêmes raisons, aux pays n’utilisant pas de SGIA.

1.3 Travaux précédents pour rendre les données disponibles au format Excel
--------------------------------------------------------

Un certain nombre de travaux ont fourni des éclairages quant à la manière dont les données de l’IITA peuvent, de manière utile, être rendues disponibles au format Excel :


* L’aide pour les feuilles de calcul[^10], élaborée en 2018 par l’Overseas Development Institute, rend les données de l’IITA accessibles au format Excel pour l’Ouganda et le Libéria. Ces données comprennent les décaissements et prévisions MTEF trimestriels. Le site est disponible en anglais et en français, bien que quelques pages ne fonctionnent pas actuellement.
* Le prototype de visualisation de la COVID-19[^11], conçu en 2020 par Development Initiatives, rend les données de l’IITA disponibles au format Excel pour les activités balisées selon les lignes directrices de l’IITA pour la publication de données relatives à la COVID-19. Ces données comprennent des transactions réelles, qui sont ventilées lorsque de multiples pays et secteurs sont concernés. Les données sont mises à jour chaque nuit.
* Étapes pour demander et traiter des données provenant du générateur de requêtes de la banque de données de l’IITA[^12], suivies en 2020 par le Secrétariat de l’IITA : cette présentation au Groupe de travail chargé de l’utilisation des données a résumé une approche à suivre pour extraire des données relatives aux dépenses vers le Tchad entre 2016 et 2020, à la suite d’une demande du Gouvernement. Les données extraites de la banque de données de l’IITA sont retraitées en R (un langage de programmation), puis rendues disponibles au format Excel.

1.4 Produits
-----------

Ce travail fournit des produits visant à améliorer l’accessibilité des données de l’IITA à court et moyen terme, jusqu’à l’achèvement des travaux sur le niveau de données sémantiques. Les produits sont disponibles au public et leur téléchargement est gratuit ; ils restent cependant conçus pour répondre aux besoins des gouvernements des pays partenaires. Les produits incluent :


* la méthodologie relative à l’accès aux données et à leur traitement ;
* un fichier de données pour chaque pays dans chaque langue, notamment :
  * les agrégations trimestrielles des budgets, engagements, décaissements et dépenses ;
  * les agrégations par organisme déclarant (et type), secteur, type d’aide, type de financement, et organisme de mise en œuvre ;
* une interface permettant l’accès aux données et à la méthodologie.

[^1]: IATI Registry, consulté le 2020-10-23 : [https://iatiregistry.org](https://iatiregistry.org)

[^2]: Publish What You Fund, 2020, « Indice de transparence de l’aide 2020 » : [https://www.publishwhatyoufund.org/the-index/2020/](https://www.publishwhatyoufund.org/the-index/2020/)

[^3]: IITA, 2020, Plan stratégique de l’IITA pour la période 2020-2025, p. 21 : [https://iatistandard.org/fr/governance/iati-strategic-plan-2020-2025/](https://iatistandard.org/fr/governance/iati-strategic-plan-2020-2025/)

[^4]: IITA, 2008, IATI Accra Statement (Déclaration d’Accra de l’IITA) : [https://iatistandard.org/media/documents/archive/2009/06/iati-accra-statement-p1.pdf](https://iatistandard.org/media/documents/archive/2009/06/iati-accra-statement-p1.pdf)

[^5]: IITA, 2020, Governing Board Meeting July 2020, paper 3 : Technical Stocktake (Procès-verbal de la réunion du Conseil d’administration de juillet 2020, Document no 3 : Bilan technique) : [https://docs.google.com/document/d/1I44X10hj3dh8dKTSrnCCmfChSfS8NwVa5A7tWm1-7vU/edit](https://docs.google.com/document/d/1I44X10hj3dh8dKTSrnCCmfChSfS8NwVa5A7tWm1-7vU/edit)

[^6]: IITA, 2020, Governing Board Meeting July 2020 – minutes (Procès-verbal de la réunion du Conseil d’administration de juillet 2020) : [https://iatistandard.org/documents/10450/Board\_minutes\_15\_July\_2020.pdf](https://iatistandard.org/documents/10450/Board_minutes_15_July_2020.pdf)

[^7]: Leigh Mitchell, 2017, Systematically Tracking the aid Tracking Systems (mis à jour en mai 2018) : [https://medium.com/@leighmitchell/tracking-the-tracking-systems-ddd3d6578fef](https://medium.com/@leighmitchell/tracking-the-tracking-systems-ddd3d6578fef)

[^8]: Le MTEF, Medium Term Expenditure Framework (le cadre des dépenses à moyen terme), est un processus utilisé dans un certain nombre de pays pour prévoir les dépenses à moyen terme (souvent, pour des exercices de trois ans). Les données trouvées dans l’élément `<budget>` sont conçues pour être utiles à l’alimentation de ces processus.

[^9]: Notamment des projets pilotes de l’IITA en République démocratique du Congo et au Rwanda en 2010 ; le module d’importation de l’IITA de Development Gateway (en partie géré par le Groupe de travail chargé de l’utilisation des données de l’IITA) ; l’outil de synchronisation de l’IITA de Catalpa ; le module d’importation de l’IITA du Bangladesh ; le SGIA de la Somalie ; le tableau de bord de projet du Libéria.

[^10]: [http://spreadsheets.aidonbudget.org/](http://spreadsheets.aidonbudget.org/) – N.B. : l’auteur a conçu cet outil.

[^11]: [https://covid19.humportal.org/activities](https://covid19.humportal.org/activities) – N.B. : l’auteur a conçu cet outil.

[^12]: PNUD, 2020, « Past Spending Data: Steps for Querying and Processing Data from the Datastore QB » : [https://www.yammer.com/undp-externalnetwork/uploaded\_files/752280010752](https://www.yammer.com/undp-externalnetwork/uploaded_files/752280010752)
