# Radio 单选框

## 用法
::: demo
```html
<AmRadio v-model="value" :value="1">单选项一</AmRadio>
<AmRadio v-model="value" :value="2">单选项二</AmRadio>
<AmRadio v-model="value" :value="3">单选项三</AmRadio>
<script>
export default {
    data(){
        return {
            value: '',
        }
    }
}
</script>
```
:::