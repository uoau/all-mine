import tooltip from './index.vue';

let instance = null;
function init(Vue) {
    const TooltipConstructor = Vue.extend(tooltip);
    Vue.directive('tooltip', {
        bind(el, binding) {
            el.addEventListener('mouseenter', () => {
                if (instance && instance.el !== el) {
                    instance.afterLeave();
                    instance = null;
                }
                const direction = binding.arg || 'right';
                const content = binding.value || '默认值默认值默认值';
                instance = new TooltipConstructor({
                    data: {
                        el,
                        direction,
                        content,
                    },
                }).$mount();
                document.body.appendChild(instance.$el);
                instance.show = true;
            });
            el.addEventListener('mouseleave', () => {
                if (instance) {
                    instance.close();
                }
            });
        },
    });
}

export default init;
