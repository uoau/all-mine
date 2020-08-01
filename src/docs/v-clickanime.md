# v-clickanime
当点击元素时，参数动画，适用于按钮等需要反馈的元素。


## 用法
::: demo
``` html
<div @click="value++" v-clickanime="'is-down'">点我试试看</div>
<script>
export default {
    data(){
        return {
            value: 1,
        }
    }
}
</script>

<style>
    div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 50px;
        background: #eee;
        cursor: pointer;
        transition: transform .5s;
    }
    .is-down {
        transform: rotate(360deg);
    }
</style>
```
:::
注意事项：被绑定的元素必须有 transition 才可以生效。