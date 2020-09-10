# Pagination 分页

## 用法
::: demo
```html
<AmPagination :total="total" :current="current" :page-num="pageNum"/>
<script>
export default {
    data(){
        return {
            total: 105,
            pageSize: 20,
            current: 5,
        }
    }
}
</script>
```
:::