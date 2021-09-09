<template>
    <div
        class="am-breadcrumb-item"
        :class="biClass"
        @click="handleClick"
    >
        <!-- 内容 -->
        <component
            :is="to?'router-link':'a'"
            :to="to"
            class="am-breadcrumb-item__content"
        >
            <slot />
        </component>
        <!-- 图标 -->
        <AmIcon
            :name="breadcrumb.separatorIcon"
            v-if="breadcrumb.separatorIcon"
        />
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
    methods: {
        handleClick() {
            this.$emit('click');
        },
    },
};
</script>

<style lang="less">
.am-breadcrumb-item {
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    &__content {
        color: var(--fcolor-2);
        text-decoration: none;
    }
    > i {
        margin: 0 10px;
        color: var(--fcolor-3);
        cursor: default;
    }
    > .am-icon {
        margin: 0 8px;
        font-size: 12px;
        cursor: default;
    }

    // 当前
    &.is-current {
        .am-breadcrumb-item__content {
            color: var(--fcolor-1);
            cursor: default;
        }
    }
    &.is-hasto {
        .am-breadcrumb-item__content {
            &:hover {
                text-decoration: underline;
            }
        }
    }
}
</style>
