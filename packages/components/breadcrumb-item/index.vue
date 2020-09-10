<template>
    <div class="am-breadcrumb-item" :class="biClass">
        <!-- 内容 -->
        <component :is="to?'router-link':'a'" :to="to" class="content">
            <slot />
        </component>
        <!-- 图标 -->
        <AmIcon :name="breadcrumb.separatorIcon" v-if="breadcrumb.separatorIcon"/>
        <i v-else>{{ breadcrumb.separator }}</i>
    </div>
</template>

<script>
export default {
    name: 'AmBreadcrumbItem',
    props: {
        // 跳到
        to: {
            type: Object,
            default: null,
        },
        // 当前
        current: {
            type: Boolean,
        },
    },
    inject: ['breadcrumb'],
    computed: {
        biClass() {
            return {
                'is-current': this.current,
                'is-hasto': this.to,
            };
        },
    },
};
</script>

<style lang="less">
.am-breadcrumb-item {
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    >.content {
        color: #666;
        text-decoration: none;
    }
    > i {
        margin: 0 10px;
    }
    > .am-icon {
        margin: 0 8px;
        font-size: 12px;
    }

    // 当前
    &.is-current {
        >.content {
            color: #000;
            font-weight: bold;
        }
    }
    &.is-hasto {
        >.content {
            &:hover {
                text-decoration: underline;
            }
        }
    }
}
</style>
