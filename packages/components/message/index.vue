<template>
    <div class='am-message'>
        <transition
            name='am-message__anime'
            v-on:after-leave='afterLeave'>
            <div
                class='am-message__body'
                v-show='show'>
                <AmIcon :class="'am-message__body--'+type" v-if="type" :name="iconName" />
                <span>{{ content }}</span>
            </div>
        </transition>
    </div>
</template>

<script>
import AmIcon from '../icon/index.vue';

export default {
    name: 'AmMessage',
    components: {
        AmIcon,
    },
    data() {
        return {
            type: '',
            show: false,
            content: 'This is a toast.',
            duration: 2000,
            autoCloseTimer: null,
        };
    },
    computed: {
        iconName() {
            let iconName = '';
            switch (this.type) {
            case 'success': iconName = 'check-circle-fill'; break;
            case 'fail': iconName = 'close-circle-fill'; break;
            case 'info': iconName = 'info-circle-fill'; break;
            case 'warning': iconName = 'warning-circle-fill'; break;
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
        top:0;
        left: 50%;
        transform: translate(-50%, 30px);
        background: #fff;
        color:#333;
        z-index:120;
        border-radius:4px;
        max-width:250px;
        min-width:120px;
        min-height:30px;
        padding:5px 10px;
        word-break:break-all;
        font-size:14px;
        line-height:1.8;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
        .am-icon {
            font-size: 16px;
            margin-right: 3px;
        }
        &--success {
            color: var(--success);
        }
        &--fail {
            color: var(--fail);
        }
        &--info {
            color: var(--info);
        }
        &--warning {
            color: var(--warning);
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
            transform: translate(-50%, 0);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 30px);
        }
    }
}
</style>
