# 固定底部栏

::: demo
``` html
<template>
    <AmFixedBottomBar>
        <div class="left">
            <AmButton>按钮一</AmButton>
            <AmButton>按钮二</AmButton>
        </div>
        <div class="right">
            <AmPagination :current.sync="page" :total="total"/>
        </div>
    </AmFixedBottomBar>
</template>
<script>
export default {
    data(){
        return {
            page: 1,
            total: 100,
        }
    }
}
</script>


<style>
.am-fixed-bottom-bar {
    background: #fff;
    box-shadow: var(--shadow-1);
    display: flex;
    justify-content: space-between;
    padding: 24px;
}
.am-fixed-bottom-bar .left {

}
.am-fixed-bottom-bar .right {

}
</style>
```
:::