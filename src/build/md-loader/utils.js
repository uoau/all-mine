/* eslint-disable */
function stripScript(content) {
    const result = content.match(/<(script)>([\s\S]+)<\/\1>/);
    return result && result[0] ? result[0].trim() : '';
}

function stripStyle(content) {
    const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/);
    return result && result[0] ? result[0].trim() : '';
}

function stripTemplate(content) {
    return content.replace(/<(script|style)[\s\S]+<\/\1>/g, '').trim();
}

// 处理code
function dealCode(code) {
    const template = stripTemplate(code);
    const script = stripScript(code);
    const style = stripStyle(code);
    return `
        <template>
            <div>
                ${template}
            </div>
        </template>
        ${script}
        ${style}`;
}

// 生成hash值
function createHash(str) {
    let hash = 1315423911;
    let i;
    let ch;
    for (i = str.length - 1; i >= 0; i -= 1) {
        ch = str.charCodeAt(i);
        hash ^= ((hash << 5) + ch + (hash >> 2));
    }
    return (hash & 0x7FFFFFFF);
}

module.exports = {
    dealCode,
    createHash,
};
