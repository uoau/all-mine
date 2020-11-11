# 图标
定义了一些默认图标。

## 用法
支持设置`size`和`color`属性。
::: demo
```html
<AmIcon name="error" :size="28" />
<AmIcon name="message" :size="28" color="#999"/>

<style>
.am-icon {
    margin-right: 10px;
}
</style>
```
:::

## 属性
| 参数       | 说明        | 类型       | 例子         | 默认值   |
|---------- |------------ |---------- |-------------  |-------- |
| **size**  | 尺寸         | Number   |   30           |    —    |
| **color** | 颜色         | String   | red / #666 / rgba(255,255,255,1) |    —    |

## 默认图标
::: example
``` html
<div class="box">
    <div class="item" v-for="(item,index) in iconList" :key="index">
        <AmIcon :name="item" :size="28"/>
        <span @click="copy(item)">{{ item }}</span>
    </div>
</div>
<script>
    export default {
        data(){
            return {
                iconList:["see","calendar","calendar-fill","plus","ellipsis","doubleleft","doubleright","check2","check-circle-fill","close-circle-fill","info-circle-fill","warning-circle-fill","check-circle","close-circle","info-circle","warning-circle","sync","reload","message","poweroff","logout","setting","edit-square","save","file-text","folder","folder-open","cloud-upload","cloud-download","error","edit","link","right","left","up","down","arrowright","arrowup","arrowleft","arrowdown","menu","check","close","caret-down","caret-up","caret-right","caret-left","search"],
            }
        },
        methods: {
            copy(content) {
                const copyContent = this.$clipboard(content);
                if(copyContent){
                    this.$message.success(`复制成功${content}`);
                }
            }
        }
    }
</script>
<style>
.box {
    .item {
        width: 100px;
        height: 100px;
        margin-bottom: 20px;
        margin-right: calc(50px / 6);
        display: inline-flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        color: #666;
        &:nth-child(7n) {
            margin-right: 0;
        }
        .am-icon {
            margin-bottom: 20px;
        }
        span {
            display: inline-flex;
            padding: 0 4px;
            border-radius: 2px;
            text-align: center;
            font-size: 14px;
            cursor: pointer;
            &:hover {
                background: #666;
                color: #fff;
            }
        }
    }
}
</style>
```
:::