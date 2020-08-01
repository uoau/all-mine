<template>
    <transition name="am-notification__anime">
        <div
            class="am-notification"
            :class="themeName">
            <div class="am-notification__icon">
                <AmIcon :name="iconName"/>
            </div>
            <div class="am-notification__content">
                <div class="title">{{ title }}</div>
                <p class="text">{{ content }}</p>
                <slot name="extra" />
            </div>
            <div class="am-notification__close">
                <AmIcon name="close"/>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'AmNotification',
    data() {
        return {
            type: 'success',
            title: '你好',
            content: '这是很长的通知',
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
        themeName() {
            let themeName = '';
            switch (this.type) {
            case 'success': themeName = 'am-notification--success'; break;
            case 'fail': themeName = 'am-notification--fail'; break;
            case 'info': themeName = 'am-notification--info'; break;
            case 'warning': themeName = 'am-notification--warning'; break;
            default: break;
            }
            return themeName;
        },
    },
};
</script>

<style lang="less">
.am-notification {
    width: 380px;
    padding: 16px 24px;
    box-shadow: var(--shadow-3);
    display: flex;
    position: relative;
    &__anime {

    }
    &__icon {
        font-size: 24px;
        margin-right: 15px;
        margin-top: -8px;
    }
    &__content {
        .title {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 5px;
        }
        .text {
            font-size: 14px;
            line-height: 1.6;
        }
    }
    &__close {
        font-size: 16px;
        line-height: 1.6;
        position: absolute;
        top: 16px;
        right: 24px;
    }

    // 风格
    &--success &__icon{
        color: green;
    }
    &--fail &__icon {
        color: red;
    }
    &--info &__icon{
        color: gray;
    }
    &--warning {

    }
}
</style>
