<template>
    <div
        class="am-option"
        :class="aoClass"
        @click.stop="clickOption">
        <!-- 内容 -->
        <slot />
        <!-- 标记 -->
        <AmIcon
            v-if="isSelected && select.multiple"
            class="am-option__check"
            name="check"
            size="16px"
        />
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
                'is-multiple': this.select.multiple,
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
    position: relative;
    cursor: pointer;
    &__check {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 8px;
        margin: auto;
    }
    &:hover {
        background: var(--light-bg);
    }
    &.is-selected {
        background: var(--light-bg);
    }
    &.is-multiple {
        padding-right: 32px;
    }
}
</style>
