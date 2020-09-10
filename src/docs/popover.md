# Popover 弹出框
一个比较底层的组件，用于各种粘附性弹出层组件。例如下拉选择、下拉菜单、日历组件等等

::: demo
``` html
<AmButton ref="zz" @click="()=>{ show=!show }">这是一个平平无奇的按钮</AmButton>
<AmPopover
    v-if="linkEl"
    :link-el="linkEl"
    :show.sync="show"
>
    <div>你好你好你好<br/>你好你好你好你好<br/>你好你好你好<br/>你好你好你好<br/>你好你好你好<br/></div>
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
    }
}
</script>
```
:::

::: example
``` html
<div></div>
<style>
    div {
        height: 2000px;
    }
</style>
```
:::