/*
 * @Author: XuX
 * @Date: 2020-07-07 22:16:01
 * @Description: entry js file
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import { routes } from './routes';
import App from './App.vue';
import AM from '../packages';
import '../packages/stylesheet/default.theme.less';

Vue.use(VueRouter);
Vue.use(AM);

new Vue({
    router: new VueRouter({
        routes,
        mode: 'hash',
    }),
    render: (h) => h(App),
}).$mount('#app');
