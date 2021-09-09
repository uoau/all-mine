<template>
    <div
        class='am-message'
    >
        <transition
            name='am-message__anime'
            v-on:after-leave='afterLeave'>
            <div
                class='am-message__body'
                :class="'am-message__body--'+type"
                :style="{
                    'z-index': zIndex,
                }"
                v-show='show'
            >
                <AmIcon
                    v-if="type"
                    :name="iconName"
                />
                <span>{{ content }}</span>
            </div>
        </transition>
    </div>
</template>

<script>
import popupManager from '../../mixins/popup/manager';

export default {
    name: 'AmMessage',
    data() {
        return {
            type: '',
            show: false,
            content: 'This is a toast.',
            duration: 2000,
            autoCloseTimer: null,
            zIndex: 0,
        };
    },
    created() {
        this.zIndex = popupManager.getZIndex();
    },
    computed: {
        iconName() {
            let iconName = '';
            switch (this.type) {
            case 'success': iconName = 'success-fill'; break;
            case 'fail': iconName = 'fail-fill'; break;
            case 'info': iconName = 'warn-fill'; break;
            case 'warning': iconName = 'warn-fill'; break;
            default: break;
            }
            return iconName;
        },
    },
    mounted() {
        this.autoCloseTimer = setTimeout(() => {
            this.show = false;
        }, this.duration);
    },
    methods: {
        afterLeave() {
            this.remove();
        },
        remove() {
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
            this.removeFromInstances();
        },
        close() {
            if (this.autoCloseTimer) {
                clearTimeout(this.autoCloseTimer);
                this.autoCloseTimer = null;
            }
            this.show = false;
        },
    },
};
</script>

<style lang="less">
.am-message {
    &__body {
        display:inline-flex;
        align-items:center;
        justify-content:center;
        position:fixed;
        top: 0;
        left: 50%;
        transform: translate(-50%, calc(12vh));
        background: #fff;
        color:#333;
        border-radius:4px;
        max-width:480px;
        min-width:240px;
        min-height:48px;
        padding:4px 24px;
        word-break:break-all;
        font-size:14px;
        line-height:20px;
        border:1px solid #8AD0FF;
        color: var(--info);
        background: #E6F7FF;
        .am-icon {
            font-size: 28px;
            margin-right: 4px;
        }
        &--success {
            border:1px solid #7ED9B0;
            color: var(--success);
            background: #E3FCEF;
        }
        &--fail {
            border:1px solid #FC847C;
            color: var(--fail);
            background: #FFF2F0;
        }
        &--info {
            border:1px solid #8AD0FF;
            color: var(--info);
            background: #E6F7FF;
        }
        &--warning {
            border:1px solid #FFCE96;
            color: var(--warning);
            background: #FFF6E8;
        }
    }
    &__anime-enter-active {
        animation: message-in .2s;
    }
    &__anime-leave-active {
        animation: message-in .2s reverse;
    }
    @keyframes message-in {
        from {
            opacity: 0;
            transform: translate(-50%, calc(6vh));
        }
        to {
            opacity: 1;
            transform: translate(-50%, calc(12vh));
        }
    }
}
</style>
