<template>
    <div
        class="am-radio-group"
        :class="{
            'is-validate-fail': validateMsg,
        }"
        @click="handleClick"
    >
        <slot />
        <!-- 错误信息 -->
        <div class="am-radio-group__error-msg" v-if="validateMsg">{{ validateMsg }}</div>
    </div>
</template>

<script>
import validator from '../../mixins/validator';

export default {
    name: 'AmRadioGroup',
    mixins: [validator],
};
</script>

<style lang="less">
.am-radio-group {
    position: relative;
    &__error-msg {
        font-size: 12px;
        color: red;
        position: absolute;
        left: 0;
        bottom: -20px;
        height: 20px;
        line-height: 20px;
    }
}
</style>
