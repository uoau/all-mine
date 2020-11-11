<template>
    <div
        class="am-option"
        :class="aoClass"
        @click.stop="clickOption">
        <slot />
    </div>
</template>

<script>
import { getType } from '../../utils/base';

export default {
    name: 'AmOption',
    inject: ['select'],
    props: {
        // 选项内容，必须包括 value 和 label
        item: {
            type: Object,
            required: true,
        },
    },
    watch: {
        item() {
            this.select.options.push(this.item);
        },
    },
    computed: {
        isSelected() {
            if (getType(this.select.selectedValue) === 'Array' && this.select.selectedValue.findIndex((item) => item === this.item.value) > -1) return true;
            if (this.select.selectedValue && this.select.selectedValue === this.item.value) {
                return true;
            }
            return false;
        },
        aoClass() {
            return {
                'is-selected': this.isSelected,
            };
        },
    },
    created() {
        this.select.options.push(this.item);
    },
    beforeDestroy() {
        const index = this.select.options.findIndex((item) => item === this.item);
        this.select.options.splice(index, 1);
    },
    methods: {
        clickOption() {
            this.select.setSelect(this.item);
        },
    },
};
</script>

<style lang="less">
.am-option {
    user-select: none;
    padding: 5px 8px;
    font-size: 14px;
    line-height: 24px;
    // 修饰
    &:hover {
        background: var(--light-bg);
    }
    &.is-selected {
        background: var(--light-bg);
    }
}
</style>
