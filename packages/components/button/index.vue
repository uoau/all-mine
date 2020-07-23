<template>
    <div
        class="am-button"
        :class="className"
        @click="handleClick">
        <slot/>
    </div>
</template>

<script>
export default {
    name: 'AmButton',
    props: {
        type: {
            type: String,
            default: 'default',
        },
        size: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        className() {
            return {
                disabled: this.disabled,
                [this.type]: this.type,
                [this.size]: this.size,
            };
        },
    },
    methods: {
        handleClick(e) {
            if (this.disabled) {
                return false;
            }
            this.$emit('click', e);
            return false;
        },
    },
};
</script>

<style lang="less" scoped>
.am-button {
    height: 30px;
    padding: 0 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 30px;
    user-select: none;
    cursor: pointer;
    &:hover {
        opacity: .8;
    }
    &.default {
        border: 1px solid #ccc;
    }
    &.primary {
        background: var(--primary);
        color: #fff;
    }
    &.success {
        background: var(--success);
        color: #fff;
    }
    &.warning {
        background: var(--warning);
        color: #fff;
    }
    &.fail {
        background: var(--fail);
        color: #fff;
    }
    &.info {
        background: var(--info);
        color: #fff;
    }
    &.disabled {
        background: #eee;
        color: #999;
    }
    &.small {
        height: 24px;
    }
    &.big {
        height:50px;
    }
}
</style>
