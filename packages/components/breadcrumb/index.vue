<template>
    <div class="am-breadcrumb">
        <slot/>
    </div>
</template>

<script>
export default {
    name: 'AmBreadcrumb',
    props: {
        // 分隔符
        separator: {
            type: String,
            default: '/',
        },
        // 分割图标
        separatorIcon: {
            type: String,
            default: '',
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
        &-item {
            &:last-child {
                >i {
                    display: none;
                }
                >.am-icon {
                    display: none;
                }
            }
        }
    }
</style>
