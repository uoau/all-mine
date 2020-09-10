# Popup 弹出层

## 用法
::: demo
``` html
<AmButton @click="show = !show">显示隐藏</AmButton>
<AmPopup :show.sync="show"/>

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