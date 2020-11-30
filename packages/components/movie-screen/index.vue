<template>
    <transition
        name="am-movie-screen__anime"
        v-on:after-leave="afterLeave"
    >
        <div
            class="am-movie-screen"
            v-show="show"
        >
            <!-- 关闭按钮 -->
            <AmIconButton
                class="am-movie-screen__close-btn"
                icon-name="close"
                size="big"
                mode="black"
                @click="hide"
                v-if="showClose"
            />
            <!-- 主体内容 -->
            <slot />
        </div>
    </transition>
</template>

<script>
export default {
    name: 'AmMovieScreen',
    props: {
        // 显示
        show: {
            type: Boolean,
            default: true,
        },
        // 显示关闭按钮
        showClose: {
            type: Boolean,
            default: true,
        },
    },
    methods: {
        hide() {
            this.$emit('update:show', false);
            console.log(this.show);
        },
        afterLeave() {
            this.$emit('onhide');
        },
        clickCloseBtn() {
            this.hide();
        },
    },
};
</script>

<style lang="less">
.am-movie-screen {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    left: 0;
    top: 0;
    background: rgba(0,0,0,.4);
    &__anime {
        &-enter-active, &-leave-active {
            transition: opacity .4s;
        }
        &-enter, &-leave-to {
            opacity: 0;
        }
    }
    &__close-btn {
        position: absolute;
        right: 24px;
        top: 24px;
        z-index: 50;
    }

}
</style>
