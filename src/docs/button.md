# Button 按钮
Commonly used button.

## 按钮类型

::: demo
``` html
<div class="row">
    <AmButton @click="sayHi">Default</AmButton>
    <AmButton type="primary">Primary</AmButton>
    <AmButton type="dark-primary">Weak Primary</AmButton>
    <AmButton type="line-primary">Line Primary</AmButton>
</div>
<script>
export default {
    methods: {
        sayHi() {
            console.log('hi');
        }
    }
}
</script>
<style>
.row {
    display: flex;
}
.am-button {
    margin-right: 5px;
}
</style>

```
:::

## 不可用
::: demo
``` html
<AmButton disabled>Disabled</AmButton>
```
:::

## 规格
small 24px, 默认是 30px, big 50px
::: demo
``` html
<AmButton size="small">Small Button</AmButton>
<AmButton size="big">Big Button</AmButton>
<style>
.am-button {
    margin-right: 5px;
}
</style>
```
:::

## 带图标的按钮
::: demo
``` html
<div class="row">
    <AmButton icon="arrowdown">下载</AmButton>
    <AmButton icon="search" type="primary" :icon-size="20">搜索</AmButton>
    <AmButton icon="caret-right" v-tooltip:top="'提示'"></AmButton>
</div>
<style>
.row {
    display: flex;
}
.am-button {
    margin-right: 5px;
}
</style>
```
:::

## Attributes

| 参数       | 说明        | 类型       | 可选值         | 默认值   |
|---------- |------------ |---------- |-------------  |-------- |
| size      | 尺寸         | String   | small / mini   |    -    |
| type      | 类型         | String   | primary / text |    -    |
| icon      | 图标名称     | String    | -             | -        |
| iconSize  | 图标大小     | Number    | -             | 12      |

