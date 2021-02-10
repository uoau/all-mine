import { scrollTo } from '../../utils/dom';

export default {
    install(Vue) {
        Vue.prototype.$backtop = ({
            father = null,
            duration = null,
        } = {}) => new Promise((resolve) => {
            scrollTo({
                scrollEl: father || document.documentElement,
                time: duration,
                y: 20,
            }).then(() => {
                resolve();
            });
        });
    },
};
