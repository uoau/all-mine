# Table 表格

# 用法
::: demo
```html
<AmTable :data="list" height="200px">
    <AmTableColumn label="姓名" prop="name"></AmTableColumn>
    <AmTableColumn label="年龄" prop="age" :width="300">
        <template v-slot:default="row">
            {{ row.name + row.age }}
        </template>
    </AmTableColumn>
</AmTable>
<script>
export default {
    data(){
        return {
            list: [
                {name: '小红', age: 12},
                {name: '小蓝', age: 13},
                {name: '小白', age: 15},
                {name: '小黑', age: 19},
                {name: '小红', age: 12},
                {name: '小蓝', age: 13},
                {name: '小白', age: 15},
                {name: '小黑', age: 19},
            ]
        }
    }
}
</script>
```
:::

## AmTable Attributes

| 参数       | 说明        | 类型       | 可选值         | 默认值   |
|---------- |------------ |---------- |-------------  |-------- |
| data | 数据列表 | array | | |
| height | 内容区域的高度 | string | 200px | - |
| align | 内容对齐方式 | string | 'left' 'center' 'right' | 'left' |

## AmTableItem Attributes

| 参数       | 说明        | 类型       | 可选值         | 默认值   |
|---------- |------------ |---------- |-------------  |-------- |
| data | 数据列表 | array | | |
| height | 内容区域的高度 | string | 200px | - |
| align | 内容对齐方式 | string | 'left' 'center' 'right' | 'left' |