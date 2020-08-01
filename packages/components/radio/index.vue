<template>
    <div
        class="am-radio"
        :class="{
            ['is-active']: value === selectedValue
        }"
        @click="handleClick"
    >
        <div class="radio">
            <i></i>
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
        value: {
            type: null,
        },

    },
    methods: {
        handleClick() {
            this.$emit('changeValue', this.value);
        },
    },
};
</script>

<style lang="less">
.am-radio {
    display: inline-flex;
    align-items: center;
    height: 30px;
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
        transition: transform .2s;
        i {
            transform: scale(0);
            width: 8px;
            height: 8px;
            background: var(--primary);
            display: inline-flex;
            border-radius: 50%;
        }
    }
    >.text {
        margin-left: 5px;
    }
    &.is-active {
        >.radio {
            border: 1px solid var(--primary);
            i {
                transform: scale(1);
            }
        }
    }
    // 悬停
    &:hover {
        >.radio {
            border-color: var(--primary);
        }
    }
}
</style>
