---
title: Méthodologie
---

_Date de modification: 12 octobre 2021_

# Méthodologie

Cette méthodologie résume les étapes suivies pour convertir les données de l’IITA en un format utile aux gouvernements des pays partenaires. Elle permet de déterminer la manière dont les données sont récupérées, retraitées et harmonisées, ainsi que le produit. En règle générale, les étapes s’alignent sur celles suivies au cours du travail précédent détaillé dans la [sous-section 1.3](/fr/introduction/#13-travaux-precedents-pour-rendre-les-donnees-disponibles-au-format-excel). Cette méthodologie sera perfectionnée et mise à jour lors de ce travail, en accord avec le Secrétariat de l’IITA.

2.1 Récupération des données de l’IITA
--------------------------

À la suite des premiers essais avec diverses API, l’approche convenue est de télécharger toutes les données, puis de les traiter sans utiliser la banque de données de l’IITA ni une autre API. Cette approche est à privilégier étant donné que cet exercice consiste à télécharger l’ensemble des données de l’IITA. Il est possible d’effectuer d’importants gains de performance grâce à cette approche.

Le téléchargement des données depuis le [Data Dump de l’IITA](https://iati-data-dump.codeforiati.org/) prend 53 secondes pour l’archive zip de 537 Mb (9 Gb après désarchivage) qui contient toutes les données de l’IITA.

Les données sont récupérées une fois par jour.

2.2 Sélection des activités
---------------------------

Toutes les activités des versions 2.01 ou suivantes de l’IITA sont incluses. Parmi les fichiers publiés dans le Registre de l’IITA, 94 % utilisent les versions 2.01 ou suivantes. En limitant le traitement de ces fichiers, les frais de maintenance du logiciel seront réduits. Il est également possible qu’un très petit nombre de données obsolètes ou de mauvaise qualité soit exclu.

Les données ne font l’objet d’aucun processus de validation. Ainsi, nous utilisons à la fois des données valides et non valides. Lorsque des problèmes liés à la qualité des données surviendront, ils seront généralement transmis à l’organisme ayant publié les données en question plutôt que d’essayer de mettre en œuvre des solutions techniques.

2.3 Extraction des données pertinentes
-------------------------

Chaque fichier est traité afin d’extraire un certain nombre de champs de chaque transaction ou budget. Dans certains cas, on retrouve des données fournies au niveau de l’activité alors qu’elles ne sont pas fournies dans la transaction ou le budget.

### 2.3.1 Extraction des données des activités

L’identifiant IITA et l’organisme déclarant sont toujours extraits de l’activité.

#### Identifiant de l’IITA

L’identifiant unique associé à l’activité :

```xml
iati-activity/iati-identifier/text()
```

#### Titre

L’intitulé de l’activité. N.B. : en cas de version multilingue, nous avons essayé de n’obtenir que la version en anglais dans le produit en anglais et les versions en français, en espagnol et en portugais dans les produits suivants :

```xml
iati-activity/title/narrative[not(@xml:lang) ou @xml:lang='en']/text()
```

#### Organisme déclarant

Le nom de l’organisation qui publie ces données de l’IITA :

```xml
iati-activity/reporting-org/text()
```

#### Type d’organisme déclarant

Le type d’organisme déclarant qui publie ces données de l’IITA :

```xml
iati-activity/reporting-org/@type
```

### 2.3.2 Extraction des données des transactions

Les champs suivants sont extraits de chaque transaction. Lorsque ces quatre champs n’existent pas, la transaction n’est pas traitée.

#### Valeur

La valeur de la transaction dans la devise publiée :

```xml
transaction/value/text()
```

#### Date de la transaction

La date de la transaction (utilisée pour agréger les transactions ainsi que dans le produit) :

```xml
transaction/transaction-date/@iso-date
```

#### Date de la valeur de la transaction[^1]

La date de la valeur de la transaction dans la devise publiée (utilisée comme date de la conversion de la devise) :

```xml
transaction/value/@value-date
```

#### Type de transaction

Le type de transaction (p. ex., engagement, décaissement, dépense) :

```xml
transaction/transaction-type/@code
```

Remarque : les transactions n’étant pas de type fonds entrant, engagement, décaissement ou dépense ont été initialement écartées. Cette décision pourra être révisée par la suite en fonction de la demande, tout en tenant compte de la nécessité de conserver une durée de traitement raisonnable.

### 2.3.3 Extraction des données d’une transaction ou d’une activité

Pour certains champs, les données proviennent soit de la transaction, soit de l’activité. Cela dépend de l’organisme qui a publié les données.

#### Devise

La devise de la transaction, ou la devise par défaut de l’activité :

```xml
transaction/@currency ou iati-activity/@default-currency
```

#### Type d’aide

Le type d’aide concerné par la transaction, ou le type d’aide par défaut de l’activité (seuls les types d’aide du Comité d’aide au développement [CAD] sont inclus) :

```xml
transaction/aid-type [not(@vocabulary) ou @vocabulary='1'] /@code ou iati-activity/default-aid-type[not(@vocabulary) ou @vocabulary='1'] /@code
```

#### Type de financement

Le type de financement concerné par la transaction, ou le type de financement par défaut de l’activité :

```xml
transaction/finance-type/@code ou iati-activity/default-finance-type/@code
```

#### Type de flux

Le type de flux concerné par la transaction, ou le type de flux par défaut de l’activité :

```xml
transaction/flow-type/@code ou iati-activity/default-flow-type/@code
```

#### Organisme prestataire

L’organisation émettrice de la transaction ou déclarante de l’activité :

```xml
transaction/provider-org/text()
```

#### Organisme bénéficiaire

L’organisation destinataire de la transaction, ou le ou les organismes de mise en œuvre de l’activité :

```xml
transaction/provider-org/text()
```

#### Remplacement des organismes prestataires et bénéficiaires par d’autres participants à l’activité

Dans les cas où il n’existe pas d’organisme prestataire ou bénéficiaire concernant la transaction, d’autres organismes participant à l’activité servent de remplacement. Les organisations utilisées en remplacement varient selon le type de transaction traité :

<div class="table">

Type de transaction | Organisme prestataire | Organisme bénéficiaire
--- | --- | ---
1 - Fonds entrants | Organisme de financement | Organisme déclarant
2 - Engagement sortant | Organisme déclarant | Organisme de mise en œuvre
3 - Décaissement | Organisme déclarant | Organisme de mise en œuvre
4 - Dépense | Organisme déclarant | Organisme de mise en œuvre

</div>

S’il existe plusieurs organismes de financement ou de mise en œuvre, ceux-ci sont reliés par des virgules.

Balisage utilisé pour les organismes déclarants :

```xml
iati-activity/reporting-org/text()
```

Balisage utilisé pour les organismes de financement :

```xml
iati-activity/participating-org[@role='1']/text()
```

Balisage utilisé pour les organismes de mise en œuvre :

```xml
iati-activity/participating-org[@role='4']/text()
```

### 2.3.4 Extraire des données de valeurs potentiellement différentes à partir d’une transaction ou d’une activité

Enfin, les données de deux champs (pays ou région bénéficiaires et secteur) peuvent être extraites à partir d’une transaction ou d’une activité. Concernant les activités, il est possible que ces données aient été publiées à de multiples reprises avec des répartitions par pourcentage. La section qui suit décrit la manière de gérer les données de valeurs différentes.

#### Pays ou région bénéficiaire

Le pays bénéficiaire de la transaction, ou la liste de pays bénéficiaires de l’activité (s’il en existe plusieurs, une colonne supplémentaire permet d’indiquer que la transaction s’inscrit dans le cadre d’un projet multipays) :

```xml
transaction/recipient-country/@code ou iati-activity/recipient-country/@code
```

En l’absence de pays bénéficiaires, l’analyse porte sur les régions du CAD :

```xml
transaction/recipient-region[not(@vocabulary) ou @vocabulary='1']/@code ou iati-activity/recipient-region[not(@vocabulary) ou @vocabulary='1']/@code
```

#### Secteur

Le secteur concerné par la transaction, ou la liste de secteurs de mise en œuvre de l’activité (seuls les secteurs du CAD sont inclus) :

```xml
transaction/sector[not(@vocabulary) ou @vocabulary='1']/@code ou iati-activity/ sector[not(@vocabulary) ou @vocabulary='1']/@code
```

#### Humanitaire

Le marqueur humanitaire attribué à la transaction ou à l’activité :

```xml
transaction/@humanitarian ou iati-activity/@humanitarian
```

* Si la transaction est signalée comme relevant d’un projet humanitaire (`1`), l’élément `humanitaire` sera égal à `1`.
* Si la transaction est signalée comme ne relevant pas d’un projet humanitaire (`0`), l’élément `humanitaire` sera égal à `0`.

Dans les cas où aucun marqueur n’est attribué à la transaction :

* Si l’activité est signalée comme s’inscrivant dans le cadre d’un projet humanitaire (`1`), l’élément `humanitaire` sera égal à `1`.
* Si l’activité est signalée comme ne s’inscrivant pas dans le cadre d’un projet humanitaire (`0`), l’élément `humanitaire` sera égal à `0`.


2.4 Répartir les transactions entre de multiples secteurs et pays
-------------------------------------------------------------

Comme expliqué dans la section précédente, une seule transaction peut être liée à plusieurs pays et secteurs. Dans chacun de ces cas, la valeur de la transaction est répartie entre les pays ou les secteurs proportionnellement au pourcentage qu’ils ont reçu. Remarque :  selon ce qui permet le plus de clarté, les transactions qui n’impliquent pas de pays ou de régions du CAD peuvent être retirées, ou le champ « secteur » laissé vide en l’absence de secteurs.

Dans certains cas, les pourcentages indiqués peuvent être incorrects. Par exemple, il est possible que leur total ne soit pas égal à 100 %, ou qu’aucun pourcentage n’ait été attribué à de multiples secteurs. Les pourcentages sont alors ajustés et leur base de calcul modifiée afin de parvenir à un total égal à 100 %. Par exemple :

<div class="table">

Secteur | Pourcentage (publié) | Pourcentage (corrigé)
--- | --- | ---
12220 Soins de santé de base | 100% | 50%
11220 Éducation primaire | 100% | 50%

</div>

Une transaction de 100 dollars US serait divisée en deux lignes : l’une pour les 50 dollars US affectés aux soins de santé de base, et l’autre pour les 50 dollars US réservés à l’éducation primaire. Si la même activité était publiée avec l’inclusion de deux pays bénéficiaires, la transaction serait de nouveau divisée, cette fois en quatre lignes.

Corriger les pourcentages indiqués par pays requiert de prendre des précautions. Les organisations interprètent les lignes directrices de l’IITA différemment. Certaines estiment qu’il est indiqué que le total des pourcentages attribués à tous les pays et à toutes les régions doit être égal à 100 %, tandis que d’autres considèrent que les pourcentages indiqués par pays et par région doivent séparément atteindre un total de 100 %. La logique appliquée est la suivante :


* A. Si un pays ou une région bénéficiaires ont été indiqués et qu’aucun pourcentage n’est attribué au pays destinataire, seul le pays bénéficiaire est pris en compte ;
  * Exemple :
  ```xml
  <recipient-country code="LR" />
  <recipient-region code="298" />
  ```
  * Attribuer 100 % de la valeur de la transaction au Libéria (LR).
* B. Si le pays et la région bénéficiaires ont tous deux été assortis de pourcentages, mais que le total des pourcentages indiqués par pays ou région bénéficiaires est égal à environ 100 %, seul le pays bénéficiaire est pris en compte :
  * Exemple :
  ```xml
  <recipient-country code="TD" percentage="70" />
  <recipient-country code="LR" percentage="30" />
  <recipient-region code="298" percentage="100" />
  ```
  * Attribuer 70 % de la valeur de la transaction au Tchad (TD), et 30 % de sa valeur au Libéria (LR).
* C. Dans les autres cas, tenir compte du pays et de la région bénéficiaires.
  * Exemple :
  ```xml
  <recipient-country code="TD" percentage="50" />
  <recipient-region code="298" percentage="50" />
  ```
  * Attribuer 50 % de la valeur de la transaction au Tchad (TD), et 50 % de sa valeur à la région africaine du sud du Sahara (298).

2.5 Convertir les devises
-----------------------

La devise de publication des données varie selon les signataires. Les transactions doivent donc faire l’objet d’une conversion individuelle en dollars US, en euros et dans les devises locales sur la base du taux de change en vigueur à la date la plus proche de celle à laquelle la valeur de la transaction a été définie. Les taux de change mensuels de 169 devises sont tirés des statistiques financières internationales du FMI[^2].

2.6 Gérer les budgets
--------------------

Il est également important de collecter des données sur les dépenses prévisionnelles. Ces données sont plus difficiles d’accès, car, contrairement aux transactions, les budgets ne sont pas ventilés par secteur ou par pays. Préciser la part de budget affectée à un pays ou à un secteur en particulier est donc impossible. Afin d’évaluer les dépenses prévisionnelles, certaines des données fournies au sujet d’une transaction ou d’une activité doivent être incorporées à l’analyse du budget. Par exemple, lorsqu’aucun secteur n’est indiqué pour une activité, la part de la valeur des transactions effectuées dans le cadre d’engagements affectée aux différents secteurs sert à décomposer le budget par secteur d’une manière semblable à celle décrite dans la section 2.3 ci-dessus.

Cette méthode de calcul de la répartition des fonds accordés au titre d’engagements est applicable aux catégories suivantes :


* Type d’aide
* Type de financement
* Type de flux
* Secteur
* Pays ou région bénéficiaire

Dans le champ correspondant à l’organisme prestataire, indiquer l’organisme déclarant de l’activité. Dans le champ correspondant à l’organisme bénéficiaire, inscrire le ou les organismes de mise en œuvre de l’activité.

Les budgets couvrant plusieurs trimestres sont divisés en plusieurs lignes coïncidant exactement avec un trimestre. La valeur est répartie de manière proportionnelle[^3]. Cette répartition est nécessaire afin de conserver la possibilité de comparer les transactions (dont la date est unique) et les budgets (dont les périodes de mise en œuvre ne concordent pas forcément avec l’exercice fiscal du gouvernement).

En cas de publication des versions initiale et révisée d’un budget couvrant la même période, la dernière plutôt que la première version sera prise en compte.

2.7 Rassembler les transactions
---------------------------

Les transactions sont regroupées en une ligne par trimestre, l’ensemble des autres champs suivants demeurant identiques :


* Identifiant IITA
* Organisme déclarant
* Type d’organisme déclarant
* Type de transaction
* Type d’aide
* Type de financement
* Type de flux
* Organisme prestataire
* Organisme bénéficiaire
* Secteur
* Pays ou région bénéficiaire

La date de la transaction est fixée à celle de la fin du trimestre.

2.8 Convertir les données conformément à la devise cible et à la période fiscale
---------------------------------------------------

Les devises cibles sont le dollar US et l’euro pour tous les pays. L’inclusion d’une devise locale (p. ex., le shilling kényan pour l’analyse du Kenya) est également prévue. Le taux de change utilisé correspond à celui en vigueur au dernier jour du trimestre.

2.9 Langue
------------

Les données sont fournies en anglais, en français, en espagnol et en portugais. Tous les intitulés disponibles dans ces langues sont inclus dans l’analyse, de même que tous les codes. Certains intitulés et organismes prestataires ou bénéficiaires ne sont indiqués qu’en anglais.

2.10 Traiter les données
-----------------------

Les données sont traitées au moyen de GitHub Actions, dont l’utilisation reste gratuite tant que le délai de traitement est inférieur à six heures. Le traitement s’effectue toutes les trois heures et les fichiers obtenus sont publiés sur GitHub Pages. Ce service de publication est également gratuit, à condition que la taille du fichier ne dépasse pas 100 Mb et que la taille totale du registre soit inférieure à 1 Gb.

En raison de ces limites, il est important de s’en tenir à des délais de traitement courts et à des tailles de fichier réduites. Employer des outils gratuits pour la totalité du processus de gestion des données permet également de grandement en améliorer le maintien à long terme.

2.11 Licences
--------------

Toutes les analyses sont publiées sur Github et librement exploitables dans le cadre de la version 3.0 de la licence publique générale GNU Affero (AGPL)[^4].


[^1]: Remarque : il semble que certains signataires utilisent la dernière date à laquelle ils ont mis leurs données à jour en tant que date de définition de la valeur de la transaction. Nous signalons alors qu’il s’agit d’un problème dont le service d’aide de l’IITA devra discuter avec les signataires concernés et continuons d’utiliser la date de définition de la valeur.

[^2]: [https://data.imf.org/?sk=4C514D48-B6BA-49ED-8AB9-52B0C1A0179B](https://data.imf.org/?sk=4C514D48-B6BA-49ED-8AB9-52B0C1A0179B) (s’ouvre dans une nouvelle fenêtre)

[^3]: Si le budget couvre des parties de trimestre plutôt que des trimestres entiers, le nombre de jours de ces parties de trimestre sert à calculer la part de la valeur qui sera accordée chaque trimestre.

[^4]: [https://www.gnu.org/licenses/agpl-3.0.fr.html](https://www.gnu.org/licenses/agpl-3.0.fr.html) (s’ouvre dans une nouvelle fenêtre)
