# Button 按钮
最基础的组件

## 按钮类型
默认按钮样式有五种，白按钮、主题色按钮、主题色描边按钮、文字按钮、主题色文字按钮、
::: demo
``` html
<div class="row">
    <AmButton @click="sayHi">默认按钮</AmButton>
    <AmButton type="primary">主题色按钮</AmButton>
    <AmButton type="line-primary">主题色线边按钮</AmButton>
    <AmButton type="text">文字按钮</AmButton>
    <AmButton type="text-primary">主题色文字按钮</AmButton>
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
<AmButton type="primary" disabled>Disabled</AmButton>
<style>
.am-button {
    margin-right: 8px;
}
</style>
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
    margin-right:8px;
}
</style>
```
:::

## 带图标的普通按钮
::: demo
``` html
<div class="row">
    <AmButton icon-name="arrowdown">下载</AmButton>
    <AmButton
        icon-name="caret-down"
        type="primary"
        :icon-size="12"
        icon-position="back"
    >下拉菜单</AmButton>
    <AmButton icon-name="plus">添加文件</AmButton>
</div>
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

## 自定义模式
你可以在样式文件里自定义一个模式，然后在所有页面就可以使用了。
::: demo
``` html
<div class="row">
    <AmButton mode="coco">Coco按钮</AmButton>
</div>

<style>
.row {
    display: flex;
}
.am-button {
    &.is-coco {
        border-radius: 3px;
        &:hover {
            border-color: var(--red);
            background: var(--red);
            color: #fff;
        }
        &.is-down {
            border-color: var(--orange);
            background: var(--orange);
            color: #fff;
        }
    }
}
</style>
```
:::

## Attributes

| 参数       | 说明        | 类型       | 可选值         | 默认值   |
|---------- |------------ |---------- |-------------  |-------- |
| size      | 尺寸         | String   | small / mini   |    -    |
| type      | 类型         | String   | primary / text |    -    |
| icon-name      | 图标名称     | String    | -             | -        |
| icon-size  | 图标大小     | Number    | -             | 12      |
| icon-position  | 图标位置     | String    | 'front' 'back'             | 'front'      |
| mode      | 自定义模式    | String   | - |    -    |
