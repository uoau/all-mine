<template>
    <div class="am-breadcrumb">
        <slot/>
    </div>
</template>

<script>
export default {
    name: 'AmBreadcrumb',
    props: {
        separator: {
            type: String,
            default: '/',
        },
    },
    provide() {
        return {
            breadcrumb: this,
        };
    },
};
</script>

<style lang="less">
    .am-breadcrumb {
        display: flex;
        >.am-breadcrumb-item {
            &:last-child {
                >i {
                    display: none;
                }
            }
        }
    }
</style>
