<template>
    <div class="am-pagination">
        <!-- 每页条数 -->
        <AmDropdown
            v-if="showPageSize"
            :placeholder="`每页${pageSize}条`"
            @change="changePageSize"
        >
            <AmDropdownItem
                v-for="item in pageSizeOptions"
                :key="item"
                :label="`每页${item}条`"
                :value="item"
            >
                每页{{ item }}条
            </AmDropdownItem>
        </AmDropdown>
        <!-- 上一页 -->
        <AmButton
            class="am-pagination-left"
            icon-name="left"
            :disabled="current <= 1"
            @click="clickPrev"
        />
        <!-- 页码 -->
        <AmButton
            class="am-pagination-number"
            :class="item === current ? 'active': ''"
            v-for="(item,index) in pagers"
            :key="index"
            @click="clickPager(item)"
        >
            <AmIcon name="ellipsis" v-if="item=='prev' || item==='next'"/>
            <span v-else>{{ item }}</span>
        </AmButton>
        <!-- 下一页 -->
        <AmButton
            class="am-pagination-right"
            icon-name="right"
            :disabled="current >= pagerTotal"
            @click="clickNext"
        />
    </div>
</template>

<script>
export default {
    name: 'AmPagination',
    props: {
        // 总数
        total: {
            type: Number,
            default: 0,
        },
        // 当前页码
        current: {
            type: Number,
            default: 1,
        },
        // 显示的分页个数
        pagerCount: {
            type: Number,
            default: 7,
        },
        // 每页条数
        pageSize: {
            type: Number,
            default: 20,
        },
        pageSizeOptions: {
            type: Array,
            default: () => [20, 40, 60],
        },
        // 显示分页数量
        showPageSize: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        pagers() {
            const { pagerCount } = this;
            const currentPage = Number(this.current);
            const halfPagerCount = (pagerCount - 1) / 2;
            const pageCount = Math.ceil(this.total / this.pageSize);

            let showPrevMore = false;
            let showNextMore = false;

            if (pageCount > pagerCount) {
                if (currentPage > pagerCount - halfPagerCount) {
                    showPrevMore = true;
                }

                if (currentPage < pageCount - halfPagerCount) {
                    showNextMore = true;
                }
            }

            let array = [1];
            if (showPrevMore && !showNextMore) {
                array.push('prev');
                const startPage = pageCount - (pagerCount - 3);
                for (let i = startPage; i < pageCount; i += 1) {
                    array.push(i);
                }
            } else if (!showPrevMore && showNextMore) {
                for (let i = 1; i <= pagerCount - 3; i += 1) {
                    array.push(i + 1);
                }
                array.push('next');
            } else if (showPrevMore && showNextMore) {
                array.push('prev');
                const p = Math.ceil((pagerCount - 5) / 2);
                const n = Math.floor((pagerCount - 5) / 2);
                for (let i = currentPage - p; i <= currentPage + n; i += 1) {
                    array.push(i);
                }
                array.push('next');
            } else {
                for (let i = 2; i < pageCount; i += 1) {
                    array.push(i);
                }
            }
            if (pageCount) array.push(pageCount);
            array = Array.from(new Set(array));
            return array;
        },
        // 页码总数
        pagerTotal() {
            const all = Math.ceil(this.total / this.pageSize);
            return all;
        },
    },
    methods: {
        clickPager(num) {
            let { current } = this;
            if (num === 'prev') {
                current -= Math.floor(this.pagerCount / 2);
            } else if (num === 'next') {
                current += Math.floor(this.pagerCount / 2);
            } else {
                current = num;
            }
            this.$emit('update:current', current);
        },
        clickPrev() {
            const current = this.current - 1;
            this.$emit('update:current', current);
        },
        clickNext() {
            const current = this.current + 1;
            this.$emit('update:current', current);
        },
        changePageSize(value) {
            this.$emit('update:current', 1);
            this.$emit('update:pageSize', value);
        },
    },
};
</script>

<style lang="less">
.am-pagination {
    display: flex;
    .am-button {
        margin-right: 5px;
    }
    // 左页码
    .am-pagination-left {
        padding: 0;
    }
    // 右页码
    .am-pagination-right {
        padding: 0;
    }
    // 页码
    .am-pagination-number {
        padding: 0;
        // 选中状态
        &.active {
            background: var(--primary);
            color: #fff;
            border: none;
        }
    }
}
</style>
