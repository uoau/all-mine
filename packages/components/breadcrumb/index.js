import AmBreadcrumb from './index.vue';

AmBreadcrumb.install = (Vue) => {
    Vue.component(AmBreadcrumb.name, AmBreadcrumb);
};

export default AmBreadcrumb;
