<template>
    <div
        class='am-tooltip'
        :style='"transform: translate("+ left +"px,"+ top +"px);"'
        @click="onClick"
        @mouseenter="onMouseEnter()"
        @mouseleave="onMouseLeave()"
    >
        <slot ref="def"/>
        <transition
            name='am-tooltip-in'
            v-on:after-leave='afterLeave'>
            <div
                ref="tip"
                v-show='show'
                class='bd'
                :style='"transform: translate("+ tipX +","+ tipY +");"'>
                <i :class='direction'></i>
                <span>{{ content }}</span>
            </div>
        </transition>
    </div>
</template>

<script>
import { getScrollBoxOfEl } from '../../utils/dom';

export default {
    props: {
        // 触发方式
        trigger: {
            type: String,
            default: 'hover',
        },
        // 气泡位置
        direction: {
            type: String,
            default: 'top', // left\top\right\bottom
        },
        // tooltip类
        tooltipClass: {
            type: String,
            default: '',
        },
        // 风格
        themme: {
            type: String,
            default: '',
        },
        // 禁用
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            show: false,
            el: '',
            fatherScrollEls: [],
            direction: 'right',
            content: 'tooltip',
            // 原点的坐标
            left: 0,
            top: 0,
            // 黑色块的偏移
            tipX: '',
            tipY: '',
            tipWidth: '',
            tipHeight: '',
        };
    },
    mounted() {
        this.check();
        if (this.direction === 'left') {
            this.tipX = 'calc(-100% - 10px)';
            this.tipY = '-50%';
        } else if (this.direction === 'right') {
            this.tipX = '10px';
            this.tipY = '-50%';
        } else if (this.direction === 'top') {
            this.tipX = '-50%';
            this.tipY = 'calc(-100% - 10px)';
        } else if (this.direction === 'bottom') {
            this.tipX = '-50%';
            this.tipY = '10px';
        }
        // 监听滚动调整位置
        this.fatherScrollEls = getScrollBoxOfEl(this.el);
        this.fatherScrollEls.forEach((scrollBox) => {
            scrollBox.addEventListener('scroll', this.check);
        });
    },
    methods: {
        check() {
            const rect = this.el.getBoundingClientRect();
            const { width, height } = rect;
            let { left, top } = rect;
            switch (this.direction) {
            case 'left':
                top += 0.5 * height;
                break;
            case 'right':
                left += width;
                top += 0.5 * height;
                break;
            case 'top':
                left += 0.5 * width;
                break;
            case 'bottom':
                left += 0.5 * width;
                top += height;
                break;
            default: break;
            }
            this.left = left;
            this.top = top;
        },
        afterLeave() {
            this.fatherScrollEls.forEach((scrollBox) => {
                scrollBox.removeEventListener('scroll', this.check);
            });
            this.remove();
        },
        remove() {
            this.$el.remove();
            this.$destroy(true);
        },
        close() {
            this.show = false;
        },

        // 监听点击
        onClick() {

        },

        // 监听
        onMouseEnter(isDirectiveCall) {
            if (this.isDirective && !isDirectiveCall) return;
            if (this.trigger !== 'hover') return;
            this.clearTimer();
            this.enterTimer = window.setTimeout(() => this.switchState(true), this.mouseEnterDelay);
        },
        onMouseLeave(isDirectiveCall) {
            if (this.isDirective && !isDirectiveCall) return;
            if (this.trigger !== 'hover') return;
            this.clearTimer();
            if (this.popupShow) {
                this.leaveTimer = window.setTimeout(() => this.switchState(false), this.mouseLeaveDelay);
            }
        },
    },
};
</script>

<style lang="less">
.am-tooltip {
    position: fixed;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    z-index: 99;
    .bd {
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
            z-index: 1;
            &.left {
                top: 0;
                bottom: 0;
                margin: auto;
                right: -2px;
            }
            &.right {
                top: 0;
                bottom: 0;
                margin: auto;
                left: -2px;
            }
            &.top {
                left:0;
                right:0;
                margin:auto;
                bottom:-2px;
            }
            &.bottom {
                left:0;
                right:0;
                margin:auto;
                top:-2px;
            }
        }
        span {
            padding: 3px 5px;
            word-break: break-all;
            border-radius: 2px;
            font-size: 14px;
            line-height: 1.6;
            color: #fff;
            background: #333;
            display: inline-block;
            white-space: nowrap;
            position: relative;
            z-index: 2;
        }
    }
    .am-tooltip-in-leave-active {
        animation: am-tooltip-in .2s reverse;
    }
    @keyframes am-tooltip-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
}
</style>
