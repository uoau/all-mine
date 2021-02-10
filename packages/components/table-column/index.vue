<template>
    <div class="am-table-column" >
        <slot name="th"/>
        <slot/>
    </div>
</template>

<script>
export default {
    name: 'AmTableColumn',
    inject: ['table'],
    props: {
        // 表头名称
        label: {
            type: String,
            default: '表头',
        },
        // 字段属性名称
        prop: {
            type: String,
            default: '',
        },
        // 宽度
        width: {
            type: String,
        },
        // 类型
        type: {
            type: String,
        },
        // 排序
        sort: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            column: [],

        };
    },
    created() {
        this.$parent.columnData.push(this);
        if (this.type === 'selection') {
            this.table.data.forEach((item) => {
                this.$set(item, 'isSelected', false);
            });
        }
    },
};
</script>

<style lang="less">

</style>
