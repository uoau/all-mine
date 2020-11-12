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

<style>
.am-radio {
    margin-right: 16px;
}
</style>
```
:::

## Attributes

| 参数       | 说明        | 类型       | 可选值         | 默认值   |
|---------- |------------ |---------- |-------------  |-------- |
| v-model      | 双向绑定值      |  array  |  -  |   -   |
| label |  绑定的值  |  -  | - | - |

