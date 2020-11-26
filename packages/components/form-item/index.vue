<template>
    <div
        class="am-form-item"
        :class="labelClass"
    >
        <div
            class="am-form-item__hd"
            :style="labelHdStyle"
        >
            <span>{{ label }}</span>
        </div>
        <div class="am-form-item__bd">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: 'AmFormItem',
    inject: ['form'],
    props: {
        label: {
            type: String,
            default: '',
        },
        labelWidth: {
            type: String,
            default: '',
        },
        position: {
            type: String,
            default: '',
        },
        required: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        labelClass() {
            return {
                [`is-${this.position || this.form.position}`]: true,
                'is-required': this.required,
            };
        },
        labelHdStyle() {
            const position = this.position || this.form.position;
            return {
                width: position !== 'top' ? `${this.labelWidth || this.form.labelWidth}` : '100%',
            };
        },
    },
};
</script>

<style lang="less">
.am-form-item {
    // 默认样式
    display: flex;
    &__hd {
        line-height: 32px;
        display: flex;
        padding-right: 12px;
        font-size: 14px;
    }
    &__bd {
        display: flex;
    }

    // 文字居上
    &.is-top {
        flex-wrap: wrap;
        .am-form-item__hd {
            display: flex;
        }
    }
    // 文字居左
    &.is-left {

    }
    // 文字居右
    &.is-right {
        .am-form-item__hd {
            justify-content: flex-end;
        }
    }
    // 必须
    &.is-required {
        span {
            position: relative;
            &:before {
                content: '*';
                position: absolute;
                left: -10px;
                color: var(--fail);
                font-family: SimSun,sans-serif;
                font-size: 16px;
            }
        }
    }

}
</style>
