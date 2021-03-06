import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import $ from 'jquery'
import axios from 'axios'

import * as jsonpatch from 'fast-json-patch';


require('../node_modules/codemirror/lib/codemirror.js')
require('../node_modules/codemirror/mode/xml/xml.js')
require('../node_modules/codemirror/mode/javascript/javascript.js')
require('../node_modules/codemirror/mode/css/css.js')
require('../node_modules/codemirror/mode/htmlmixed/htmlmixed.js')
require('../node_modules/codemirror/mode/markdown/markdown.js')
require('../node_modules/codemirror/addon/mode/overlay.js')
require('../node_modules/codemirror/mode/gfm/gfm.js')
require('../node_modules/marked/lib/marked.js')
require('../node_modules/kity/dist/kity.js')
require('../node_modules/hotbox/hotbox.js')
require('../node_modules/kityminder-core/dist/kityminder.core.js')
require('./script/expose-editor.js')

Vue.config.productionTip = true
Vue.prototype.$axios = axios;
Vue.prototype.jsonpatch = jsonpatch;
Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
