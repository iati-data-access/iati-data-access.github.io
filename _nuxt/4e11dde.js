(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{502:function(t,n,e){"use strict";e.r(n);var r=e(13),c=(e(22),e(16),e(14),e(39),{asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function n(){var e,r,c,o,l,d;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e=t.$content,r=t.params,c=t.app,o=t.error,l=r.slug||"index",n.next=4,e(c.i18n.locale,l).fetch().catch((function(){o({statusCode:404,message:"Page not found"})}));case 4:return d=n.sent,n.abrupt("return",{pages:d});case 6:case"end":return n.stop()}}),n)})))()},computed:{pageTitle:function(){return this.pages.map((function(t){return t.title})).join()}},head:function(){return{title:"".concat(this.pageTitle," - ").concat(this.$t("title")),meta:[{hid:"description",name:"description",content:this.$t("description")}],htmlAttrs:{lang:this.$i18n.locale}}}}),o=e(38),component=Object(o.a)(c,(function(){var t=this,n=t._self._c;return n("div",t._l(t.pages,(function(e){return n("div",{key:e.title},[n("b-row",[n("b-col",{staticClass:"toc d-none d-lg-block",attrs:{lg:"3"}},[n("div",{staticClass:"aside-m__header fill-sunrise"},[n("div",{staticClass:"aside-m__heading"},[t._v(t._s(e.title))])]),t._v(" "),n("nav",{staticClass:"navigation-secondary",attrs:{id:"navigation-secondary"}},[e?n("ul",{staticClass:"navigation-secondary__list"},t._l(e.toc,(function(link){return 2===link.depth?n("li",{key:link.id,staticClass:"navigation-secondary__item"},[n("NuxtLink",{attrs:{to:"#".concat(link.id)}},[t._v(t._s(link.text))])],1):t._e()})),0):t._e()])]),t._v(" "),n("b-col",{attrs:{lg:"9"}},[n("nuxt-content",{attrs:{document:e}})],1)],1)],1)})),0)}),[],!1,null,null,null);n.default=component.exports}}]);