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
            type: String,
            default: '80px',
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
        margin-bottom: 16px;
    }
}
</style>
