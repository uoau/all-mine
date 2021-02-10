<template>
    <div class="am-date-day-panel">
        <!-- 星期 -->
        <div class="am-date-day-panel__item"
            v-for="(item,index) in dayNames"
            :key="index"
        >
            {{ item }}
        </div>
        <!-- 日 -->
        <div
            class="am-date-day-panel__item"
            v-for="(item,index) in days"
            :key="`${base.viewYear}${base.viewMonth}${index}`"
            @click="clickDay(item)"
            @mouseenter="mouseEnterDay(item)"
            @mouseleave="mouseLeaveDay(item)"
        >
            <div
                class="am-date-day-panel__item-cell"
                :class="item.class"
            >
                <span>{{ item.label }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs';

window.dayjs = dayjs;

export default {
    data() {
        return {
            dayNames: ['日', '一', '二', '三', '四', '五', '六'],
            fakeStart: null,
            fakeEnd: null,
        };
    },
    inject: ['base'],
    computed: {
        days() {
            const {
                dateValue, viewYear, viewMonth, dateValuePosition, type, disabledDate,
            } = this.base;
            const { fakeStart, fakeEnd } = this;
            let dateStart = fakeStart || dateValue.start;
            if (dateStart) {
                dateStart = dayjs(dateStart).startOf('day').valueOf();
            }
            let dateEnd = fakeEnd || dateValue.end;
            if (dateEnd) {
                dateEnd = dayjs(dateEnd).startOf('day').valueOf();
            }
            const isDayRange = type === 'dayRange' || type === 'dayTimeRange';
            // 获取本月天数(6*7)
            const prevMonth = dayjs().year(viewYear).month(viewMonth - 2);
            const thisMonth = dayjs().year(viewYear).month(viewMonth - 1);
            const nextMonth = dayjs().year(viewYear).month(viewMonth);
            const firstDay = thisMonth.startOf('month').$W; // 第一天是星期几
            const prevMonthDays = nextMonth.endOf('month').$D; // 上个月天数
            const monthDays = thisMonth.endOf('month').$D; // 本月的天数

            return new Array(6 * 7).fill(1).map((item, index) => {
                // 基础信息
                let num = null;
                let date = null;
                let position = null;
                if (index < firstDay) {
                    // 上个月的
                    num = prevMonthDays + index - firstDay + 1;
                    position = 'prev';
                    date = prevMonth.date(num).startOf('day');
                } else if (index >= firstDay && index < firstDay + monthDays) {
                    // 本月的
                    num = index - firstDay + 1;
                    position = 'this';
                    date = thisMonth.date(num).startOf('day');
                } else {
                    // 下个月的
                    num = index - monthDays - firstDay + 1;
                    position = 'next';
                    date = nextMonth.date(num).startOf('day');
                }
                const isThis = position === 'this';
                const value = date.valueOf();
                let isToday;
                let label = num;
                if (value === dayjs().startOf('day').valueOf()) {
                    label = '今';
                    isToday = true;
                }
                // 状态
                let {
                    isSelected, isStart, isEnd, isThrough, isDisabled,
                } = {};
                if (!isDayRange) {
                    isSelected = dateStart && value === dateStart;
                } else {
                    isStart = dateStart && value === dateStart;
                    isEnd = dateEnd && value === dateEnd;
                    isThrough = dateStart
                        && dateEnd && value > dateStart && value < dateEnd;
                    isDisabled = (dateStart && dateValuePosition === 'end' && value < dateStart)
                        || (dateEnd && dateValuePosition === 'start' && value > dateEnd);
                }
                // 日期限制
                let disabledMsg = '';
                const res = disabledDate(date.startOf('day'));
                if (res) {
                    isDisabled = true;
                    if (typeof (res) === 'string') {
                        disabledMsg = res;
                    }
                }

                return {
                    num,
                    date,
                    label,
                    value,
                    position,
                    isDisabled,
                    disabledMsg,
                    class: {
                        [`am-date-day-panel__item-cell--${position}`]: position,
                        'am-date-day-panel__item-cell--start': isThis && isStart,
                        'am-date-day-panel__item-cell--end': isThis && isEnd,
                        'am-date-day-panel__item-cell--startend': isThis && ((isEnd && isStart) || isSelected),
                        'am-date-day-panel__item-cell--through': isThis && isThrough,
                        'am-date-day-panel__item-cell--disabled': isThis && isDisabled,
                        'am-date-day-panel__item-cell--today': isToday,
                    },
                };
            });
        },
    },
    methods: {
        clickDay(dayItem) {
            if (dayItem.isDisabled) {
                return;
            }
            const {
                dateType, dateValue, dateValuePosition, nowSelectDate,
            } = this.base;
            // 点击的是上下月，跳转视图
            if (dayItem.position === 'prev' || dayItem.position === 'next') {
                return;
            }
            if (dateType === 'day') {
                this.$set(dateValue, dateValuePosition, dayItem.value);
                this.base.$emit('confirm-value');
            }
            if (dateType === 'dayTime') {
                let [hour, minute, second] = [0, 0, 0];
                if (nowSelectDate) {
                    const obj = dayjs(nowSelectDate);
                    hour = obj.$H;
                    minute = obj.$m;
                    second = obj.$s;
                }
                const newDate = dayjs(dayItem.value).hour(hour).minute(minute).second(second)
                    .valueOf();
                this.$set(dateValue, dateValuePosition, newDate);
            }
        },
        mouseEnterDay(item) {
            const { isRange, dateValue, dateValuePosition } = this.base;
            if (!isRange) return;
            if (item.isDisabled) return;
            if (item.position !== 'this') return;
            if (!dateValue.start && !dateValue.end) return;
            if (dateValuePosition === 'start' && dateValue.end) {
                this.fakeStart = item.value;
            } else if (dateValuePosition === 'end' && dateValue.start) {
                this.fakeEnd = item.value;
            }
        },
        mouseLeaveDay() {
            this.fakeEnd = null;
            this.fakeStart = null;
        },
    },
};
</script>

<style lang="less">
.am-date-day-panel {
    width: 288px;
    &__item {
        width: calc(100% / 7);
        height: 30px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &-cell {
            width: 24px;
            height: 24px;
            position: relative;
            span {
                width: 100%;
                height: 100%;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                background: #fff;
                border-radius: 2px;
                position: relative;
                z-index: 10;
            }
            &:before {
                content: '';
                height: 100%;
                position: absolute;
                width: 20px;
                left: -18px;
                box-sizing: border-box;
                background: #fff;
                z-index: 3;
            }
            &:after {
                content: '';
                height: 100%;
                position: absolute;
                width: 20px;
                right: -18px;
                box-sizing: border-box;
                background: #fff;
                z-index: 3;
            }
            &--prev, &--next {
                color: #bbb;
                cursor: default;
                &:before,&:after {
                    background: #fff;
                    z-index: 3;
                }
            }
            &--start {
                span {
                    background: var(--primary);
                    color: #fff;
                }
                &:after {
                    background: #e0e8f7;
                    z-index: 1;
                }
            }
            &--end {
                &:before {
                    background: #e0e8f7;
                    z-index: 1;
                }
                span {
                    background: var(--primary);
                    color: #fff;
                }
            }
            &--startend {
                &:before,&:after {
                    background: #fff;
                    z-index: 4;
                }
                span {
                    background: var(--primary);
                    color: #fff;
                }
            }
            &--through {
                span {
                    background: #e0e8f7;
                }
                &:before, &:after {
                    background: #e0e8f7;
                }
            }
            &--disabled {
                cursor: not-allowed;
                span {
                    background: #f1f1f1;
                    color: #ccc;
                }
                &:after,&:before {
                    background: #f1f1f1;
                    z-index: 2;
                }
            }
            &--today {
                color: var(--primary);
            }
        }
        &:nth-child(7n+1) {
            .am-date-day-panel__item-cell {
                &:before {
                    display: none;
                }
            }
        }
        &:nth-child(7n) {
            .am-date-day-panel__item-cell {
                &:after {
                    display: none;
                }
            }
        }
        &:hover {
            .am-date-day-panel__item-cell {
                &:not(&--start):not(&--disabled):not(&--end):not(&--through):not(&--prev):not(&--next):not(&--startend) {
                    span {
                        background: #eee;
                        transition: background .2s;
                    }
                }
            }
        }
    }
}
</style>
