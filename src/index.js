/*
 * @Author: XuX
 * @Date: 2020-07-07 22:16:01
 * @Description: entry js file
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import { routes } from './routes';
import App from './App.vue';
import AM from '../packages/index';
import AmEditor from '../packages/components/editor';
import AmCropper from '../packages/components/cropper';

Vue.use(VueRouter);
Vue.use(AM);
Vue.component(AmEditor.name, AmEditor);
Vue.component(AmCropper.name, AmCropper);

new Vue({
    router: new VueRouter({
        routes,
        mode: 'hash',
    }),
    render: (h) => h(App),
}).$mount('#app');
