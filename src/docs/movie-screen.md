# Movie Scrren 电影银幕
其实就是展开一块黑幕，主要用于预览图片、看视频、页面等，有聚焦的感觉，更带感，OHYEAH ~

## 演示
::: demo
``` html
<AmButton @click="show=true">显示电影银幕</AmButton>
<AmMovieScreen :show.sync="show">
    123
</AmMovieScreen>

<script>
export default {
    data(){
        return {
            show: false,
        }
    }
}
</script>
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
