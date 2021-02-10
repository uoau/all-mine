# Popup 弹出层

## 用法
::: demo
``` html
<AmButton @click="show = !show">显示隐藏</AmButton>
<AmPopup
    :show.sync="show"
    :mask-close="true"
    title="这是弹出层的标题"
>
    <template>
        主体内容
    </template>

    <template slot="ft">
        底部内容
    </template>
</AmPopup>

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

## 属性

| 参数       | 说明        | 类型       | 可选值         | 默认值   |
|---------- |------------ |---------- |-------------  |-------- |
| show      | 是否显示      |  Boolean  |    |   false   |
| mask |  是否显示遮掩层  |  Boolean  |  | false |
| mask-close |  是否打开点击遮掩层关闭  |  Boolean  |  | false |
| title |  标题文本  |  String  |  | '' |
| show-close-btn |  是否显示关闭按钮  |  Boolean  |  | false |
| width |  窗口宽度  |  String  |  | ‘480px’ |
| height |  窗口高度  |  String  |  |  |



