<template>
    <div class="am-color-picker">
        <div
            ref="btn"
            @click="clickBtn"
        >
            点击出现下拉框
        </div>
        <AmPopover
            v-if="linkEl"
            :link-el="linkEl"
            :show.sync="show"
        >
            你好你好你好啊
        </AmPopover>
    </div>
</template>

<script>
export default {
    name: 'AmColorPicker',
    data() {
        return {
            linkEl: '',
            show: false,
        };
    },
    mounted() {
        this.linkEl = this.$refs.btn;
    },
    methods: {
        clickBtn() {
            this.show = !this.show;
        },
    },
};
</script>

<style lang="less">
.am-color-picker {
    &__box {

    }
    &__control {

    }
}
</style>
