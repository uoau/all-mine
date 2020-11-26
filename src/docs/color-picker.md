# Color Picker 颜色选择器

## 用法
::: demo
```html
<AmColorPicker style="margin-right: 16px;" :color.sync="color"/>

<AmColorPicker :color.sync="color">
    <AmButton>选择颜色</AmButton>
</AmColorPicker>
<div>{{ color }}</div>

<script>
export default {
    data(){
        return {
            color: '#aabbcc'
        }
    },
    mounted(){

    },
}
</script>
<style>
</style>
```
:::

## Attributes

| 参数       | 说明        | 类型       | 可选值         | 默认值   |
|---------- |------------ |---------- |-------------  |-------- |
| v-model      | 双向绑定值      |  array  |  -  |   -   |
| label |  绑定的值  |  -  | - | - |
