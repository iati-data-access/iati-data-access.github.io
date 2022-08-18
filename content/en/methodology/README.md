---
title: Methodology
---

_Updated: 12th October 2021_

# Methodology

This methodology outlines the steps that have been undertaken to get IATI data into a format that is useful for partner country governments. It identifies how data is retrieved, reprocessed and harmonised, and finally output. The steps broadly align with the steps undertaken in the previous work outlined in [subsection 1.3](/introduction/#_1-3-previous-work-to-make-data-available-in-excel-format). This methodology will be further refined and updated during the course of this work, in agreement with the IATI Secretariat.

2.1 Retrieval of IATI data
--------------------------

After initial experiments with various APIs, the agreed approach is to download all data and then process it without using the IATI Datastore or another API. This approach is preferable given that this exercise downloads substantially all IATI data anyway. There are significant increases in performance that can be achieved through this approach.

Downloading data from [IATI Data Dump](https://iati-data-dump.codeforiati.org/) takes 53 seconds for a zipped file of 537 MB (9GB unzipped), which contains all IATI data.

The data is retrieved once per day.

2.2 Selection of activities
---------------------------

All activities in IATI version 2.01 or above are included. 94% of files currently published on the IATI Registry use version 2.01 or above. Limiting processing to these files reduces the cost of maintenance of the software going forward, and is likely to exclude a very small amount of out of date or poor-quality data.

The data is not subjected to any validation processes. That is, we use both valid and invalid data. Where data quality issues arise, these will generally be raised with the relevant publisher, rather than attempting to implement technical workarounds.

2.3 Extract relevant data
-------------------------

Each file is processed to extract a number of fields from each transaction or budget. In some cases, we fall back to data provided at the activity level where it is not provided in the transaction or budget.

### 2.3.1 Extract data from activity

The IATI Identifier and the reporting organisation are extracted from the activity in all cases.

#### IATI Identifier

The unique identifier for the activity:

```xml
iati-activity/iati-identifier/text()
```

#### Title

The title of the activity. NB where this is in multiple languages, we have attempted to get just the English language version:

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

The following fields are extracted from each transaction. Where these four fields do not exist, the transaction is not processed.

#### Value

The transaction value in the published currency:

```xml
transaction/value/text()
```

#### Transaction date

The date of the transaction (which is used to aggregate transactions and in the output):

```xml
transaction/transaction-date/@iso-date
```

#### Transaction value date[^1]

The transaction value date in the published currency (which is used as the date for currency conversion):

```xml
transaction/value/@value-date
```

#### Transaction type

The transaction type (e.g. commitment, disbursement, expenditure):

```xml
transaction/transaction-type/@code
```

Note: initially, transactions other than incoming funds, commitments, disbursements and expenditure have been discarded. This decision could be revised subsequently depending on demand and subject to the need to keep the processing time at a reasonable level.

### 2.3.3 Extract data from transaction or from activity

For some fields, the data comes from either the transaction or the activity, depending on the publisher’s data.

#### Currency

The transaction currency, or the activity default currency:

```xml
transaction/@currency or iati-activity/@default-currency
```

#### Aid type

The transaction aid type, or the activity default aid type (only DAC aid types are included):

```xml
transaction/aid-type[not(@vocabulary) or @vocabulary='1'] /@code or iati-activity/default-aid-type[not(@vocabulary) or @vocabulary='1'] /@code
```

#### Finance type

The transaction finance type, or the activity default finance type:

```xml
transaction/finance-type/@code or iati-activity/default-finance-type/@code
```

#### Flow type

The transaction flow type, or the activity default flow type:

```xml
transaction/flow-type/@code or iati-activity/default-flow-type/@code
```

#### Provider organisation

The transaction provider organisation, or the activity reporting organisation:

```xml
transaction/provider-org/text()
```

#### Receiver organisation

The transaction receiver organisation, or the activity implementing organisation(s):

```xml
transaction/provider-org/text()
```

#### Activity-level fallbacks for provider and receiver organisations

Where there is no transaction-level provider or receiver organisation, we use an organisation from another part of the activity. We use different fallbacks depending on which transaction type we are processing:

<div class="table">

Transaction Type | Provider org | Receiver org
--- | --- | ---
1 - Incoming Funds | Funding Org | Reporting Org
2 - Outgoing Commitment | Reporting Org | Implementing Org
3 - Disbursement | Reporting Org | Implementing Org
4 - Expenditure | Reporting Org | Implementing Org

</div>

Where there are multiple funding or implementing organisations, these are concatenated (joined) together with commas.

For reporting organisation, we use:

```xml
iati-activity/reporting-org/text()
```

For funding organisation:

```xml
iati-activity/participating-org[@role='1']/text()
```

For implementing organisation:

```xml
iati-activity/participating-org[@role='4']/text()
```

### 2.3.4 Extract data from transaction or from activity, with potentially multiple values

Finally, two fields (recipient country/region and sector) are extracted either from the transaction or activity. At the activity level, these can be published multiple times with percentage splits. The methodology for handling multiple values is described in the following section.

#### Recipient Country or Region

The transaction recipient country, or the list of activity recipient countries (where there are multiple countries, a column has been added to indicate that the transaction is part of a multi-country project):

```xml
transaction/recipient-country/@code or iati-activity/recipient-country/@code
```

Alternatively, if there are no recipient countries, we look for DAC regions:

```xml
transaction/recipient-rergion[not(@vocabulary) or @vocabulary='1']/@code or iati-activity/recipient-region[not(@vocabulary) or @vocabulary='1']/@code
```

#### Sector

The transaction sector, or the list of activity sectors (NB only DAC sectors are included):

```xml
transaction/sector[not(@vocabulary) or @vocabulary='1']/@code or iati-activity/ sector[not(@vocabulary) or @vocabulary='1']/@code
```

#### Humanitarian

The transaction humanitarian flag, or the activity humanitarian flag:

```xml
transaction/@humanitarian or iati-activity/@humanitarian
```

* If the transaction has a humanitarian flag (`1`) then `humanitarian` will be marked as `1`.
* If the transaction has a non-humanitarian flag (`0`) then `humanitarian` will be marked as `0`.

If there are no transaction-level flags:

* If the activity has a humantarian flag (`1`) then `humanitarian` will be marked as `1`.
* If the activity has a non-humanitarian flag (`0`) then `humanitarian` will be marked as `0`.

2.4 Splitting transactions for multiple sectors and countries
-------------------------------------------------------------

As described in the previous section, individual transactions may map to multiple countries and sectors. In each case, the transaction is therefore split with the value proportionate to the percentage to this transaction for this country for this sector. (NB: Where there are no countries or DAC regions, the transaction is discarded. Where there are no sectors, the sector is output as blank - depending on which approach is clearer.)

In some cases, the published percentages may also not be correct. For example, they may not add up to 100, or there may be multiple sectors with no percentage specified. In these cases, the percentages have been adjusted and rebased so that the percentages add up to 100%. For example:

<div class="table">

Sector | Percentage (published) | Percentage (corrected)
--- | --- | ---
12220 Basic health care | 100% | 50%
11220 Primary education | 100% | 50%

</div>

A single transaction of USD 100 would then be split into two rows: one row for USD 50 for basic health care and a second row of USD 50 for primary education. If the same activity were classified with two recipient countries, it would be split again, now into four rows.

Care needs to be taken when correcting percentages for countries. The IATI Guidance has been interpreted differently by different organisations. Some have interpreted the Guidance as stating that all countries plus all regions must add up to 100%, whereas others have understood that countries must add up to 100% and regions must (separately) add up to 100%. The following logic is used:


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

As data is published in different currencies (depending on the publisher), individual transactions need to be converted to USD, Euro, and local currencies using the closest exchange rate date to the transaction value-date. Monthly exchange rates for 169 currencies are sourced from the IMF's International Financial Statistics[^2].

2.6 Handling budgets
--------------------

Forward spending data is also important to capture. It is more challenging, as unlike transactions, budgets are not classified by sector or country – so it is not possible to specifically state the proportion of a budget that is going to a particular country or sector. In order to make this assessment, certain data from the transaction or activity level needs to be applied to the budget data. For example, where there are no activity-level sectors, the proportion of the value of commitment transactions to different sectors is used to apply sector splits to budgets in a similar way as described in section 2.3, above.

This process of calculating the proportion of commitments is used for:

* Aid Type
* Finance Type
* Flow Type
* Sector
* Recipient Country or Region

For the Provider Organisation field, the activity reporting organisation is used. For the Receiver Organisation field, the activity implementing organisation(s) is used.

Where budgets span more than one quarter, they are split into multiple rows that map to exactly one quarter. The value is split proportionately[^3]. This is necessary in order to maintain comparability between transactions (which are marked with a single date) and budgets (which span a period, and which may not align with the government’s fiscal year).

Where revised and original budgets are both published for the same period, revised budgets are used instead of original budgets.


2.7 Rolling up transactions
---------------------------

Transactions are aggregated up into one row per quarter, where the following other fields are all identical:


* IATI Identifier
* Reporting Organisation
* Reporting Organisation Type
* Transaction Type
* Aid Type
* Finance Type
* Flow Type
* Provider Organisation
* Receiver Organisation
* Sector
* Recipient Country or Region

The transaction date is set to the last day of the quarter.

2.8 Conversion to target currency and fiscal period
---------------------------------------------------

The target currencies are set as USD and Euro for all countries. An additional local currency (e.g. Kenyan shillings for the Kenya output) is also included. The exchange rate date is the last day of the quarter.

2.9 Language
------------

The data is available in English and French. All available Titles in these languages are pulled into the outputs along with all codes. Some Titles and Provider and Recipient Organisations are only available in English.

2.10 Processing of data
-----------------------

The data is processed on Github Actions, which is a free service as long as the processing time is less than six hours. This runs every 3 hours. The resulting data files are published on Github Pages. This is also a free service, as long as no file is larger than 100MB and the total repository size is not larger than 1GB.

Given these limits, it is important to keep file size and processing times low. Ensuring that the entire workflow can be delivered through free tools also significantly improves the sustainability of the tools.

2.11 Licensing
--------------

All outputs are published on Github and are openly licensed according to the GNU Affero General Public License (AGPL) v3.0[^5].


[^1]: NB: it appears that some publishers are using the last day they updated their data as the transaction value date. In these cases, we have continued to use the value date, and flag this as an issue to be raised with the publishers by IATI Support.

[^2]: [https://data.imf.org/?sk=4C514D48-B6BA-49ED-8AB9-52B0C1A0179B](https://data.imf.org/?sk=4C514D48-B6BA-49ED-8AB9-52B0C1A0179B) (opens new window)

[^3]: If a budget does not perfectly span quarters, but instead spans part-quarters, the number of days in that part-quarter arrer used to calculate the proportion of value to be attributed to each quarter.

[^4]: The CIA World Factbook list of fiscal years is initially used to determine each country’s fiscal year: [https://www.cia.gov/library/publications/the-world-factbook/fields/228.html](https://www.cia.gov/library/publications/the-world-factbook/fields/228.html) (opens new window)

[^5]: [https://www.gnu.org/licenses/agpl-3.0.en.html](https://www.gnu.org/licenses/agpl-3.0.en.html) (opens new window)