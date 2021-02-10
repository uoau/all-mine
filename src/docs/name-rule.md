# Name Rule 命名规则

## 类目命名规范
* 采用`P-M-E-IS`命名法，P代表页面，M代表模块，E代表元素，IS代表状态。
* P代表页面，采用 `page-*` 命名
* M代表模块，采用 `m-*` 命名
* E代表元素，有两种命名方式，如果内部无slot，就随意命名；若内部有slot
* E代表元素，采用BEM命名法 `m-*__*`
* IS代表状态，采用 `is-*` 命名


## 常用的元素命名名词
``` md
布局相关：left top right bottom middle hd bd ft wrap（外包层）
部件相关: text（文本） img（图片） box（盒子） list(列表) item(循环元素)
        content(内容) tip(辅助文字) title(标题) btns(按钮组) info(信息)
具象相关：tab(可切换元素) icon(图标) user(用户)
动画相关: anime(动画) fade(渐显渐隐)
修饰符: is-active(激活态，选中态) is-selected (被选中)
```