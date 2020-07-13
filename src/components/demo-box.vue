<!--
 * @Author: your name
 * @Date: 2020-07-12 16:06:29
 * @LastEditTime: 2020-07-12 20:16:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /all-mine/src/components/demo-box.vue
-->

<template>
    <div class="demo-box">
        <div class="demo">
            <slot name="demo"/>
        </div>
        <div class="code" v-show="open">
            <slot name="code"/>
        </div>
        <div class="btn" @click="()=>{open = !open}">
            {{ open ? 'close' : 'open' }}
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            open: false,
        };
    },
};
</script>

<style lang="scss" scoped>
.demo-box {
    width: 100%;
    border: 1px solid #ccc;
    background: #fff;
    .demo {
        padding: 20px;
    }
    .code {

    }
    .btn {
        width: 100%;
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: 1px solid #ccc;
    }
}
</style>
