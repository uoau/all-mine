<template>
    <component
        :is="componentIs"
        :to="to"
        :href="href"
        class="am-button"
        :class="className"
        @click="handleClick"
        v-clickanime="'is-down'"
    >
        <!-- 图标 -->
        <AmIcon
            :class="iconClass"
            v-if="iconName"
            :name="iconName"
            :size="iconSize"
        />
        <!-- 内容 -->
        <div
            class="am-button__content"
            v-if="$slots.default"
        >
            <slot/>
        </div>
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
        // 模式
        mode: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        // 添加图标
        iconName: {
            type: String,
            default: '',
        },
        iconSize: {
            type: String,
            default: '14px',
        },
        iconPosition: {
            type: String,
            default: 'front', // 有front和back
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
                [`is-${this.mode}`]: this.mode,
            };
        },
        iconClass() {
            return {
                [`is-${this.iconPosition}`]: this.iconPosition,
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
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    user-select: none;
    cursor: pointer;
    transition: background .2s, border .2s, color .2s, filter .2s, box-shadow .2s;
    box-sizing: border-box;
    height: 32px;
    min-width: 32px;
    padding: 0 8px;
    min-width: 32px;
    font-size: 14px;
    line-height: 20px;
    border: 1px solid var(--border);
    &__content {
        display: flex;
        align-items: center;
    }
    .am-icon {
        order: 5;
    }
    .am-icon.is-front + &__content {
        margin-left: 4px;
        order: 6;
    }
    .am-icon.is-back +  &__content {
        margin-right: 4px;
        order: 4;
    }
    // 按钮不可用
    &.is-disabled {
        background: #eee;
        color: #999;
        border: none;
        pointer-events: none;
    }
    &:hover {
        background: #eee;
    }
    &.is-down {
        background: #ddd;
    }
}
</style>
