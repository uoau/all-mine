# Tag 标签

## 标签形式
::: demo
``` html
<AmTag text="纯文字" size="small"/>
<AmTag text="红色" color="red" level="dark"/>
<AmTag text="红色" color="red" level="dark" size="big"/>
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


## 大小
::: demo
``` html
<AmTag text="红色" color="red" level="dark" size="small"/>
<AmTag text="红色" color="red" level="dark"/>
<AmTag text="红色" color="red" level="dark" size="big"/>
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

## 颜色
::: demo
``` html
<AmTag text="红色" color="red" level="dark"/>
<AmTag text="橙色" color="orange" level="dark"/>
<AmTag text="黄色" color="yellow" level="dark"/>
<AmTag text="绿色" color="green" level="dark"/>
<AmTag text="青色" color="cyan" level="dark"/>
<AmTag text="蓝色" color="blue" level="dark"/>
<AmTag text="紫色" color="purple" level="dark"/>
<div style="height: 8px;"></div>
<AmTag text="红色" color="red"/>
<AmTag text="橙色" color="orange"/>
<AmTag text="黄色" color="yellow"/>
<AmTag text="绿色" color="green"/>
<AmTag text="青色" color="cyan"/>
<AmTag text="蓝色" color="blue"/>
<AmTag text="紫色" color="purple"/>

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

## 程度
dark 为深色模式，light为浅色模式
::: demo
``` html
<AmTag text="红色" color="red" level="dark"/>
<AmTag text="红色" color="red" level="light"/>

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

## 显示边框
::: demo
``` html
<AmTag text="红色" color="red" level="dark" show-border />
<AmTag text="红色" color="red" level="light" show-border />
<AmTag text="蓝色" color="blue" level="dark" show-border />
<AmTag text="蓝色" color="blue" level="light" show-border />

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

## 自定模式
::: demo
``` html
<AmTag text="惊喜价" mode="suprice" />

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
    &.is-suprice {
        color: red;
    }
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