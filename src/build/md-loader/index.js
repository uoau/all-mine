const { compile } = require('vue-inbrowser-compiler');
const { htmlDecode } = require('js-htmlencode');
const { dealCode, createHash } = require('./utils');
const md = require('./new-md');

module.exports = (source) => {
    const hash = createHash(source.toString());
    let content = md.render(source);
    let loop = true;
    let index = 0;
    let demoArr = [];
    let demoComponent = '';
    let demoStyle = '';
    // 渲染demo（显示样例和代码）
    while (loop) {
        const match = content.match(/([\s\S]*?)<!--vue-demo start-->([\s\S]*?)<!--vue-demo end-->([\s\S]*)/);
        if (!match) {
            loop = false;
            break;
        }
        const beforeHtml = match[1]; // 代码前内容
        const codeHtml = match[2].replace(/{{([\s\S]*)}}/, '<span class="teshu">{xux{$1}xux}</span>'); // 代码内容 - 顺便特殊处理 {{ }} 符号
        let code = htmlDecode(match[2].replace(/[\r\n]/g, '').match(/<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/)[1]);
        code = dealCode(code);
        const afterHtml = match[3]; // 代码后内容
        const demo = {
            demoName: `Demo${hash}${index}`,
            className: `demo${hash}${index}`,
            script: compile(code).script,
            style: compile(code).style,
        };
        demoArr.push(demo);
        content = `${beforeHtml}
            <DemoBox>
                <template slot="demo">
                    <${demo.demoName} class="${demo.className}"/>
                </template>
                <template slot="code">
                    ${codeHtml}
                </template>
            </DemoBox />
        ${afterHtml}`;
        index += 1;
    }
    demoArr.forEach((item) => {
        // 组件
        const componentCode = item.script.match(/;return([\s\S]*)/)[1];
        demoComponent += `${item.demoName}: ${componentCode},`;
        // 样式
        const style = item.style || '';
        if (style) {
            demoStyle += `.${item.className}{${style}}`;
        }
    });
    demoArr = [];

    // 渲染实例
    loop = true;
    while (loop) {
        const match = content.match(/([\s\S]*?)<!--vue-example start-->([\s\S]*?)<!--vue-example end-->([\s\S]*)/);
        if (!match) {
            loop = false;
            break;
        }
        const beforeHtml = match[1]; // 代码前内容
        let code = htmlDecode(match[2].replace(/[\r\n]/g, '').match(/<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/)[1]);
        code = dealCode(code);
        const afterHtml = match[3]; // 代码后内容
        const demo = {
            demoName: `Demo${hash}${index}`,
            className: `demo${hash}${index}`,
            script: compile(code).script,
            style: compile(code).style,
        };
        demoArr.push(demo);
        content = `${beforeHtml}<${demo.demoName} class="${demo.className}"/>${afterHtml}`;
        index += 1;
    }
    demoArr.forEach((item) => {
        // 组件
        const componentCode = item.script.match(/;return([\s\S]*)/)[1];
        demoComponent += `${item.demoName}: ${componentCode},`;
        // 样式
        const style = item.style || '';
        if (style) {
            demoStyle += `.${item.className}{${style}}`;
        }
    });
    demoArr = [];
    // 生成页面html
    content = `
        <template>
            <div class='markdown-page' ref="page">
                ${content}
                <SliderNav class="slider-nav" :list="sliderNavData"/>
            </div>
        </template>
        <script>
            import hljs from 'highlight.js';
            import 'highlight.js/styles/vs2015.css';
            import SliderNav from '../components/slider-nav.vue';
            import DemoBox from '../components/demo-box.vue';
            import '../../packages/stylesheet/markdown.css';
            export default {
                components:{
                    ${demoComponent}
                    SliderNav,
                    DemoBox,
                },
                data(){
                    return {
                        sliderNavData:[]
                    }
                },
                mounted(){
                    // 处理代码模块
                    const blocks = document.querySelectorAll('pre code:not(.hljs)');
                    Array.prototype.forEach.call(blocks, hljs.highlightBlock);

                    // 处理 {{ }} 符号
                    document.querySelectorAll('.teshu').forEach((item) => {
                        item.innerText = item.innerText.replace(/{xux{(.*)}xux}/,'{{$1}}');
                    })

                    // 处理边栏导航
                    this.$refs.page.querySelectorAll('.markdown-page >h2').forEach((item) => {
                        const text = item.innerText;
                        item.id = text;
                        this.sliderNavData.push(text);
                    })
                }
            }
        </script>
        <style lang="less">
            .markdown-page {
                position: relative;
                .slider-nav {
                    position: absolute;
                    left: 800px;
                    top: 80px;
                }
                .demo-box {
                    margin-bottom: 16px;
                    pre {
                        font-size: 13px;
                        line-height: 20px;
                        font-family: Menlo;
                    }
                }
                ${demoStyle}
            }
        </style>`;
    return content;
};
