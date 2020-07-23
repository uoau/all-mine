<!--
 * @Author: your name
 * @Date: 2020-07-15 13:53:44
 * @LastEditTime: 2020-07-19 17:43:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /all-mine/packages/components/divider/index.vue
-->
<template>
    <div
        class="am-divider"
        :style="'margin:'+margin">
        {{ content || '|' }}
    </div>
</template>

<script>
export default {
    name: 'AmDivider',
    props: {
        name: {
            type: String,
            default: '',
        },
        size: {
            type: Number,
            default: 14,
        },
    },
};
</script>

<style lang="less" scoped>
    .am-divider {
        display: inline-flex;
        color: red;
        &:before {

        }
    }
</style>
