# 字体
全局统一字体。

``` css
* {
    font-family:
        'Helvetica Neue',                 /* 英文正文字体 */
        -apple-system,BlinkMacSystemFont, /* 包括苹方 */
        'Microsoft YaHei',                /* 使用雅黑 */
        'Segoe UI Emoji',                 /* 微软系 emoji 表情 */
        'Apple Color Emoji';              /* 苹果系 emoji 表情 */
}
code {
    font-family: 'Menlo';                 /* 适用于显示代码字体 */
}
```

## 字体下载网站
[fontspace](https://www.fontspace.com/): 免费


## 英文 - 正文
正文字体在精不在多，所以无衬线、衬线、代码字体各选一款。

::: example
``` html
<div class="font-box">
    <table>
        <tr><th>字体名称</th><th>展示(16px)</th></tr>
        <tr>
            <td>'Helvetica Neue'</td>
            <td class="hn">It has not been the time yet to give up as long as you still feel it is not the end.</td>
        </tr>
        <tr>
            <td>'Georgia'</td>
            <td class="georgia">It has not been the time yet to give up as long as you still feel it is not the end.</td>
        </tr>
        <tr>
            <td>'Menlo'</td>
            <td class="menlo">function add(a,b) {return a + b;}</td>
        </tr>
    </table>
</div>

<style>
    .font-box {
        margin-bottom: 16px;
        table {
            min-width: 100%;
            border: 1px solid #ccc;
            margin-bottom: 16px;
            text-align: left;
            th {
                padding: 6px 13px;
                border: 1px solid #ccc;
                font-weight: 600;
                background: #f2f2f2;
            }
            td {
                padding: 6px 13px;
                border: 1px solid #ccc;
                &:nth-child(1) {
                    width: 30%;
                }
                &:nth-child(2) {
                    width: 70%;
                }
            }
        }
    }
    .menlo {
        font-family: 'Menlo';
    }
    .hn {
        font-family: 'Helvetica Neue';
    }
    .georgia {
        font-family: 'Georgia';
    }
</style>
```
:::

## 中文 - 正文
同理，正文字体，从黑体和宋体各选一款。

::: example
``` html
<div class="font-box">
    <table>
        <tr><th>字体名称</th><th>展示(16px)</th></tr>
        <tr>
            <td>-apple-system,<br/>BlinkMacSystemFont</td>
            <td class="apple">好风凭借力，送我上青天。</td>
        </tr>
        <tr>
            <td>'Microsoft YaHei'</td>
            <td class="my">明日复明日，明日何其多。</td>
        </tr>
    </table>
</div>
<style>
    .font-box {
        margin-bottom: 16px;
        table {
            min-width: 100%;
            border: 1px solid #ccc;
            margin-bottom: 16px;
            text-align: left;
            th {
                padding: 6px 13px;
                border: 1px solid #ccc;
                font-weight: 600;
                background: #f2f2f2;
            }
            td {
                padding: 6px 13px;
                border: 1px solid #ccc;
                &:nth-child(1) {
                    width: 30%;
                }
                &:nth-child(2) {
                    width: 70%;
                }
            }
        }
    }
    .my {
        font-family: 'Microsoft YaHei';
    }
    .apple {
        font-family: -apple-system, BlinkMacSystemFont;
    }
</style>
```
:::

## 英语 - 个性
英语个性字体在多不在精，合适的场景用合适的字体。

::: example
``` html
<div class="font-box">
    <table>
        <tr><th>字体名称</th><th>展示(16px)</th></tr>
        <tr>
            <td>-apple-system,<br/>BlinkMacSystemFont</td>
            <td class="apple">好风凭借力，送我上青天。</td>
        </tr>
        <tr>
            <td>'Microsoft YaHei'</td>
            <td class="my">明日复明日，明日何其多。</td>
        </tr>
    </table>
</div>
<style>
    .font-box {
        margin-bottom: 16px;
        table {
            min-width: 100%;
            border: 1px solid #ccc;
            margin-bottom: 16px;
            text-align: left;
            th {
                padding: 6px 13px;
                border: 1px solid #ccc;
                font-weight: 600;
                background: #f2f2f2;
            }
            td {
                padding: 6px 13px;
                border: 1px solid #ccc;
                &:nth-child(1) {
                    width: 30%;
                }
                &:nth-child(2) {
                    width: 70%;
                }
            }
        }
    }
    .my {
        font-family: 'Microsoft YaHei';
    }
    .apple {
        font-family: -apple-system, BlinkMacSystemFont;
    }
</style>
```
:::

## 中文 - 个性

## 数字
