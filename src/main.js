// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview';
import App from './App'
import {router} from './router'
import store from './store'
import 'iview/dist/styles/iview.css'
import './index.less'

Vue.config.productionTip = false
Vue.use(iView);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  render: h => h(App),
  mounted(){
  	document.documentElement.style.fontSize=(document.documentElement.clientHeight > 1080 ? 1080 : document.documentElement.clientHeight) / 12 + "px";
		window.addEventListener('resize',function(){
			document.documentElement.style.fontSize=(document.documentElement.clientHeight > 1080 ? 1080 : document.documentElement.clientHeight) / 12 + "px";
		})
  }
})