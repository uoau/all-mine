# Divider 占位符
当一些地方需要产生间距，又懒得去写css的时候，就可以用占位符来产生间隔。

## 用法

::: demo
``` html
<template>
    <div class="row">
        <AmButton type="default">Default</AmButton>
        <AmDivider />
        <AmButton type="primary">Primary</AmButton>
        <AmDivider margin="0 10px" content="$"/>
        <AmButton type="text">Fail</AmButton>
        <AmDivider margin="0 10px" show-line/>
        <AmButton type="default">Default</AmButton>
        <AmDivider margin="0 10px" icon-name="left" />
        <AmButton type="default">Default</AmButton>
    </div>
</template>
<style>
.row {
    display: flex;
}
</style>
```
:::

## 属性

| 参数       | 说明        | 类型       | 默认值         |
|---------- |------------ |---------- |-------------  |
| content   | 分隔符       | String   | \|              |
| size      | 字号         | String      | 14 |
| color      | 颜色         | String      | #999 |
| margin      | 间距         | String      | '0 8px' |
| icon-name      | 图标         | String      |  |
| icon-size      | 图标大小         | String      |  |
| show-line      | 显示短线型分隔符    | Boolean      | false |


