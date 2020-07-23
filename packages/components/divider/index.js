/*
 * @Author: your name
 * @Date: 2020-07-15 13:53:26
 * @LastEditTime: 2020-07-15 13:54:11
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /all-mine/packages/components/divider/index.js
 */
import AmDivider from './index.vue';

AmDivider.install = (Vue) => {
    Vue.component(AmDivider.name, AmDivider);
};

export default AmDivider;
