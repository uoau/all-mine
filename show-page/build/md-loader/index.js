/*
 * @Author: xux
 * @Date: 2020-07-08 13:33:13
 * @Description: .md -> .vue
 */
const { compile } = require('vue-inbrowser-compiler');
const { htmlDecode } = require('js-htmlencode');
const md = require('./new-md');

module.exports = (source) => {
    let content = md.render(source);
    let index = 0;
    let loop = true;
    const demoArr = [];
    while (loop) {
        const match = content.replace(/[\r\n]/g, '').match(/([\s\S]*?)<!--vue-demo start--><pre><code[^>]*>([\s\S]*?)<\/code><\/pre><!--vue-demo end-->([\s\S]*)/);
        if (!match) {
            loop = false;
            break;
        }
        const beforeHtml = match[1]; // 代码前内容
        const codeHtml = htmlDecode(match[2]); // 代码内容
        const afterHtml = match[3]; // 代码后内容
        const demo = {
            demoName: `demo${index}`,
            script: compile(codeHtml).script,
        };
        demoArr.push(demo);
        content = `${beforeHtml}<demo${index} />${afterHtml}`;
        index += 1;
    }
    content = `
        <template>
            <div class='demo-page'>
                ${content}
            </div>
        </template>
        <script>
            export default {
                components:{`;
    demoArr.forEach((item) => {
        content += `${item.demoName}: new Function(\`${item.script}\`})()`;
    });
    content += `
                }
            }
        </script>`;
    console.log(content);
    return content;
};
