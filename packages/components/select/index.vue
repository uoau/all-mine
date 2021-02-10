<template>
    <div
        class="am-select"
        :class="asClass"
        v-clickoutside="clickOutside"
    >
        <!-- 选择框 -->
        <div class="am-select__box" @click="clickSelectBox" ref="selectBox">
            <!-- 默认文本 -->
            <p
                class="am-select__placeholder"
                v-if="(!multiple && !selectedItem) || (multiple && !selectedItem.length)"
            >{{ placeholder }}</p>
            <!-- 单选 -->
            <div
                v-else-if="!multiple"
                class="am-select__content am-select__content-alone"
            >{{ selectedItem.label }}</div>
            <!-- 多选 -->
            <div
                v-else
                class="am-select__content am-select__content-multiple"
            >
                <AmTag
                    :text="item.label"
                    v-for="item in selectedItem"
                    :key="item.value"
                />
            </div>
            <!-- 下拉按钮 -->
            <div class="am-select__down-icon">
                <AmIcon name="caret-bottom" size="12px"/>
            </div>
        </div>
        <!-- 下拉框内容 -->
        <AmPopover
            v-if="selectBoxEl"
            :link-el="selectBoxEl"
            :show="dropDownShow">
            <slot />
        </AmPopover>
    </div>
</template>

<script>
import { getType, findOne } from '../../utils/base';

export default {
    name: 'AmSelect',
    model: {
        prop: 'selectedValue',
        event: 'changeValue',
    },
    props: {
        // 多选
        multiple: {
            type: Boolean,
            default: false,
        },
        // 默认文字
        placeholder: {
            type: String,
            default: '请选择',
        },
        // 所选值
        selectedValue: null,
    },
    provide() {
        return {
            select: this,
        };
    },
    data() {
        return {
            // 选择框元素
            selectBoxEl: '',
            // 下拉框显示
            dropDownShow: false,
            // 选项
            options: [],
        };
    },
    computed: {
        asClass() {
            return {
                'is-focus': this.isFocus,
            };
        },
        selectedItem() {
            if (getType(this.selectedValue) === 'Array') {
                const arr = this.selectedValue.map((item) => {
                    const res = findOne(this.options, {
                        value: item,
                    });
                    return res.result;
                });
                if (arr.length) {
                    return arr;
                }
                return [];
            }
            let res = '';
            this.options.forEach((item) => {
                if (item.value === this.selectedValue) {
                    res = item;
                }
            });
            return res;
        },
        isFocus() {
            return this.dropDownShow;
        },
    },
    mounted() {
        this.selectBoxEl = this.$refs.selectBox;
    },
    methods: {
        // 显示隐藏
        clickSelectBox() {
            this.dropDownShow = !this.dropDownShow;
        },
        clickOutside() {
            this.dropDownShow = false;
        },
        // 数据相关
        setSelect(option) {
            if (this.multiple) {
                // 多选
                const newValue = this.selectedValue ? this.selectedValue : [];
                const index = newValue.findIndex((i) => i === option.value);
                if (index > -1) {
                    newValue.splice(index, 1);
                } else {
                    newValue.push(option.value);
                }
                this.$emit('changeValue', newValue);
            } else {
                // 单选
                this.$emit('changeValue', option.value);
                this.dropDownShow = false;
            }
        },
        delOption(option) {
            // 去除多选项
            const index = this.selectedValue.findIndex((item) => option.value === item);
            this.selectedValue.splice(index, 1);
            this.$emit('changeValue', this.selectedValue);
        },
    },
};
</script>

<style lang="less">
.am-select {
    width: 230px;
    // 输入框
    &__box {
        width: 100%;
        min-height: 32px;
        border: 1px solid var(--border);
        user-select: none;
        cursor: pointer;
        transition: border .2s;
        font-size: 14px;
        display: flex;
        align-items: center;
    }
    // 默认文本
    &__placeholder {
        width: calc(100% - 32px);
        color: var(--placeholder);
        padding-left: 8px;
    }
    // 内容
    &__content {
        width: calc(100% - 32px);
        padding-left: 8px;
        &-alone {
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        &-multiple {
            display: flex;
            flex-wrap: wrap;
            padding: 3px 0 3px 8px;
            .am-tag {
                margin: 2px 4px 2px 0;
            }
        }
    }
    // 下拉按钮
    &__down-icon {
        width: 32px;
        height: 100%;
        display: inline-flex;
        justify-content: center;
    }

    .am-popover {
        &__pop {
            max-height: 180px;
        }
    }
    // 修饰
    &:hover {
        .am-select__box {
            border-color: #333;
        }
    }
    &.is-focus {
        .am-select__box {
            border-color: #333;
        }
    }
}
</style>
