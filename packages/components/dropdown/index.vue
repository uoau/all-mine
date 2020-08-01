<template>
    <div class="am-dropdown">
        <AmButton ref="btn" @click="()=>{ show=!show }">
            <span>1212</span>
        </AmButton>
        <AmPopover
            v-if="linkEl"
            :link-el="linkEl"
            :show.sync="show"
        >
            <div>你好你好你好<br/>你好你好你好你好<br/>你好你好你好<br/>你好你好你好<br/>你好你好你好<br/></div>
        </AmPopover>
    </div>
</template>

<script>
export default {
    name: 'AmDropdown',
    props: {
        placeholder: {
            type: String,

        },
    },
    data() {
        return {
            linkEl: '',
            show: false,
        };
    },
    mounted() {
        this.linkEl = this.$refs.btn.$el;
    },
};
</script>

<style lang="less">
.am-dropdown {

}
</style>
