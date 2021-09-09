<template>
    <div
        class="am-popup"
    >
        <!-- 遮掩层 -->
        <transition name="mask-anime">
            <div
                class="am-popup__mask"
                v-show="show"
                @click="clickMask"
                :style="'z-index:'+zIndex"
            ></div>
        </transition>
        <!-- 主体 -->
        <transition
            name="popup-anime"
            v-on:after-leave="afterLeave"
        >
            <div
                class="am-popup__popup"
                :style="popupStyle"
                v-show="show"
            >
                <AmIconButton
                    v-if="showCloseBtn"
                    class="am-popup__close"
                    icon-name="close"
                    mode="text"
                    icon-size="16"
                    @click="close"
                />
                <div class="am-popup__hd" v-if="$slots.hd || title">
                    <div class="am-popup__title" v-if="title">{{ title }}</div>
                    <slot name="hd"/>
                </div>
                <div class="am-popup__bd">
                    <slot />
                </div>
                <div class="am-popup__ft" v-if="$slots.ft">
                    <slot name="ft" />
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'AmPopup',
    props: {
        // 显示
        show: {
            type: Boolean,
            default: true,
        },
        // 遮掩层
        mask: {
            type: Boolean,
            default: false,
        },
        // 标题
        title: {
            type: String,
            default: '',
        },
        // 关闭按钮
        showCloseBtn: {
            type: Boolean,
            default: false,
        },
        // 宽度
        width: {
            type: String,
            default: '',
        },
        // 高度
        height: {
            type: String,
            default: '',
        },
        // 点击mask关闭
        maskClose: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            zIndex: 100,
        };
    },
    computed: {
        popupStyle() {
            return {
                width: this.width,
                height: this.height,
                zIndex: this.zIndex,
            };
        },
    },
    watch: {
        show() {
            window.AMPOPINDEX = window.AMPOPINDEX ? window.AMPOPINDEX + 1 : 100;
            this.zIndex = window.AMPOPINDEX;
        },
    },
    mounted() {
        document.body.appendChild(this.$el);
    },
    methods: {
        close() {
            this.$emit('update:show', false);
        },
        afterLeave() {
            this.$emit('after-leave', this);
        },
        clickMask() {
            if (this.maskClose) {
                this.close();
            }
        },
    },
};
</script>

<style lang="less">
.am-popup {
    // 阴影
    &__mask {
        position: fixed;
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, .2);
        &.mask-anime-enter-active, &.mask-anime-leave-active {
            transition: opacity .3s;
        }
        &.mask-anime-enter, &.mask-anime-leave-to {
            opacity: 0;
        }
    }
    &__popup {
        width: 480px;
        max-height: calc(100% - 80px);
        background: #fff;
        overflow: auto;
        position: fixed;
        top:50%;
        left: 50%;
        transform: translate(-50%, calc(-50% - 50px));
        display: flex;
        flex-direction: column;
        &.popup-anime-enter-active, &.popup-anime-leave-active {
            transition: transform .3s, opacity .3s;
        }
        &.popup-anime-enter, &.popup-anime-leave-to {
            transform: translate(-50%, calc(-50% - 70px));
            opacity: 0;
        }
    }

    &__hd {

    }
    &__title {
        margin: auto;
        font-size: 16px;
        font-weight: bold;
        display: flex;
        align-items: center;
        padding: 24px 24px 0 24px;
    }
    &__close {
        position: absolute;
        right: 10px;
        top: 10px;
        margin: auto;
        z-index: 10;
    }
    &__bd {
        flex: 1;
        padding: 24px;
        padding-bottom: 24px;
    }
    &__ft {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 16px 24px;
        padding-top: 0;
        >.am-button {
            margin-left: 8px;
        }
    }
}
</style>
