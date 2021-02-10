<template>
    <div
        class="am-divider"
        :style="'margin:'+margin+';font-size:'+size+'px;color:'+color">
        <span
            v-if="content">
            {{ content }}
        </span>
        <AmIcon
            v-else-if="iconName"
            :name="iconName"
            :size="iconSize"
        />
        <i v-else-if="showLine" class="am-divider__line"></i>
    </div>
</template>

<script>
export default {
    name: 'AmDivider',
    props: {
        content: {
            type: String,
            default: '',
        },
        size: {
            type: String,
            default: '14',
        },
        margin: {
            type: String,
            default: '0 8px',
        },
        color: {
            type: String,
            default: '#999',
        },
        iconName: {
            type: String,
        },
        iconSize: {
            type: String,
        },
        showLine: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="less" scoped>
    .am-divider {
        display: inline-flex;
        color: #e5e5e5;
        align-items: center;
        &__line {
            width: 1px;
            height: 8px;
            background: #ccc;
            display: inline-flex;
        }
    }
</style>
