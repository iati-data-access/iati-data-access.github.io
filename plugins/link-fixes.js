import { extname } from 'path'
import {slugify} from 'transliteration'

// https://github.com/nuxt/content/issues/851#issuecomment-861038183
// https://github.com/nuxt/content/issues/702

function maybeFixLink (el) {
  // # Fix TOC
  //  -> Fix anchors
  if (el.id) {
    el.id = slugify(el.id)
  }
  // # Fix headings
  //  -> Fix anchors
  if (el.props?.id) {
    el.props.id = slugify(el.props.id)
  }
  //  -> Fix links
  if (el.props?.href) {
    const URI = decodeURI(el.props.href);
    const httpScheme = URI.startsWith('http://');
    const httpsScheme = URI.startsWith('https://');
    const mailtoScheme = URI.startsWith('mailto:');
    const isExternalURI = httpScheme || httpsScheme || mailtoScheme;
    const href = isExternalURI ? URI : '#' + slugify(URI);
    el.props.href = href;
  }
  // URLs with an extension should be normal hrefs
  // rather than nuxt-links
  if (el.tag === 'nuxt-link') {
    const ext = extname(el.props.to)
    if (ext !== '') {
      el.tag = 'a'
      el.props.href = el.props.to
      el.props.rel = ['nofollow', 'noopener', 'noreferrer']
      el.props.target = '_blank'
      delete el.props.to
    }
  }
  if (el.children) {
    el.children.forEach(maybeFixLink)
  }
}

export default function (document) {
  if (document.extension !== '.md') {
    return
  }
  document.body.children ? document.body.children.forEach(maybeFixLink) : null
  document.toc ? document.toc.forEach(maybeFixLink) : null
}
