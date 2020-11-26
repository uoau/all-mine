# Editor markdown编辑器
由于编辑器使用了其他项目的包，所以比较大，采用额外引入的方式

::: demo
``` html
<template>
    <AmEditor
        :md-content.sync="mdContent"
        :html-content.sync="htmlContent"
        :dealImg="dealImg"
    />
</template>
<script>
export default {
    data(){
        return {
            mdContent: '',
            htmlContent: '',
        }
    },
    methods: {
        dealImg(base64){
            return '123';
        }
    }
}
</script>
```
:::