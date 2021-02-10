# Table 表格

## 用法
::: demo
```html
<AmTable
    :data="list"
    height="200px"
    @sort-change="sortChange"
>
    <AmTableColumn label="姓名" prop="name"></AmTableColumn>
    <AmTableColumn label="年龄" prop="age" :width="300">
        <template v-slot:default="row">
            {{ row.name + row.age }}
        </template>
    </AmTableColumn>
    <AmTableColumn label="年龄" prop="age" sort></AmTableColumn>
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
    },
    methods: {
        sortChange(sort){
            console.log(sort);
        }
    }
}
</script>
```
:::

## AmTable 属性

| 参数       | 说明        | 类型       | 可选值         | 默认值   |
|---------- |------------ |---------- |-------------  |-------- |
| data | 数据列表 | Array | | |
| height | 内容区域的高度(一旦设置，就锁定表头) | String | 200px | - |
| align | 内容对齐方式 | String | 'left' 'center' 'right' | 'left' |
| rowClass | 设置行的类名 | Function | (row[行数据]) |  |

## AmTable 事件

| 事件       | 说明        | 参数       |
|---------- |------------ |---------- |
| @click-row | 点击行 | (row[行数据]) |
| @click-cell | 点击单元格 | (row[行数据], column[列数据]) |
| @sort-change | 当排序改变时间 | (sort[排序对象]) |


## AmTableItem 属性

| 参数       | 说明        | 类型       | 可选值         | 默认值   |
|---------- |------------ |---------- |-------------  |-------- |
| label | 表头名称 | String | | |
| prop | 绑定的属性key名 | String | | |
| sort | 开启排序（必须设置prop） | Boolean |  | false |
| width | 本栏宽度 | String | | |
