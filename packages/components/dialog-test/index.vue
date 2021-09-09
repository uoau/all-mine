<template>
    <div
        class="am-dialog-text"
    >
        1234
    </div>
</template>

<script>
export default {
    name: 'AmDialogTest',
    mounted() {
        document.body.append(this.$el);
    },
};
</script>

<style lang="less">
.am-dialog-text {
    color:red;
}
</style>
