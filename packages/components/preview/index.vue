<template>
    <div class="am-preview">
        <AmPopup :show.sync="show">
            <div class="">
                <AmButton>前</AmButton>
                <div v-for="(item,index) in imgArr" :key="index">
                    <img :src="item.url" />
                </div>
                <AmButton>后</AmButton>
            </div>
            <div>{{ nowIndex+1 + '/' + imgArr.length }}</div>
        </AmPopup>
    </div>
</template>

<script>
export default {
    name: 'AmPreview',
    props: {
        // 图片数组
        imgArr: {
            type: Array,
            default: () => [],
        },
        // 当前顺序
        nowIndex: {
            type: Number,
            default: 0,
        },
        // 显示
        show: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {

        };
    },

};
</script>

<style lang="less">
.am-preview {

}
</style>
