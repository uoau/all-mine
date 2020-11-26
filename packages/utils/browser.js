/*
 * 浏览器相关的工具函数
 *
 * 目录
 *   url - 获取 url 的参数
 *   存储 - localStorage 存
 *   存储 - localStorage 取
 *   存储 - localStorage 删
 *   文件 - 用api选择文件
 *   图片 - file 转 base64
 *   图片 - url 转 img
 *   图片 - img 转 base64
 *   图片 - url 转 base64
 *   图片 - base64 转 file
 */

import { uuid } from "./base";

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

export function fileTo64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            resolve(this.result);
        };
        reader.onerror = function () {
            reject();
        };
    });
}

export function urlToImg(url) {
    return new Promise((resolve, reject) => {
        // 加载图片获取图片真实宽度和高度
        const image = new Image();
        image.onload = () => {
            resolve(image);
        };
        image.onerror = reject;
        image.src = url;
        image.crossOrigin = '*';
    });
}

export function imgTo64(image) {
    // img对象转base64，只对本域、可跨域图片有效
    const img = image;
    const canvas = document.createElement('canvas');
    img.crossOrigin = 'anonymous';
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    console.log(canvas);
    const dataURL = canvas.toDataURL();
    return dataURL;
}

export async function urlTo64(url) {
    let base64 = '';
    try {
        const img = await urlToImg(url);
        console.log(img, 'img');
        base64 = imgTo64(img);
        console.log(base64, '64');
    } catch (e) {
        base64 = '';
    }
    return base64;
}

export function base64ToFile(dataurl,filename) {
    const name = filename || uuid();
    const arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], name, { type: mime });
}

export function selectFile(params){
    return new Promise((resolve, reject) => {
        const newParams = {
            accept: 'image/*',
            multiple: false,
            capture: false,
        };
        const { accept,multiple,capture } = {...newParams, ...params};
        // 创建文件输入框对象
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = accept;
        input.capture = capture;
        input.multiple = multiple;
        input.addEventListener('change', () => {
            resolve(Array.prototype.slice.call(input.files) || []);
        });
        // 触发点击
        setTimeout(() => {
            const event = new MouseEvent('click');
            input.dispatchEvent(event);
        }, 0);
    })
}