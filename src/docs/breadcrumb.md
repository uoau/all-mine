# Breadcrumb 面包屑

## 用法
::: demo
``` html
<AmBreadcrumb>
    <AmBreadcrumbItem :to="{ path: '/' }">首页</AmBreadcrumbItem>
    <AmBreadcrumbItem :to="{ path: '/button' }">按钮页面</AmBreadcrumbItem>
    <AmBreadcrumbItem current>详情页</AmBreadcrumbItem>
</AmBreadcrumb>
```
:::

::: demo
``` html
<AmBreadcrumb separator-icon="right">
    <AmBreadcrumbItem>首页</AmBreadcrumbItem>
    <AmBreadcrumbItem>列表页</AmBreadcrumbItem>
    <AmBreadcrumbItem current>详情页</AmBreadcrumbItem>
</AmBreadcrumb>
```
:::

## 配置
### AmBreadcrumb 配置

| 参数       | 说明        | 类型       | 可选值         | 默认值   |
|---------- |------------ |---------- |-------------  |-------- |
| separator | 分隔符       | String   |    |    /   |
| separator-icon    | 分割图标   | String   |  |        |


### AmBreadcrumbItem 配置

| 参数       | 说明        | 类型       | 可选值         | 默认值   |
|---------- |------------ |---------- |-------------  |-------- |
| to | 路由跳转内容   | Object   |    |       |
| current    | 设定为当前元素   | Boolean   |  |        |