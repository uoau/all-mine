<template>
    <div class="am-editor">
        <!-- 输入区域 -->
        <div class="am-editor__main">
            <!-- 控制栏 -->
            <div class="am-editor__control-bar">
                <AmIcon name="image-fill" :size="24" />
                <AmIcon name="verticalleft" :size="24" />
            </div>
            <!-- 输入区域 -->
            <div class="am-editor__textarea">
                <AmTextarea v-model="inputContent" @input="contentChange" autosize/>
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

const md = new MarkdownIt();
export default {
    name: 'AmEditor',
    props: {
        // 输入内容
        content: null,
    },
    data() {
        return {
            inputContent: this.content,
            htmlContent: '',
        };
    },
    methods: {
        contentChange(val) {
            console.log(val, this.inputContent);
            this.$emit('update:content', this.inputContent);
            this.htmlContent = md.render(this.inputContent);
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
