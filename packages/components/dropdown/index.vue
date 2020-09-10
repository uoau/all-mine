<template>
    <div class="am-dropdown" v-clickoutside="hideDropdown">
        <AmButton ref="btn" @click="()=>{ show=!show }">
            <span>{{ placeholder }}</span>
            <AmIcon name="caret-down" :size="12"/>
        </AmButton>
        <AmPopover
            v-if="linkEl"
            :link-el="linkEl"
            :show.sync="show"
        >
            <slot />
        </AmPopover>
    </div>
</template>

<script>
export default {
    name: 'AmDropdown',
    props: {
        // 占位符
        placeholder: {
            type: String,
            default: '点击展开下拉',
        },
        // 更新占位符
        updatePlaceholder: {
            type: Boolean,
            default: false,
        },
    },
    provide() {
        return {
            dropdown: this,
        };
    },
    data() {
        return {
            linkEl: '',
            show: false,
        };
    },
    mounted() {
        this.linkEl = this.$refs.btn.$el;
    },
    methods: {
        // 隐藏下拉
        hideDropdown() {
            this.show = false;
        },
    },
};
</script>

<style lang="less">
.am-dropdown {
    display: inline-flex;
}
</style>
