<template>
    <div class="am-breadcrumb-item">
        <!-- 内容 -->
        <slot />
        <!-- 图标 -->
        <i>{{ this.breadcrumb.separator }}</i>
    </div>
</template>

<script>
export default {
    name: 'AmBreadcrumbItem',
    props: {
        to: {
            type: String,
        },
        current: Boolean,
    },
    inject: ['breadcrumb'],
};
</script>

<style lang="less">
    .am-breadcrumb-item {
        display: inline-flex;
        align-items: center;
        > i {
            margin: 0 10px;
        }
    }
</style>
