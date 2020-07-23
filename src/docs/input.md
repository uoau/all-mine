# Input 输入框

::: demo
``` html
<AmInput v-model="value" :value="value" :match="/^[0-9]*$/"/>
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
