/*
 * 一些用于操作 dom 的工具函数
 *
 * 目录
 *   获取元素处在哪个滚动视图（完成）
 *   判断 el A是否在 elB 内 （待办）
 *   监听元素属性变化,如宽高变化 (完成)
 *   事件 - 委托
 *
 */

// 获取元素处于哪个滚动视图里
export function getScrollBoxOfEl(el) {
    const els = [window];
    let thisEl = el;
    while (true) {
        thisEl = thisEl.parentElement;
        const style = window.getComputedStyle(thisEl, null);
        if (style.overflow === 'scroll' || style.overflow === 'auto') {
            els.push(thisEl);
        }
        if (thisEl === document.body) {
            break;
        }
    }
    return els;
}

// 监听元素变化
export function observeElResize(el, callBack) {
    const ro = new ResizeObserver(() => {
        callBack();
    });
    ro.observe(el);
    return ro;
}

// 取消监听元素变化
export function offObserveElResize(el, ro) {
    ro.unobserve(el);
}

// 事件 - 委托

// 元素 - 计算隐藏元素宽度
export function getHiddenDomRect(el) {
    // 获取旧元素宽高
    const oldElStyle = window.getComputedStyle(el, null);
    const oldWidth = oldElStyle.width;
    // 克隆元素
    const cloneEl = el.cloneNode(true);
    cloneEl.style.cssText = `
        z-index: -999;
        position: fixed;
        top: 0;
        left: 0;
        width: ${oldWidth};
        width: max-content;
        visibility: hidden;`;
    el.parentNode.append(cloneEl);
    const cloneElRect = window.getComputedStyle(cloneEl, null);
    const obj = {
        height: window.parseFloat(cloneElRect.height),
        width: window.parseFloat(cloneElRect.width),
    };
    cloneEl.remove();
    return obj;
}
