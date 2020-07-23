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

<style lang="less" scoped>
.slider-nav {
    ul {
        position: fixed;
        top: 80px;
        border-left: 1px solid #e5e5e5;
        padding-left: 15px;
        list-style-type: none;
        li {
            list-style-type: none;
            font-size: 14px;
            line-height: 2;
            a {
                color: #000;
                text-decoration: none;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
}
</style>
