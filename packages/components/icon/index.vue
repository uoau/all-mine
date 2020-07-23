<template>
    <svg
        class="am-icon"
        aria-hidden="true"
        :style="style">
        <use :xlink:href="'#'+name"></use>
    </svg>
</template>

<script>
export default {
    name: 'AmIcon',
    props: {
        name: {
            type: String,
            default: '',
        },
        size: {
            type: String,
        },
        color: {
            type: String,
        },
    },
    computed: {
        style() {
            let style = '';
            if (this.size) {
                style += `font-size: ${this.size}px;`;
            }
            if (this.color) {
                style += `color: ${this.color};`;
            }
            return style;
        },
    },
};
</script>

<style lang="less" scoped>
    .am-icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>
