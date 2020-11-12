<template>
    <div
        class="am-switch"
        :class="{
            ['is-active']: value,
        }"
        @click="handleClick"
    >
        <div class="switch">
            <i></i>
        </div>
        <div class="text" v-if="$slots.default">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: 'AmSwitch',
    model: {
        prop: 'value',
        event: 'changeValue',
    },
    props: {
        value: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        handleClick() {
            this.$emit('changeValue', !this.value);
        },
    },
};
</script>

<style lang="less">
.am-switch {
    display: inline-flex;
    align-items: center;
    height: 32px;
    user-select: none;
    cursor: pointer;
    >.switch {
        width: 40px;
        height: 20px;
        background: var(--gray-bg);
        border-radius: 10px;
        transition: background .2s;
        i {
            display: inline-flex;
            width: 50%;
            height: 100%;
            background: #fff;
            transition: transform .2s;
            border-radius: 50%;
            border: 2px solid var(--gray-bg);
        }
    }
    >.text {
        margin-left: 8px;
    }
    &.is-active {
        >.switch {
            background: var(--primary);
            i{
                transform: translateX(100%);
                border-color: var(--primary);
            }
        }
    }
}
</style>
