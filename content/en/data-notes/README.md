---
title: Data Notes
---

# Data Notes

As outlined in the IATI Strategic Plan 2020-2025, driving a significant improvement in the quality of data published is one of IATI’s three key objectives. As noted in the [introduction](/introduction#11-supporting-partner-country-governments-to-better-access-and-use-iati-data), recent years have already seen a significant improvement in the quality of data, but the quality continues to vary by publisher. This means that data users need to take care when analysing the data, and this data notes section is intended to support users by providing a simple overview of publishers’ data.

## 3.1 Fields in output data

For each country, one file is published, containing a common set of fields for all activities. The files have been designed so that a pivot table can be added on top of the data, in order to aggregate and summarise the data in various different ways, depending on user needs.

Not all fields are published for all activities. Data quality will vary by organisation.

Not all transaction types are published by all organisations. Incoming funds in particular need to be handled with care. They would potentially allow a user to find net disbursements for an activity (as disbursements + expenditure - incoming funds). However, most organisations do not currently publish incoming funds, so "net disbursements" may provide an inaccurate picture of the data, as it will actually be net for *only some* organisations.

<div class="table">

Column | Example (transactions) | Example (budgets)
--- | --- | ---
IATI Identifier | 44000-P163328 | 44000-P163328
Title | Himachal Pradesh State Roads Transformation Project | Himachal Pradesh State Roads Transformation Project
Reporting Organisation | 44000 – World Bank | 44000 – World Bank
Reporting Organisation Type | 40 – Multilateral | 40 – Multilateral
Aid Type | C01 – Project-type interventions | C01 – Project-type interventions
Finance Type | 410 – Aid loan excluding debt reorganisation | 410 – Aid loan excluding debt reorganisation
Flow Type | 10 - ODA | 10 - ODA
Provider Organisation | 44001 – International Bank for Reconstruction and Development | 44001 – International Bank for Reconstruction and Development
Provider Organisation Type | 40 - Multilateral | 40 - Multilateral
Receiver Organisation | Himachal Pradesh Roads & Infrastructure Development Corporation | Himachal Pradesh Roads & Infrastructure Development Corporation
Receiver Organisation Type | |
Transaction Type | 2 - Outgoing Commitment | budget - Budget
Recipient Country or Region | IN - India | IN - India
Multi Country [^1] | 1 | 1
Sector Category | 210 – Transport & Storage | 210 – Transport & Storage
Sector | 21020 – Road Transport | 21020 – Road Transport
Humanitarian | 0 | 0
Calendar Year | 2019 | 2019
Calendar Quarter | Q4 | Q4
Calendar Year and Quarter | 2019 Q4 | 2019 Q4
URL | https://d-portal.org/q.html?aid=44000-P163328 | https://d-portal.org/q.html?aid=44000-P163328
Value (USD) | 47,560,000 | 435,000
Value (EUR) | 41,213,347 | 376,951
Value (Local currrency) | 33,589,335,939 | 32,829,292

</div>

## 3.2 Data gaps by year

The following table shows each publisher and the total amount of funding (in millions of USD) found in their published data after processing, for all countries/regions. It includes the past three years (for commitments, disbursements and expenditures) and the next three years (for budgets).

The downloadable Excel table includes more data, including the past two years, the current year, and the next two years for budgets, incoming funds, commitments, disbursements, and expenditures.

This will identify overall data gaps that you may need to be aware of. Data gaps (where USD 0.00 was found) are highlighted in yellow.


<a
  href="https://countrydata.iatistandard.org/data/summary_year.xlsx"
  class="download-button">Download this table in Excel format →</a>

<data-gaps-year></data-gaps-year>

## 3.3 Currencies for each country

<countries-currencies></countries-currencies>

[^1]: Signifies whether this spending was originally part of a multi-country project, and funding to this country has been calculated, based on the percentage splits of the activity between countries.

