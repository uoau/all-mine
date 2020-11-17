<template>
    <div class="am-editor">
        <!-- 输入区域 -->
        <div class="am-editor__main">
            <!-- 控制栏 -->
            <div class="am-editor__control-bar">
                <!-- 添加图片 -->
                <div class="add-img">
                    <AmIcon name="image-fill" :size="20" />
                    <input type="file" @change="addImg"/>
                </div>
            </div>
            <!-- 输入区域 -->
            <div class="am-editor__textarea">
                <AmTextarea
                    v-model="inputContent"
                    @input="contentChange"
                    autosize
                />
            </div>
        </div>
        <!-- 渲染 -->
        <div class="am-editor__show">
            <div v-html="htmlContent"></div>
        </div>
    </div>
</template>

<script>
import MarkdownIt from 'markdown-it';
import { fileTo64 } from '../../utils/browser';

const md = new MarkdownIt();
export default {
    name: 'AmEditor',
    props: {
        // md内容
        mdContent: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            inputContent: this.mdContent,
            htmlConetent: '',
        };
    },
    watch: {
        inputContent() {
            this.htmlContent = md.render(this.inputContent);
        },
    },
    methods: {
        contentChange(val) {
            this.$emit('update:content', val);
        },
        async addImg(e) {
            const file = e.target.files[0];
            const base64 = await fileTo64(file);
            this.inputContent += `![img](${base64})`;
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
        .add-img {
            width: 32px;
            height: 32px;
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            transition: background .2s;
            input {
                position: absolute;
                left: 0;
                top: 0;
                opacity: 0;
            }
            &:hover {
                background: #eee;
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
