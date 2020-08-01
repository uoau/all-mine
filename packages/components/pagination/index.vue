<template>
    <div class="am-pagination">
        <!-- 上一页 -->
        <AmButton icon="left"/>
        <!-- 页码 -->
        <div>
            <AmButton>1</AmButton>
        </div>
        <!-- 下一页 -->
        <AmButton icon="right"/>
    </div>
</template>

<script>
export default {
    name: 'AmPagination',
    props: {
        // 总数
        total: {
            type: Number,
            default: 0,
        },
        // 页码
        pageNum: {
            type: Number,
            default: 1,
        },
        // 每页条数
        pageSize: {
            type: Number,
            default: 20,
        },
    },
    computed: {

    },
};
</script>

<style lang="less">
.am-pagination {
    display: flex;
    .am-button {
        margin-right: 5px;
    }
}
</style>
