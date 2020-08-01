<template>
    <div
        class="am-option"
        @click.stop="clickOption">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'AmOption',
    inject: ['select'],
    props: {
        // 选项内容，必须包括 value 和 label
        item: {
            type: Object,
            required: true,
        },
    },
    methods: {
        clickOption() {
            this.select.setSelect(this.item);
        },
    },
};
</script>

<style lang="less">
.am-option {
    user-select: none;
    padding: 5px 5px;
    &:hover {
        background: #eee;
    }
}
</style>
