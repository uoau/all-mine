/* eslint-disable */
function getHeight(el) {
    const elStyle = window.getComputedStyle(el, null);
    // 旧数据
    const oldHeight = el.getBoundingClientRect().height; // 旧高度
    const oldWidth = el.getBoundingClientRect().width; // 旧宽度
    if(oldHeight){
        return oldHeight +'px';
    }
    // 克隆元素
    const clone = el.cloneNode(true);
    clone.style.cssText = `
        z-index:-999;
        position: fixed;
        top: 0;
        left: 0;
        height: unset;
        max-height: unset;
        width: ${oldWidth}px;
        visibility: hidden;`;
    el.parentNode.append(clone);
    const height = window.getComputedStyle(clone, null).height;
    clone.remove();
    return height;
}

export default {
    bind(el, binding, vnode) {
        const show = binding.value;
        el.style.overflow = 'hidden';
        if(!show) {
            el.style.height = '0';
            el.style.margin = '0';
            el.style.padding = '0';
            el.style.borderWidth = '0';
        }else {
            setTimeout(()=>{
                const height = getHeight(el);
                el.style.height = height;
            },100)
        }
        setTimeout(() => {
            // 设置信息
            const elStyle = window.getComputedStyle(el, null);
            el.style.transition = 'height .3s,border-width .3s, padding .3s, margin .3s';
            el.dataset.paddingtop = elStyle.paddingTop;
            el.dataset.paddingbottom = elStyle.paddingBottom;
            el.dataset.bordertopwidth = elStyle.borderTopWidth;
            el.dataset.borderbottomwidth = elStyle.borderBottomWidth;
        }, 100);
    },

    update(el, binding, vnode) {
        const show = binding.value;
        const height = getHeight(el);
        if(show) {
            el.style.height = height;
            el.style.margin = 'unset';
            el.style.borderTopWidth = el.dataset.bordertopwidth;
            el.style.borderBottomWidth = el.dataset.borderbottomwidth;
            el.style.paddingTop = el.dataset.paddingTop;
            el.style.paddingBottom = el.dataset.paddingBottom;
            el.style.transition = 'height .3s,border-width .3s, padding .3s, margin .3s';
        }else {
            el.style.height = '0';
            el.style.margin = '0';
            el.style.borderTopWidth = '0';
            el.style.borderBottomWidth = '0';
            el.style.paddingTop = '0';
            el.style.paddingBottom = '0';
        }
    },

    unbind(el) {

    },
};
