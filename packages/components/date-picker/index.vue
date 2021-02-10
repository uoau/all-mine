<template>
    <div
        class="am-date-picker"
        v-clickoutside="clickOutside"
        :class="{
            'is-disabled': isDisabled,
            'is-focus': isFocus,
        }"
    >
        <div
            class="am-date-picker__input"
            ref="dateInput"
            @click="clickDateInput('')"
        >
            <!-- 图标 -->
            <div class="am-date-picker__icon">
                <AmIcon name="calendar"/>
            </div>
            <!-- 开始 -->
            <div
                ref="start"
                class="am-date-picker__value"
                @click.stop="clickDateInput('start')"
            >
                <p class="am-date-picker__value-content" v-if="startValue">{{ startValue }}</p>
                <p class="am-date-picker__value-placeholder" v-else>{{ usedStartPlaceholder }}</p>
            </div>
            <!-- 至 -->
            <div
                class="am-date-picker__separator"
                v-if="isRange"
            >
                {{ rangeSeparator }}
            </div>
            <!-- 结束 -->
            <div
                ref="end"
                class="am-date-picker__value"
                v-if="isRange"
                @click.stop="clickDateInput('end')"
            >
                <p class="am-date-picker__value-content" v-if="endValue">{{ endValue }}</p>
                <p class="am-date-picker__value-placeholder" v-else>{{ usedEndPlaceholder }}</p>
            </div>
            <!-- 底线 -->
            <div
                v-show="dateValuePosition && isFocus"
                ref="line"
                class="am-date-picker__line">
            </div>
            <!-- 清除按钮 -->
            <div
                class="am-date-picker__clear"
                v-if="clearable && dateValue.start"
                @click.stop="clear"
            >
                <AmIcon name="fail-fill" size="20"/>
            </div>
        </div>

        <AmPopover
            ref="pop"
            v-if="dateInputEl"
            :link-el="dateInputEl"
            :show.sync="dropDownShow"
            :ap-width-follow-father="false"
            @after-hide="popAfterHide"
            @after-enter="popAfterEnter"
        >
            <DateBase
                :type="type"
                :date-value-position="dateValuePosition"
                :dom-ready="domReady"
                :disabled-date="disabledDate"
                v-model="dateValue"
                @panel-change="datePanelChange"
                @confirm-value="dateConfirmValue"
            />
        </AmPopover>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import DateBase from './date-base.vue';

// @change 当值变化时触发
// @focus 聚焦时触发
// @blur 失焦时触发
// @clear 点击清空时触发

// 默认格式化
const defaultFormatMap = {
    year: 'YYYY',
    month: 'YYYY-MM',
    day: 'YYYY-MM-DD',
    dayTime: 'YYYY-MM-DD HH:mm:ss',
    time: 'HH:mm:ss',
};
// 默认文本
const defaultPlaceholderMap = {
    year: '年份',
    month: '月份',
    day: '日期',
    dayTime: '日期',
    time: '时间',
};

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
        // 类型
        // year month day dayTime time
        // yearRange monthRange dayRange dayTimeRange timeRange
        type: {
            type: String,
            default: 'day',
        },
        // 默认提示文本
        placeholder: {
            type: String,
            default: '',
        },
        // 默认开始提示文本
        startPlaceholder: {
            type: String,
            default: '',
        },
        // 默认结束提示文本
        endPlaceholder: {
            type: String,
            default: '',
        },
        // 范围分隔符
        rangeSeparator: {
            type: String,
            default: '至',
        },
        // 值
        value: [String, Number, Array, Date],
        // 格式化
        format: {
            type: String,
            default: '',
        },
        // 禁用
        disabled: {
            type: Boolean,
            default: false,
        },
        // 是否可清除
        clearable: {
            type: Boolean,
            default: true,
        },
        // 不可用日期(date)
        disabledDate: {
            type: Function,
            default: () => false,
        },
    },
    data() {
        return {
            // 选择框元素
            dateInputEl: '',
            // 下拉框显示
            dropDownShow: false,
            // 日期组件值
            dateValue: {
                start: '',
                end: '',
            },
            // 取日期组件值的位置， start为首位，end为后位
            dateValuePosition: '',
            // 窗口视图是否已准备好
            domReady: false,
        };
    },
    computed: {
        startValue() {
            const { dateValue, usedFormat } = this;
            if (!dateValue.start) {
                return '';
            }
            const startValue = dayjs(dateValue.start).format(usedFormat);
            return startValue;
        },
        endValue() {
            const { dateValue, usedFormat } = this;
            if (!dateValue.end) return '';
            const endValue = dayjs(dateValue.end).format(usedFormat);
            return endValue;
        },
        // 使用的格式化格式
        usedFormat() {
            const { format, dateType } = this;
            if (format) return format;
            return defaultFormatMap[dateType];
        },
        // 使用的默认文本
        usedStartPlaceholder() {
            const {
                isRange, placeholder, startPlaceholder, dateType,
            } = this;
            if (isRange) {
                if (startPlaceholder) {
                    return startPlaceholder;
                }
                return `开始${defaultPlaceholderMap[dateType]}`;
            }
            if (placeholder) {
                return placeholder;
            }
            return `选择${defaultPlaceholderMap[dateType]}`;
        },
        usedEndPlaceholder() {
            const { endPlaceholder, dateType } = this;
            if (endPlaceholder) {
                return endPlaceholder;
            }
            return `结束${defaultPlaceholderMap[dateType]}`;
        },
        // 日期类型
        dateType() {
            return this.type.split('Range')[0];
        },
        // 是否为范围组件
        isRange() {
            return this.type.indexOf('Range') > -1;
        },
        // 状态
        isFocus() {
            return this.dropDownShow;
        },
        isDisabled() {
            return this.disabled;
        },
    },
    watch: {
        value: {
            immediate: true,
            deep: true,
            handler() {
                const { isRange, dateValue, value } = this;
                if (!isRange) {
                    dateValue.start = dayjs(value).valueOf();
                } else {
                    if (value[0]) {
                        dateValue.start = dayjs(value[0]).valueOf();
                    }
                    if (value[1]) {
                        dateValue.end = dayjs(value[1]).valueOf();
                    }
                }
            },
        },
        dateValuePosition: {
            async handler() {
                await this.$nextTick();
                this.checkLine();
            },
        },
        dateValue: {
            immediate: true,
            deep: true,
            async handler() {
                await this.$nextTick();
                this.checkLine();
            },
        },
        dropDownShow() {
            const {
                dropDownShow, isRange, dateValue, value,
            } = this;
            if (dropDownShow) {
                this.$emit('focus');
            } else {
                this.$emit('blur');
                // 非范围
                if (!isRange) {
                    if (value !== dateValue.start) {
                        this.$emit('changeValue', dateValue.start);
                        this.$emit('change');
                    }
                    return;
                }
                // 范围
                if (dateValue.start && dateValue.end
                        && (value[0] !== dateValue.start || value[1] !== dateValue.end)) {
                    this.$emit('changeValue', [dateValue.start, dateValue.end]);
                    this.$emit('change');
                } else if (!dateValue.start || !dateValue.end) {
                    this.clear();
                    this.$emit('changeValue', ['', '']);
                }
            }
            this.checkLine();
        },
    },
    mounted() {
        this.dateInputEl = this.$refs.dateInput;
    },
    methods: {
        // 显示隐藏
        clickDateInput(type) {
            if (type && this.dateValue.start) {
                this.dateValuePosition = type;
            } else {
                this.dateValuePosition = 'start';
            }
            this.dropDownShow = true;
        },
        clickOutside() {
            this.dropDownShow = false;
        },
        // 日期视图改变
        datePanelChange() {
            this.$refs.pop.check();
        },
        // 点击了单元格上报
        dateConfirmValue() {
            const { isRange, dateValuePosition } = this;
            if (isRange && dateValuePosition === 'start') {
                this.dateValuePosition = 'end';
            } else {
                this.dropDownShow = false;
            }
        },
        popAfterHide() {
            this.dateValuePosition = 'start';
            this.domReady = false;
        },
        popAfterEnter() {
            this.domReady = true;
        },
        // 检查底部划线的位置
        checkLine() {
            const { isRange, dateValuePosition, dropDownShow } = this;
            if (!isRange || !dateValuePosition) return;
            const now = this.$refs[dateValuePosition];
            const nowLeft = dropDownShow ? now.offsetLeft : 0;
            const nowWidth = dropDownShow ? now.offsetWidth : 0;
            const { line } = this.$refs;
            line.style.transform = `translateX(${nowLeft}px)`;
            line.style.width = `${nowWidth}px`;
        },
        clear() {
            this.dateValue.start = '';
            this.dateValue.end = '';
            this.$emit('changeValue', '');
            this.dropDownShow = false;
        },
    },
};
</script>

<style lang="less">
.am-date-picker {
    display: inline-flex;
    margin-right: 20px;
    position: relative;
    &__input {
        min-width: 230px;
        height: 34px;
        padding: 0 16px 0 8px;
        border: 1px solid var(--border);
        display: flex;
        flex: 1;
        align-items: center;
        transition: border .2s;
        font-size: 14px;
        cursor: pointer;
        &:hover {
            .am-date-picker__clear {
                opacity: 1;
            }
        }
    }
    &__icon {

    }
    &__separator {
        display: inline-flex;
        justify-content: center;
    }
    &__value {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 8px;
        white-space: nowrap;
        &-content {
            display: flex;
        }
        &-placeholder {
            color: #999;
        }
    }
    &__line {
        position: absolute;
        height: 1px;
        width: 0;
        background: var(--primary);
        bottom: 2px;
        position: absolute;
        left: 0;
        transition: transform .2s, width .2s;

    }
    &__clear {
        width: 20px;
        height: 20px;
        position: absolute;
        right: 8px;
        top: 0;
        bottom: 0;
        margin: auto;
        display: inline-flex;
        opacity: 0;
        cursor: pointer;
        color: #999;
        transition: color .2s, opacity .1s;
        &:hover {
            color: #333;
        }
    }
    // 悬停
    &:hover {
        .am-date-picker__input {
            border: 1px solid #333;
        }
    }

    // 禁用
    &.is-disabled {

    }
    // 聚焦
    &.is-focus {
        .am-date-picker__input {
            border: 1px solid #333;
        }
    }
}
</style>
