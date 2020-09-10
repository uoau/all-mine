# Rules 一些规则

## 文本规范
* 主文本采用 `14px 20px`
* 字体颜色采用 `#333` `#666` `#999`三色
* 12px - 16px
* 14px - 20px
* 16px - 24px
* 18px - 26px
* 20px - 28px

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
* 项目采用 `P-M-E-IS` 命名法，是我个人发明的，P代表页面，M代表模块，E代表元素，IS代表状态。
* P页面采用 `page-*` 命名
* M模块采用 `m-*` 命名
* E元素随意命名
* 常用的E元素命名规范
* IS装饰符，比如`is-active, is-focus, is-success` 用来表示状态
* 此组件库项目，每个独立组件采用 `am-*`命名，如果组件里有slot，要怎么命名比较好？


``` css
.am-button {}
.am-button.is-active {}
.am_button span {}
.am-button .text {}
```
常用的元素命名名词
``` md
布局相关：left top right bottom middle hd bd ft wrap（外包层）
部件相关: text（文本） img（图片） box（盒子） list(列表) item(循环元素)
        content(内容) tip(辅助文字) title(标题) btns(按钮组) info(信息)
具象相关：tab(可切换元素) icon(图标) user(用户)
动画相关: anime(动画) fade(渐显渐隐)
修饰符: is-active(激活态，选中态) is-selected (被选中)
```