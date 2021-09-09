# Tag 标签

## 预设模式
::: demo
``` html
<AmTag text="default" mode="default"/>
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

## 关闭按钮
::: demo
``` html
<AmTag
    text="默认标签"
    show-delete
    :value="'默认标签'"
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
| mode | 模式 | String | 'default' 'primary' 'border-primary' 'black' | 'default' |
| text | 文字内容 | String | | | ’tag content‘ |
| show-delete | 显示删除 | Boolean |  | false |
| value | 携带值，方便事件处理 | Any | | |


## 事件

| 事件       | 说明        | 参数       |
|---------- |------------ |---------- |
| @delete | 点击删除按钮 | (value[携带值]) |
| @click | 点击标签 | (value[携带值]) |
