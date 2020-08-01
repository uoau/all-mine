<template>
    <transition
        name="am-popover-anime">
        <div
            ref="pop"
            class="am-popover"
            :style='apStyle'
            v-show="show">
            <div class="inner">
                <slot />
            </div>
        </div>
    </transition>
</template>

<script>
import { getScrollBoxOfEl, observeElResize } from '../../utils/dom';

export default {
    name: 'AmPopover',
    props: {
        linkEl: null, // 关联元素
        xDirection: {
            type: String,
            default: 'left',
        },
        yDirection: {
            type: String,
            default: 'auto',
        },
        width: {
            type: Number,
            default: 0,
        },
        height: {
            type: Number,
            default: 0,
        },
        show: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            fatherScrollEls: [],
            x: 0,
            y: 0,
            thisWidth: 0,
            thisHeight: 0,
        };
    },
    computed: {
        apStyle() {
            const obj = {};
            // obj.transform = `translate(${this.x}, ${this.y})`;
            obj.left = `${this.x}`;
            obj.top = `${this.y}`;
            obj.width = `${this.thisWidth}px`;
            if (this.height) {
                obj.height = `${this.thisHeight}px`;
            }
            return obj;
        },
    },
    mounted() {
        // 监听滚动调整位置
        this.check();
        this.fatherScrollEls = getScrollBoxOfEl(this.linkEl);
        this.fatherScrollEls.forEach((scrollBox) => {
            scrollBox.addEventListener('scroll', this.check);
        });
        window.addEventListener('resize', this.check);
        observeElResize(this.linkEl, this.check);
    },
    methods: {
        check() {
            const thisRect = this.$refs.pop.getBoundingClientRect();
            const linkRect = this.linkEl.getBoundingClientRect();
            const {
                left, top, width, height,
            } = linkRect;
            const bottom = window.innerHeight - top - height;
            // 计算弹出层宽高
            this.thisWidth = this.width || width;
            this.thisHeight = this.height || thisRect.height;
            // 计算 x
            const leftX = `${left}px`;
            const rightX = `${left - this.thisWidth + width}px`;
            if (this.xDirection === 'left') {
                this.x = leftX;
            } else if (this.xDirection === 'right') {
                this.x = rightX;
            }
            // 计算 y
            const topY = `${top - this.thisHeight - 6}px`;
            const bottomY = `${top + height + 6}px`;
            if (this.yDirection === 'top') {
                this.y = topY;
            } else if (this.yDirection === 'bottom') {
                this.y = bottomY;
            } else if (this.yDirection === 'auto') {
                // 上足下不足 走上
                if (bottom < this.thisHeight && top > this.thisHeight) {
                    this.y = topY;
                }
                // 否则走下
                else {
                    this.y = bottomY;
                }
            }
        },
    },
};
</script>

<style lang="less">
.am-popover {
    position: fixed;
    left: 0;
    top: 0;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    background: #fff;
    border-radius: 4px;
    z-index: 20;
    overflow: hidden;
    >.inner {
        overflow: auto;
        width: 100%;
        height: 100%;
    }
}
.am-popover-anime-enter-active {
    animation: am-popover-in .2s;
    transform-origin: top;
}
.am-popover-anime-leave-active {
    animation: am-popover-in .2s reverse;
    transform-origin: top;
    animation-fill-mode: forwards;
}
@keyframes am-popover-in {
    from {
        transform: scaleY(.7);
        opacity: 0;
    }
    to {
        transform: scaleY(1);
        opacity: 1;
    }
}
</style>
