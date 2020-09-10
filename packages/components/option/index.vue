<template>
    <div
        class="am-option"
        :class="aoClass"
        @click.stop="clickOption">
        <slot />
    </div>
</template>

<script>
import { getType, findOne } from '../../utils/base';

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
    data() {
        return {

        };
    },
    computed: {
        isSelected() {
            if (getType(this.select.selectedValue) === 'Array' && findOne(this.select.selectedValue, { value: this.item.value })) return true;
            if (this.select.selectedValue && this.select.selectedValue.value === this.item.value) return true;
            return false;
        },
        aoClass() {
            return {
                'is-selected': this.isSelected,
            };
        },
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
