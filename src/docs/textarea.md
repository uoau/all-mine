# Textarea 文本框

## 用法
::: demo
``` html
<AmTextarea v-model="value" placeholder="自定义请输入"/>
<script>
export default {
    data(){
        return {
            value: '',
        }
    }
}
</script>
```
:::

## 自动计算高度
::: demo
``` html
<AmTextarea v-model="value" placeholder="自定义请输入" autosize/>
<script>
export default {
    data(){
        return {
            value: '',
        }
    }
}
</script>
```
:::

## Attributes

| 参数       | 说明        | 类型       | 可选值         | 默认值   |
|---------- |------------ |---------- |-------------  |-------- |
| v-model      | 双向绑定值      |  -  |  -  |   -   |
| placeholder |  提示文案  |  String  | - | '请输入' |
| autosize |  自动计算高度  |  Boolean  | - | false |

## Emit

| 监听       | 说明        | 参数       | 参数内容         |
|---------- |------------ |----------|-------------  |
| @input     |   当输入内容时触发    |  e  |  事件对象  |
| @change    |   当内容变更时    |  value  |  变化后的值  |
| @focus    |   当聚焦时    |  e  |  事件对象  |
| @blur    |   当失焦时    |  e  |  事件对象  |
| @enter    |   当输入中回车时    |  e  |  事件对象  |
| @keyup    |   当按键盘时    |  e  |  事件对象  |