<template>
    <div class="am-pagination">
        <!-- 每页条数 -->
        <AmDropdown
            :placeholder="`每页${pageSize}条`"
            update-placeholder
        >
            <AmDropdownItem
                v-for="item in pageSizeOptions"
                :key="item"
                :label="`每页${item}条`"
            >
                每页{{ item }}条
            </AmDropdownItem>
        </AmDropdown>
        <!-- 上一页 -->
        <AmButton icon="left"/>
        <!-- 页码 -->
        <AmButton
            v-for="item in pagers" :key="item"
            :class="" 
            @click="clickPager(item)" >
            <AmIcon name="ellipsis" v-if="item=='prev' || item==='next'"/>
            <span v-else>{{ item }}</span>
        </AmButton>
        <!-- 下一页 -->
        <AmButton icon="right"/>
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
                const startPage = pageCount - (pagerCount - 2);
                array.push('prev');
                for (let i = startPage; i < pageCount; i += 1) {
                    array.push(i);
                }
            } else if (!showPrevMore && showNextMore) {
                for (let i = 2; i < pagerCount; i += 1) {
                    array.push(i);
                }
                array.push('next');
            } else if (showPrevMore && showNextMore) {
                array.push('prev');
                const offset = Math.floor(pagerCount / 2) - 1;
                for (let i = currentPage - offset; i <= currentPage + offset; i += 1) {
                    array.push(i);
                }
                array.push('next');
            } else {
                for (let i = 2; i < pageCount; i += 1) {
                    array.push(i);
                }
            }
            array.push(pageCount);
            array = Array.from(new Set(array));
            return array;
        },
    },
    methods: {
        clickPager(num) {
            if (num === 'prev') {
                this.current -= (this.pagerCount - 2);
            } else if (num === 'next') {
                this.current += (this.pagerCount - 2);
            } else {
                this.current = num;
            }
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
}
</style>
