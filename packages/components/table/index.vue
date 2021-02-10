<template>
    <div class="am-table">
        <div style="display:none"><slot /></div>
        <div class="am-table__hd">
            <table>
                <thead>
                    <tr>
                        <th
                            v-for="(item,index) in columnData"
                            :key="index"
                            :style="{
                                width: item.width,
                            }"
                        >
                            <!-- slot th -->
                            <Cell :slot-fun="item.$scopedSlots.th" v-if="item.$scopedSlots.th"/>
                            <!-- checkbox th -->
                            <div
                                class="am-table__hd-cell"
                                v-else-if="item.type === 'selection'"
                            >
                                <AmCheckbox/>
                            </div>
                            <!-- 文字 th -->
                            <div class="am-table__th-cell" v-else>
                                {{ item.label }}
                                <!-- 排序 -->
                                <div
                                    v-if="item.sort"
                                    class="am-table__sort"
                                    :class="{
                                        ['is-asc']:
                                            sort.prop === item.prop &&
                                            sort.order === 'asc',
                                        ['is-desc']:
                                            sort.prop === item.prop &&
                                            sort.order === 'desc',
                                    }"
                                    @click="clickSort(item.prop)"
                                >
                                    <i></i><i></i>
                                </div>
                            </div>
                        </th>
                        <th :style="'padding:0;width:'+scrollBarWidth+'px'"></th>
                    </tr>
                </thead>
            </table>
        </div>
        <div class="am-table__bd" :style="bdStyle" ref="bd">
            <table>
                <colgroup>
                    <col
                        v-for="(item, index) in columnData"
                        :key="index"
                        :style="{
                            width: item.width,
                        }"
                    />
                </colgroup>
                <tbody>
                    <tr
                        v-for="(item1, index1) in data"
                        :key="index1"
                        :class="rowClass(item1)"
                        @click="clickRow(item1)"
                    >
                        <td
                            v-for="(item2, index2) in columnData"
                            :key="index2"
                            @click="clickCell(item1, item2)"
                        >
                            <!-- slot td -->
                            <Cell
                                :slot-fun="item2.$scopedSlots.default"
                                :data="item1"
                                v-if="item2.$scopedSlots.default"
                            />
                            <!-- checkbox td -->
                            <div
                                class="am-table__td-cell"
                                v-else-if="item2.type === 'selection'"
                            >
                                <AmCheckbox v-model="item1.isSelected"/>
                            </div>
                            <!-- 文字 td -->
                            <div
                                class="am-table__td-cell"
                                v-else
                                :style="cellStyle"
                            >{{ item1[item2.prop] }}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
// Cell组件
import { observeElResize } from '../../utils/dom';

const Cell = {
    name: 'Cell',
    props: {
        slotFun: null,
        data: null,
    },
    render(h) {
        return h('div', {
            attrs: {
                class: 'cell',
            },
        }, this.slotFun(this.data));
    },
};

export default {
    name: 'AmTable',
    components: {
        Cell,
    },
    props: {
        // 表格数据
        data: null,
        // 高度
        height: {
            type: String,
        },
        // 对齐方式
        align: {
            type: String,
            default: 'left', // left center right
        },
        // 行类
        rowClass: {
            type: Function,
            default: () => {},
        },
    },
    provide() {
        return {
            table: this,
        };
    },
    data() {
        return {
            // 栏组件
            columnData: [],
            // 滚动条宽度
            scrollBarWidth: 0,
            // 排序
            sort: {
                prop: '',
                order: '',
            },
        };
    },
    computed: {
        bdStyle() {
            return {
                height: this.height ? `${this.height}` : '',
                overflow: this.height ? 'auto' : '',
            };
        },
        cellStyle() {
            return {
                textAlign: this.align,
            };
        },
        allSelected() {
            return false;
        },
    },
    mounted() {
        observeElResize(this.$refs.bd.firstChild, () => {
            const beRect = this.$refs.bd.getBoundingClientRect();
            const tableRect = this.$refs.bd.firstChild.getBoundingClientRect();
            const scrollBarWidth = beRect.width - tableRect.width;
            this.scrollBarWidth = scrollBarWidth;
        });
    },
    methods: {
        // 点击排序
        clickSort(prop) {
            const arr = ['', 'asc', 'desc'];
            if (this.sort.prop && this.sort.prop !== prop) {
                this.sort.order = '';
            }
            this.sort.prop = prop;
            const index = arr.findIndex((i) => i === this.sort.order);
            const nextIndex = index + 1 > arr.length - 1 ? 0 : index + 1;
            this.sort.order = arr[nextIndex];
            this.$emit('sort-change', this.sort);
        },
        // 点击行
        clickRow(row) {
            this.$emit('row-click', row);
        },
        // 点击单元格
        clickCell(row, column) {
            this.$emit('cell-click', row, column);
        },
    },
};
</script>

<style lang="less">
.am-table {
    width: 100%;
    &__hd {
        >table {
            width: 100%;
            table-layout: fixed;
            >thead {
                >tr {
                    border-bottom: 1px solid var(--border);
                    >th {
                        padding: 16px;
                        color: #999;
                        font-size: 14px;
                        text-align: left;
                    }
                }
            }
        }
    }
    &__bd {
        >table {
            width: 100%;
            table-layout: fixed;
            >tbody {
                >tr {
                    border-bottom: 1px solid var(--border);
                    >td {
                        padding: 16px;
                        font-size: 14px;
                        text-align: left;
                    }
                }
            }
        }
    }

    &__th-cell {
        display: flex;
        align-items: center;
    }

    &__sort {
        position: relative;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        height: 16px;
        width: 20px;
        vertical-align: middle;
        cursor: pointer;
        overflow: initial;
        i {
            position: absolute;
            left: 5px;
            width: 0;
            height: 0;
            border: 4px solid transparent;
            &:first-child {
                border-bottom-color: #c0c4cc;
                top: -1px;
            }
            &:last-child {
                border-top-color: #c0c4cc;
                bottom: -1px;
            }
        }
        &.is-asc {
            i:first-child {
                border-bottom-color: #333;
            }
        }
        &.is-desc {
            i:last-child {
                border-top-color: #333;
            }
        }
    }
}
</style>
