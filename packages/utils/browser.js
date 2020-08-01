/*
 * 浏览器相关的工具函数
 *
 * 目录
 *   url - 获取 url 的参数
 *   存储 - localStorage 存
 *   存储 - localStorage 取
 *   存储 - localStorage 删
 */

// url - 获取 url 的参数
export function getURLParams(url) {
    const theUrl = url || window.location.href;
    return theUrl
        .match(/([^?=&]+)(=([^&]*))/g)
        .reduce(
            (a, v) => (
                (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a
            ),
            {},
        );
}

// 存储 - localStorage
export function localStorageSet(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
export function localStorageGet(key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (err) {
        return localStorage.getItem(key);
    }
}
export function localStorageRemove(key) {
    localStorage.removeItem(key);
}
