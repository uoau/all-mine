/*
 * 基础的工具函数（数据操控等)
 *
 * 目录
 *   通用 - 判断变量类型
 *   通用 - sleep 方便写扁平化异步
 *   通用 - 生成uuid唯一值
 *   数组 - 去重
 *   数组 - 根据内容对数组进行检索，如从对象数组里搜索 id=12 的对象
 *   对象 - 深拷贝
 */

// 通用 - 判断变量类型
export function getType(content) {
    const res = Object.prototype.toString.call(content);
    let type = '';
    switch (res) {
    case '[object String]': type = 'String'; break;
    case '[object Number]': type = 'Number'; break;
    case '[object Symbol]': type = 'Symbol'; break;
    case '[object Undefined]': type = 'Undefined'; break;
    case '[object Null]': type = 'Null'; break;
    case '[object Function]': type = 'Function'; break;
    case '[object Date]': type = 'Date'; break;
    case '[object Array]': type = 'Array'; break;
    case '[object RegExp]': type = 'RegExp'; break;
    case '[object Error]': type = 'Error'; break;
    default: break;
    }
    return type;
}
// 通用 - sleep 方便写扁平化异步
export function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
// 通用 - 生成uuid唯一值
export function uuid() {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

// 数组 - 去重
export function removeRepeat(arr) {
    return Array.from(new Set(arr));
}

// 数组 - 根据内容对数组进行检索，如从对象数组里搜索 id=12 的对象
export default function findOne(arrs, where) {
    if (!Array.isArray(arrs) || !arrs.length) return {};

    if (typeof where === 'object' && !Array.isArray(where) && Object.keys(where).length) {
        const keys = Object.keys(where);
        let result = null;
        let index = -1;

        arrs.map((arr, inx) => {
            let flag = true;

            keys.map((key) => {
                if (arr[key] !== where[key]) flag = false;
                return key;
            });

            if (flag) {
                result = arr;
                index = inx;
            }

            return arr;
        });

        return { result, index };
    }

    const index = arrs.indexOf(where);

    if (index > 1) {
        return { result: where, index };
    }

    return {};
}

// 对象 - 深拷贝
export function cloneDeep() {

}
