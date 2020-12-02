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
                    @after-enter="imgEnter"
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
            <div class="am-img-viewer__control-bar" v-if="showControl">
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
import { urlToImg } from '../../utils/browser';

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
    },
    data() {
        return {
            dealedImgs: [],
            nowIndex: 0,
            direction: 'left',
            showControl: false,
        };
    },
    watch: {
        initIndex: {
            immediate: true,
            deep: true,
            handler() {
                this.nowIndex = this.initIndex;
            },
        },
        imgs: {
            immediate: true,
            deep: true,
            handler() {
                this.initImgs();
            },
        },
    },
    mounted() {
        window.addEventListener('resize', this.onWindowResize);
    },
    methods: {
        // 初始化图片
        async initImgs() {
            const arr = [];
            this.imgs.forEach(async (item, index) => {
                const obj = {
                    url: '', // 图片链接
                    scale: 0.9, // 放大倍数
                    isOriginal: false, // 原始图
                    style: { // 图片样式
                        maxWidth: '90%',
                        maxHeight: '90%',
                    },
                    loaded: false, // 是否已加载
                    width: 0,
                    height: 0,
                    ...item,
                };
                arr.push(obj);
                const res = await urlToImg(obj.url);
                obj.width = res.clientWidth;
                obj.height = res.clientHeight;
                obj.loaded = true;
                if (index === this.nowIndex) {
                    this.checkShowControl();
                }
            });
            this.dealedImgs = arr;
        },
        // 点击切换按钮
        async clickSwitch(type) {
            const imgLen = this.dealedImgs.length;
            const nowItem = this.dealedImgs[this.nowIndex];
            if (type === 'prev' && this.nowIndex > 0) {
                // 先将大小缩放取消
                nowItem.scale = 0.9;
                nowItem.style = this.dealItemStyle(nowItem);
                await this.$nextTick();
                this.direction = 'left';
                this.nowIndex -= 1;
            } else if (type === 'next' && this.nowIndex < (imgLen - 1)) {
                nowItem.scale = 0.9;
                nowItem.style = this.dealItemStyle(nowItem);
                await this.$nextTick();
                this.direction = 'right';
                this.nowIndex += 1;
            }
        },
        // 缩放图片
        async scaleImg(type) {
            const el = this.$refs.img[0];
            const oldWH = [el.clientWidth, el.clientHeight];
            const item = this.dealedImgs[this.nowIndex];
            if (type === 'big') {
                item.scale += 0.2;
            } else if (type === 'small') {
                item.scale -= 0.2;
            }
            item.style = this.dealItemStyle(item);
            await this.$nextTick();
            const newWH = [el.clientWidth, el.clientHeight];
            if (type === 'big') {
                if (newWH[0] === oldWH[0]) {
                    item.scale -= 0.2;
                }
            } else if (type === 'small') {
                if (newWH[0] === oldWH[0]) {
                    item.scale += 0.2;
                }
            }
        },
        // 原比例
        async originalImg() {
            const item = this.dealedImgs[this.nowIndex];
            item.isOriginal = !item.isOriginal;
            await this.$nextTick();
            item.scale = 0.9;
            item.style = this.dealItemStyle(item);
        },
        dealItemStyle(item) {
            const style = {};
            style.maxHeight = `${item.scale * 100}%`;
            style.maxWidth = `${item.scale * 100}%`;
            return style;
        },
        // 监听窗口变化
        onWindowResize() {
            if (this.dealedImgs.length) {
                this.dealedImgs.forEach((item, index) => {
                    this.dealedImgs[index].scale = 0.9;
                    this.dealedImgs[index].style = this.dealItemStyle(item);
                });
            }
        },
        // 计算是否出现
        checkShowControl() {
            if (this.$refs.img && this.$refs.img.length) {
                console.log(2222);
                const el = this.$refs.img[0];
                const elbox = this.$refs.imgbox[0];
                console.log(el.clientHeight, elbox.clientHeight);
                if (el.clientHeight >= (elbox.clientHeight * 0.9 - 1)) {
                    this.showControl = true;
                } else {
                    this.showControl = false;
                }
            }
        },
        imgEnter() {
            console.log(12345);
            this.checkShowControl();
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
        overflow: auto;
        display: flex;
        img {
            max-width: 100%;
            max-height: 100%;
            margin: auto;
        }
        &.is-original {
            img {
                max-width: none!important;
                max-height: none!important;
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
