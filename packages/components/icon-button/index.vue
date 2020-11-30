<template>
    <div
        class="am-icon-button"
        :class="className"
        @click="handleClick"
        v-clickanime="'is-down'"
    >
        <slot v-if="$slots.default" />
        <AmIcon :name="iconName" :size="iconSize" v-else />
    </div>
</template>

<script>
export default {
    name: 'AmIconButton',
    props: {
        // 图标名称
        iconName: {
            type: String,
            default: '',
        },
        // 图标字号
        iconSize: {
            type: Number,
        },
        // 形状 圆形round 方形 square
        shape: {
            type: String,
            default: 'round',
        },
        // 大小 迷你mini 小small 中 middle 大big
        size: {
            type: String,
            default: 'middle',
        },
        // 禁用
        disabled: {
            type: Boolean,
            default: false,
        },
        // 自定义模式
        mode: {
            type: String,
            default: 'border-text',
        },
    },
    computed: {
        className() {
            return {
                'is-disabled': this.disabled,
                [`is-${this.mode}`]: this.mode,
                [`is-${this.size}`]: this.size,
                [`is-${this.shape}`]: this.shape,
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
.am-icon-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background .2s, border .2s, color .2s;
    cursor: pointer;
    // 按钮大小
    &.is-mini {
        height: 14px;
        width: 14px;
        .am-icon {
            font-size: 12px;
        }
    }
    &.is-small {
        height: 24px;
        width: 24px;
        .am-icon {
            font-size: 12px;
        }
    }
    &.is-middle {
        height: 32px;
        width: 32px;
        .am-icon {
            font-size: 20px;
        }
    }
    &.is-big {
        height:40px;
        width: 40px;
        .am-icon {
            font-size: 20px;
        }
    }
    // 按形状
    &.is-round {
        border-radius: 50%;
    }
    &.is-squre {
        border-radius: 3px;
    }
    // 模式
    // 文字模式
    &.is-text {
        background: none;
        &:hover {
            background: var(--light-bg);
        }
        &.is-down {
            background: var(--border);
        }
    }
    // 边框文字模式
    &.is-border-text {
        background: none;
        border: 1px solid var(--border);
        &:hover {
            background: var(--light-bg);
        }
        &.is-down {
            background: var(--border);
        }
    }
    // 白色文字模式
    &.is-white-text {
        color: #fff;
        background: none;
        &:hover {
            background: rgba(255,255,255,.1);
        }
        &.is-down {
            background: rgba(255,255,255,.3);
        }
    }
    // 黑色按钮
    &.is-black {
        background: rgba(0,0,0,.5);
        color: #fff;
        &:hover {
            background: rgba(0,0,0,.6);
        }
        &.is-down {
            background: rgba(0,0,0,.8);
        }
    }
    // 禁用
    &.is-disabled {
        background: #eee;
        color: #999;
        border: none;
        pointer-events: none;
    }
}
</style>
