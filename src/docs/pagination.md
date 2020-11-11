# Pagination 分页

## 用法
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