<template>
    <div class="am-date-picker" v-clickoutside="clickOutside">
        <div class="date-input" ref="dateInput" @click="clickDateInput">
            <div class="alone">
                <p class="placeholder" v-if="!value">{{ placeholder }}</p>
                <div class="content" v-else>
                    时间
                </div>
            </div>
            <div class="range">
                <p class="placeholder" v-if="!value">{{ placeholder }}</p>
                <div class="content" v-else>
                    时间
                </div>
            </div>
        </div>
        <AmPopover
            v-if="dateInputEl"
            :link-el="dateInputEl"
            :show="dropDownShow">
            <DateBase/>
        </AmPopover>
    </div>
</template>

<script>
import DateBase from './date-base.vue';

export default {
    name: 'AmDatePicker',
    components: {
        DateBase,
    },
    model: {
        prop: 'value',
        event: 'changeValue',
    },
    props: {
        placeholder: {
            type: String,
            default: '请输入',
        },
        value: {
            type: String,
        },
    },
    data() {
        return {
            // 选择框元素
            dateInputEl: '',
            // 下拉框显示
            dropDownShow: false,

        };
    },
    mounted() {
        this.dateInputEl = this.$refs.dateInput;
    },
    methods: {
        // 显示隐藏
        clickDateInput() {
            this.dropDownShow = !this.dropDownShow;
        },
        clickOutside() {
            this.dropDownShow = false;
        },
    },
};
</script>

<style lang="less">
.am-date-picker {
    display: inline-flex;
    .date-input {
        width: 280px;
        height: 32px;
        padding: 0 8px;
        border: 1px solid var(--border);
        display: inline-flex;
        align-items: center;
        transition: border .2s;
        >.alone {
            .placeholder {
                color: var(--placeholder);
            }
            .content {
                display: flex;
            }
        }
        >.range {
            .placeholder {
                color: var(--placeholder);
            }
            .content {
                display: flex;
            }
        }
    }
}
</style>
