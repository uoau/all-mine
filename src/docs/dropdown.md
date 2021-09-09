# Dropdown 下拉菜单
下拉菜单组件

## 用法
::: demo
``` html
<AmDropdown update-placeholder>
    <AmDropdownItem label="死亡细胞死亡细胞">死亡细胞死亡细胞</AmDropdownItem>
    <AmDropdownItem label="王者荣耀">王者荣耀</AmDropdownItem>
    <AmDropdownItem label="英雄联盟">英雄联盟</AmDropdownItem>
    <AmDropdownItem label="我的世界">我的世界</AmDropdownItem>
</AmDropdown>
<AmDivider />
<AmDropdown type="text" placeholder="我的账号" trigger="hover">
    <AmDropdownItem label="登录">登录</AmDropdownItem>
    <AmDropdownItem label="注册">注册</AmDropdownItem>
    <AmDropdownItem label="退出">退出</AmDropdownItem>
</AmDropdown>
<script>
    export default {
        data() {
            return {
            }
        }
    }
</script>
```
:::

## AmDropdown 属性

| 参数       | 说明        | 类型       | 可选值         | 默认值   |
|---------- |------------ |---------- |-------------  |-------- |
| type | 类型 | String | 'default' text | 'default' |
| placeholder | 占位内容 | String | | '请选择' |
| update-placeholder | 点击选项是否更新placeholder | Boolean | | false |
| trigger | 触发下拉的方式 | String | 'click' ‘hover’ | 'click' |

## AmDropdownItem 属性

| 参数       | 说明        | 类型       | 可选值         | 默认值   |
|---------- |------------ |---------- |-------------  |-------- |
| update-placeholder | 点击选项是否更新placeholder | Boolean | | false |
| trigger | 触发下拉的方式 | String | 'click' ‘hover’ | 'click' |

