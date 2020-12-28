<template>
    <div
        class="am-img-viewer"
        v-hotkey="keymap"
    >
        <AmMovieScreen
            v-bind="$attrs"
            v-on="$listeners"
            @after-leave="afterLeave"
        >
            <!-- 图片 -->
            <div
                class="am-img-viewer__imgs"
                :class="
                    direction === 'left'?
                    'am-img-viewer--dir-left':
                    'am-img-viewer--dir-right'
                "
            >
                <transition
                    name="am-img-viewer__anime"
                    v-for="(item,index) in dealedImgs"
                    :key="index"
                >
                    <div
                        ref="imgbox"
                        class="am-img-viewer__img"
                        v-if="index === nowIndex"
                        :class="{
                            'is-original': item.isOriginal,
                        }"
                    >
                        <img
                            :src="item.url"
                            :style="item.style"
                            ref="img"
                            @load="loadImg"
                        />
                    </div>
                </transition>
            </div>
            <!-- 左右切换 -->
            <AmIconButton
                class="am-img-viewer__left"
                icon-name="left"
                mode="black"
                size="big"
                v-if="dealedImgs.length >1"
                @click="clickSwitch('prev')"
            />
            <AmIconButton
                class="am-img-viewer__right"
                icon-name="right"
                mode="black"
                size="big"
                v-if="dealedImgs.length >1"
                @click="clickSwitch('next')"
            />
            <!-- 底部控制栏 -->
            <div class="am-img-viewer__control-bar" v-if="nowItem && nowItem.showControl">
                <AmIconButton
                    icon-name="zoomin"
                    @click="scaleImg('big')"
                    mode="white-text"
                />
                <AmIconButton
                    :icon-name="dealedImgs[nowIndex] &&
                        dealedImgs[nowIndex].isOriginal
                        ? 'compress' : 'expend'"
                    mode="white-text"
                    @click="originalImg"
                />
                <AmIconButton
                    icon-name="zoomout"
                    @click="scaleImg('small')"
                    mode="white-text"
                />
            </div>
        </AmMovieScreen>
    </div>
</template>

<script>
export default {
    name: 'AmImgViewer',
    props: {
        // 图片数组
        imgs: {
            type: Array,
            default: () => [],
        },
        // 当前顺序
        initIndex: {
            type: Number,
            default: 0,
        },
        // 图片初始化宽度
        initWidth: {
            type: Number,
        },
    },
    data() {
        return {
            dealedImgs: [],
            nowIndex: 0,
            direction: 'left',
        };
    },
    computed: {
        keymap() {
            return {
                left: {
                    keydown: this.prev,
                },
                right: {
                    keydown: this.next,
                },
                esc: {
                    keydown: this.close,
                },
            };
        },
        nowItem() {
            return this.dealedImgs[this.nowIndex];
        },
    },
    watch: {
        '$attrs.show': function () {
            if (this.$attrs.show) {
                this.initImgs();
            }
        },
        initIndex: {
            immediate: true,
            deep: true,
            handler() {
                this.nowIndex = this.initIndex;
            },
        },
        imgs() {
            this.initImgs();
        },
    },
    mounted() {
        window.addEventListener('resize', this.onWindowResize);
    },
    methods: {
        // 初始化图片列表
        async initImgs() {
            const arr = [];
            this.imgs.forEach(async (item) => {
                const obj = {
                    url: '', // 图片链接
                    initScaleX: '90%', // 初始最大宽度 '90%' '1000px'
                    initScaleY: '90%', // 初始最大高度 '80%' '1000px'
                    ...item,
                    isOriginal: false, // 原始图
                    loaded: false, // 是否已加载
                    showControl: true,
                };
                // 转换为px的最大宽度、最大高度
                this.resetImg(obj);
                arr.push(obj);
            });
            this.dealedImgs = arr;
        },
        // 加载图片
        async loadImg(e) {
            const imgEl = e.target;
            this.nowItem.loaded = true;
            // 初始宽高
            this.nowItem.width = imgEl.naturalWidth;
            this.nowItem.height = imgEl.naturalHeight;
            this.nowItem.showControl = ((this.nowItem.width - this.nowItem.initScaleXpx) > -1)
                || ((this.nowItem.height - this.nowItem.initScaleYpx) > -1);
        },
        // 点击切换按钮
        async clickSwitch(type) {
            const imgLen = this.dealedImgs.length;
            if (type === 'prev' && this.nowIndex > 0) {
                // 先将大小缩放取消
                this.resetImg(this.nowItem);
                await this.$nextTick();
                this.direction = 'left';
                this.nowIndex -= 1;
            } else if (type === 'next' && this.nowIndex < (imgLen - 1)) {
                this.resetImg(this.nowItem);
                await this.$nextTick();
                this.direction = 'right';
                this.nowIndex += 1;
            }
        },
        prev() {
            this.clickSwitch('prev');
        },
        next() {
            this.clickSwitch('next');
        },
        close() {
            this.$emit('update:show', false);
        },
        // 缩放图片
        async scaleImg(type) {
            const el = this.$refs.img[0];
            const oldWH = [el.clientWidth, el.clientHeight];
            let oneStepX = 0;
            let oneStepY = 0;
            const wCha = el.clientWidth - this.nowItem.initScaleXpx;
            const hCha = el.clientHeight - this.nowItem.initScaleYpx;
            // 变大 原和大 使用mode1
            // 变小 大 使用mode1
            // 变大 小  使用mode2
            // 变小 原和小 使用mode2
            if (
                ((wCha > -1 || hCha > -1) && type === 'big')
                || ((wCha > 0 || hCha > 0) && type === 'small')
            ) {
                oneStepX = (this.nowItem.width - this.nowItem.initScaleXpx) / 5;
                oneStepX = oneStepX > 100 ? oneStepX : 100;
                oneStepY = (this.nowItem.height - this.nowItem.initScaleYpx) / 5;
                oneStepY = oneStepY > 100 ? oneStepY : 100;
            } else {
                oneStepX = (this.nowItem.initScaleXpx) / 5;
                oneStepY = (this.nowItem.initScaleYpx) / 5;
            }
            if (type === 'big') {
                this.nowItem.scaleX += oneStepX;
                this.nowItem.scaleY += oneStepY;
            } else if (type === 'small') {
                this.nowItem.scaleX -= oneStepX;
                this.nowItem.scaleY -= oneStepY;
            }
            this.nowItem.style = this.dealItemStyle(this.nowItem);
            await this.$nextTick();
            // 放大后
            if (el.clientWidth === this.nowItem.width) {
                this.nowItem.isOriginal = true;
            } else {
                this.nowItem.isOriginal = false;
            }
            const newWH = [el.clientWidth, el.clientHeight];
            if (type === 'big') {
                if (newWH[0] === oldWH[0]) {
                    this.nowItem.scaleX -= oneStepX;
                    this.nowItem.scaleY -= oneStepY;
                    this.isOriginal = true;
                }
            } else if (type === 'small') {
                if (newWH[0] === oldWH[0]) {
                    this.nowItem.scaleX += oneStepX;
                    this.nowItem.scaleY += oneStepY;
                }
            }
            this.nowItem.style = this.dealItemStyle(this.nowItem);
        },
        // 原图大小
        async originalImg() {
            if (!this.nowItem.isOriginal) {
                this.nowItem.scaleX = this.nowItem.width; // 实际使用的最大宽度
                this.nowItem.scaleY = this.nowItem.height; // 实际使用的最大高度
                this.nowItem.style = this.dealItemStyle(this.nowItem);
                this.nowItem.isOriginal = true;
            } else {
                this.resetImg(this.nowItem);
                this.nowItem.isOriginal = false;
            }
        },
        // 恢复大小
        resetImg(item) {
            const obj = item;
            obj.initScaleXpx = obj.initScaleX ? parseFloat(obj.initScaleX) : null;
            obj.initScaleYpx = obj.initScaleY ? parseFloat(obj.initScaleY) : null;
            if (obj.initScaleX.indexOf('%') > -1) {
                obj.initScaleXpx = document.body.clientWidth
                        * (parseFloat(obj.initScaleX) / 100);
            }
            if (obj.initScaleY.indexOf('%') > -1) {
                obj.initScaleYpx = document.body.clientHeight
                        * (parseFloat(obj.initScaleY) / 100);
            }
            obj.scaleX = obj.initScaleXpx; // 实际使用的最大宽度
            obj.scaleY = obj.initScaleYpx; // 实际使用的最大高度
            obj.isOriginal = false;
            if (obj.loaded) {
                obj.showControl = ((obj.width - obj.initScaleXpx) > -1)
                || ((obj.height - obj.initScaleYpx) > -1);
            }
            obj.style = this.dealItemStyle(obj);
        },
        // 处理item样式
        dealItemStyle(item) {
            const style = {};
            style.maxWidth = `${item.scaleX}px`;
            style.maxHeight = `${item.scaleY}px`;
            return style;
        },
        // 监听窗口变化
        onWindowResize() {
            if (this.dealedImgs.length) {
                this.dealedImgs.forEach((item, index) => {
                    this.resetImg(this.dealedImgs[index]);
                });
            }
        },
        afterLeave() {
            this.dealedImgs = [];
        },
    },
};
</script>

<style lang="less">
.am-img-viewer {
    user-select: none;
    // 图片
    &__imgs {
        width: 100%;
        height: 100%;
        position: relative;
    }
    &__img {
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        display: flex;
        overflow: auto;
        img {
            max-width: initial;
            max-height: initial;
            margin: auto;
        }
        &.is-original {
            img {
            }
        }
    }
    // 切换过渡动画
    &--dir-left {
        .am-img-viewer__anime {
            &-enter-active, &-leave-active {
                transition: opacity .5s;
                img {
                     transition: transform .5s;
                }
            }
            &-enter {
                img {
                    transform: translateX(-160px);
                }
                opacity: 0;
            }
            &-enter-to {
                img {
                    transform: translateX(0px);
                }
                opacity: 1;
            }
            &-leave {
                img {
                    transform: translateX(0px);
                }
                opacity: 1;
            }
            &-leave-to {
                img {
                    transform: translateX(160px);
                }
                opacity: 0;
            }
        }
    }
    &--dir-right {
        .am-img-viewer__anime {
            &-enter-active, &-leave-active {
                transition: opacity .5s;
                img {
                     transition: transform .5s;
                }
            }
            &-enter {
                img {
                    transform: translateX(160px);
                }
                opacity: 0;
            }
            &-enter-to {
                img {
                    transform: translateX(0px);
                }
                opacity: 1;
            }
            &-leave {
                img {
                    transform: translateX(0px);
                }
                opacity: 1;
            }
            &-leave-to {
                img {
                    transform: translateX(-160px);
                }
                opacity: 0;
            }
        }
    }
    // 切换按钮
    &__left {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 24px;
        margin: auto;
    }
    &__right {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 24px;
        margin: auto;
    }
    // 控制栏
    &__control-bar {
        height: 48px;
        padding: 0 24px;
        border-radius: 24px;
        background: rgba(0,0,0,.7);
        position: absolute;
        left: 50%;
        bottom: 40px;
        margin: auto;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transform: translateX(-50%);
        .am-icon-button {
            margin-right: 8px;
            &:last-child {
                margin-right: 0;
            }
        }
    }
}
</style>
