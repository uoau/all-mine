# Tag 标签

## 预设模式
::: demo
``` html
<AmTag text="default" mode="default"/>
<AmTag text="primary" mode="primary"/>
<AmTag text="light-primary" mode="light-primary"/>
<AmTag text="border-primary" mode="border-primary"/>
<AmTag text="black" mode="black"/>
<AmTag text="text" mode="text"/>
<script>
export default {
    data(){
        return {

        }
    }
}
</script>

<style>
.am-tag {
    margin-right: 8px;
}
</style>
```
:::

## 大小
::: demo
``` html
<AmTag text="小标签" level="dark"/>
<AmTag text="中标签" level="dark" size="middle"/>
<AmTag text="大标签" level="dark" size="big"/>
<script>
export default {
    data(){
        return {
            value: '',
        }
    }
}
</script>
<style>
.am-tag {
    margin-right: 8px;
}
</style>
```
:::

## 关闭按钮
::: demo
``` html
<AmTag
    text="默认标签"
    show-delete
    :value="'默认标签'"
    @delete="deleteTag"
/>
<AmTag
    text="主题色标签"
    mode="primary"
    show-delete
    :value="'主题色标签'"
    @delete="deleteTag"
/>
<AmTag
    text="黑色标签"
    mode="black"
    show-delete
    :value="'黑色标签'"
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
<style>
.am-tag {
    margin-right: 8px;
}
</style>
```
:::

| 参数       | 说明        | 类型       | 可选值         | 默认值   |
|---------- |------------ |---------- |-------------  |-------- |
| text | 文字内容 | String | | | ’tag content‘ |
| size | 大小 | String | small middle big | middle |
| color | 颜色 | String | 红橙黄绿青蓝紫黑白灰 | gray |
| show-border | 显示边框 | Boolean |  | true |
| level | 颜色程度，浅底还是深底 | String | 'dark' 'light' | light |
| show-delete | 显示删除 | Boolean |  | false |
| value | 携带值，方便事件处理 | Any | | |
| mode | 自定义模式 | String | | |