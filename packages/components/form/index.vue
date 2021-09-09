<template>
    <div class="am-form">
        <slot />
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
    data() {
        return {

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
    methods: {
        validate() {

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
