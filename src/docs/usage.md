# Usage 用法
使用`npm`进行安装
``` dos
npm i all-mine -S
```


## 组件和指令

``` javascript
import Vue from 'vue';
import allMine from 'all-main';

Vue.use(allMine);
new Vue({
    ...
})
```

## 工具库
``` javascript
import { deepcopy } from 'all-mine/utils';

const obj1 = {};
const obj2 = deepcopy(obj1);
```

## 样式
``` css
@import 'all-mine/stylesheet/reset.css';

html, body {
    width: 100%;
}
```

##