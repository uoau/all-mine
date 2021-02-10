# Popover 弹出框
一个比较底层的组件，用于各种粘附性弹出层组件。例如下拉选择、下拉菜单、日历组件等等

::: demo
``` html
<AmButton ref="zz" @click="click">这是一个平平无奇的按钮</AmButton>
<AmPopover
    v-if="linkEl"
    :link-el="linkEl"
    :show.sync="show"
>
    <div>你好你好你好你好你好你好你好你好你好<br/>你好你好你好你好<br/>你好你好你好<br/>你好你好你好<br/>你好你好你好<br/></div>
</AmPopover>
</div>
<script>
export default {
    data() {
        return {
            linkEl: '',
            show: false,
        }
    },
    mounted() {
        this.linkEl = this.$refs.zz.$el;
    },
    methods: {
        click(){
            this.show = !this.show;
        }
    }
}
</script>
```
:::

## 属性

| 参数       | 说明        | 类型       | 默认值         |
|---------- |------------ |---------- |-------------  |
| linkEl   | 关联元素       | Dom   | |              |
| xDirection      | 框体左对齐/右对齐         | String      | 'left' 'right' |
| yDirection      | 框体出现的位置         | String      | ‘auto’ 'top' 'bottom' |
| width      | 弹出框宽度         | Number      |  |
| height      | 弹出框宽度         | Number      |  |
| apWidthFollowFather      | 弹出框至少父元素宽         | Boolean      | true |

