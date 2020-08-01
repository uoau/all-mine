<template>
    <div
        class="am-checkbox"
        :class="{
            ['is-active']: value,
        }"
        @click="handleClick"
    >
        <div class="checkbox">
            <AmIcon name="check2" />
        </div>
        <div class="text" v-if="$slots.default">
            <slot />
        </div>
    </div>
</template>

<script>
/**
 * 用法
 * <AmCheckbox v-model="array" :value="1">选项一</AmCheckbox>
 * <AmCheckbox v-model="array" :value="2">选项二</AmCheckbox>
 * <AmCheckbox v-model="array">选项三</AmCheckbox>
 * <AmCheckbox v-model="array">选项四</AmCheckbox>
 */
export default {
    name: 'AmCheckbox',
    model: {
        prop: 'value',
        event: 'changeValue',
    },
    props: {
        // 值
        value: {
            type: Boolean,
            default: false,
        },
        // 不可选
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        handleClick() {
            this.$emit('changeValue', !this.value);
        },
    },
};
</script>

<style lang="less">
.am-checkbox {
    display: inline-flex;
    align-items: center;
    height: 30px;
    user-select: none;
    cursor: pointer;
    >.checkbox {
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 2px;
        border: 1px solid var(--border);
        .am-icon {
            transition: transform .2s;
            transform: scale(0);
            font-size: 14px;
            color: #fff;
        }
    }
    >.text {
        margin-left: 5px;
    }
    &.is-active {
        >.checkbox {
            background: var(--primary);
            border-width: 0;
            .am-icon {
                transform: scale(1);
                font-size: 14px;
                color: #fff;
            }
        }
    }
    &:hover {
        >.checkbox {
            border-color: var(--primary);
        }
    }
}
</style>
