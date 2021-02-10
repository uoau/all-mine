# DateFormat 日期格式化组件
将日期扔进来，帮你格式化显示，支持`2020-12-12 12:12:12`, `1600000000000`, `Date对象`

## 基础使用
::: demo
``` html
<template>
    <AmDateFormat :value="value"/>
</template>
<script>
export default {
    data(){
        return {
            value: new Date(),
        }
    }
}
</script>
```
:::

## 紧凑布局
::: demo
``` html
<template>
    <AmDateFormat :value="value" layout="compact"/>
</template>
<script>
export default {
    data(){
        return {
            value: new Date(),
        }
    }
}
</script>
```
:::

## 格式化
::: demo
``` html
<template>
    <AmDateFormat :value="value" date-format="YYYY年MM月DD日"/>
</template>
<script>
export default {
    data(){
        return {
            value: new Date(),
        }
    }
}
</script>
```
:::


## 属性

| 参数       | 说明        | 类型       | 默认值         |
|---------- |------------ |---------- |-------------  |
| value   | 日期值       | String\Number\Date   | new Date() |
| layout      | 布局         | String      | - |
| date-format      | 日期格式化         | String      | 'YYYY-MM-DD' |
| time-format      | 时间格式化         | String      | 'HH:mm:ss' |


