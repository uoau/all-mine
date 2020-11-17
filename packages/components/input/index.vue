<template>
    <div
        class="am-input"
        :class="aiClass">
        <input
            :value="value"
            :placeholder="placeholder"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
            @change="onChange"
            @enter="onEnter"
            @keyup.enter="onEnter"
            @keyup="onKeyup"
        />
    </div>
</template>

<script>

export default {
    name: 'AmInput',
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
        // 正则过滤
        match: {
            type: RegExp,
        },
        // 提示文字
        placeholder: {
            type: String,
            default: '',
        },
        // 最大字符数（未实现）
        maxLength: {
            type: Number,
        },
    },
    data() {
        return {
            isFocus: false,
        };
    },
    computed: {
        aiClass() {
            return {
                'is-focus': this.isFocus,
            };
        },
    },
    methods: {
        // 事件
        onInput(e) {
            do {
                if (this.match) {
                    if (this.match instanceof RegExp && !this.match.test(e.target.value)) {
                        break;
                    }
                }
                this.$emit('input', e);
                this.$emit('changeValue', e.target.value);
            } while (false);
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

    },
};
</script>

<style lang="less">
.am-input {
    width: 230px;
    height: 32px;
    padding: 0 8px;
    border: 1px solid var(--border);
    display: inline-flex;
    transition: border .2s;
    input {
        background: none;
        width: 100%;
        font-size: 14px;
    }

    // 修饰
    &:hover {
        border: 1px solid #333;
    }
    &.is-focus {
        border: 1px solid #333;
    }
}
</style>
