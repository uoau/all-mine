/* eslint-disable */
export default {
    bind(el, binding) {
        setTimeout(() => {
            const style = window.getComputedStyle(el, null);
            const timeMatch = style.transitionDuration.match(/[0-9\.]+(?=s)/g);
            if(!timeMatch){
                return false;
            }
            const maxTime = timeMatch.reduce((num1, num2) => {
                num1 = parseFloat(num1);
                num2 = parseFloat(num2);
                return num1 > num2 ? num1 : num2
            })*1000;
            let nowEl = null;
            let mdend = false;
            let hasUp = false;
            let timer1 = null;
            function mdEnd() {
                mdend = true;
                if(nowEl && hasUp){
                    clear(nowEl);
                }
            }
            function clear(el){
                // 回到初始状态
                el.classList.remove(binding.value);
                // el.removeEventListener(transitionEnd, mdEnd);
                if(timer1){
                    clearTimeout(timer1);
                }
                timer1 = null;
                nowEl = null;
                mdend = false;
                hasUp = false;
            }
            // 按下去
            el.addEventListener('mousedown', () => {
                if(nowEl){
                    clear(nowEl);
                    return;
                }
                nowEl = el;
                nowEl.classList.add(binding.value);
                timer1 = setTimeout(() => {
                    mdEnd();
                }, maxTime);
                // nowEl.addEventListener(transitionEnd, mdEnd);
            });
            // 弹起来
            document.body.addEventListener('mouseup', () => {
                if (nowEl) {
                    // 当前元素弹起
                    hasUp = true;
                    if(mdend){
                        // 按下动画已结束
                        clear(nowEl);
                    }
                }
            });
        }, 0);
    },
};
