# Dropdown 下拉菜单

## 用法
::: demo
``` html
<AmDropdown update-placeholder>
    <AmDropdownItem label="死亡细胞死亡细胞">死亡细胞死亡细胞</AmDropdownItem>
    <AmDropdownItem label="王者荣耀">王者荣耀</AmDropdownItem>
    <AmDropdownItem label="英雄联盟">英雄联盟</AmDropdownItem>
    <AmDropdownItem label="我的世界">我的世界</AmDropdownItem>
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

## 自定义内容
::: demo
``` html
<AmDropdown>
123123
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

### 触发方式 hover和click
::: demo
``` html
<AmDropdown update-placeholder>
    <AmDropdownItem label="死亡细胞死亡细胞">死亡细胞死亡细胞</AmDropdownItem>
    <AmDropdownItem label="王者荣耀">王者荣耀</AmDropdownItem>
    <AmDropdownItem label="英雄联盟">英雄联盟</AmDropdownItem>
    <AmDropdownItem label="我的世界">我的世界</AmDropdownItem>
</AmDropdown>
<AmDivider />
<AmDropdown update-placeholder trigger="hover">
    <AmDropdownItem label="死亡细胞">死亡细胞</AmDropdownItem>
    <AmDropdownItem label="王者荣耀">王者荣耀</AmDropdownItem>
    <AmDropdownItem label="英雄联盟">英雄联盟</AmDropdownItem>
    <AmDropdownItem label="我的世界">我的世界</AmDropdownItem>
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