<template>
    <div
        class="am-popup"
    >
        <transition name="mask-anime">
            <div class="mask" v-if="show" @click="close" :style="'z-index:'+zIndex"></div>
        </transition>
        <transition
            name="popup-anime"
            v-on:after-leave="afterLeave"
        >
            <div
                class="popup"
                :style="popupStyle"
                v-if="show"
            >
                <div class="hd">
                    <div class="title" v-if="title">{{ title }}</div>
                    <slot name="hd"/>
                    <AmButton class="close" icon="close" type="text" icon-size="16" @click="close" v-if="showCloseBtn"/>
                </div>
                <div class="bd">
                    <slot />
                </div>
                <div class="ft" v-if="$slots.ft">
                    <slot name="ft"/>
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
    methods: {
        close() {
            this.$emit('update:show', false);
        },
        afterLeave() {
            this.$emit('after-leave', this);
        },
    },
};
</script>

<style lang="less">
.am-popup {
    >.mask {
        position: fixed;
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, .2);
        &.mask-anime-enter-active, &.mask-anime-leave-active {
            transition: opacity .4s;
        }
        &.mask-anime-enter, &.mask-anime-leave-to {
            opacity: 0;
        }
    }
    >.popup {
        width: 400px;
        max-height: calc(100% - 80px);
        background: #fff;
        overflow: auto;
        position: fixed;
        top: 100px;
        left: 0;
        right: 0;
        margin: auto;
        display: flex;
        flex-direction: column;
        >.hd {
            >.title {
                height: 50px;
                margin: auto;
                font-size: 16px;
                font-weight: bold;
                height: 50px;
                display: flex;
                align-items: center;
                padding: 0 20px;
            }
            >.close {
                position: absolute;
                right: 10px;
                top: 10px;
                margin: auto;
            }
        }
        >.bd {
            flex: 1;
            padding: 32px;
            padding-bottom: 24px;
        }
        >.ft {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: 24px 32px;
            >.am-button {
                margin-left: 10px;
            }
        }
        &.popup-anime-enter-active, &.popup-anime-leave-active {
            transition: transform .4s, opacity .4s;
        }
        &.popup-anime-enter, &.popup-anime-leave-to {
            transform: translateY(-50px);
            opacity: 0;
        }
    }
}
</style>
