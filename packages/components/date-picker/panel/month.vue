<template>
    <div class="am-date-month-panel">
        <div
            class="am-date-month-panel__item"
            v-for="(item,index) in months"
            :key="index"
            @click="clickMonth(item)"
            @mouseenter="mouseEnterMonth(item)"
            @mouseleave="mouseLeaveMonth(item)"
        >
            <div
                class="am-date-month-panel__item-cell"
                :class="item.class"
            >
                <span>{{ item.label }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
    data() {
        return {
            fakeStart: null,
            fakeEnd: null,
        };
    },
    inject: ['base'],
    computed: {
        months() {
            const {
                viewYear, dateValue, dateValuePosition, type, disabledDate,
            } = this.base;
            const isMonthRange = type === 'monthRange';
            const { fakeStart, fakeEnd } = this;
            let dateStart = fakeStart || dateValue.start;
            if (dateStart) {
                dateStart = dayjs(dateStart).startOf('month').valueOf();
            }
            let dateEnd = fakeEnd || dateValue.end;
            if (dateEnd) {
                dateEnd = dayjs(dateEnd).startOf('month').valueOf();
            }
            // 获取本年月份
            return new Array(12).fill(1).map((item, index) => {
                // 数值
                const num = index + 1;
                const label = num < 10 ? `0${num} 月` : `${num} 月`;
                // 具体时间戳
                const date = dayjs().year(viewYear).month(num - 1).startOf('month');
                const value = date.valueOf();
                // 状态
                let {
                    isSelected, isStart, isEnd, isThrough, isDisabled,
                } = {};
                if (!isMonthRange) {
                    isSelected = dateStart && value === dayjs(dateStart).startOf('month').valueOf();
                } else {
                    isStart = dateStart && value === dayjs(dateStart).startOf('month').valueOf();
                    isEnd = dateEnd && value === dayjs(dateEnd).startOf('month').valueOf();
                    isThrough = dateStart && dateEnd && value > dateStart && value < dateEnd;
                    isDisabled = (dateStart && dateValuePosition === 'end' && value < dateStart)
                        || (dateEnd && dateValuePosition === 'start' && value > dateEnd);
                }
                // 日期限制
                let disabledMsg = '';
                const res = disabledDate(date.startOf('month'));
                if (res) {
                    isDisabled = true;
                    if (typeof (res) === 'string') {
                        disabledMsg = res;
                    }
                }

                return {
                    num,
                    label,
                    date,
                    value,
                    isDisabled,
                    disabledMsg,
                    class: {
                        'am-date-month-panel__item-cell--start': isStart,
                        'am-date-month-panel__item-cell--end': isEnd,
                        'am-date-month-panel__item-cell--startend': (isStart && isEnd) || isSelected,
                        'am-date-month-panel__item-cell--through': isThrough,
                        'am-date-month-panel__item-cell--disabled': isDisabled,
                    },
                };
            });
        },
    },
    methods: {
        clickMonth(monthItem) {
            if (monthItem.isDisabled) {
                return;
            }
            const { dateType, dateValue, dateValuePosition } = this.base;
            if (dateType === 'month') {
                this.base.$set(dateValue, dateValuePosition, monthItem.value);
                this.base.$emit('confirm-value');
            } else {
                this.base.viewMonth = monthItem.num;
                this.base.nowPanel = dateType;
            }
        },
        mouseEnterMonth(item) {
            const { isRange, dateValue, dateValuePosition } = this.base;
            if (!isRange) return;
            if (item.isDisabled) return;
            if (!dateValue.start && !dateValue.end) return;
            if (dateValuePosition === 'start') {
                this.fakeStart = item.value;
            } else if (dateValuePosition === 'end') {
                this.fakeEnd = item.value;
            }
        },
        mouseLeaveMonth() {
            this.fakeEnd = null;
            this.fakeStart = null;
        },
    },
};
</script>

<style lang="less">
.am-date-month-panel {
    width: 288px;
    &__item {
        width: calc(100% / 3);
        height: 40px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &-cell {
            width: 72px;
            height: 24px;
            position: relative;
            span {
                width: 100%;
                height: 100%;
                border-radius: 2px;
                background: #fff;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                position: relative;
                z-index: 10;
            }
            &:before {
                content: '';
                height: 100%;
                position: absolute;
                width: 28px;
                left: -26px;
                box-sizing: border-box;
                background: #fff;
                z-index: 3;
                pointer-events: none;
            }
            &:after {
                content: '';
                height: 100%;
                position: absolute;
                width: 28px;
                right: -26px;
                box-sizing: border-box;
                background: #fff;
                z-index: 3;
                pointer-events: none;
            }
            &--start {
                &:before {
                    background: #fff;
                    z-index: 4;
                }
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
                &:after {
                    background: #fff;
                    z-index: 4;
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
                &:after,&:before{
                    background: #f1f1f1;
                    z-index: 2;
                }
            }
        }
        &:nth-child(3n+1) {
            .am-date-month-panel__item-cell {
                &:before {
                    display: none;
                }
            }
        }
        &:nth-child(3n) {
            .am-date-month-panel__item-cell {
                &:after {
                    display: none;
                }
            }
        }
        &:hover {
            .am-date-month-panel__item-cell {
                &:not(&--start):not(&--disabled):not(&--end):not(&--through):not(&--startend){
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
