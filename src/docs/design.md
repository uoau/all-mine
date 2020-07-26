# 一些规范

## 文本规范
* 文本采用 `14px 1.6x行高`
* 字体颜色采用 `#333` `#666` `#999`三色

## 阴影规范
* 阴影用于表现页面的`层级关系`和`亲密度`，所以参考antd，我也将阴影分为三层。
* 1层：用于强调或hover，亲密度搞， `box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.13)`
* 2层：用于弹出元素，`box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1)`
* 3层：用于顶层通知，一般伴随着mask，`box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.07)`
::: example
``` html
<template>
    <div class="box">
        <div class="item" style="box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.13)">第一层</div>
        <div class="item"  style="box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1)">第二层</div>
        <div class="item"  style="box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.07)">第三层</div>
    </div>
</template>
<style>
.box {
    display: flex;
    justify-content: space-between;
    padding: 30px;
    .item {
        width: 200px;
        height: 100px;
        background: #fff;
        padding: 10px;
    }
}
</style>
```
:::

## 命名规范
* 目的：更好理解、易于覆盖。
* 项目采用 `BEM` 命名法，为了可以更好地进行样式覆盖。
* 命名规则 `模-块__元素--修饰符`
* 二级之后，就采用随意命名

``` css
.am-button {}
.am-button__text {}
.am_button--success {}
```