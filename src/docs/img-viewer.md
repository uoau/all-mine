# Img Viewer 图片预览

## 用法
::: demo
``` html
<AmButton @click="showViewer">显示隐藏图片查看器</AmButton>
<AmImgViewer
    :show.sync="show"
    :imgs="imgs"
    :init-index="now"
/>

<script>
export default {
    data(){
        return {
            show: false,
            imgs: [
                {
                    url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606475893189&di=0f7af204d1c001075904648085f68479&imgtype=0&src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2F201503%2F19%2F211608ztcq7higicydxhsy.jpg',
                },
                {
                    url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606477599830&di=47fc7cb8336356d69fca8776a3216f62&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg',
                },
                {
                    url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3302399998,3216746631&fm=26&gp=0.jpg',
                },
                {
                    url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3300550661,1121971374&fm=11&gp=0.jpg',
                },
            ],
            now: 1,
        }
    },
    methods: {
        showViewer(){
            this.show = !this.show;
        }
    }
}
</script>
```
:::