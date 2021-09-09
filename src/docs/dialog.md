# Dialog 对话框

## 用法
::: demo
``` html
<AmDialogTest />
12333
<AmButton @click="deleteItem">删除这条记录</AmButton>

<script>
export default {
    methods: {
        deleteItem() {
            this.$dialog({
                content: '你确定删除吗?'
            }).then(()=>{
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

## 函数参数

| 参数       | 说明        | 类型       | 默认值         |
|---------- |------------ |---------- |-------------  |
| content   | 文本内容       | String   | |              |
| cancelText      | 取消按钮文本         | String      | '取消' |
| confirmText      | 确认按钮文本         | String      | '确认' |

