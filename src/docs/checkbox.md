# checkbox 复选框

## 用法
::: demo
```html
<AmCheckbox v-model="checkbox" label="1">多选项一</AmCheckbox>
<AmCheckbox v-model="checkbox" label="2">多选项一</AmCheckbox>
<AmCheckbox v-model="checkbox" label="3">多选项一</AmCheckbox>
<AmCheckbox v-model="checkbox" label="4">多选项一</AmCheckbox>

<script>
export default {
    data(){
        return {
            checkbox: [],
        }
    }
}
</script>
```
:::