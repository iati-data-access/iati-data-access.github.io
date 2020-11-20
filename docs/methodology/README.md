---
title: Methodology
---

# Methodology

This methodology outlines steps that will be undertaken to get IATI data into a format that will be useful for partner country governments. It identifies how data will be retrieved, reprocessed and harmonised, and finally output. The steps broadly align with the steps undertaken in the previous work outlined in [subsection 1.3](/introduction/#_1-3-previous-work-to-make-data-available-in-excel-format). This methodology will be further refined and updated during the course of this work, in agreement with the IATI Secretariat.

2.1 Retrieval of IATI data
--------------------------

A range of different approaches have been used to retrieving data in past work:


* Aid on Spreadsheets: downloaded data from the original IATI Datastore;
* COVID-19 Prototype Visualisation: downloaded data from D-Portal;
* Steps for Querying and Processing Data: downloaded from the new IATI Datastore API.

This is the part of the methodology that will need to remain the most flexible as it appears to be the most challenging. Given that the Datastore was only launched in September 2020, challenges with using the IATI Datastore may involve the following, or other unforeseen issues:

* Only data that passes schema validation is included in the IATI Datastore. This may exclude some data from publishers that are important to include in this initial exercise.
* Stability or performance issues could arise as this data access tool will be one of the first to request significant extracts of data from the new Datastore.

During the course of this work, the IATI Technical Team will be informed of any obstacles in using the IATI Datastore. The final methodology from this work will also help to provide information on how the Datastore outputs could be further improved.

### 2.1.1 Download of all IATI data from IATI Registry

After initial experiments with various APIs, the agreed approach is to download all data and then process it without using the IATI Datastore or another API. This approach is preferable given that this exercise will aim to download substantially all IATI data anyway. There are significant increases in performance that can be achieved through this approach.

Downloading data from [IATI Data Dump](https://iati-data-dump.codeforiati.org/) takes 53 seconds for a zipped file of 537 MB (9GB unzipped), which contains all IATI data.

The data will be retrieved once per day.

2.2 Selection of activities
---------------------------

All activities in IATI version 2.01 or above will be included. 94% of files currently published on the IATI Registry use version 2.01 or above. Limiting processing to these files will reduce the cost of maintenance of the software going forward, and is likely to exclude a very small amount of out of date or poor-quality data.

We will not subject the data to any validation processes. That is, we will use both valid and invalid data. Where data quality issues arise, these will generally be raised with the relevant publisher, rather than attempting to implement technical workarounds.

We have discussed various ways to limit the total filesize, including limiting the number of columns that are output and grouping transactions into quarters[^1]. Depending on needs, and based on consultation with the IATI Secretariat, these approaches may be extended to include:


* only selecting transactions after a particular date;
* only including activities from publishers which are updated at least every quarter[^2].

Any such approaches would be applied systematically and according to a clear methodology.

2.3 Extract relevant data
-------------------------

Each file will be processed to extract a number of fields from each transaction. In some cases, we will fall back to data provided at the activity level where it is not provided in the transaction.

### 2.3.1 Extract data from activity

The IATI Identifier and the reporting organisation need to be extracted from the activity in all cases.

#### IATI Identifier

The unique identifier for the activity:

```xml
iati-activity/iati-identifier/text()
```

#### Title

The title of the activity. NB where this is in multiple languages, we will attempt to get just the English language version:

```xml
iati-activity/title/narrative[not(@xml:lang) or @xml:lang='en']/text()
```

#### Reporting organisation

The name of the organisation publishing this IATI data:

```xml
iati-activity/reporting-org/text()
```

#### Reporting organisation type

The type of the reporting organisation publishing this IATI data:

```xml
iati-activity/reporting-org/@type
```

### 2.3.2 Extract data from transaction

The following fields will be extracted from each transaction. Where these four fields do not exist, the transaction will not be processed.

#### Value

The transaction value in the published currency:

```xml
transaction/value/text()
```

#### Transaction date

The date of the transaction (which would be used to aggregate transactions and in the output):

```xml
transaction/transaction-date/@iso-date
```

#### Transaction value date[^3]

The transaction value date in the published currency (which would be used as the date for currency conversion):

```xml
transaction/value/@value-date
```

#### Transaction type

The transaction type (e.g. commitment, disbursement, expenditure):

```xml
transaction/transaction-type/@code
```

Note: initially, transactions other than commitments, disbursements and expenditure will be discarded. This decision will be revised subsequently depending on demand and subject to the need to keep the processing time at a reasonable level.

### 2.3.3 Extract data from transaction or from activity

For some fields, the data needs to come from either the transaction or the activity, depending on the publisher’s data.

#### Currency

The transaction currency, or the activity default currency:

```xml
transaction/@currency or iati-activity/@default-currency
```

#### Aid type

The transaction aid type, or the activity default aid type (only DAC aid types will be included):

```xml
transaction/aid-type[not(@vocabulary) or @vocabulary='1'] /@code or iati-activity/default-aid-type[not(@vocabulary) or @vocabulary='1'] /@code
```

#### Finance type

The transaction finance type, or the activity default finance type:

```xml
transaction/finance-type/@code or iati-activity/default-finance-type/@code
```

#### Provider organisation

The transaction provider organisation, or the activity reporting organisation:

```xml
transaction/provider-org/text() or iati-activity/reporting-org/text()
```

#### Receiver organisation

The transaction receiver organisation, or the activity implementing organisation(s):

```xml
transaction/provider-org/text() or iati-activity/participating-org[@role='4']/text()
```

Where there are multiple implementing organisations, these will be concatenated (joined) together with commas.

### 2.3.4 Extract data from transaction or from activity, with potentially multiple values

Finally, two fields (recipient country and sector) will be extracted either from the transaction or activity. At the activity level, these can be published multiple times with percentage splits. More details of how multiple values will be handled are described in the following section.

#### Country

The transaction recipient country, or the list of activity recipient countries (where there are multiple countries, a column will be added to indicate that the transaction is part of a multi-country project):

transaction/recipient-country/@code or iati-activity/recipient-country/@code

#### Sector

The transaction sector, or the list of activity sectors (NB only DAC sectors will be included):

```xml
transaction/sector[not(@vocabulary) or @vocabulary='1']/@code or iati-activity/ sector[not(@vocabulary) or @vocabulary='1']/@code
```

2.4 Splitting transactions for multiple sectors and countries
-------------------------------------------------------------

As described in the previous section, individual transactions may map to multiple countries and sectors. In each case, the transaction therefore needs to be split with the value proportionate to the percentage to this transaction for this country for this sector. (NB: where there are no countries the transaction will be discarded. Where there are no sectors, the sector will be output as “unspecified” or blank - depending on which approach is clearer.)

In some cases, the published percentages may also not be correct. For example, they may not add up to 100, or there may be multiple sectors with no percentage specified. In these cases, the percentages will be adjusted and rebased so that the percentages add up to 100%. For example:

Sector | Percentage (published) | Percentage (corrected)
--- | --- | ---
12220 Basic health care | 100% | 50%
11220 Primary education | 100% | 50%

A single transaction of USD 100 would then be split into two rows: one row for USD 50 for basic health care and a second row of USD 50 for primary education. If the same activity were classified with two recipient countries, it would be split again, now into four rows.

Care needs to be taken when correcting percentages for countries. The IATI Guidance has been interpreted differently by different organisations. Some have interpreted the Guidance as stating that all countries plus all regions must add up to 100%, whereas others have understood that countries must add up to 100% and regions must (separately) add up to 100%. The following logic will be used:


* A. If recipient-country and recipient-region exist, and recipient-country have no percentages: take only recipient-country;
  * e.g.:
  ```xml
  <recipient-country code="LR" />
  <recipient-region code="298" />
  ```
  * Apply 100% of the transaction value to Liberia (LR).
* B. If recipient-country and recipient-region both have percentages, but recipient-country percentages or recipient-region percentages adds up to around 100%: take only recipient-country;
  * e.g.:
  ```xml
  <recipient-country code="TD" percentage="70" />
  <recipient-country code="LR" percentage="30" />
  <recipient-region code="298" percentage="100" />
  ```
  * Apply 70% of the transaction value to Chad (TD) and 30% of the transaction value to Liberia (LR).
* C. Otherwise, take recipient-country and recipient-region.
  * e.g.:
  ```xml
  <recipient-country code="TD" percentage="50" />
  <recipient-region code="298" percentage="50" />
  ```
  * Apply 50% of the transaction value to Chad (TD) and 50% of the transaction value to Africa, South of Sahara (298).

2.5 Currency conversion
-----------------------

As data is published in different currencies (depending on the publisher), individual transactions need to be converted to USD using the closest exchange rate date to the transaction value-date. Exchange rates from a range of sources will need to be used in order to ensure as wide a coverage as possible. The existing Exchange Rates Python library will be used, supplemented with IMF and World Bank rates where necessary[^4].

2.6 Handling budgets
--------------------

Forward spending data is also important to capture. It is more challenging, as unlike transactions, budgets are not classified by sector or country – so it is not possible to specifically state the proportion of a budget that is going to a particular country or sector. In order to make this assessment, certain data from the transaction or activity level will need to be applied to the budget data. For example, where there are no activity-level sectors, the proportion of the value of commitment transactions to different sectors will be used to apply sector splits to budgets in a similar way as described in section 2.3, above.

This process of calculating the proportion of commitments will be used for:


* Aid Type
* Finance Type
* Sector
* Country

For the Provider Organisation field, the activity reporting organisation will be used. For the Receiver Organisation field, the activity implementing organisation(s) will be used.

Where budgets span more than one quarter, they will be split into multiple rows that map to exactly one quarter. The value will be split proportionately[^5]. This is necessary in order to maintain comparability between transactions (which are marked with a single date) and budgets (which span a period, and which may not align with the government’s fiscal year).

Where revised and original budgets are both published for the same period, revised budgets will be used instead of original budgets.

2.7 Rolling up transactions
---------------------------

Transactions will be aggregated up into one row per quarter, where the following other fields are all identical:


* IATI-Identifier
* Reporting Organisation
* Reporting Organisation Type
* Transaction Type
* Aid Type
* Finance Type
* Provider Organisation
* Receiver Organisation
* Sector
* Country

The date will be set to the last day of the quarter.

2.8 Conversion to target currency and fiscal period
---------------------------------------------------

The target currency will be specified for each recipient country. Where this differs from USD, the total amount will be converted to the target currency. The exchange rate date will be the last day of the quarter. The fiscal quarter and fiscal year will also be added as additional columns. These will reflect the relevant country’s own fiscal calendar[^6]. The target currencies will initially be set as USD for all countries, until otherwise requested by a particular country. Partner countries will also be requested to let us know if they would like a target currency other than USD.

2.9 Language
------------

The data will be made available in English by default. However, it will also be explored whether it is possible to publish the data in French for francophone countries.

2.10 Processing of data
-----------------------

The data will be processed on Github Actions, which is a free service as long as the processing time is less than six hours. This will run nightly. The resulting data files will be published on Github Pages. This is also a free service, as long as no file is larger than 100MB and the total repository size is not larger than 1GB.

Given these limits, it will be important to keep file size and processing times low. Ensuring that the entire workflow can be delivered through free tools will also significantly improve the sustainability of the tools which are developed.

2.11 Licensing
--------------

All outputs will be published on Github and will be openly licensed according to the GNU Affero General Public License (AGPL) v3.0[^7].


[^1]: This may be relaxed depending on the file size when not grouping transactions into quarters. However, preliminary tests with data from DFID, USAID and the World Bank suggest that it would halve the size of the output datasets.

[^2]: According to the IATI Dashboard, 68% of publishers are publishing annual or less than annual data. This data is not the sort of data that is useful at country level. In some cases, these are also very large datasets by secondary publishers (for example, by AidData), or very small datasets, so it is likely to significantly increase the total file size with limited or no benefit.
[http://publishingstats.iatistandard.org/timeliness.html](http://publishingstats.iatistandard.org/timeliness.html)

[^3]: NB: it appears that some publishers are using the last day they updated their data as the transaction value date. In these cases, we will continue to use the value date, and flag this as an issue to be raised with the publishers by IATI Support.

[^4]: [https://github.com/codeforiati/exchangerates](https://github.com/codeforiati/exchangerates)

[^5]: If a budget does not perfectly span quarters, but instead spans part-quarters, the number of days in that part-quarter will be used to calculate the proportion of value to be attributed to each quarter.

[^6]: The CIA World Factbook list of fiscal years will initially be used to determine each country’s fiscal year: [https://www.cia.gov/library/publications/the-world-factbook/fields/228.html](https://www.cia.gov/library/publications/the-world-factbook/fields/228.html)

[^7]: [https://www.gnu.org/licenses/agpl-3.0.en.html](https://www.gnu.org/licenses/agpl-3.0.en.html)