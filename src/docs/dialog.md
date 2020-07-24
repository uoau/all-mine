# Dialog 对话框

## 用法
::: demo
``` html
<AmButton @click="deleteItem">删除这条记录</AmButton>

<script>
export default {
    methods: {
        deleteItem() {
            this.$dialog('你确定删除吗?')
            .then(()=>{
                this.$message.success('删除成功');
            }).catch(()=>{
                this.$message.info('取消删除');
            })
        }
    }
}
</script>
```
:::