<template>
    <div
        class="am-select"
        v-clickoutside="clickOutside">
        <!-- 选择框 -->
        <div class="select-box" @click="clickSelectBox" ref="selectBox">
            <!-- 单选 -->
            <div class="alone" v-if="!multiple">
                <p class="placeholder" v-if="!value">{{ placeholder }}</p>
                <div v-else class="content">{{ value.label }}</div>
                <AmIcon name="down"/>
            </div>
            <!-- 多选 -->
            <div class="multiple" v-else>
                <p class="placeholder" v-if="!value.length">{{ placeholder }}</p>
                <div v-else class="content">
                    <div
                        class="tag"
                        v-for="item in value"
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
            <slot/>
        </AmPopover>
    </div>
</template>

<script>
export default {
    name: 'AmSelect',
    model: {
        prop: 'value',
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
        // 值
        value: {
            type: null,
        },
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

        };
    },
    mounted() {
        this.selectBoxEl = this.$refs.selectBox;
    },
    methods: {
        // 显示隐藏
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
                const newValue = this.value ? this.value : [];
                newValue.push(option);
                this.$emit('changeValue', newValue);
            } else {
                // 单选
                this.$emit('changeValue', option);
                this.dropDownShow = false;
            }
        },
    },
};
</script>

<style lang="less">
.am-select {
    .select-box {
        width: 100%;
        min-height: 30px;
        border: 1px solid var(--border);
        user-select: none;
        >.alone {
            height: 100%;
            min-height: 30px;
            padding: 0 5px;
            display: flex;
            align-items: center;
            >.placeholder {
                flex: 1;
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
            min-height: 30px;
            padding: 0 5px;
            display: flex;
            align-items: center;
            >.placeholder {
                flex: 1;
            }
            >.content {
                display: flex;
                flex-wrap: wrap;
                flex: 1;
                padding-top: 2px;
                .tag {
                    display: inline-flex;
                    border: 1px solid var(--border);
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
}
</style>
