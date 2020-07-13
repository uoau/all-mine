# Usage
The project is divided into four parts, `components` , `utils` , `stylesheet` , `directives` .The components and directives based on `Vue2`, utils and stylesheet can be loaded in alone.
``` dos
npm i all-mine -S
```


## Component & Directives

``` javascript
import Vue from 'vue';
import allMine from 'all-main';

Vue.use(allMine);
new Vue({
    ...
})
```

## Utils
``` javascript
import { deepcopy } from 'all-mine/utils';

const obj1 = {};
const obj2 = deepcopy(obj1);
```

## stylesheet
``` css
@import 'all-mine/stylesheet/reset.css';

html, body {
    width: 100%;
}
```

##