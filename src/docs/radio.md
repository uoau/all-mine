# Radio 单选框

## 用法
::: demo
```html
<div class="radio-wrap" style="display: flex;">
    <AmRadio v-model="value" label="1">单选项一</AmRadio>
    <AmRadio v-model="value" label="2">单选项二</AmRadio>
    <AmRadio v-model="value" label="3">单选项三</AmRadio>
</div>
<script>
export default {
    data(){
        return {
            value: '1',
        }
    }
}
</script>
```
:::

## 属性

| 参数       | 说明        | 类型       | 可选值         | 默认值   |
|---------- |------------ |---------- |-------------  |-------- |
| v-model      | 双向绑定值      |  Any  |  -  |   -   |
| label |  绑定的值  |  Any  | - | - |

# Slot
| slot name       | 说明        |
|---------- |------------ |
| default     | 文本内容      |