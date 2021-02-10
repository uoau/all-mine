<template>
    <div class="am-date-base">
        <div class="am-date-base__top">
            <div class="am-date-base__left">
                <div class="am-date-base__hd">
                    <div class="prev-btns">
                        <AmIconButton
                            icon-name="doubleleft"
                            size="small"
                            @click="clickHdBtn('prev12Year')"
                            v-if="nowPanel === 'year'"
                        >
                        </AmIconButton>
                        <AmIconButton
                            icon-name="doubleleft"
                            size="small"
                            @click="clickHdBtn('prevYear')"
                            v-if="nowPanel !== 'year'"
                        >
                        </AmIconButton>
                        <AmIconButton
                            icon-name="left"
                            size="small"
                            @click="clickHdBtn('prevMonth')"
                            v-if="nowPanel === 'day' || nowPanel === 'dayTime'"
                        >
                        </AmIconButton>
                    </div>
                    <div class="info">
                        <p
                            v-if="nowPanel === 'year'"
                        >
                            {{ yearPanelRange }}
                        </p>
                        <a
                            v-if="nowPanel !== 'year'"
                            @click="changeView('year')"
                        >{{ viewYear }}年</a>
                        <a
                            v-if="nowPanel === 'day' || nowPanel === 'dayTime'"
                            @click="changeView('month')"
                        >{{ viewMonth }}月</a>
                    </div>
                    <div class="next-btns">
                        <AmIconButton
                            icon-name="right"
                            size="small"
                            @click="clickHdBtn('nextMonth')"
                            v-if="nowPanel === 'day' || nowPanel === 'dayTime'"
                        >
                        </AmIconButton>
                        <AmIconButton
                            icon-name="doubleright"
                            size="small"
                            @click="clickHdBtn('nextYear')"
                            v-if="nowPanel !== 'year'"
                        >
                        </AmIconButton>
                        <AmIconButton
                            icon-name="doubleright"
                            size="small"
                            @click="clickHdBtn('next12Year')"
                            v-if="nowPanel === 'year'"
                        >
                        </AmIconButton>
                    </div>
                </div>
                <div class="am-date-base__bd">
                    <!-- 年视图 -->
                    <YearPanel
                        v-if="nowPanel === 'year'"
                    />
                    <!-- 月视图 -->
                    <MonthPanel
                        v-if="nowPanel === 'month'"
                    />
                    <!-- 日视图 -->
                    <DayPanel
                        v-if="nowPanel === 'day' || nowPanel === 'dayTime'"
                    />
                </div>
            </div>
            <div class="am-date-base__right">
                <!-- 时间面板 -->
                <TimePanel
                    v-show="nowPanel === 'time' || nowPanel === 'dayTime'"
                />
            </div>
        </div>
        <div class="am-date-base__ft">
            <div class="am-date-base__ft-left">
                <!-- 快捷按钮 -->
                <div class="am-date-base__fast-btn">
                    <!-- <AmButton
                        size="small"
                    >最近一周</AmButton>
                    <AmButton
                        size="small"
                    >最近一月</AmButton>
                    <AmButton
                        size="small"
                    >最近三月</AmButton>
                    <AmButton
                        size="small"
                    >最近一周</AmButton> -->
                </div>
            </div>
            <div class="am-date-base__ft-right">
                <AmButton
                    v-if="dateType === 'dayTime'"
                    size="small"
                >今日</AmButton>
                <AmButton
                    type="primary"
                    v-if="dateType === 'dayTime'"
                    size="small"
                    @click="confirm"
                >确定</AmButton>
            </div>
            <!-- <AmButton
                size="small"
                @click="clickToday"
            >今日</AmButton> -->
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import YearPanel from './panel/year.vue';
import MonthPanel from './panel/month.vue';
import DayPanel from './panel/day.vue';
import TimePanel from './panel/time.vue';

/*
 * 事件大全
 * @change 当值发送改变是上报
 * @confirm-value 确认值上报
 * @panel-change 面板变化上报
 *
 *
 */

export default {
    model: {
        prop: 'value',
        event: 'changeValue',
    },
    components: {
        YearPanel,
        MonthPanel,
        DayPanel,
        TimePanel,
    },
    props: {
        // 类型
        // year month day dayTime time
        // yearRange monthRange dayRange dayTimeRange timeRange
        type: {
            type: String,
            default: 'day',
        },
        // 日期值位置 start起始 end 末尾
        dateValuePosition: {
            type: String,
            default: 'start',
        },
        // 值
        value: null,
        // 不可用日期
        disabledDate: {
            type: Function,
            default: () => false,
        },
        // 不可用时间
        disabledTime: {
            type: Function,
            default: () => false,
        },
        // 用于判断日期组件dom是否渲染完成
        domReady: {
            type: Boolean,
        },
    },
    provide() {
        return {
            base: this,
        };
    },
    data() {
        return {
            nowPanel: 'day', // 有year、month、day、dayTime、time
            viewYear: dayjs().$y, // 视图的年
            viewMonth: dayjs().$M + 1, // 视图的月

            // 选中的时间
            dateValue: {
                start: null,
                end: null,
            },
        };
    },
    created() {
        // 初始化视图
        const { type } = this;
        [this.nowPanel] = type.split('Range');
    },
    watch: {
        nowPanel() {
            this.$emit('panel-change');
        },
        value: {
            immediate: true,
            deep: true,
            handler() {
                this.dateValue = this.value;
            },
        },
        dateValue: {
            deep: true,
            handler() {
                this.$emit('changeValue', this.dateValue);
                this.$emit('change', this.dateValue);
            },
        },
        dateValuePosition: {
            handler() {
                const { nowSelectDate } = this;
                if (nowSelectDate) {
                    this.viewYear = dayjs(nowSelectDate).$y;
                    this.viewMonth = dayjs(nowSelectDate).$M + 1;
                }
            },
        },
    },
    computed: {
        // 日期类型
        dateType() {
            return this.type.split('Range')[0];
        },
        // 是否为范围组件
        isRange() {
            return this.type.indexOf('Range') > -1;
        },
        // 当前正在操控的日期
        nowSelectDate() {
            return this.dateValue[this.dateValuePosition];
        },
        startSelectDate() {
            return this.dateValue.start;
        },
        // 年面板范围
        yearPanelRange() {
            const { viewYear } = this;
            const start = viewYear - (viewYear % 12) + 1;
            const end = start + 11;
            return `${start}年 - ${end}年`;
        },
    },
    methods: {
        // 操控视图
        clickHdBtn(type) {
            if (type === 'prev12Year') {
                if (this.viewYear >= 12) {
                    this.viewYear -= 12;
                }
            } else if (type === 'prevYear') {
                if (this.viewYear > 0) {
                    this.viewYear -= 1;
                }
            } else if (type === 'prevMonth') {
                if (this.viewMonth === 1) {
                    if (this.viewYear > 0) {
                        this.viewYear -= 1;
                        this.viewMonth = 12;
                    }
                } else {
                    this.viewMonth -= 1;
                }
            } else if (type === 'nextMonth') {
                if (this.viewMonth === 12) {
                    this.viewYear += 1;
                    this.viewMonth = 1;
                } else {
                    this.viewMonth += 1;
                }
            } else if (type === 'nextYear') {
                this.viewYear += 1;
            } else if (type === 'next12Year') {
                this.viewYear += 12;
            }
        },
        changeView(view) {
            this.nowPanel = view;
        },
        // 其他功能
        clickToday() {
            // 选择今天
            // this.selectedDate = dayjs();
        },
        confirm() {
            // 点击确认
            this.$emit('confirm-value');
        },

    },
};

</script>

<style lang="less">
.am-date-base {
    background: #fff;
    border: 1px solid var(--border);
    user-select: none;
    font-size: 14px;
    &__top {
        display: flex;
    }
    &__left {

    }
    &__right {

    }
    &__hd {
        display: flex;
        height: 40px;
        align-items: center;
        padding: 0 10px;
        border-bottom: 1px solid var(--border);
        justify-content: space-between;
        .info {
            a {
                color: #333;
                text-decoration: none;
                font-weight: bold;
                transition: color .2s;
                &:hover {
                    color: var(--primary);
                }
            }
        }
        .am-icon-button {
            border: none;
        }
    }
    &__bd {
        display: flex;
    }
    &__ft {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        border-top: 1px solid var(--border);
        &-left {
            display: flex;
        }
        &-right {
            display: flex;
            .am-button {
                margin-left: 8px;
            }
        }
    }

    // 快捷按钮
    &__fast-btn {

    }
}
</style>
