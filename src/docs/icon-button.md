# Icon Button 图标按钮
按形状区分： 圆形、正方形、椭圆形
按背景色分：有背景色的、无背景色的
按边框分: 有边框的、无边框的
太多配置项反而有点臃肿，按理说，应该只配置一个基础内容，其他由用户定义
然后提供几个常用的模式


## 形状
::: demo
``` html
<AmIconButton shape="round" icon-name="left"/>
<AmDivider />
<AmIconButton shape="square" icon-name="left"/>
```
:::

## 尺寸
::: demo
``` html
<div class="row">
    <AmIconButton shape="round" size="mini" icon-name="left"/>
    <AmDivider />
    <AmIconButton shape="round" size="small" icon-name="left"/>
    <AmDivider />
    <AmIconButton shape="round" size="middle" icon-name="left"/>
    <AmDivider />
    <AmIconButton shape="round" size="big" icon-name="left"/>
</div>

<style>
.row {
    display:flex;
    align-items: center;
}
</style>
```
:::

## 禁用
::: demo
``` html
<div class="row">
    <AmIconButton shape="round" icon-name="left" disabled />
</div>

<style>
.row {
    display:flex;
    align-items: center;
}
</style>
```
:::


## 预设风格
::: demo
``` html
<div class="row">
    <span>text</span>
    <AmDivider />
    <AmIconButton shape="round" icon-name="left" mode="text" size="mini"/>
    <AmDivider />
    <AmIconButton shape="square" icon-name="left" mode="text"/>
    <AmDivider />
    <AmIconButton shape="round" icon-name="left" mode="text" size="small"/>
    <AmDivider />
    <AmIconButton shape="round" icon-name="left" mode="text"/>
    <AmDivider />
    <AmIconButton shape="round" icon-name="left" mode="text" size="big"/>
</div>
<div class="row">
    <span>border-text</span>
    <AmDivider />
    <AmIconButton shape="square" icon-name="left" mode="border-text"/>
    <AmDivider />
    <AmIconButton shape="round" icon-name="left" mode="border-text" size="small"/>
    <AmDivider />
    <AmIconButton shape="round" icon-name="left" mode="border-text"/>
    <AmDivider />
    <AmIconButton shape="round" icon-name="left" mode="border-text" size="big"/>
</div>
<div class="row" style="background: #333;color: #fff;">
    <span>white-text</span>
    <AmDivider />
    <AmIconButton shape="square" icon-name="left" mode="white-text"/>
    <AmDivider />
    <AmIconButton shape="round" icon-name="left" mode="white-text" size="small"/>
    <AmDivider />
    <AmIconButton shape="round" icon-name="left" mode="white-text"/>
    <AmDivider />
    <AmIconButton shape="round" icon-name="left" mode="white-text" size="big"/>
</div>
<div class="row">
    <span>black</span>
    <AmDivider />
    <AmIconButton shape="square" icon-name="left" mode="black"/>
    <AmDivider />
    <AmIconButton shape="round" icon-name="left" mode="black" size="small"/>
    <AmDivider />
    <AmIconButton shape="round" icon-name="left" mode="black"/>
    <AmDivider />
    <AmIconButton shape="round" icon-name="left" mode="black" size="big"/>
</div>

<style>
.row {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    padding: 8px;
}
</style>
```
:::

## 自定义模式
::: demo
``` html
<div class="row">
    <AmIconButton shape="round" icon-name="close" mode="coco" />
</div>

<style>
.row {
    display:flex;
}
.am-icon-button {
    &.is-coco {
        background: var(--red);
        color: #fff;
        &:hover {
            background: var(--blue);
        }
        &.is-down {
            background: var(--green);
        }
    }
}
</style>
```
:::


## Attributes
| 参数       | 说明        | 类型       | 可选值         | 默认值   |
|---------- |------------ |---------- |-------------  |-------- |
| size      | 尺寸         | String   | small / middle/ big   |    -    |
| shape      | 形状         | String   | round / square   |    -    |
| disabled      | 是否禁用 | Boolean   | -   |    false    |
| icon-name      | 图标名称     | String    | -             | -        |
| icon-size  | 图标大小     | Number    | -             | 12      |
| mode  | 模式         | String   | -   |    default    |