<template>
    <div class="am-editor">
        <!-- 输入区域 -->
        <div class="am-editor__main">
            <!-- 控制栏 -->
            <div class="am-editor__control-bar">
                <div v-clickoutside="()=>{ addImgDropDownShow = false }">
                    <!-- 添加图片 -->
                    <AmButton
                        ref="addImg"
                        icon="image-fill"
                        :icon-size="20"
                        @click="addImgDropDownShow = !addImgDropDownShow"
                    />
                    <!-- 添加图片下拉窗口 -->
                    <AmPopover
                        v-if="addImgBtnEl"
                        :link-el="addImgBtnEl"
                        :show="addImgDropDownShow">
                        <div class="am-editor__upload-img">
                            <AmButton type="primary" class="i1" @click="selectImg('file')">
                                本地图片
                            </AmButton>
                            <AmInput placeholder="输入网络地址,回车确认" v-model="imgHref" @enter="selectImg('url')"/>
                        </div>
                    </AmPopover>
                </div>
            </div>
            <!-- 输入区域 -->
            <div class="am-editor__textarea">
                <AmTextarea
                    v-model="inputContent"
                    autosize
                />
            </div>
        </div>
        <!-- 渲染 -->
        <div class="am-editor__show">
            <div class="markdown-page" v-html="htmlContent"></div>
        </div>
    </div>
</template>

<script>
import MarkdownIt from 'markdown-it';
import { fileTo64, urlTo64, selectFile, urlToImg } from '../../utils/browser';
import '../../stylesheet/markdown.css';

const md = new MarkdownIt();
export default {
    name: 'AmEditor',
    props: {
        // md内容
        mdContent: {
            type: String,
            default: '',
        },
        // md内容
        htmlContent: {
            type: String,
            default: '',
        },
        dealImg: {
            type: Function,
            default: () => {},
        },
    },
    data() {
        return {
            inputContent: '',

            addImgBtnEl: null,
            addImgDropDownShow: false,
            imgHref: '',
        };
    },
    mounted() {
        this.addImgBtnEl = this.$refs.addImg.$el;
    },
    watch: {
        inputContent() {
            this.$emit('update:htmlContent', md.render(this.inputContent));
            this.$emit('update:mdContent', this.inputContent);
        },
        mdContent(){
            this.inputContent = this.mdContent;
        }
    },
    methods: {
        async selectImg(mode) {
            this.addImgDropDownShow = false;
            // 统一将图片转化为base64
            const base64Arr = [];
            if (mode === 'file') {
                const files = await selectFile({
                    multiple: true,
                });
                await Promise.all(files.map((item)=>{
                    return new Promise(async (resolve,reject)=>{
                        try{
                            const base64 = await fileTo64(item);
                            base64Arr.push(base64);
                            resolve();
                        }catch(e){
                            reject();
                        }
                    })
                }));
            } else if (mode === 'url') {
                try {
                    await urlToImg(this.imgHref);
                } catch(e) {
                    this.$message.fail('图片加载失败');
                    return;
                }
                const base64 = await urlTo64(this.imgHref);
                base64Arr.push(base64);
            }
            console.log('# base64Arr', base64Arr);
            // 将base64统一交给上级处理
            const urlArr = [];
            await Promise.all(base64Arr.map((item)=> {
                return new Promise(async (resolve,reject) => {
                    try {
                        const res = await this.dealImg(item);
                        urlArr.push(res);
                        resolve();
                    } catch(e) {
                        reject();
                    }
                })
            }))

            // 统一将url 输入进md里
            if(urlArr.length) {
                urlArr.forEach((url) => {
                    if(url){
                        this.inputContent += `\n![img](${url})  `;
                    }
                })
            }
        },
    },
};
</script>

<style lang="less">
.am-editor {
    display: flex;
    border: 1px solid var(--border);
    min-height: 500px;
    // 输入的主要区域
    &__main {
        width: 50%;
        border-right: 1px solid var(--border);
        background: var(--light-bg);
        display: flex;
        flex-direction: column;
    }
    // 展示区域
    &__show {
        width: 50%;
        padding: 3px 8px;
        .markdown-page {

        }
    }
    // 控制栏
    &__control-bar {
        height: 50px;
        width: 100%;
        background: #fff;
        border-bottom: 1px solid var(--border);
        display: flex;
        align-items: center;
        padding: 0 8px 0 16px;
        justify-content: space-between;
    }
    &__upload-img {
        padding: 8px;
        display: flex;
        .am-button {
            margin-right: 8px;
        }
        .i1 {
            position: relative;
            overflow: hidden;
            input {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
                cursor: pointer;
            }
        }
    }
    &__textarea {
        flex: 1;
        .am-textarea {
            width: 100%;
            height: 100%;
            border: none;
            background: none;
            textarea {
                background: none;
                min-height: 100%;
            }
        }
    }

}
</style>
