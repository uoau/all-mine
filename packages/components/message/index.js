import AmMessage from './index.vue';
import { isWhat } from '../../utils/base';

const instances = [];

export default {
    install(Vue) {
        const ToastConstructor = Vue.extend(AmMessage);
        const showMessage = (arg) => {
            // 生成messgae的内容
            let initData = {
                content: 'this is a message',
                type: '',
                duration: 2000,
            };
            // 选择挂载的父元素
            let father = document.body;
            if (isWhat(arg) === 'String') {
                initData.content = arg;
            } else {
                initData = { ...initData, ...arg };
                father = arg.father || father;
            }
            const instance = new ToastConstructor({
                data: initData,
            }).$mount();
            father.appendChild(instance.$el);
            instance.show = true;
            instances.push(instance);
            instance.removeFromInstances = function removeFromInstances() {
                const index = instances.findIndex((item) => item === instance);
                instances.splice(index, 1);
            };
            return instance;
        };
        Vue.prototype.$message = (arg) => {
            showMessage(arg);
        };
        Vue.prototype.$message.success = (content) => {
            showMessage({
                content,
                type: 'success',
            });
        };
        Vue.prototype.$message.fail = (content) => {
            showMessage({
                content,
                type: 'fail',
            });
        };
        Vue.prototype.$message.info = (content) => {
            showMessage({
                content,
                type: 'info',
            });
        };
        Vue.prototype.$message.warning = (content) => {
            showMessage({
                content,
                type: 'warning',
            });
        };
        Vue.prototype.$hideMessage = (instance) => {
            if (instance) {
                instance.close();
            } else {
                instances.forEach((item) => {
                    item.close();
                });
            }
        };
    },
};
