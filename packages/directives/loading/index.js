import loading from './index.vue';

function init(Vue) {
    const LoadingConstructor = Vue.extend(loading);
    Vue.directive('loading', {
        bind(el, binding) {
            if (window.getComputedStyle(el).position === 'static') {
                el.style.position = 'relative';
            }
            const instance = new LoadingConstructor().$mount();
            el.loadingVm = instance;
            instance.show = binding.value;
            el.appendChild(instance.$el);
        },
        update(el, binding) {
            el.loadingVm.show = binding.value;
        },
    });
}

export default init;
