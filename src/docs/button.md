# Button 按钮
Commonly used button.

## 按钮类型
默认按钮样式有四种，白按钮、主题色按钮、主题色描边按钮、文字按钮
::: demo
``` html
<div class="row">
    <AmButton @click="sayHi">默认按钮</AmButton>
    <AmButton type="primary">主题色按钮</AmButton>
    <AmButton type="line-primary">主题色线边按钮</AmButton>
    <AmButton type="text">文字按钮</AmButton>
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
    margin-right: 8px;
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
small 24px, 默认是 32px, big 40px
::: demo
``` html
<AmButton size="small">Small Button</AmButton>
<AmButton>Default Button</AmButton>
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

