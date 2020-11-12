# 开关 Switch

## 用法
::: demo
```html
<AmSwitch v-model="value">开关</AmSwitch>
<script>
export default {
    data(){
        return {
            value: false,
        }
    }
}
</script>
```
:::

## Attributes

| 参数       | 说明        | 类型       | 可选值         | 默认值   |
|---------- |------------ |---------- |-------------  |-------- |
| v-model      | 双向绑定值      |  boolean  |  -  |   -   |
