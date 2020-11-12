<template>
    <div class="am-table">
        <div style="display:none"><slot /></div>
        <div class="hd">
            <table>
                <thead>
                    <tr>
                        <th
                            v-for="(item,index) in columnData"
                            :key="index"
                            :style="{
                                width: item.width + 'px',
                            }">
                            <!-- slot th -->
                            <Cell :slot-fun="item.$scopedSlots.th" v-if="item.$scopedSlots.th"/>
                            <!-- checkbox th -->
                            <div class="cell" v-else-if="item.type === 'selection'"><AmCheckbox/></div>
                            <!-- 文字 th -->
                            <div class="cell" v-else>{{ item.label }}</div>
                        </th>
                        <th :style="'padding:0;width:'+scrollBarWidth+'px'"></th>
                    </tr>
                </thead>
            </table>
        </div>
        <div class="bd" :style="bdStyle" ref="bd">
            <table>
                <colgroup>
                    <col v-for="(item, index) in columnData" :key="index" :width="item.width"/>
                </colgroup>
                <tbody>
                    <tr v-for="(item1, index1) in data" :key="index1">
                        <td
                            v-for="(item2, index2) in columnData"
                            :key="index2"
                            :style="{
                                width: item1.width + 'px',
                            }">
                            <!-- slot td -->
                            <Cell :slot-fun="item2.$scopedSlots.default" :data="item1" v-if="item2.$scopedSlots.default"/>
                            <!-- checkbox td -->
                            <div class="cell" v-else-if="item2.type === 'selection'"><AmCheckbox v-model="item1.isSelected"/></div>
                            <!-- 文字 td -->
                            <div class="cell" v-else :style="cellStyle">{{ item1[item2.prop] }}</div>
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
        data: {
            type: Array,
            default: () => [],
        },
        // 高度
        height: {
            type: String,
        },
        // 对齐方式
        align: {
            type: String,
            default: 'left', // left center right
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
        // 检测宽度
    },
};
</script>

<style lang="less">
.am-table {
    width: 100%;
    >.hd {
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
    >.bd {
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
}
</style>
