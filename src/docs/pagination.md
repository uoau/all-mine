# Pagination 分页

## 基础用法
::: demo
```html
<AmPagination
    :total="total"
    :current.sync="current"
    :page-size.sync="pageSize"
/>
<script>
export default {
    data(){
        return {
            total: 1050,
            pageSize: 20,
            current: 1,
        }
    }
}
</script>
```
:::

## 页码个数
pager-count 至少要大于等于7
::: demo
```html
<AmPagination
    :pager-count="9"
    :total="total"
    :current.sync="current"
    :page-size.sync="pageSize"
/>
<script>
export default {
    data(){
        return {
            total: 1050,
            pageSize: 20,
            current: 1,
        }
    }
}
</script>
```
:::

## Attributes

| 参数       | 说明        | 类型       | 可选值         | 默认值   |
|---------- |------------ |---------- |-------------  |-------- |
| total | 元素总数 | number | | |
| current.sync      | 当前页码（双向绑定）      |  number  |  -  |   1   |
| show-page-size |  显示每页个数  |  boolean  | - | true |
| page-size.sync |  每页个数（双向绑定）  |  number  | - | 20 |
| page-size-options |  每页个数列表  |  array  | - | [20,40,80] |
| pager-count |  最多显示几个页码按钮  |  number  | - | 7 |