<template>
    <div class="am-date-base">
        <div class="hd">
            <div>
                <AmButton icon="doubleleft" size="small" @click="clickHdBtn('prevyear')"></AmButton>
                <AmButton icon="left" size="small" @click="clickHdBtn('prevmonth')"></AmButton>
            </div>
            <div>
                <a v-if="nowView === 'years'">{{ `${years[0].num}年 - ${years[11].num}年` }}</a>
                <a v-if="nowView !== 'years'" @click="changeView('years')">{{ viewYear }}年</a>
                <a v-if="nowView === 'days'" @click="changeView('months')">{{ viewMonth+1 }}月</a>
            </div>
            <div>
                <AmButton icon="right" size="small" @click="clickHdBtn('nextmonth')"></AmButton>
                <AmButton icon="doubleright" size="small" @click="clickHdBtn('nextyear')"></AmButton>
            </div>
        </div>
        <div class="bd">
            <!-- 年视图 -->
            <div class="months-years-box" v-if="nowView === 'years'">
                <div
                    class="item"
                    v-for="(item,index) in years"
                    :key="index"
                    :class="item.class"
                    @click="selectYear(item)"
                >
                    <span>{{ item.num }}</span>
                </div>
            </div>
            <!-- 月视图 -->
            <div class="months-years-box" v-if="nowView === 'months'">
                <div
                    class="item"
                    v-for="(item,index) in months"
                    :key="index"
                    :class="item.class"
                    @click="selectMonth(item)"
                >
                    <span>{{ item.num }}月</span>
                </div>
            </div>
            <!-- 日视图 -->
            <div class="days-box" v-if="nowView === 'days'">
                <div class="item" v-for="(item,index) in dayNames" :key="index">{{ item }}</div>
                <div
                    class="item"
                    v-for="(item,index) in days"
                    :key="index"
                    :class="item.class"
                    @click="selectDay(item)"
                >
                    <span>{{ item.num }}</span>
                </div>
            </div>
        </div>
        <div class="ft">
            <AmButton size="small">今日</AmButton>
        </div>
        <div>选择日期：{{ selectedDate }}</div>
    </div>
</template>

<script>
import dayjs from 'dayjs';
// 常量
const dayNames = ['一', '二', '三', '四', '五', '六', '日'];

export default {
    props: {
        // 类型 years months days rangeyears rangemonths rangedays
        type: {
            type: Boolean,
            default: false,
        },
        // 可选范围
        during: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            dayNames,
            nowView: 'days', // 有years、months、days
            viewYear: 2020, // 视图的年
            viewMonth: 6, // 视图的月

            selectedDate: dayjs('2020-7-21'), // 选中的天
        };
    },
    computed: {
        years() {
            // 获取每12年
            const viewYearIndex = this.viewYear % 12 - 1;
            return new Array(12).fill(1).map((item, index) => {
                const num = this.viewYear + index - viewYearIndex;
                return {
                    num,
                    class: {
                        'is-active': num === this.viewYear,
                    },
                };
            });
        },
        months() {
            // 获取本年月份
            let i = 0;
            return new Array(12).fill(1).map(() => {
                i += 1;
                return {
                    num: i,
                    class: {
                        'is-active': i - 1 === this.viewMonth,
                    },
                };
            });
        },
        days() {
            // 获取本月天数(6*7)
            let firstDay = new Date(this.viewYear, this.viewMonth, 1).getDay() || 7; // 第一天是星期几
            firstDay -= 1;
            const prevMonthDays = new Date(this.viewYear, this.viewMonth, 0).getDate(); // 上个月天数
            const monthDays = new Date(this.viewYear, this.viewMonth + 1, 0).getDate(); // 本月的天数
            return new Array(6 * 7).fill(1).map((item, index) => {
                const day = {
                    num: 0,
                    position: '',
                    date: false,
                    class: {},
                };
                if (index < firstDay) {
                    // 上个月的
                    day.num = prevMonthDays + index - firstDay + 1;
                    day.position = 'prev';
                } else if (index >= firstDay && index < firstDay + monthDays) {
                    // 本月的
                    day.num = index - firstDay + 1;
                    day.position = 'this';
                } else {
                    // 下个月的
                    day.num = index - monthDays - firstDay + 1;
                    day.position = 'next';
                }
                day.date = dayjs(`${this.viewYear}-${this.viewMonth + 1}-${day.num}`);
                day.class = {
                    [`${day.position}-item`]: true,
                    'is-active': day.date.unix() === this.selectedDate.unix(),
                };
                return day;
            });
        },
    },
    methods: {
        // 操控视图
        clickHdBtn(type) {
            if (type === 'prevyear') {
                this.viewYear -= 1;
            } else if (type === 'prevmonth') {
                this.viewMonth -= 1;
            } else if (type === 'nextmonth') {
                this.viewMonth += 1;
            } else if (type === 'nextyear') {
                this.viewYear += 1;
            }
        },
        changeView(view) {
            this.nowView = view;
        },
        // 选择日期
        selectYear(item) {
            this.viewYear = item.num;
            // 选单年
            if (this.type === 'years') {
                return;
            }
            // 选区间年
            if (this.type === 'rangeyears') {
                return;
            }
            this.nowView = 'months';
        },
        selectMonth(item) {
            this.viewMonth = item.num - 1;
            // 选择单月
            if (this.type === 'months') {
                return;
            }
            // 选择区间月
            if (this.type === 'rangemonths') {
                return;
            }
            this.nowView = 'days';
        },
        selectDay(item) {
            if (item.position !== 'this') {
                return;
            }
            // 选择单天
            if (this.type === 'days') {

            }
            // 选择区间天
            if (this.type === 'rangedays') {

            }
            this.selectedDate = item.date;
        },
    },
};

</script>

<style lang="less">
.am-date-base {
    width: 280px;
    background: #fff;
    border: 1px solid var(--border);
    >.hd {
        display: flex;
        height: 40px;
        align-items: center;
        padding: 0 10px;
        border-bottom: 1px solid var(--border);
        justify-content: space-between;
        .am-button {

        }
    }
    >.bd {
        padding: 10px;
        .months-years-box {
            .item {
                width: calc(100% / 3);
                height: 30px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                span {
                    width: 50px;
                    height: 24px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 2px;
                }
                &.is-active {
                    span {
                        background: var(--primary);
                        color: #fff;
                    }
                }
            }
        }
        .days-box {
            .item {
                width: calc(100% / 7);
                height: 30px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                span {
                    width: 24px;
                    height: 24px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 2px;
                }
                &.prev-item, &.next-item {
                    color: #aaa;
                }
                &.this-item {
                    cursor: pointer;
                    &:hover {
                        span {
                            background: var(--light-bg);
                        }
                    }
                }
                &.is-active {
                    span {
                        background: var(--primary);
                        color: #fff;
                    }
                }
            }
        }
    }
    >.ft {
        height: 40px;
        display: flex;
        align-items: center;
        padding: 10px;
        border-top: 1px solid var(--border);
    }
}
</style>
