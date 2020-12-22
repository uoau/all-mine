<template>
    <div
        class="am-tag"
        :class="{
            ['is-' + size]: size,
            ['is-' + mode]: mode,
        }"
        @click="handleClick"
    >
        <span>{{ text }}</span>
        <AmIcon
            name="close"
            @click.stop="clickDelete"
            v-if="showDelete"
        />
    </div>
</template>

<script>
// 常见的标签有哪几款
// 灰标签
// 主题色标签
// 彩色标签（用在如特惠价之类的）
//
export default {
    name: 'AmTag',
    props: {
        // 存值，方便删除操作
        value: null,
        // 大小 small middle big
        size: {
            type: String,
            default: 'small',
        },
        // 内容
        text: {
            type: String,
            default: '',
        },
        // 显示删除按钮
        showDelete: {
            type: Boolean,
            default: false,
        },
        // 模式, 有预设也有自定义模式
        mode: {
            type: String,
            default: 'default',
        },
    },
    methods: {
        handleClick() {
            this.$emit('click', this.value);
        },
        clickDelete() {
            this.$emit('delete', this.value);
        },
    },
};
</script>

<style lang="less">
.am-tag {
    display: inline-flex;
    align-items: center;
    color: #333;
    // 删除按钮
    .am-icon {
        cursor: pointer;
        margin-left: 4px;
    }
    // 大小
    &.is-small {
        height: 20px;
        padding: 0 4px;
        font-size: 12px;
    }
    &.is-middle {
        height: 24px;
        font-size: 14px;
        padding: 0 8px;
    }
    &.is-big {
        height: 28px;
        font-size: 14px;
        padding: 0 12px;
    }
    // 预设模式
    // 默认标签
    &.is-default {
        background: var(--light-bg);
        color: var(--fcolor-2);
        border: 1px solid var(--border);
    }
    // 主题色标签
    &.is-primary {
        background: var(--primary);
        color: #fff;
    }
    // 主题浅色标签
    &.is-light-primary {
        background: var(--light-primary);
        color: var(--primary);
        border: 1px solid var(--primary);
    }
    // 主题浅色标签
    &.is-border-primary {
        color: var(--primary);
        border: 1px solid var(--primary);
    }
    // 黑色标签
    &.is-black {
        color: #fff;
        background: #333;
    }
    // 文本标签
    &.is-text {
        color: var(--fcolor-2);
    }
}
</style>
