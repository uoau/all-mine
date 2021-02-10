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
### 属性
| 内容      | 说明 | 参数类型 | 可选值 | 默认值 |
| ---------| --------- | ----- | --- | --- |
| show  | 显示 | Boolean |  | false |
| showClose  | 是否显示关闭按钮 | Boolean |  | true |
