<template>
    <div class="am-img-viewer">
        <AmMovieScreen
            v-bind="$attrs"
            v-on="$listeners"
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
                        class="am-img-viewer__img"
                        v-if="index === now"
                        :class="{
                            'is-original': item.isOriginal,
                        }"
                    >
                        <img
                            :src="item.url"
                            :style="item.style"
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
            <div class="am-img-viewer__control-bar">
                <AmIconButton icon-name="zoomin" @click="scaleImg('big')" mode="white-text"/>
                <AmIconButton icon-name="zoomout" @click="scaleImg('small')" mode="white-text" />
                <AmIconButton
                    :icon-name="dealedImgs[now].isOriginal ? 'compress' : 'expend'"
                    mode="white-text"
                    @click="originalImg"
                />
                <AmIconButton
                    icon-name="rotate-left"
                    mode="white-text"
                    @click="rotateImg('left')"
                />
                <AmIconButton
                    icon-name="rotate-right"
                    mode="white-text"
                    @click="rotateImg('right')"
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
        nowIndex: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            dealedImgs: [],
            now: 0,
            direction: 'left',
        };
    },
    computed: {
        nowImg() {
            return this.imgs[this.now];
        },
    },
    watch: {
        imgs: {
            immediate: true,
            deep: true,
            handler() {
                this.initImgs();
            },
        },
    },
    methods: {
        // 初始化图片
        initImgs() {
            const arr = [];
            this.imgs.forEach((item) => {
                const obj = {
                    url: '', // 图片链接
                    scale: 1, // 放大倍数
                    rotate: 0, // 旋转度数
                    isOriginal: false, // 原始图
                    style: { // 图片样式
                        transform: 'scale(1) rotate(0deg)',
                    },
                    ...item,
                };
                arr.push(obj);
            });
            this.dealedImgs = arr;
        },
        // 点击切换按钮
        clickSwitch(type) {
            const imgLen = this.dealedImgs.length;
            if (type === 'prev' && this.now > 0) {
                this.direction = 'left';
                this.now -= 1;
            } else if (type === 'next' && this.now < (imgLen - 1)) {
                this.direction = 'right';
                this.now += 1;
            }
        },
        // 缩放图片
        scaleImg(type) {
            const item = this.dealedImgs[this.now];
            if (type === 'big') {
                item.scale += 0.2;
            } else if (type === 'small') {
                item.scale -= 0.2;
            }
            item.style.transform = `scale(${item.scale}) rotate(${item.rotate}deg)`;
        },
        // 旋转图片
        rotateImg(type) {
            const item = this.dealedImgs[this.now];
            if (type === 'left') {
                item.rotate -= 90;
            } else if (type === 'right') {
                item.rotate += 90;
            }
            item.style.transform = `scale(${item.scale}) rotate(${item.rotate}deg)`;
        },
        // 原比例
        async originalImg() {
            const item = this.dealedImgs[this.now];
            item.isOriginal = !item.isOriginal;
            await this.$nextTick();
            item.roate = 0;
            item.scale = 1;
            item.style.transform = `scale(${item.scale}) rotate(${item.rotate}deg)`;
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
        justify-content: center;
        align-items: center;
        overflow: auto;
        img {
            max-width: 100%;
            max-height: 100%;
        }
        &.is-original {
            img {
                max-width: none;
                max-height: none;
            }
        }
    }
    // 切换过渡动画
    &--dir-left {
        .am-img-viewer__anime {
            &-enter-active, &-leave-active {
                transition: transform .5s, opacity .5s;
            }
            &-enter {
                transform: translateX(-160px);
                opacity: 0;
            }
            &-enter-to {
                transform: translateX(0px);
                opacity: 1;
            }
            &-leave {
                transform: translateX(0px);
                opacity: 1;
            }
            &-leave-to {
                transform: translateX(160px);
                opacity: 0;
            }
        }
    }
    &--dir-right {
        .am-img-viewer__anime {
            &-enter-active, &-leave-active {
                transition: transform .5s, opacity .5s;
            }
            &-enter {
                transform: translateX(160px);
                opacity: 0;
            }
            &-enter-to {
                transform: translateX(0px);
                opacity: 1;
            }
            &-leave {
                transform: translateX(0px);
                opacity: 1;
            }
            &-leave-to {
                transform: translateX(-160px);
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
