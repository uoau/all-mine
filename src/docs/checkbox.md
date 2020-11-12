# checkbox 复选框

## 用法
::: demo
```html
<div style="display: flex;">
    <AmCheckbox v-model="checkbox" label="1">多选项一</AmCheckbox>
    <AmCheckbox v-model="checkbox" label="2">多选项一</AmCheckbox>
    <AmCheckbox v-model="checkbox" label="3">多选项一</AmCheckbox>
    <AmCheckbox v-model="checkbox" label="4">多选项一</AmCheckbox>
</div>

<script>
export default {
    data(){
        return {
            checkbox: ['1'],
        }
    }
}
</script>
<style>
.am-checkbox {
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
