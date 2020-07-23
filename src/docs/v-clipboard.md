# v-clipboard
使用指令或api的方式，对指定内容进行复制

> 功能来源于 `https://github.com/euvl/v-clipboard`

## 用法
可使用指令复制，也可使用api复制，而且都能进行回调。
::: demo
``` html
<AmButton
    v-clipboard="'这是使用指令复制的内容'"
    v-clipboard:success="copySuccess"
    v-clipboard:error="copyError">
    使用指令复制
</AmButton>
<AmButton @click="copy">使用Api复制</AmButton>

<script>
export default {
    methods: {
        copy(){
            const copyContent = this.$clipboard('这是调用api复制的内容');
            if(copyContent){
                this.copySuccess();
            }else {
                this.copyError();
            }
        },
        copySuccess(){
            console.log('复制成功');
        },
        copyError(){
            console.log('复制失败');
        },
    }
}
</script>
```
:::

## api
| 方法              | 说明 |
|------------------|-------------|
|指令：v-clipboard=""| 复制内部内容 |
| 指令：v-clipboard:success=""| 复制成功时回调 |
| 指令：v-clipboard:error=""| 复制失败时回调 |
| API：const copyContent = this.$clipboard('要复制的内容'); | copyContent为复制的内容|
