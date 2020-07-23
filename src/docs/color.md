# 颜色
定义一套属于自己的颜色

## 系统色
::: example
``` html
<!-- <p>字体色</p> -->
<ul>
    <li style="background: #fff;color: #333;border:1px solid #e5e5e5;">#333</br>正文文字</li>
    <li style="background: #fff;color: #666;border:1px solid #e5e5e5;">#666</br>内容文字</li>
    <li style="background: #fff;color: #999;border:1px solid #e5e5e5;">#999</br>辅助文字</li>
</ul>
<!-- <p>边框色、背景灰</p> -->
<ul>
    <li style="background: #fff;border:1px solid #e5e5e5;color:#333;">#e5e5e5</br>边框灰</li>
    <li style="background: #f7f7f7;color: #333;border:1px solid #e5e5e5;color:#333;">#f7f7f7</br>背景灰</li>
</ul>
<!-- <p>功能色：成功绿、失败红、警示黄、信息灰</p> -->
<ul>
    <li style="background: #72c140;">#72c140</br>成功</li>
    <li style="background: #ec5b5c;">#ec5b5c</br>失败</li>
    <li style="background: #efb041;">#efb041</br>警示</li>
    <li style="background: #909399;">#909399</br>信息</li>
</ul>

<style>
ul {
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    li {
        width: 180px;
        height: 70px;
        list-style: none;
        margin-right: 10px;
        border-radius: 3px;
        color: #fff;
        padding: 5px 10px;
        &:nth-child(4n) {
            margin-right: 0;
        }
    }
}
</style>
```
:::

## 主题色
::: example
``` html
<!-- <p>字体色</p> -->
<ul>
    <li style="background: #fff;color: #333;border:1px solid #e5e5e5;" v-clipboard="'#333'">#333</br>正文文字</li>
    <li style="background: #fff;color: #666;border:1px solid #e5e5e5;" v-clipboard="'#666'">#666</br>内容文字</li>
    <li style="background: #fff;color: #999;border:1px solid #e5e5e5;"  v-clipboard="'#999'">#999</br>辅助文字</li>
</ul>
<!-- <p>边框色、背景灰</p> -->
<ul>
    <li style="background: #fff;border:1px solid #e5e5e5;color:#333;">#e5e5e5</br>边框灰</li>
    <li style="background: #f7f7f7;color: #333;border:1px solid #e5e5e5;color:#333;">#f7f7f7</br>背景灰</li>
</ul>
<!-- <p>功能色：成功绿、失败红、警示黄、信息灰</p> -->
<ul>
    <li style="background: #72c140;">#72c140</br>成功</li>
    <li style="background: #ec5b5c;">#ec5b5c</br>失败</li>
    <li style="background: #efb041;">#efb041</br>警示</li>
    <li style="background: #909399;">#909399</br>信息</li>
</ul>

<style>
ul {
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    li {
        width: 180px;
        height: 70px;
        list-style: none;
        margin-right: 10px;
        border-radius: 3px;
        color: #fff;
        padding: 5px 10px;
        &:nth-child(4n) {
            margin-right: 0;
        }
    }
}
</style>
```
:::