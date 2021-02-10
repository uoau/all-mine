# v-loading

## 用法
::: demo
``` html
<AmButton @click="()=>{ loading =!loading }">{{ loading ? '关闭': '开启' }}</AmButton>
<div class="box" v-loading="loading">
    <input />
</div>

<script>
export default {
    data(){
        return {
            loading: false,
        }
    }
}
</script>

<style>
.box {
    width: 100%;
    height: 200px;
    background: pink;
    margin-top: 16px;
    position: relative;
    border: 1px solid red;
}
</style>
```
:::