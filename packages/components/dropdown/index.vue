<template>
    <div
        class="am-dropdown"
        v-clickoutside="clickOutside"
        @mouseenter="mouseenter"
        @mouseleave="mouseleave"
    >
        <AmButton
            :type="type"
            icon-name="caret-bottom"
            icon-position="back"
            icon-size="12px"
            ref="btn"
            @click="clickBtn"
        >
            {{ placeholder }}
        </AmButton>
        <AmPopover
            v-if="linkEl"
            :link-el="linkEl"
            :show.sync="show"
            @mouseenter.native="mouseenter"
            @mouseleave.native="mouseleave"

        >
            <slot />
        </AmPopover>
    </div>
</template>

<script>
export default {
    name: 'AmDropdown',
    props: {
        type: {
            type: String,
            default: 'default',
        },
        // 占位符
        placeholder: {
            type: String,
            default: '请选择',
        },
        // 更新占位符
        updatePlaceholder: {
            type: Boolean,
            default: false,
        },
        // 触发方式
        trigger: {
            type: String,
            default: 'click',
        },
    },
    provide() {
        return {
            dropdown: this,
        };
    },
    data() {
        return {
            linkEl: '',
            show: false,

            leaveTimer: null, // 移出计时器
        };
    },
    mounted() {
        this.linkEl = this.$refs.btn.$el;
    },
    methods: {
        // 隐藏下拉
        hideDropdown() {
            this.show = false;
        },
        clickOutside() {
            if (this.trigger === 'click') {
                this.show = false;
            }
        },
        // 点击按钮
        clickBtn() {
            if (this.trigger === 'click') {
                this.show = !this.show;
            }
        },
        // 悬停进
        mouseenter() {
            if (this.trigger !== 'hover') {
                return;
            }
            this.show = true;
            if (this.leaveTimer) {
                clearTimeout(this.leaveTimer);
                this.leaveTimer = null;
            }
        },
        // 移出
        mouseleave() {
            if (this.trigger !== 'hover') {
                return;
            }
            this.leaveTimer = setTimeout(() => {
                this.show = false;
            }, 100);
        },
    },
};
</script>

<style lang="less">
.am-dropdown {
    display: inline-flex;
    >.am-button {
        span {

        }
    }
}
</style>
