# Usage 用法
使用`npm`进行安装
``` dos
npm i all-mine -S
```


## 引用

``` javascript
import Vue from 'vue';
import allMine from 'all-mine';
import 'all-mine/lib/index.css';

Vue.use(allMine);
new Vue({
    ...
})
```

## 工具库
``` javascript
import { getType } from 'all-mine/packages/utils/base';

const str = 'javascript';
if(getType(str)) {
    console.log("这是变量是字符串类型");
}
```

## 一些常用的样式文件
``` css
/* 样式重置 */
@import 'all-mine/packages/stylesheet/reset.css';
/* markdown样式 */
@import 'all-mine/packages/stylesheet/markdown.css';
```