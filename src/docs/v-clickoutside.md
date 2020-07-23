# v-clickoutside
当点击外部时触发,适用于一些弹出层的隐藏
> 代码来源于element

## 用法
::: demo
``` html

<AmButton v-clickoutside="clickOutside">{{ text }}</AmButton>

<script>
export default {
    data() {
        return {
            text: '我是按钮',
            timer: null,
        }
    },
    methods: {
        clickOutside(){
            if(this.timer){
                clearTimeout(this.timer);
            }
            this.text = '外部被点击了';
            this.timer = setTimeout(()=>{
                this.text = '我是按钮'
            },1000);
        }
    }
}
</script>
```
:::

