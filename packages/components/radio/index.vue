<template>
    <div
        class="am-radio"
        :class="{
            ['is-active']: label === selectedValue
        }"
        @click="handleClick"
    >
        <div class="radio">
            <transition name="am-radio-anime">
                <i v-show="label === selectedValue"></i>
            </transition>
        </div>
        <div class="text" v-if="$slots.default">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: 'AmRadio',
    model: {
        prop: 'selectedValue',
        event: 'changeValue',
    },
    props: {
        selectedValue: {
            type: null,
        },
        // 值
        label: null,
    },
    methods: {
        handleClick() {
            this.$emit('changeValue', this.label);
        },
    },
};
</script>

<style lang="less">
.am-radio {
    display: inline-flex;
    align-items: center;
    height: 32px;
    cursor: pointer;
    >.radio {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 1px solid var(--border);
        transition: border-color .2s;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: border .2s;
        i {
            width: 8px;
            height: 8px;
            background: var(--primary);
            display: inline-flex;
            border-radius: 50%;
        }
    }
    >.text {
        margin-left: 8px;
        font-size: 14px;
    }
    .am-radio-anime-enter-active {
        animation: am-radio-in .2s;
    }
    .am-radio-anime-leave-active {
        animation: am-radio-in .2s reverse;
        animation-fill-mode: forwards;
    }
    @keyframes am-radio-in {
        from {
            opacity: 0;
            transform: scale(0);
            background: none;
        }
        to {
            opacity: 1;
            transform: scale(1);
            background: var(--primary);
        }
    }

    // 悬停
    &:hover {
        >.radio {
            border-color: var(--primary);
        }
    }
    &.is-active {
        >.radio {
            border: 1px solid var(--primary);
        }
    }
}
</style>
