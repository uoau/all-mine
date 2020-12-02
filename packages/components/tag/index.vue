<template>
    <div
        class="am-tag"
        :class="{
            ['is-' + size]: size,
            ['is-' + mode]: mode,
        }"
        :style="tagStyle"
    >
        <span>{{ text }}</span>
        <AmIconButton
            icon-name="close"
            @click="clickDelete"
            v-if="showDelete"
            mode="white-text"
            size="small"
        />
    </div>
</template>

<script>
export default {
    name: 'AmTag',
    props: {
        // 存值，方便删除操作
        value: null,
        // 大小 small middle big
        size: {
            type: String,
            default: 'middle',
        },
        // 颜色 红橙黄绿青蓝紫灰黑白
        color: {
            type: String,
            default: 'gray',
        },
        // 程度
        level: {
            type: String,
            default: 'light', // light,dark,
        },
        // 边框
        showBorder: {
            type: Boolean,
            default: false,
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
        // 模式,自定义模糊
        mode: {
            type: String,
            default: '',
        },
    },
    computed: {
        tagStyle() {
            const style = {};
            // 程度
            if (this.level === 'light') {
                style.background = `var(--light-${this.color})`;
                style.color = `var(--${this.color})`;
                if (this.showBorder) {
                    style.border = `1px solid var(--${this.color})`;
                }
            } else {
                style.background = `var(--${this.color})`;
                style.color = '#fff';
                if (this.showBorder) {
                    style.border = `1px solid var(--dark-${this.color})`;
                }
            }
            return style;
        },
    },
    methods: {
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
    // 大小
    &.is-small {
        height: 20px;
        padding: 0 4px;
        font-size: 12px;
        border-radius: 2px;
    }
    &.is-middle {
        height: 28px;
        font-size: 14px;
        padding: 0 8px;
        border-radius: 3px;
    }
    &.is-big {
        height: 32px;
        font-size: 14px;
        padding: 0 12px;
        border-radius: 4px;
    }
}
</style>
