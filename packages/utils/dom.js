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

// 监听元素属性
export function observeElResize(el, callBack) {
    const ro = new ResizeObserver((change) => {
        console.log(change);
        callBack();
    });
    ro.observe(el);
}

// 事件 - 委托
