<template>
    <div
        class="am-fixed-bottom-bar"
        ref="fixedBar"
        :style="fixedBarStyle"
    >
        <slot />
    </div>
</template>

<script>
import { observeElResize, offObserveElResize, getScrollBoxOfEl } from '../../utils/dom';

export default {
    name: 'AmFixedBottomBar',
    data() {
        return {
            ro: null,
            fatherEl: null,
            fatherScrollEls: [],

            width: '',
            left: '',
        };
    },
    computed: {
        fixedBarStyle() {
            return {
                width: this.width,
                left: this.left,
            };
        },
    },
    destroyed() {
        // 清除监听父元素变化
        if (this.ro && this.fatherEl) {
            offObserveElResize(this.fatherEl, this.ro);
        }
        // 清除页面滚动监听
        if (this.fatherScrollEls.length) {
            this.fatherScrollEls.forEach((scrollBox) => {
                scrollBox.removeEventListener('scroll', this.checkScroll);
            });
        }
    },
    mounted() {
        const fatherEl = this.$refs.fixedBar.parentElement;
        this.fatherEl = fatherEl;
        // 监听父元素变化
        this.ro = observeElResize(fatherEl, this.observeFatherEl);
        this.checkScroll();
        // 监听滚动
        // 找出父级所处的滚动视图
        this.fatherScrollEls = getScrollBoxOfEl(fatherEl);
        this.fatherScrollEls.forEach((scrollBox) => {
            scrollBox.addEventListener('scroll', this.checkScroll);
        });
    },
    methods: {
        observeFatherEl() {
            this.width = `${this.fatherEl.offsetWidth}px`;
        },
        checkScroll() {
            const { left } = this.fatherEl.getBoundingClientRect();
            this.left = `${left}px`;
        },
    },
};
</script>

<style lang="less">
.am-fixed-bottom-bar {
    position: fixed;
    bottom: 0;
    transition: left .05s;
}
</style>
