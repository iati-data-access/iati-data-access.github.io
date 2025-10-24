<template>
  <div class="iati-design-system--enabled">
    <div class="iati-title-bar">
      <header class="iati-header" role="header">

        <div class="iati-header__section iati-header__section--first">
          <div class="iati-header__container">

            <a href="https://iatistandard.org/" aria-label="Go to IATI homepage">
              <img class="iati-header__logo" alt=""
                src="http://styles.iatistandard.org/assets/svg/source/logo-colour.svg" />
            </a>

            <nav class="iati-header__general-nav">
              <ul class="iati-piped-list">
                <li><a href="https://iatistandard.org/en/about/">About IATI</a></li>
                <li><a href="https://iatistandard.org/en/using-data/">Use Data</a></li>
                <li><a href="https://iatistandard.org/en/guidance/publishing-data/">Publish Data</a></li>
                <li><a href="https://iatistandard.org/guidance/get-support/">Contact</a></li>
              </ul>
            </nav>
          </div>
        </div>
        
        <div class="iati-header__section iati-header__section--last iati-brand-background">
          <div class="iati-header__container iati-brand-background__content">

            <div class="iati-header__actions">
              <div class="iati-country-switcher">
                <label for="iati-country-switcher" class="iati-country-switcher__label">Choose your language</label>
                <select
                  id="iati-country-switcher"
                  class="iati-country-switcher__control"
                  @change="changeLocale($event)"
                  :value="$i18n.locale"
                >
                  <option
                    v-for="locale in $t('languageOptions')"
                    v-bind:key="locale.value"
                    :value="locale.value"
                  >
                    {{ locale.text }}
                  </option>
                </select>
              </div>
            </div>

            <div class="iati-header-title">
              <p class="iati-header-title__eyebrow">IATI Tools</p>
              <p class="iati-header-title__heading">Country Development Finance Data</p>
            </div>

            <div class="iati-header__nav">
              <nav>
                <ul class="iati-tool-nav">
                  <li>
                    <nuxt-link :to="localePath({ path: '/' })" class="iati-tool-nav-link">
                      {{ $t('home') }}
                    </nuxt-link>
                  </li>
                  <li class="dropdown">
                    <button class="iati-tool-nav-link">
                      {{ $t('about') }}
                    </button>
                    <ul class="dropdown-menu">
                      <li v-for="item in $t('aboutNav')" v-bind:key="item[0]">
                        <nuxt-link :to="localePath({ path: item[0] })" class="dropdown-item">
                          {{ item[1] }}
                        </nuxt-link>
                      </li>
                    </ul>
                  </li>
                  <b-nav-item-dropdown :text="$t('about')" right class="iati-tool-nav-link">
                    <b-dropdown-item
                      v-for="item in $t('aboutNav')"
                      v-bind:key="item[0]"
                      :to="localePath({path: item[0]})">
                      {{ item[1] }}
                    </b-dropdown-item>
                  </b-nav-item-dropdown>
                  <li>
                    <nuxt-link :to="localePath({path: '/data/'})" class="iati-tool-nav-link">
                      {{ $t('dataDashboards.label') }}
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link :to="localePath({path: '/data/custom/'})" class="iati-tool-nav-link">
                      {{ $t('dataDashboards.customDownload') }}
                    </nuxt-link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
     </div>
    <b-container class="page-container pr-md-5 pl-md-5 pb-md-5" fluid>
      <Nuxt />
    </b-container>
    <footer class="iati-footer iati-brand-background">
			<div class="iati-brand-background__content">

				<div class="iati-footer__section iati-footer__section--first">
					<div class="iati-footer__container">
					  <div class="iati-footer-block">
              <h2 class="iati-footer-block__title">Useful links</h2>
              <div class="iati-footer-block__content">
                <ul>
                  <li><a href="https://countrydata.iatistandard.org/">Country Development Finance Data Tool</a></li>
                  <li><a href="https://d-portal.org/ctrack.html#view=search">d-portals</a></li>
                  <li><a href="https://datastore.iatistandard.org/">Satastore Search</a></li>
                </ul>
              </div>
					  </div>
					</div>
				</div>

				<div class="iati-footer__section iati-footer__section--last">
				  <div class="iati-footer__container">
            <nav>
              <ul class="iati-piped-list iati-footer__legal-nav">
                <li><a href="https://iatistandard.org/en/privacy-policy/">Privacy</a></li>
                <li><a href="https://web-terms.iatistandard.org/en/latest/cookie-policy/">Cookies</a></li>
                <li><a href="https://web-terms.iatistandard.org/en/latest/copyright/">Copyright</a></li>
                <li><a href="https://web-terms.iatistandard.org/en/latest/data-removal/">Data Removal</a></li>
              </ul>
            </nav>

            <div class="iati-country-switcher">
              <label for="iati-country-switcher-footer" class="iati-country-switcher__label">Choose your language</label>
              <select id="iati-country-switcher-footer" class="iati-country-switcher__control">
                <option>English</option>
              </select>
            </div>

            <div class="iati-footer__social">
              <a href="https://www.linkedin.com/company/international-aid-transparency-initiative/" aria-label="LinkedIn">
                <i class="iati-icon iati-icon--linkedin"></i>
              </a>
              <a href="https://x.com/IATI_aid" aria-label="X">
                <i class="iati-icon iati-icon--x"></i>
              </a>
              <a href="https://www.youtube.com/channel/UCAVH1gcgJXElsj8ENC-bDQQ" aria-label="YouTube">
                <i class="iati-icon iati-icon--youtube"></i>
              </a>
              <a href="https://www.facebook.com/IATIaid" aria-label="Facebook">
                <i class="iati-icon iati-icon--facebook"></i>
              </a>
            </div>
				  </div>
				</div>
			</div>
		</footer>

  </div>
</template>
<style lang="scss">
.btn-outline-primary {
  color: #155366 !important;
  border-color: #155366;
  &:hover, &:focus, &:active {
    color: #ffffff !important;
    border-color: #06DBE4 !important;
    background-color: #06DBE4 !important;
  }
}
.btn-primary {
  color: #ffffff !important;
  background-color: #155366;
  border-color: #155366;
  &:hover, &:focus, &:active {
    background-color: #06DBE4 !important;
    border-color: #06DBE4 !important;
  }
}
.navbar-light .navbar-nav .nav-link {
  color: #000000;
  &:hover {
    color: #06DBE4;
  }
}

.page-container {
  word-break: break-word;
}
.center-logo {
  img {
    width: 300px;
  }
  text-align: center;
}
table {
  word-break: normal;
}
.nuxt-content {
  padding-left: 20px;
  padding-right: 20px;
  ul, ol {
    padding-left: 20px;
  }
  li {
    padding-left: 5px;
  }
  span.icon.icon-link {
    opacity: 0;
    font-size: .85em;
    float: left;
    margin-left: -0.87em;
    padding-right: 0.23em;
    margin-top: 0.125em;
  }
  span.icon.icon-link::before {
    content: "#";
  }
  h2 {
    margin-top: -3.1rem;
    padding-top: 4.6rem;
  }
  h3 {
    margin-top: -3.1rem;
    padding-top: 4.1rem;
  }
  h4 {
    margin-top: -3.1rem;
    padding-top: 3.6rem;
  }
  h2:hover .icon.icon-link, h3:hover .icon.icon-link, h4:hover .icon.icon-link, h5:hover .icon.icon-link {
    opacity: 100;
  }
}
.toc {
  padding: 0px 20px 20px 20px;
  ul {
    padding-left: 0px;
  }
}
.navigation-secondary__item {
  list-style-type: none;
}
div.footnotes {
  margin-top: 60px;
}
</style>
<script>
export default {
  async asyncData({ $content, params, app }) {
    const page = await $content(app.i18n.locale, params.slug)
      .fetch()
    return {
      page
    }
  }
}
</script>