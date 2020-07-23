# Divider 占位符
当一些地方需要产生间距，又懒得去写css的时候，就可以用占位符来产生间隔。

## Set Type

::: demo
``` html
<template>
    <div>
        <AmButton type="default">Default</AmButton>
        <AmDivider />
        <AmButton type="primary">Primary</AmButton>
        <AmDivider margin="0 10px" content="$"/>
        <AmButton type="fail">Fail</AmButton>
    </div>
</template>
```
:::

## Attributes

| 参数       | 说明        | 类型       | 默认值         |
|---------- |------------ |---------- |-------------  |
| content   | 分隔符       | String   | \|              |
| size      | 字号         | String      | 14 |
| color      | 颜色         | String      | #999 |
| margin      | 间距         | String      | '0 5px' |


