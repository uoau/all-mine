# 图片上传 Upload

## 用法
::: demo
``` html
<AmUpload :multiple="true" @after-selected="afterSelected"/>

<script>
export default {
    data(){
        return {
            value: '',
        }
    },
    methods: {
        afterSelected(file) {
            console.log(file);
        }
    }
}
</script>
```
:::