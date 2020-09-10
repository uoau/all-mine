<template>
    <div class="am-form">
        <slot/>
    </div>
</template>

<script>
export default {
    name: 'AmForm',
    provide() {
        return {
            form: this,
        };
    },
    props: {
        labelWidth: {
            type: Number,
            default: 80,
        },
        position: {
            type: String,
            default: 'left',
        },
    },
};
</script>

<style lang="less">
.am-form {
    >.am-form-item {
        margin-bottom: 20px;
    }
}
</style>
