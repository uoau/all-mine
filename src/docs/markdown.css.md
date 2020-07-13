# markdown.css

If you use `markdown-it` or `marked` to resolve .md file. You will get an html code without style. So you need to load a style to mark your page beautiful.

You can use [github-markdown-css](https://www.npmjs.com/package/github-markdown-css), It's in the GitHub style. Or you can use markdown style of this project.

## Usage
First, you need to wrap your html code in `<div class="markdown-page"></div>`, like this below.
``` html
<div class="markdown-page">
    <h2>the title</h2>
</div>
```

Then, you need to import the style in your project. You can improt it
 in js code.
``` javascript
import 'all-mine/stylesheet/markdown.css';
```
Or in css code.
``` css
@import '~all-mine/stylesheet/markdown.css';
```

## Show

### h1h2 title is above, this is h3 title.

#### This is h4 title.There are also h5h6 title.


[Alibaba](www.alibaba.com) is the best Internet company, but I want to join `Tencent`, or **BILIBILI** is also OK, But *Baidu* is No.

1. If by life you were deceived,
2. Don't be dismal,don't be wild!

* In the day of grief,be mild:
* Merry days will come,believe.

| name      | level | market value |
| --------- |:-----:| ------------:|
| Tencent   | 1     | 12345E       |
| Alibaba   | 2     | 1234E        |
| ByteDance | 3     | 123E         |

``` markdown
### h1h2 title is above, this is h3 title.

#### This is h4 title.There are also h5h6 title.

[Alibaba](www.alibaba.com) is the best Internet company, but I want to join `Tencent`, or **BILIBILI** is also OK, but *Baidu* is No.

1. If by life you were deceived,
2. Don't be dismal,don't be wild!

* In the day of grief,be mild:
* Merry days will come,believe.

| name      | level | market value |
| --------- |:-----:| ------------:|
| Tencent   | 1     | 12345E       |
| Alibaba   | 2     | 1234E        |
| ByteDance | 3     | 123E         |

```
