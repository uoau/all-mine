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
                // 获取原点坐标
                const rect = el.getBoundingClientRect();
                const { width } = rect;
                const { height } = rect;
                let { left } = rect;
                let { top } = rect;
                switch (direction) {
                case 'left':
                    top += 0.5 * height;
                    break;
                case 'right':
                    left += width;
                    top += 0.5 * height;
                    break;
                case 'top':
                    left += 0.5 * width;
                    break;
                case 'bottom':
                    left += 0.5 * width;
                    top += height;
                    break;
                default: break;
                }
                instance = new TooltipConstructor({
                    data: {
                        direction,
                        content,
                        left,
                        top,
                        elWidth: width,
                        elHeight: height,
                    },
                }).$mount();
                document.body.appendChild(instance.$el);
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
