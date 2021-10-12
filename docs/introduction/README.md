---
title: Introduction
---

# Introduction

1.1 Supporting partner country governments to better access and use IATI data
-----------------------------------------------------------------------------

Since its inception in 2008, the International Aid Transparency Initiative (IATI) has seen a substantial increase in both the volume and quality of published data. Over 1200 organisations have now published data on their development activities according to an internationally-agreed standard for development data, the IATI Standard[^1]. There have remained persistent questions around the quality of this data in recent years. However, the influential Aid Transparency Index, released by Publish What You Fund in June 2020, noted a “significant improvement in donors’ overall transparency compared to 2018”[^2].

Given the increasing volume and quality of IATI data, attention has shifted to improving the ability of key users to access and use IATI data. The IATI Strategic Plan 2020-25 emphasises that, “in order to be successful in delivering on its objectives, IATI must prioritise the particular data needs and challenges of partner countries”[^3]. In its opening paragraphs, the 2008 IATI Accra Statement, IATI’s founding document, emphasises the links between the public disclosure of information by donors and partner country government financial management processes[^4].

A number of tools currently exist to make IATI data accessible to wider audiences. The most commonly known is D-Portal, which provides user-friendly access to IATI data. However, D-Portal offers very limited outputs in terms of Excel-formatted data. The IATI Technical Stocktake in 2020 recommended the creation of “an opinionated semantic data layer”, “a new curated data set that provides an ‘opinionated’ version of the data that is easier to use for” those unfamiliar with IATI-XML[^5]. In July 2020, the IATI Board approved this proposal, and mandated the IATI Secretariat to develop an approach to development, as part of a broader implementation plan[^6].

This new semantic data layer will necessarily take some time to deliver. As an interim measure, UNDP engaged a consultant to do some preliminary work to feed into the process of developing the new semantic layer, exploring how the data should be generated in order to meet the needs of this key constituency, partner country governments. The work provides the IATI Secretariat with the ability to respond to support requests received from partner countries regarding access to IATI data. The outputs include both a detailed methodology for the transformations that are undertaken, and a series of automatically updated datasets.

1.2 Rationale
-------------

It was originally envisaged that the main mechanism for partner countries to access IATI data was through Aid Information Management Systems (AIMS). Three main vendors provide AIMS software: Catalpa International, Development Gateway, and Synergy International Systems. A number of other locally-tailored or homegrown systems exist, for example in Bangladesh, Laos, Liberia and Somalia. A recent effort documented 63 known AIMS implementations[^7]; many other countries have other Excel-based processes for capturing similar data.

Data is generally collected in these systems through periodic data calls (for example, every quarter) to request data from donors on disbursements since the previous data call. These systems also request data on donors’ forward projections (often known as MTEF projections[^8]), which is particularly useful for feeding into the budget process. Systems normally also request other data, such as the locations of projects, results, and sectoral classifications, depending on the local context and needs. Some governments also request data from implementing partners (for example, NGOs), whereas others focus on official donors.

The original intention was for these systems to automatically import IATI data, significantly reducing the amount of manual work that needs to be undertaken through manual data calls. This remains the intention. However, despite substantial work by some governments and vendors[^9], the integration of this data with systems has remained low. The reasons for this are beyond the scope of this consultancy, but a key issue is the difficulty of understanding the nature of IATI data, given its complexity and the fact that it is made available in IATI-XML format. Note that this is not a criticism of the format – the XML format is essential to allowing a rich and detailed set of data to be communicated by development actors. However, in order to strengthen the uptake of IATI data, it needs to be presented in formats that are familiar to potential users. Only then can users make an informed assessment about the potential benefits of moving towards a more automated integration of IATI data into their systems.

Making IATI data available in Excel format also has immediate advantages beyond socialisation and awareness raising. Countries with existing AIMS may be able to take advantage of IATI data in Excel format for “filling in the blanks” where local development partners are unresponsive to data requests, or where they are non-resident (and do not have offices in the country). Providing the data in Excel format will also be useful to countries without an existing AIMS for the same reason.

1.3 Previous work to make data available in Excel format
--------------------------------------------------------

A number of pieces of work have provided insights into how IATI data can usefully be made available in Excel format:

* Aid on Spreadsheets[^10] – developed in 2018 by the Overseas Development Institute, makes IATI data available for Uganda and Liberia in Excel format. The data includes quarterly disbursements and MTEF projections. The site is available in English and French, though some pages are not currently working.
* COVID-19 Prototype Visualisation[^11] – developed in 2020 by Development Initiatives, makes IATI data available for activities tagged according to the IATI COVID-19 Publishing Guidance in Excel format. The data includes actual transactions, disaggregated where there are multiple countries and sectors. The data is updated nightly.
* Steps for Querying and Processing Data from the IATI Datastore Query Builder[^12] – undertaken in 2020 by the IATI Secretariat, this presentation to the IATI Data Use Working Group outlined an approach for extracting data for past spending to Chad for 2016-2020, following a request from the Government. Data from the IATI Datastore is reprocessed in R (a programming language) and then made available in Excel format.

1.4 Outputs
-----------

This work provides a number of outputs to improve the accessibility of IATI data in the short to medium term, until the semantic data layer work has been completed. The outputs are publicly available and free for anyone to download, but they are designed to meet the needs of partner country governments. The outputs include:


* The methodology for accessing and processing the data;
* One data file for each country in each language, including:
  * Quarterly aggregations of budgets, commitments, disbursements, and expenditures;
  * Aggregations by reporting organisation (and type), sector, aid type, finance, type, and implementing organisation;
* An interface for accessing the data and methodology.


---------

[^1]: IATI Registry, accessed 2020-10-23: [https://iatiregistry.org](https://iatiregistry.org)

[^2]: Publish What You Fund (2020) – “Aid Transparency Index 2020”: [https://www.publishwhatyoufund.org/the-index/2020/](https://www.publishwhatyoufund.org/the-index/2020/)

[^3]: IATI (2020) – IATI Strategic Plan 2020-2025, p21:
[https://iatistandard.org/en/governance/iati-strategic-plan-2020-2025/](https://iatistandard.org/en/governance/iati-strategic-plan-2020-2025/)

[^4]: IATI (2008) – IATI Accra Statement:
[https://iatistandard.org/media/documents/archive/2009/06/iati-accra-statement-p1.pdf](https://iatistandard.org/media/documents/archive/2009/06/iati-accra-statement-p1.pdf)

[^5]: IATI (2020) – Governing Board Meeting July 2020, paper 3: Technical Stocktake:
[https://docs.google.com/document/d/1I44X10hj3dh8dKTSrnCCmfChSfS8NwVa5A7tWm1-7vU/edit](https://docs.google.com/document/d/1I44X10hj3dh8dKTSrnCCmfChSfS8NwVa5A7tWm1-7vU/edit)

[^6]: IATI (2020) – Governing Board Meeting July 2020 – minutes:
[https://iatistandard.org/documents/10450/Board\_minutes\_15\_July\_2020.pdf](https://iatistandard.org/documents/10450/Board_minutes_15_July_2020.pdf)

[^7]: Leigh Mitchell (2017) – Systematically Tracking the aid Tracking Systems (updated May 2018):
[https://medium.com/@leighmitchell/tracking-the-tracking-systems-ddd3d6578fef](https://medium.com/@leighmitchell/tracking-the-tracking-systems-ddd3d6578fef)

[^8]: MTEF, the Medium Term Expenditure Framework, is a process used in a number of countries for medium-term (often 3-year rolling) expenditure planning. Data found in IATI’s `<budget>` element is designed to be useful for feeding into these processes.

[^9]: Including IATI Pilots in 2010 in DR Congo and Rwanda; Development Gateway’s IATI import module (supported in part by IATI’s Data Use Working Group); Catalpa’s IATI Sync tool; Bangladesh’s IATI import module; Somalia’s AIMS; Liberia’s Project Dashboard.

[^10]: [http://spreadsheets.aidonbudget.org/](http://spreadsheets.aidonbudget.org/) – NB the author developed this tool.

[^11]: [https://covid19.humportal.org/activities](https://covid19.humportal.org/activities) – NB the author developed this tool.

[^12]: UNDP (2020) – “Past Spending Data: Steps for Querying and Processing Data from the Datastore QB”:
[https://www.yammer.com/undp-externalnetwork/uploaded\_files/752280010752](https://www.yammer.com/undp-externalnetwork/uploaded_files/752280010752)