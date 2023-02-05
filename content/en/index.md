# Country Development Finance Data

<p class="lead">Access data on development and humanitarian activities, presented simply by country, reporting organisation and sector. Visualise or download the data for easy analysis.</p>


<b-card img-src="/data-dashboards-background-countries.png" img-alt="Image" overlay body-class="d-flex align-items-center">
  <b-btn block variant="primary" to="/data/">Explore Data Dashboards <font-awesome-icon :icon="['fa', 'chart-simple']" /></b-btn>
</b-card>
<b-row class="mt-2">
    <b-col lg="4">
        <b-btn block
            variant="outline-primary"
            class="mb-2"
            to="/data/recipient-country-or-region/">by Recipient Country or Region</b-btn>
    </b-col>
    <b-col lg="4">
        <b-btn block
            variant="outline-primary"
            class="mb-2"
            to="/data/reporting-organisation/">by Reporting Organisation</b-btn>
    </b-col>
    <b-col lg="4">
        <b-btn block
            variant="outline-primary"
            class="mb-2"
            to="/data/sector-category/">by Sector Category</b-btn>
    </b-col>
</b-row>

<hr />

<b-card-group>

<b-card class="text-md-center">

## Access data files

<download-file></download-file>

</b-card>
    <b-card>
        <p><b-btn block variant="primary" to="/data/custom/">Custom data download <font-awesome-icon :icon="['fa', 'wand-magic-sparkles']" /></b-btn></p>
        <p>Choose the columns to be included in your spreadsheet and select the filters to narrow your search. Download the custom set of data in Excel.</p>
    </b-card>
</b-card-group>
<hr />
<b-alert show variant="secondary" class="text-center">
	<p>Looking for the guidance and analysis dashboards? We've moved this content to the About section.</p>
	<b-btn variant="secondary" to="/guidance-analysis/">Guidance and analysis dashboards &raquo;</b-btn>
</b-alert>



<p class="center-logo">
	<img src="/powered-by-iati.png" alt="Powered by IATI Data" />
</p>

[Privacy Policy](https://iatistandard.org/en/privacy-policy/)