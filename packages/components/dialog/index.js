import AmDialog from './index.vue';

export default {
    install(Vue) {
        const DialogConstructor = Vue.extend(AmDialog);
        Vue.prototype.$dialog = (params) => {
            const instance = new DialogConstructor({
                data: {
                    ...params,
                },
            }).$mount();
            document.body.appendChild(instance.$el);
            instance.show = true;
            return new Promise((resolve, reject) => {
                instance.confirm = resolve;
                instance.cancel = reject;
            });
        };
    },
};
