# Button 按钮
最基础的组件

## 按钮类型
默认按钮样式
::: demo
``` html
<div class="row">
    <AmButton @click="sayHi">默认按钮</AmButton>
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
    align-items: center;
}
</style>

```
:::

## 不可用
::: demo
``` html
<AmButton disabled>Disabled</AmButton>
<style>
.am-button {
    margin-right: 8px;
}
</style>
```
:::

## 带图标的普通按钮
::: demo
``` html
<div class="row">
    <AmButton icon-name="close">关闭</AmButton>
    <AmButton
        icon-name="caret-bottom"
        type="primary"
        icon-size="12px"
        icon-position="back"
    >下拉菜单</AmButton>
    <AmButton icon-name="add">添加文件</AmButton>
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
    <AmButton mode="a-mini-dark">Coco按钮</AmButton>
</div>

<style>
.row {
    display: flex;
}
.am-button {
    &.is-a-mini-dark {
        border-radius: 12px;
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

## 属性

| 参数       | 说明        | 类型       | 可选值         | 默认值   |
|---------- |------------ |---------- |-------------  |-------- |
| mode  | 模式     | String    |     -        |     -  |
| icon-name      | 图标名称     | String    | -             | -        |
| icon-size  | 图标大小     | String    | -             |    -   |
| icon-position  | 图标位置     | String    | 'front' 'back'             | 'front'      |
