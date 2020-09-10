<template>
    <div
        ref="ap"
        class="am-popover"
        :style='apStyle'
        v-show="apShow">
        <transition
            name="am-popover-pop-anime"
            @after-leave="onPopHide">
            <div class="pop" v-show="popShow" ref="pop" :style="popStyle">
                <slot />
            </div>
        </transition>
    </div>
</template>

<script>
import {
    getScrollBoxOfEl, observeElResize, offObserveElResize, getHiddenDomRect,
} from '../../utils/dom';

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
        // ap宽
        width: {
            type: Number,
        },
        // ap高
        height: {
            type: Number,
        },
        show: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            fatherScrollEls: [],
            ro: null,
            apShow: false,
            popShow: false,
            // ap定位
            x: 0,
            y: 0,
            // pop规格
            popOrigin: 'top',
            popWidth: 0,
            popHeight: 0,
        };
    },
    computed: {
        apStyle() {
            const obj = {};
            obj.transform = `translate(${this.x}px, ${this.y}px)`;
            return obj;
        },
        popStyle() {
            const obj = {};
            obj.width = `${this.popWidth}px`;
            obj.transformOrigin = this.popOrigin;
            if (this.height) {
                obj.height = `${this.popHeight}`;
            }
            return obj;
        },
    },
    watch: {
        show() {
            if (this.show) {
                // 开始监听
                this.apShow = true;
                this.startObserve();
                setTimeout(() => {
                    this.popShow = true;
                }, 0);
            } else {
                this.popShow = false;
                this.endObserve();
            }
        },
    },
    methods: {
        // 检查位置
        check() {
            this.thisWidth = '';
            this.$nextTick(() => {
                const popRect = getHiddenDomRect(this.$refs.pop);
                const linkRect = this.linkEl.getBoundingClientRect();
                const {
                    left, top, width, height,
                } = linkRect;
                const bottom = window.innerHeight - top - height;
                // 计算弹出层宽高
                this.popWidth = this.width || `${popRect.width < width ? width : popRect.width}`;
                this.popHeight = this.height || `${popRect.height}`;
                // 计算 x
                const leftX = left;
                const rightX = left - this.popWidth + width;
                if (this.xDirection === 'left') {
                    this.x = leftX;
                } else if (this.xDirection === 'right') {
                    this.x = rightX;
                }
                // 计算 y
                const topY = top - this.popHeight - 6;
                const bottomY = top + height + 6;
                if (this.yDirection === 'top') {
                    this.y = topY;
                } else if (this.yDirection === 'bottom') {
                    this.y = bottomY;
                } else if (this.yDirection === 'auto') {
                    // 上足下不足 走上
                    // console.log(this.popHeight 716, bottom 61, top 171);
                    if (bottom < this.popHeight && top > this.popHeight) {
                        this.y = topY;
                        this.popOrigin = 'bottom';
                    } else {
                        this.y = bottomY;
                        this.popOrigin = 'top';
                    }
                }
            });
        },
        // 启动监听
        startObserve() {
            this.check();
            this.fatherScrollEls = getScrollBoxOfEl(this.linkEl);
            this.fatherScrollEls.forEach((scrollBox) => {
                scrollBox.addEventListener('scroll', this.check);
            });
            // 窗口变化
            window.addEventListener('resize', this.check);
            this.ro = observeElResize(this.linkEl, this.check);
        },
        // 结束监听
        endObserve() {
            this.fatherScrollEls.forEach((scrollBox) => {
                scrollBox.removeEventListener('scroll', this.check);
            });
            window.removeEventListener('resize', this.check);
            offObserveElResize(this.linkEl, this.ro);
        },
        // 监听pop动画结束
        onPopHide() {
            this.apShow = false;
        },
    },
};
</script>

<style lang="less">
.am-popover {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 20;
    width: auto;
    >.pop {
        overflow: auto;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
        background: #fff;
        border-radius: 4px;
    }
}
.am-popover-pop-anime-enter-active {
    animation: am-popover-pop-in .2s;
}
.am-popover-pop-anime-leave-active {
    animation: am-popover-pop-in .2s reverse;
    animation-fill-mode: forwards;
}
@keyframes am-popover-pop-in {
    from {
        opacity: 0;
        transform: scaleY(.8);
    }
    to {
        opacity: 1;
        transform: scaleY(1);
    }
}
</style>
