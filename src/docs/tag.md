# Tag 标签

## 大小
::: demo
``` html
<AmTag text="标签小small" size="small"/>
<AmDivider />
<AmTag text="标签中middle" size="middle"/>
<AmDivider />
<AmTag text="标签大large" size="large"/>

<script>
export default {
    data(){
        return {
            value: '',
        }
    }
}
</script>
```
:::

## 颜色
::: demo
``` html
<AmTag text="主题色标签" color="primary"/>

<script>
export default {
    data(){
        return {
            value: '',
        }
    }
}
</script>
```
:::

## 关闭按钮
::: demo
``` html
<AmTag
    text="主题色标签"
    color="primary"
    show-delete
    :value="'主题色标签'"
    @delete="deleteTag"
/>

<script>
export default {
    data(){
        return {
            value: '',
        }
    },
    methods: {
        deleteTag(value){
            console.log(value);
        }
    }
}
</script>
```
:::