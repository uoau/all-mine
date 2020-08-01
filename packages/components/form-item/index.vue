<template>
    <div
        class="am-form-item"
        :class="labelClass"
    >
        <div
            class="hd"
            :style="labelHdStyle"
        >
            <span>{{ labelName }}</span>
        </div>
        <div class="bd">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: 'AmFormItem',
    inject: ['form'],
    props: {
        labelName: {
            type: String,
            default: '',
        },
        labelWidth: {
            type: String,
            default: '80px',
        },
        position: {
            type: String,
            default: 'left',
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
            return {
                width: this.position !== 'top' ? (this.labelWidth || this.form.labelWidth) : '100%',
            };
        },
    },
};
</script>

<style lang="less" scoped>
.am-form-item {
    // 默认样式
    display: flex;
    >.hd {
        line-height: 30px;
        display: flex;
        padding-right: 12px;
    }
    >.bd {
        display: flex;
    }

    // 文字居上
    &.is-top {
        flex-wrap: wrap;
        >.hd {
            display: flex;
        }
    }
    // 文字居左
    &.is-left {

    }
    // 文字居右
    &.is-right {
        .hd {
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
