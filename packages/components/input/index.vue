<template>
    <div class="am-input">
        <input
            :value="value"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
            @change="onChange"
            @enter="onEnter"
            @keyup="onKeyup"
            @keyup.enter="onEnter"
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
        value: {
            type: String,
            default: '',
        },
        match: {
            type: RegExp,
            default: '',
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
            e.target.value = this.value;
        },
        onFocus(e) {
            this.$emit('focus', e);
        },
        onBlur(e) {
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

<style lang="less" scoped>
    .am-input {
        height: 30px;
        padding: 0 5px;
        border: 1px solid var(--border);
        display: inline-flex;
        input {
            background: none;
        }
    }
</style>
