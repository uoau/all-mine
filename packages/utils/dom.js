/*
 * 一些用于操作 dom 的工具函数
 *
 * 目录
 *   获取元素处在哪个滚动视图（完成）
 *   判断 el A是否在 elB 内 （待办）
 *   监听元素属性变化,如宽高变化 (完成)
 *   事件 - 委托
 *   平滑滚动到目标位置
 */
import { getType } from './base';

// 获取元素处于哪个滚动视图里
export function getScrollBoxOfEl(el) {
    const els = [window];
    let thisEl = el;
    while (true) {
        thisEl = thisEl.parentElement;
        const style = window.getComputedStyle(thisEl, null);
        if (
            style.overflow === 'scroll' || style.overflow === 'auto'
            || style.overflowY === 'scroll' || style.overflowY === 'auto'
            || style.overflowX === 'scroll' || style.overflowX === 'auto'
        ) {
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

// 平滑滚动到目标区域
export function scrollTo({
    scrollEl, // 滚动元素
    time, // 滚动时间
    x, // 滚动的水平距离
    y, // 滚动的垂直距离
    minTime, // 最小时间
    maxTime, // 最大时间
    speed = 0.2, // 速度
}) {
    return new Promise((resolve) => {
        const scrollBody = scrollEl;
        // 选择计时器方式
        const startTime = new Date();
        const newSetTimeout = window.requestAnimationFrame || ((func) => setTimeout(func, 16));
        // 获取滚动对象、计算滚动初始值
        const beginY = scrollBody.scrollTop;
        const beginX = scrollBody.scrollLeft;
        // 计算时间
        let durationTime = time;
        if (!durationTime) {
            let durationY = Math.abs(y - beginY) * speed;
            let durationX = Math.abs(x - beginX) * speed;
            if (minTime && durationY < minTime) {
                durationY = minTime;
            }
            if (minTime && durationX < minTime) {
                durationX = minTime;
            }
            durationTime = durationY || durationX;
        }
        if (durationTime > maxTime) {
            durationTime = maxTime;
        }
        // 计算距离函数
        function sFun(t, type) {
            const begin = type === 'y' ? beginY : beginX;
            const to = type === 'y' ? y : x;
            return begin + (to - begin) * (t / durationTime);
        }
        // 开始滚动
        let xyEnd = false;
        function scroll(type) {
            return () => {
                const t = (new Date()) - startTime;
                const s = sFun(t, type);
                const scrollKey = type === 'y' ? 'scrollTop' : 'scrollLeft';
                const to = type === 'y' ? y : x;
                if (t <= durationTime) {
                    scrollBody[scrollKey] = s;
                    newSetTimeout(scroll(type));
                } else {
                    scrollBody[scrollKey] = to;
                    if (xyEnd) {
                        resolve();
                    } else {
                        xyEnd = true;
                    }
                }
            };
        }
        if (getType(x) === 'Number') {
            newSetTimeout(scroll('x'));
        }
        if (getType(y) === 'Number') {
            newSetTimeout(scroll('y'));
        }
        if (getType(x) !== 'Number' || getType(y) !== 'Number') {
            xyEnd = true;
        }
    });
}
