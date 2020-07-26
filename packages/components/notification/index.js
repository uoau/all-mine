import AmNotification from './index.vue';

AmNotification.install = (Vue) => {
    Vue.component(AmNotification.name, AmNotification);
};

export default AmNotification;
