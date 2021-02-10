<!--
 * @Author: your name
 * @Date: 2021-01-27 17:34:35
 * @LastEditTime: 2021-01-28 15:37:10
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /all-mine/packages/components/date-format/index.vue
-->
<template>
    <div
        class="am-date-format"
        :class="{
            [`is-${layout}`] : layout,
        }"
    >
        <span
            v-for="(item,key) in dates"
            :key="key"
            :class="`am-date-format__${key}`"
        >
            {{ item }}
        </span>
    </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
    name: 'AmDateFormat',
    props: {
        value: {
            type: [String, Number, Date],
            default: new Date(),
        },
        dateFormat: {
            type: String,
            default: 'YYYY-MM-DD',
        },
        timeFormat: {
            type: String,
            default: 'HH:mm:ss',
        },
        layout: {
            type: String,
            default: '',
        },
    },
    computed: {
        dates() {
            const res = {};
            if (this.dateFormat) {
                res.date = dayjs(this.value).format(this.dateFormat);
            }
            if (this.timeFormat) {
                res.time = dayjs(this.value).format(this.timeFormat);
            }
            return res;
        },
    },
};
</script>

<style lang="less">
.am-date-format {
    &__date {
        color: var(--fcolor-1);
    }
    &__time {
        color: var(--fcolor-3);
    }

    &.is-compact {
        display: flex;
        flex-direction: column;
    }
}
</style>
