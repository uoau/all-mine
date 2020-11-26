<template>
    <div
        class="am-tag"
        :class="{
            ['am-tag--' + color]: color,
            ['am-tag--' + size]: size,
        }"
    >
        <span>{{ text }}</span>
        <AmIcon name="close" v-if="showDelete" @click.native="clickDelete"/>
    </div>
</template>

<script>
export default {
    name: 'AmTag',
    props: {
        // 存值，方便删除操作
        value: null,
        // 大小
        size: {
            type: String,
            default: 'middle', // small middle large
        },
        // 颜色
        color: {
            type: String,
            default: 'gray',
        },
        // 程度
        level: {
            type: String,
            default: '', // light,dark,
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
    .am-icon {
        margin-left: 4px;
        cursor: pointer;
    }
    // 灰色标签
    &--gray {
        background: #f6f7f9;
        color: #636c78;
    }
    &--primary {
        background: var(--light-primary);
        color: var(--primary);
    }

    //

    // 大小
    &--small {
        height: 20px;
        padding: 0 4px;
        font-size: 12px;
        border-radius: 2px;
    }
    &--middle {
        height: 28px;
        font-size: 12px;
        padding: 0 8px;
        border-radius: 3px;
    }
    &--large {
        height: 32px;
        font-size: 14px;
        padding: 0 8px;
        border-radius: 4px;
    }
}
</style>
