<template>
    <div class="am-date-time-panel">
        <div class="am-date-time-panel__hd">
            {{ showTime }}
        </div>
        <div class="am-date-time-panel__bd">
            <!-- 时分秒列 -->
            <div
                class="am-date-time-panel__column"
                v-for="(column,columnIndex) in columns"
                :ref="column.type"
                :key="columnIndex"
                @mousewheel="columnMousewheel"
            >
                <!-- 时分秒格子 -->
                <div
                    class="am-date-time-panel__cell"
                    v-for="(item,index) in column.list"
                    :class="item.class"
                    :key="index"
                    @click="clickCell(column.type,item)"
                >
                    {{ item.label }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import { scrollTo } from '../../../utils/dom';

export default {
    data() {
        return {
            // 是否展示滚动动画
            showScrollAnime: true,
            // 类型数组
            typeArr: [{
                key: 'hour',
                number: 24,
            },
            {
                key: 'minute',
                number: 60,
            }, {
                key: 'second',
                number: 60,
            }],
        };
    },
    inject: ['base'],
    computed: {
        cells() {
            const res = {};
            const { typeArr } = this;
            const {
                dateValue, dateValuePosition, nowSelectDate, domReady, disabledTime,
            } = this.base;
            const dateStart = dateValue.start;
            const dateEnd = dateValue.end;
            // const isTimeRange = type === 'dayTimeRange';
            typeArr.forEach((type) => {
                const arr = '1'.repeat(type.number - 1).split('1').map((i, index) => {
                    // 值
                    const num = index;
                    const label = (num < 10 ? `0${index}` : `${index}`);
                    const date = nowSelectDate ? dayjs(nowSelectDate)[type.key](num) : null;
                    let isSelected = false;
                    let isDisabled = false;
                    if (date && domReady) {
                        isDisabled = (dateStart && dateValuePosition === 'end' && date.endOf(type.key) < dateStart)
                        || (dateEnd && dateValuePosition === 'start' && date.startOf(type.key) > dateEnd);
                    }

                    // 日期选中
                    if (!nowSelectDate || !domReady) {
                        isSelected = false;
                    } else if (type.key === 'hour') {
                        isSelected = dayjs(nowSelectDate).$H === num;
                    } else if (type.key === 'minute') {
                        isSelected = dayjs(nowSelectDate).$m === num;
                    } else {
                        isSelected = dayjs(nowSelectDate).$s === num;
                    }

                    if (isSelected) {
                        this.$nextTick(() => {
                            if (!this.showScrollAnime) {
                                // 直接跳到目标点
                                this.$refs[type.key][0].scrollTop = (index) * 30;
                            } else {
                                // 滚动到目标点
                                scrollTo({
                                    scrollEl: this.$refs[type.key][0],
                                    y: (index) * 30,
                                    speed: 1.5,
                                    minTime: 100,
                                    maxTime: 300,
                                });
                            }
                        });
                    }

                    // 判断禁用情况
                    // if (nowSelectDate && disabledTime) {
                    //     const re
                    //     // const result = disabledTime(nowSelectDate.startOf('day'),)
                    // }

                    return {
                        num,
                        label,
                        date,
                        isSelected,
                        class: {
                            'am-date-time-panel__cell--selected': isSelected,
                            'am-date-time-panel__cell--disabled': isDisabled,
                        },
                    };
                });
                res[type.key] = arr;
            });
            return res;
        },
        columns() {
            const { cells } = this;
            return [{
                type: 'hour',
                list: cells.hour,
            }, {
                type: 'minute',
                list: cells.minute,
            }, {
                type: 'second',
                list: cells.second,
            }];
        },
        showTime() {
            const { nowSelectDate } = this.base;
            if (!nowSelectDate) return '';
            return dayjs(nowSelectDate).format('HH:mm:ss');
        },
        dateValuePosition() {
            return this.base.dateValuePosition;
        },
        nowSelectDate() {
            return this.base.nowSelectDate;
        },
        domReady() {
            return this.base.domReady;
        },
    },
    watch: {
        dateValuePosition() {
            // 监听切换输入位置
            const { nowSelectDate } = this.base;
            const { typeArr } = this;
            this.showScrollAnime = false;
            if (!nowSelectDate) {
                typeArr.forEach((type) => {
                    this.$nextTick(() => {
                        this.$refs[type.key][0].scrollTop = 0;
                    });
                });
            }
        },
    },
    methods: {
        clickCell(type, timeItem) {
            this.showScrollAnime = true;
            const arr = ['hour', 'minute', 'second'];
            const {
                nowSelectDate, dateValue, dateValuePosition,
            } = this.base;
            // 赋值
            arr.forEach((key) => {
                if (key === type) {
                    const date = nowSelectDate ? dayjs(nowSelectDate) : dayjs().startOf('day');
                    let newValue = date[key](timeItem.num).valueOf();
                    // 设置start值时，必须小于end值
                    if (dateValuePosition === 'start' && dateValue.end && newValue > dateValue.end) {
                        newValue = dateValue.end;
                    }
                    // 设置end值时，必须大于start值
                    if (dateValuePosition === 'end' && dateValue.start && newValue < dateValue.start) {
                        newValue = dateValue.start;
                    }
                    this.base.dateValue[dateValuePosition] = newValue;
                }
            });
        },
        columnMousewheel(e) {
            const target = e.target.classList.contains('am-date-time-panel__column') ? e.target : e.target.parentElement;
            const scrollBoxHeight = target.scrollHeight;
            const scrollBoxTop = target.scrollTop;
            const clientBoxHeight = target.clientHeight;
            if (e.deltaY > 0) {
                // 下滚
                if (scrollBoxHeight <= scrollBoxTop + clientBoxHeight) {
                    e.preventDefault();
                }
            } else if (scrollBoxTop <= 0) {
                e.preventDefault();
            }
        },
    },
};
</script>

<style lang="less">
.am-date-time-panel {
    display: flex;
    flex-direction: column;
    border-left: 1px solid var(--border);
    height: 100%;
    &__hd {
        height: 40px;
        border-bottom: 1px solid var(--border);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
    }
    &__bd {
        flex: 1;
        display: flex;
    }
    &__column {
        width: 40px;
        height: 210px;
        border-right: 1px solid var(--border);
        overflow: hidden;
        padding-top: 30px;
        padding-bottom: 150px;
        &:last-child {
            border-right: none;
        }
        &:hover {
            overflow: auto;
            .am-date-time-panel__cell {
                padding-left: 4px;
            }
        }
        &::-webkit-scrollbar {
            width : 4px;
        }
        &::-webkit-scrollbar-thumb {
            background: #666;
            border-radius: 2px;
        }
        &::-webkit-scrollbar-track {
            // background: #2b2b2b;
        }
    }
    &__cell {
        width: 100%;
        height: 30px;
        font-size: 14px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: background .2s;
        &--selected {
            background: #e0e8f7;
            color: var(--primary);
        }
        &--disabled {
            cursor: not-allowed;
            background: #f1f1f1;
            color: #ccc;
        }
        &:hover&:not(&--selected):not(&--disabled){
            background: #f7f7f7;
            cursor: pointer;
        }
    }

}
</style>
