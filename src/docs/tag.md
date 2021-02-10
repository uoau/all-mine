# Tag 标签

## 预设模式
::: demo
``` html
<AmTag text="default" mode="default"/>
<AmTag text="primary" mode="primary"/>
<AmTag text="border-primary" mode="border-primary"/>
<AmTag text="black" mode="black"/>
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


## 属性

| 参数       | 说明        | 类型       | 可选值         | 默认值   |
|---------- |------------ |---------- |-------------  |-------- |
| text | 文字内容 | String | | | ’tag content‘ |
| size | 大小 | String | small middle big | middle |
| show-delete | 显示删除 | Boolean |  | false |
| value | 携带值，方便事件处理 | Any | | |
| mode | 模式 | String | 'default' 'primary' 'border-primary' 'black' | 'default' |


## 事件

| 事件       | 说明        | 参数       |
|---------- |------------ |---------- |
| @delete | 点击删除按钮 | (value[携带值]) |
| @click | 点击标签 | (value[携带值]) |
