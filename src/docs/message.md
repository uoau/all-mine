# 消息提示
由API调用的消息提示。

## 演示
::: demo
``` html
<AmButton @click="()=>{ $message('默认信息') }">默认</AmButton>
<AmButton @click="()=>{ $message.success('成功信息') }">成功</AmButton>
<AmButton @click="()=>{ $message.fail('失败') }">失败</AmButton>
<AmButton @click="()=>{ $message.info('消息信息') }">信息</AmButton>
<AmButton @click="()=>{ $message.warning('警告信息') }">警告</AmButton>

<script>
export default {
    methods: {
        showMsg() {
            this.$message({
                content: '如果这是一句很长的话怎么办呢',
            });
        }
    }
}
</script>
<style>
.am-button {
    margin-right: 10px;
}
</style>
```
:::


## API
| API      | 说明 | 参数类型 |
| --------- | ----- | ------------ |
| this.$message | 可配置详细内容的弹窗     | String \| messageData |
| this.$message.success | 成功时的快捷用法 | String |
| this.$message.fail | 失败时的快捷用法 | String |
| this.$message.info | 消息时的快捷用法 | String |
| this.$message.warning | 警告时的快捷用法 | String |

### messageData 对象内容
| 内容      | 说明 | 参数类型 | 可选值 | 默认值 |
| ---------| --------- | ----- | --- | --- |
| content  | 文字内容 | String | - | - |
| type  | 类型 | String | "success", "fail","info","warning" | - |
| duration | 存在时间，ms | Number | - | 2000 |
| father | 元素所挂载的父元素 | Dom | - | document.body |
