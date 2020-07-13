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
    // 渲染demo
    while (loop) {
        const match = content.match(/([\s\S]*?)<!--vue-demo start-->([\s\S]*?)<!--vue-demo end-->([\s\S]*)/);
        if (!match) {
            loop = false;
            break;
        }
        const beforeHtml = match[1]; // 代码前内容
        const codeHtml = match[2].replace(/{{([\s\S]*)}}/, '<span class="teshu">{xux{$1}xux}</span>'); // 代码内容 - 顺便特殊处理 {{ }} 符号
        const code = htmlDecode(match[2].replace(/[\r\n]/g, '').match(/<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/)[1]);
        const afterHtml = match[3]; // 代码后内容
        const demo = {
            demoName: `Demo${index}`,
            script: compile(code).script,
        };
        demoArr.push(demo);
        content = `${beforeHtml}
            <DemoBox>
                <template slot="demo">
                    <Demo${index} />
                </template>
                <template slot="code">
                    ${codeHtml}
                </template>
            </DemoBox />
        ${afterHtml}`;
        index += 1;
    }
    let demoComponent = '';
    demoArr.forEach((item) => {
        const componentCode = item.script.match(/;return([\s\S]*)/)[1];
        demoComponent += `${item.demoName}: ${componentCode},`;
    });
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
        <style lang="scss">
            .markdown-page {
                position: relative;
                .slider-nav {
                    position: absolute;
                    left: 800px;
                    top: 80px;
                }
            }
        </style>`;
    return content;
};
