# v-fold
可以代替v-show 来显示隐藏元素，使用这个指令会有折叠的过度效果

## 用法
注意事项：设置指令的元素不要使用max-height
::: demo
``` html
<AmButton class="btn" @click="()=>{ show = !show }">点击折叠/展开</AmButton>
<ul class="box" v-fold="show">
    <li>银时</li>
    <li>假发</li>
    <li>高杉晋助</li>
    <li>哇哈哈哈</li>
</ul>

<script>
export default {
    data(){
        return {
            show: true,
        }
    }
}
</script>

<style>
.btn {
    margin-bottom: 10px;
}
.box {
    background: #eee;
    border: 20px solid #ddd;
    padding: 10px;
    list-style: none;
    ul,li {
        list-style: none;
    }
}
</style>
```
:::