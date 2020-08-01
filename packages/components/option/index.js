import AmOption from './index.vue';

AmOption.install = (Vue) => {
    Vue.component(AmOption.name, AmOption);
};

export default AmOption;
