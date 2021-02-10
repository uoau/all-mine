<template>
    <div
        class="am-checkbox"
        :class="{
            ['is-active']: selected,
        }"
        @click="handleClick"
    >
        <div class="am-checkbox__box">
            <transition name="am-checkbox-anime">
                <AmIcon name="check2" v-show="selected" size="12px" />
            </transition>
        </div>
        <div class="am-checkbox__text" v-if="$slots.default">
            <slot />
        </div>
    </div>
</template>

<script>
import { getType } from '../../utils/base';

export default {
    name: 'AmCheckbox',
    model: {
        prop: 'selectedValue',
        event: 'changeValue',
    },
    props: {
        // 所选值（布尔或数组）
        selectedValue: {
            type: [Boolean, Array],
        },
        // 不可选
        disabled: {
            type: Boolean,
            default: false,
        },
        // 值
        label: null,
    },
    data() {
        return {};
    },
    computed: {
        selected() {
            if (getType(this.selectedValue) === 'Array') {
                let res = false;
                this.selectedValue.forEach((item) => {
                    if (item === this.label) {
                        res = true;
                    }
                });
                return res;
            }
            return this.selectedValue;
        },
    },
    methods: {
        handleClick() {
            if (getType(this.selectedValue) === 'Array') {
                let inIndex = -1;
                this.selectedValue.forEach((item, index) => {
                    if (item === this.label) {
                        inIndex = index;
                    }
                });
                if (inIndex >= 0) {
                    this.selectedValue.splice(inIndex, 1);
                } else {
                    this.selectedValue.push(this.label);
                }
                this.$emit('changeValue', this.selectedValue);
                this.$emit('change', this.selectedValue);
            } else {
                this.$emit('changeValue', !this.selectedValue);
                this.$emit('change', this.selectedValue);
            }
        },
    },
};
</script>

<style lang="less">
.am-checkbox {
    display: inline-flex;
    align-items: center;
    height: 32px;
    user-select: none;
    cursor: pointer;
    &__box {
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 2px;
        border: 1px solid var(--border);
        transition: border .2s, background .2s;
        .am-icon {
            opacity: 1;
            transform: scale(1);
            color: #fff;
        }
    }
    &__text {
        margin-left: 6px;
        font-size: 14px;
    }

    .am-checkbox-anime-enter-active {
        animation: am-checkbox-in .2s;
    }
    .am-checkbox-anime-leave-active {
        animation: am-checkbox-in .2s reverse;
        animation-fill-mode: forwards;
    }
    @keyframes am-checkbox-in {
        from {
            opacity: 0;
            transform: scale(0);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    // 状态
    &:hover {
        .am-checkbox__box {
            border-color: var(--primary);
        }
    }
    &.is-active {
        .am-checkbox__box {
            background: var(--primary);
            border-color: var(--primary);
        }
    }
}
</style>
