<template>
    <transition
        name="am-loading-anime"
    >
        <div class="am-loading" v-if="realShow">
            <svg
                class="spinner"
                width="36px"
                height="36px"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    class="path2"
                    fill="none"
                    stroke-width="2"
                    stroke-linecap="round"
                    cx="18"
                    cy="18"
                    r="15"
                >
                </circle>
                <circle
                    class="path"
                    fill="none"
                    stroke-width="2"
                    stroke-linecap="round"
                    cx="18"
                    cy="18"
                    r="15"
                >
                </circle>
            </svg>
        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            realShow: false,

            canClose: false,
            timer: null,
        };
    },
    watch: {
        show() {
            if (this.show) {
                // 显示
                this.realShow = true;
                if (this.timer) {
                    clearTimeout(this.timer);
                }
                this.timer = setTimeout(() => {
                    this.canClose = true;
                    if (!this.show) {
                        this.realShow = false;
                        this.canClose = false;
                    }
                }, 600);
            } else if (this.canClose) {
                this.realShow = false;
                this.canClose = false;
            }
        },
    },
};
</script>

<style lang="less">
.am-loading {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 32px;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    opacity: 1;
    z-index: 999;
    .spinner {
        margin-bottom: 8px;
        .path {
            stroke: var(--primary);
            transform-origin: center;
            position: relative;
            animation: dash 1s linear infinite;
            stroke-dasharray: 20, 80;
            stroke-dashoffset: 0;
        }
        .path2 {
            stroke: var(--light-bg);
            transform-origin: center;
            position: relative;
        }
    }
    > span {
        font-size: 14px;
    }
}

.am-loading-anime-enter-active {
    transition:  opacity 0s;
}
.am-loading-anime-leave-active {
    transition:  opacity .5s;
}
.am-loading-anime-enter, .am-loading-anime-leave-to {
    opacity: 0;
}
@keyframes dash {
    0% {
        // stroke-dashoffset: 45;
        transform: rotate(0deg);
    }
    50% {
        // stroke-dashoffset: 12;
        transform: rotate(180deg);
        opacity: 1;
    }
    100% {
        // stroke-dashoffset: 45;
        transform: rotate(360deg);
    }
}
</style>
