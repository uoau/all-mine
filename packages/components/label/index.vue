<template>
    <div
        class="am-label"
        :class="className">
        <div class="hd">
            {{ labelName }}
        </div>
        <div class="bd"><slot /></div>
    </div>
</template>

<script>
export default {
    name: 'AmLabel',
    props: {
        labelName: {
            type: String,
            default: '',
        },
        labelWidth: {
            type: String,
            default: '200',
        },
        position: {
            type: String,
            default: 'left',
        },
        required: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        className() {
            return {
                'am-label__top': this.position === 'top',
                'am-label__left': this.position === 'left',
                'am-label__right': this.position === 'right',
            };
        },
    },
};
</script>

<style lang="less" scoped>
.am-label {
    /* 默认样式 */
    >.hd {
        line-height: 30px;
    }
    >.bd {

    }
    /* 文字居上 */
    &.am-label__top {

    }

    /* 文字居左 */
    &.am-label__left {

    }

    /* 文字居右 */
    &.am-label__right {

    }
}
</style>
