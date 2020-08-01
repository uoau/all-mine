<template>
    <div
        class="am-button"
        :class="className"
        @click="handleClick"
        v-clickanime="'down'">
        <AmIcon v-if="icon" :name="icon" :size="iconSize"/>
        <div class="content" v-if="$slots.default"><slot/></div>
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
        icon: {
            type: String,
            default: '',
        },
        iconSize: {
            type: String,
            default: '12',
        },
    },
    computed: {
        className() {
            return {
                'is-disabled': this.disabled,
                [`is-${this.type}`]: this.type,
                [`is-${this.size}`]: this.size,
            };
        },
    },
    methods: {
        handleClick(e) {
            console.log('3');
            if (this.disabled) {
                e.preventDefault();
                return;
            }
            this.$emit('click', e);
        },
    },
};
</script>

<style lang="less" scoped>
.am-button {
    height: 30px;
    padding: 0 5px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 30px;
    user-select: none;
    min-width: 30px;
    cursor: pointer;
    transition: transform 200ms, background .2s;
    >.am-icon ~ .content {
        margin-left: 3px;
    }
    &.down {
        transform: scale(.8);
    }
    &.up {
        transform: scale(1);
    }
    &.upend {
        transform: scale(1);
    }
    // 按钮类型
    &.is-default {
        border: 1px solid var(--border);
    }
    &.is-primary {
        background: var(--primary);
        color: #fff;
    }
    &.is-weak-primary {
        background: var(--weak-primary);
        border: 1px solid var(--primary);
        color: var(--primary);
    }
    &.is-line-primary {
        border: 1px solid var(--primary);
        color: var(--primary);
    }
    // 按钮不可用
    &.is-disabled {
        background: #eee;
        color: #999;
    }
    // 按钮大小
    &.is-small {
        height: 24px;
        padding: 0 5px;
    }
    &.is-big {
        height:40px;
    }
}
</style>
