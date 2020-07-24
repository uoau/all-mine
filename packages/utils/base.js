export function isWhat(content) {
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

export function a() {

}
