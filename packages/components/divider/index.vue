<template>
    <div
        class="am-divider"
        :style="'margin:'+margin+';font-size:'+size+'px;color:'+color">
        {{ content }}
    </div>
</template>

<script>
export default {
    name: 'AmDivider',
    props: {
        content: {
            type: String,
            default: '|',
        },
        size: {
            type: String,
            default: '14',
        },
        margin: {
            type: String,
            default: '0 5px',
        },
        color: {
            type: String,
            default: '#999',
        },
    },
};
</script>

<style lang="less" scoped>
    .am-divider {
        display: inline-flex;
        color: #e5e5e5;
        &:before {

        }
    }
</style>
