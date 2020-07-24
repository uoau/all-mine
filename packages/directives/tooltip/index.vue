<template>
    <div class='am-tooltip'>
        <transition
            name='tooltip-anime'
            v-on:after-leave='afterLeave'>
            <div
                v-show='show'
                class='tooltip-body'
                :style='"transform: translate("+ translateX +","+ translateY +");"'>
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
            left: 0,
            top: 0,
            translateX: '',
            translateY: '',
        };
    },
    mounted() {
        if (this.direction === 'right') {
            this.translateX = `${this.left + 12}px`;
            this.translateY = `calc(-50% + ${this.top}px)`;
        } else if (this.direction === 'left') {
            this.translateX = 'calc(-100% - 12px)';
            this.translateY = `calc(-50% + ${this.top}px)`;
        } else if (this.direction === 'top') {
            this.translateX = `calc(-50% + ${this.left}px)`;
            this.translateY = 'calc(50% - 8px)';
        } else if (this.direction === 'bottom') {
            this.translateX = `calc(-50% + ${this.left}px)`;
            this.translateY = `${this.top + 12}px`;
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

<style lang="less" scoped>
.am-tooltip {
    .tooltip-body {
        position: absolute;
        left:0;
        top: 0;
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
                right: -5px;
            }
            &.right {
                top: 0;
                bottom: 0;
                margin: auto;
                left: -5px;
            }
            &.top {
                left:0;
                right:0;
                margin:auto;
                bottom:-5px;
            }
            &.bottom {
                left:0;
                right:0;
                margin:auto;
                top:-5px;
            }
        }
        span {
            padding:5px 10px;
            word-break:break-all;
            border-radius: 4px;
            font-size:15px;
            line-height:1.8;
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
