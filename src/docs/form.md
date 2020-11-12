# 表单 Form

## 用法
::: demo
``` html
<AmForm position="top" label-width="80px">
    <AmFormItem label="姓名">
        <AmInput v-model="value" :value="value" :match="/^[0-9]*$/"/>
    </AmFormItem>
    <AmFormItem label="账号" position="left" required>
        <AmInput v-model="value" :value="value" :match="/^[0-9]*$/"/>
    </AmFormItem>
    <AmFormItem label="密码" position="right" required>
        <AmInput v-model="value" :value="value" :match="/^[0-9]*$/"/>
    </AmFormItem>
</AmForm>
<script>
    export default {
        data() {
            return {
                value: '1234567890'
            }
        }
    }
</script>
```
:::

## Form Attributes

| 参数       | 说明        | 类型       | 可选值         | 默认值   |
|---------- |------------ |---------- |-------------  |-------- |
| label-width      | label宽度         | string   | 100px   |    80px    |
| position      | label所处位置         | string   | 'top' 'left' 'right'   |    'left'    |


## FormItem Attributes

| 参数       | 说明        | 类型       | 可选值         | 默认值   |
|---------- |------------ |---------- |-------------  |-------- |
| label      | label名字         | string   | 100px   |    80px    |
| required      | 是否显示必填*        | boolean   | -   |    false    |
| label-width      | label宽度         | string   | 100px   |    80px    |
| position      | label所处位置         | string   | 'top' 'left' 'right'   |    'left'    |


