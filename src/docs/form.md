# 表单 Form

## 用法
::: demo
``` html
<AmForm position="top" label-width="100px">
    <AmFormItem label-name="姓名" position="top" required>
        <AmInput v-model="value" :value="value" :match="/^[0-9]*$/"/>
    </AmFormItem>
    <AmFormItem label-name="账号" position="left" required>
        <AmInput v-model="value" :value="value" :match="/^[0-9]*$/"/>
    </AmFormItem>
    <AmFormItem label-name="密码" position="right" label required>
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
