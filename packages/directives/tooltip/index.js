import tooltip from './index.vue';

function init(Vue) {
    const TooltipConstructor = Vue.extend(tooltip);
    Vue.directive('tooltip', {
        bind(el, binding) {
            let instance = null;
            el.addEventListener('mouseenter', () => {
                if (instance) {
                    instance.show = true;
                    return;
                }
                const direction = binding.arg || 'right';
                const content = binding.value || '默认值默认值默认值';
                const left = (direction === 'top' || direction === 'bottom') ? (el.offsetLeft + el.offsetWidth / 2) : (el.offsetLeft + el.offsetWidth);
                const top = (direction === 'left' || direction === 'right') ? (el.offsetTop + el.offsetHeight / 2) : (el.offsetTop + el.offsetHeight);
                instance = new TooltipConstructor({
                    data: {
                        direction,
                        content,
                        left,
                        top,
                    },
                }).$mount();
                el.parentNode.appendChild(instance.$el);
                instance.show = true;
            });
            // el.addEventListener('mouseleave', () => {
            //     if (instance) {
            //         instance.close();
            //         instance = null;
            //     }
            // });
        },
    });
}

export default init;
