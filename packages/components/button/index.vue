<template>
    <component
        :is="componentIs"
        :to="to"
        :href="href"
        class="am-button"
        :class="className"
        @click="handleClick"
        v-clickanime="'is-down'">
        <AmIcon v-if="icon" :name="icon" :size="iconSize"/>
        <div class="content" v-if="$slots.default"><slot/></div>
    </component>
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
            type: Number,
            default: 14,
        },
        // 跳转
        href: {
            type: String,
        },
        // 路由切换
        to: {
            type: Object,
        },
    },
    computed: {
        componentIs() {
            if (this.to) {
                return 'router-link';
            }
            if (this.href) {
                return 'a';
            }
            return 'div';
        },
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
            if (this.disabled) {
                e.preventDefault();
                return;
            }
            this.$emit('click', e);
        },
    },
};
</script>

<style lang="less">
.am-button {
    padding: 0 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 20px;
    user-select: none;
    height: 32px;
    min-width: 32px;
    cursor: pointer;
    transition: background .2s;
    box-sizing: border-box;
    >.am-icon ~ .content {
        margin-left: 3px;
    }
    // 按钮类型
    &.is-default {
        border: 1px solid var(--border);
        &.is-down {
            background: var(--light-bg);
        }
    }
    &.is-primary {
        background: var(--primary);
        color: #fff;
        &.is-down {
            background: var(--dark-primary);
        }
    }
    &.is-dark-primary {
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
        min-width: 24px;
    }
    &.is-big {
        height:40px;
        min-width: 240x;
    }
}
</style>
