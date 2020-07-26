<template>
    <div
        class='am-tooltip'
        :style='"transform: translate("+ left +"px,"+ top +"px);"'>
        <transition
            name='tooltip-anime'
            v-on:after-leave='afterLeave'>
            <div
                ref="tip"
                v-show='show'
                class='tooltip-body'
                :style='"transform: translate("+ tipX +","+ tipY +");"'>
                <i :class='direction'></i>
                <span>{{ content }}</span>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            direction: 'right',
            content: 'tooltip',
            // 原点的坐标
            left: 0,
            top: 0,
            // 原元素的宽高
            elWidth: 0,
            elHeight: 0,
            // 黑色块的偏移
            tipX: '',
            tipY: '',
            tipWidth: '',
            tipHeight: '',
        };
    },
    mounted() {
        if (this.direction === 'left') {
            this.tipX = '-100%';
            this.tipY = '-50%';
        } else if (this.direction === 'right') {
            this.tipX = '0';
            this.tipY = '-50%';
        } else if (this.direction === 'top') {
            this.tipX = '-50%';
            this.tipY = '-100%';
        } else if (this.direction === 'bottom') {
            this.tipX = '-50%';
            this.tipY = '0';
        }
    },
    methods: {
        afterLeave() {
            this.remove();
        },
        remove() {
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
        },
        close() {
            this.show = false;
        },
    },
};
</script>

<style lang="less">
.am-tooltip {
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    .tooltip-body {
        left:0;
        top: 0;
        position: absolute;
        i {
            width:10px;
            height: 10px;
            background:#333;
            display: inline-block;
            position: absolute;
            transform: rotate(45deg);
            &.left {
                top: 0;
                bottom: 0;
                margin: auto;
                right: -3px;
            }
            &.right {
                top: 0;
                bottom: 0;
                margin: auto;
                left: -3px;
            }
            &.top {
                left:0;
                right:0;
                margin:auto;
                bottom:-3px;
            }
            &.bottom {
                left:0;
                right:0;
                margin:auto;
                top:-3px;
            }
        }
        span {
            padding:5px 10px;
            word-break:break-all;
            border-radius: 4px;
            font-size:14px;
            line-height:1.5;
            color: #fff;
            background:#333;
            display: inline-block;
            white-space: nowrap;
        }
    }
    .tooltip-anime-enter-active {
        animation: tooltip_in .2s;
    }
    .tooltip-anime-leave-active {
        animation: tooltip_in .2s reverse;
    }
    @keyframes tooltip_in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
}
</style>
