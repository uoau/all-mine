export default {
    install(Vue) {
        Vue.prototype.$backtop = ({
            father = null,
            duration = null,
        } = {}) => new Promise((resolve) => {
            // 选择计时器方式
            const startTime = new Date();
            const newSetTimeout = window.requestAnimationFrame || ((func) => setTimeout(func, 16));
            // 获取滚动对象、计算滚动初始值
            const beginTop = father ? father.scrollTop : document.documentElement.scrollTop;
            const scrollBody = father || document.documentElement;
            // 计算时间
            let durationTime = duration;
            if (!durationTime) {
                durationTime = (beginTop / 1000) * 200;
            }
            // 计算二次函数
            function sFun(t) {
                return ((-1 * beginTop) / durationTime) * (t - durationTime);
            }
            // 开始滚动
            function scroll() {
                const t = (new Date()) - startTime;
                const s = sFun(t);
                if (t <= durationTime) {
                    scrollBody.scrollTop = s;
                    newSetTimeout(scroll);
                } else {
                    scrollBody.scrollTop = 0;
                    resolve();
                }
            }
            newSetTimeout(scroll);
        });
    },
};
