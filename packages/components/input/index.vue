<template>
    <div
        class="am-input"
        :class="{
            'is-focus': isFocus,
            'is-validate-fail': validateMsg,
            'is-has-tip': validateMsg || tip,
        }"
    >
        <!-- 主体 -->
        <div class="am-input__inner">
            <input
                v-on="$listeners"
                :type="type"
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
        <!-- 错误信息 -->
        <div class="am-input__error-msg" v-if="validateMsg">{{ validateMsg }}</div>
        <!-- 提示信息 -->
        <div class="am-input__tip-msg" v-else-if="tip">{{ tip }}</div>
    </div>
</template>

<script>
import validator from '../../mixins/validator';

export default {
    name: 'AmInput',
    mixins: [validator],
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
        // 默认文字
        placeholder: {
            type: String,
            default: '请输入',
        },
        // 最大字符数（未实现）
        maxLength: {
            type: Number,
        },
        // 原生类型
        type: {
            type: String,
            default: 'text',
        },
        // 提示
        tip: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            isFocus: false,
        };
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
            this.validatorOnAllEvent('input', this.value);
        },
        onFocus(e) {
            this.isFocus = true;
            this.$emit('focus', e);
            this.validatorOnAllEvent('focus', this.value);
        },
        onBlur(e) {
            this.isFocus = false;
            this.$emit('blur', e);
            this.validatorOnAllEvent('blur', this.value);
        },
        onChange(e) {
            this.$emit('change', e);
            this.validatorOnAllEvent('change', this.value);
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
    display: flex;
    flex-direction: column;
    &__inner {
        border: 1px solid var(--border);
        display: inline-flex;
        transition: border .2s;
        position: relative;
        width: 100%;
        height: 32px;
        input {
            background: none;
            width: 100%;
            font-size: 14px;
            border:none;
            padding: 0 8px;
        }
    }
    &__error-msg {
        font-size: 12px;
        color: red;
        line-height: 20px;
    }
    &__tip-msg {
        font-size: 12px;
        color: #999;
        line-height: 20px;
    }
    // 修饰
    &:hover {
        .am-input__inner {
            border: 1px solid #333;
        }
    }
    &.is-focus {
        .am-input__inner {
            border: 1px solid #333;
        }
    }
    &.is-validate-fail {
        .am-input__inner {
            border: 1px solid red;
        }
    }
}
</style>
