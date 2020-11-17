# Cropper 图片裁剪器
由于编辑器使用了其他项目的包，所以比较大，采用额外引入的方式

::: demo
``` html
<template>
    <AmCropper
        :show.sync="show"
        :viewport="[300,200]"
        @confirm="confirm"
    />
    <AmButton @click="show=true" style="margin-bottom: 8px;">点击触发裁剪窗口</AmButton>
    <img :src="src" />
</template>
<script>
export default {
    data(){
        return {
            show: false,
            src: '',
        }
    },
    methods:{
        confirm(url){
            this.src = url;
        }
    }
}
</script>
```
:::