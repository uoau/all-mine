# Label

::: demo
``` html
<AmLabel label-name="你好">
    <AmInput v-model="value" :value="value" :match="/^[0-9]*$/"/>
</AmLabel>
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
