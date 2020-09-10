<template>
    <div class="am-textarea" :class="atClass">
        <textarea
            ref="textarea"
            :placeholder="placeholder"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
            @change="onChange"
            @enter="onEnter"
            @keyup="onKeyup"
            @keyup.enter="onEnter"/>
    </div>
</template>

<script>
import autosize from 'autosize';

export default {
    name: 'AmTextarea',
    model: {
        prop: 'value',
        event: 'changeValue',
    },
    props: {
        // 值
        value: {
            type: String,
            default: '',
        },
        // 自动尺寸
        autosize: {
            type: Boolean,
            default: false,
        },
        // 默认文本
        placeholder: {
            type: String,
            default: '请输入',
        },

    },
    data() {
        return {
            isFocus: false,
        };
    },
    computed: {
        atClass() {
            return {
                'is-autosize': this.autosize,
                'is-focus': this.isFocus,
            };
        },
    },
    watch: {
        autosize() {
            this.checkAutosize();
        },
    },
    mounted() {
        this.checkAutosize();
    },
    methods: {
        onInput(e) {
            this.$emit('input', e);
            this.$emit('changeValue', e.target.value);
        },
        onFocus(e) {
            this.isFocus = true;
            this.$emit('focus', e);
        },
        onBlur(e) {
            this.isFocus = false;
            this.$emit('blur', e);
        },
        onChange(e) {
            this.$emit('change', e);
        },
        onEnter(e) {
            this.$emit('enter', e);
        },
        onKeyup(e) {
            this.$emit('keyup', e);
        },

        checkAutosize() {
            if (this.autosize) {
                autosize(this.$refs.textarea);
            } else {
                autosize.destroy(this.$refs.textarea);
            }
        },
    },
};
</script>

<style lang="less">
.am-textarea {
    width: 230px;
    border: 1px solid var(--border);
    transition: border-color .2s;
    > textarea {
        width: 100%;
        resize: none;
        padding: 3px 8px;
        line-height: 24px;
        height: 100%;
        font-size: 14px;
    }
    // 自动高度
    &.is-autosize {

    }
    &:hover {
        border: 1px solid #333;
    }
    &.is-focus {
        border-color: #333;
    }
}
</style>
