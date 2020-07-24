# Backtop 回到顶部
通过api调用，让滚动元素平滑滚动到顶部

↓ 请往下滑
::: example
``` html
<div></div>
<style>
    div {
        height: 2000px;
    }
</style>
```
:::

::: demo
``` html
<AmButton @click="backtop">回到顶部</AmButton>

<script>
export default {
    methods: {
        backtop() {
            this.$backtop({
                father: document.querySelector('.app-main'),
            });
        }
    }
}
</script>
```
:::

## API
| API      | 说明 | 参数类型 |
| --------- | ----- | ------------ |
| this.$backtop | 将可滚动元素平滑滚动到顶部     | backtopData |

### backtopData 对象内容
| 内容      | 说明 | 参数类型 | 可选值 | 默认值 |
| ---------| --------- | ----- | --- | --- |
| duration | 滚动时间，ms | Number | - | 2000 |
| father | 要被滚动的元素 | Dom | - | document.body |
