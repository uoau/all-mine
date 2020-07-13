<!--
 * @Author: your name
 * @Date: 2020-07-12 19:06:16
 * @LastEditTime: 2020-07-12 20:41:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /all-mine/src/components/slider-nav.vue
-->
<template>
    <div class="slider-nav">
        <ul>
            <li v-for="item in list" :key="item">
                <a :href="'#'+item">{{ item }}</a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default: () => [],
        },
    },
};
</script>

<style lang="scss" scoped>
.slider-nav {
    ul {
        position: fixed;
        top: 80px;
        border-left: 2px solid #ccc;
        padding-left: 15px;
        li {
            font-size: 14px;
            line-height: 2;
        }
    }
}
</style>
