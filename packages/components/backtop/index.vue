<template>
    <div class="am-backtop">

    </div>
</template>

<script>
export default {
    name: 'AmBacktop',
    props: {
        // 绑定要被滚动的元素，默认是body
        scrollEl: document.body,
        // 针对定位的元素
        fatherEl: document.body,
        // 右偏移
        right: {
            type: Number,
        },
        // 左偏移
        letf: {
            type: Number,
        },
        // 下偏
        bottom: {
            type: Number,
        },
        // 出现
    },
};
</script>

<style lang="less">
.am-backtop {
    position: fixed;
}
</style>
