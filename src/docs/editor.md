# Editor markdown编辑器
由于编辑器使用了其他项目的包，所以比较大，采用额外引入的方式

::: demo
``` html
<template>
    <AmEditor :content.sync="content"/>
</template>
<script>
export default {
    data(){
        return {
            content: '',
        }
    }
}
</script>
```
:::