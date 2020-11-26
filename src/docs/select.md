# Select 选择器

::: demo
``` html
<AmSelect v-model="value" style="width: 200px;">
    <AmOption
        v-for="item in options"
        :item="item"
        :key="item.value"
    >
        {{ item.label }}
    </AmOption>
</AmSelect>
<br/>
<AmSelect
    v-model="value2"
    :multiple="true"
    style="width: 500px;"
>
    <AmOption
        v-for="item in options"
        :item="item"
        :key="item.value"
    >
        {{ item.label }}
    </AmOption>
</AmSelect>

<script>
export default {
    data(){
        return {
            value: '',
            value2: [],
            options: [
                {
                    value: '1',
                    label: '选项一',
                },
                {
                    value: '2',
                    label: '选项二',
                },
                {
                    value: '3',
                    label: '选项三',
                },
                {
                    value: '4',
                    label: '选项四',
                },
                {
                    value: '5',
                    label: '选项五',
                },
                {
                    value: '6',
                    label: '选项六',
                },
                {
                    value: '7',
                    label: '选项七',
                },
                {
                    value: '8',
                    label: '选项八',
                },
                {
                    value: '9',
                    label: '选项九',
                },
                {
                    value: '10',
                    label: '选项十',
                }
            ]
        }
    }
}
</script>
```
:::