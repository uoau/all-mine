<template>
    <div
        class="am-select"
        :class="asClass"
        v-clickoutside="clickOutside">
        <!-- 选择框 -->
        <div class="select-box" @click="clickSelectBox" ref="selectBox">
            <!-- 单选 -->
            <div class="alone" v-if="!multiple">
                <p class="placeholder" v-if="!selectedItem">{{ placeholder }}</p>
                <div v-else class="content">{{ selectedItem.label }}</div>
                <AmIcon name="down"/>
            </div>
            <!-- 多选 -->
            <div class="multiple" v-else>
                <p class="placeholder" v-if="!selectedItem.length">{{ placeholder }}</p>
                <div v-else class="content">
                    <div
                        class="tag"
                        v-for="item in selectedItem"
                        :key="item.value"
                    >
                        <span>{{ item.label }}</span>
                        <AmIcon name="close"/>
                    </div>
                </div>
                <AmIcon name="down"/>
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
                'is-focus': this.dropDownShow,
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
                newValue.push(option.value);
                this.$emit('changeValue', newValue);
            } else {
                // 单选
                this.$emit('changeValue', option.value);
                this.dropDownShow = false;
            }
        },
        delOption(option) {
            console.log('点击了');
            // 去除多选项
            const index = this.selectedValue.findIndex((item) => option.value === item);
            this.selectedValue.splice(index, 1);
            console.log(this.selectedValue);
            this.$emit('changeValue', this.selectedValue);
        },
    },
};
</script>

<style lang="less">
.am-select {
    width: 230px;
    .select-box {
        width: 100%;
        min-height: 32px;
        border: 1px solid var(--border);
        user-select: none;
        cursor: pointer;
        transition: border .2s;
        font-size: 14px;
        >.alone {
            height: 100%;
            min-height: 32px;
            padding: 0 8px;
            display: flex;
            align-items: center;
            >.placeholder {
                flex: 1;
                color: var(--placeholder);
            }
            >.content {
                flex: 1;
            }
            >.am-icon {
                font-size: 12px;
            }
        }
        >.multiple {
            height: 100%;
            min-height: 32px;
            padding: 0 8px;
            display: flex;
            align-items: center;
            >.placeholder {
                flex: 1;
                color: var(--placeholder);
            }
            >.content {
                display: flex;
                flex-wrap: wrap;
                flex: 1;
                padding-top: 2px;
                .tag {
                    display: inline-flex;
                    background: var(--light-bg);
                    padding: 0 5px;
                    margin-right: 2px;
                    margin-bottom: 2px;
                    align-items: center;
                    span {
                    }
                    > .am-icon {
                        margin-left: 4px;
                        font-size: 12px;
                    }
                }
            }
            >.am-icon {
                font-size: 12px;
            }
        }
    }
    // 修饰
    &:hover {
        .select-box {
            border-color: #333;
        }
    }
    &.is-focus {
        .select-box {
            border-color: #333;
        }
    }
}
</style>
