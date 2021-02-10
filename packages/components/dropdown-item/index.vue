<template>
    <div class="am-dropdown-item" @click="handleClick">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'AmDropdownItem',
    inject: ['dropdown'],
    props: {
        // 标签名
        label: {
            type: String,
            default: '',
        },
        value: null,
    },
    methods: {
        handleClick() {
            if (this.dropdown.updatePlaceholder) {
                this.dropdown.placeholder = this.label;
            }
            this.dropdown.hideDropdown();
            this.dropdown.$emit('change', this.value);
        },
    },
};
</script>

<style lang="less">
.am-dropdown-item {
    padding: 0 12px;
    height: 30px;
    font-size: 14px;
    line-height: 24px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
        background: var(--light-bg);
    }
}
</style>
