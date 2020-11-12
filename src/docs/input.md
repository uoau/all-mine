# Input 输入框

::: demo
``` html
<AmInput v-model="value" :match="/^[0-9]*$/"/>
<script>
    export default {
        data() {
            return {
                value: '1234567890'
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
| placeholder |  提示文案  |  string  | - | - |
| match |  | | | |

## Emit

| 监听       | 说明        | 参数       | 参数内容         |
|---------- |------------ |----------|-------------  |
| @input     |   当输入内容时触发    |  e  |  事件对象  |
| @change    |   当内容变更时    |  value  |  变化后的值  |
| @focus    |   当聚焦时    |  e  |  事件对象  |
| @blur    |   当失焦时    |  e  |  事件对象  |
| @enter    |   当输入中回车时    |  e  |  事件对象  |
| @keyup    |   当按键盘时    |  e  |  事件对象  |
