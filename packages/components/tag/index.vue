<template>
    <div
        class="am-tag"
        :class="{
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
export default {
    name: 'AmTag',
    props: {
        // 存值，方便删除操作
        value: null,
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
        // 模式
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
    line-height: 20px;
    font-size: 14px;
    padding: 2px 6px;
    background: var(--light-bg);
    color: var(--fcolor-2);
    border: 1px solid var(--border);
    // 删除按钮
    .am-icon {
        cursor: pointer;
        margin-left: 2px;
        margin-right: -2px;
    }
}
</style>
