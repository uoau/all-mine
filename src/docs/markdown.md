# Markdown Style

In order to show the markdown style I use. I need to write some content. But what should I write about? Oh，I can write the usage of markdown.

## Title
Start with `#` and write down the title content, like this below.

``` markdown
# h1
## h2
### h3
#### h4
##### h5
###### h6
```

## Special Text
`code`
*italics text*
**blod text**
[link](https://github.com)

``` markdown
`code`
*italics text*
**blod text**
[link](https://github.com)
```

## Widget
___
![img](https://github.com)
> blockquote
``` markdown
___
![img](https://github.com)
> blockquote
```

## List

1. If by life you were deceived,
2. Don't be dismal,don't be wild!

* In the day of grief,be mild:
* Merry days will come,believe.

```markdown
1. If by life you were deceived,
2. Don't be dismal,don't be wild!

* In the day of grief,be mild:
* Merry days will come,believe.
```

## Table

| name      | level | market value |
| --------- |:-----:| ------------:|
| Tencent   | 1     | 12345E       |
| Alibaba   | 2     | 1234E        |
| ByteDance | 3     | 123E         |

``` markdown
| name      | level | market value |
| --------- |:-----:| ------------:|
| Tencent   | 1     | 12345E       |
| Alibaba   | 2     | 1234E        |
| ByteDance | 3     | 123E         |
```

## Demo
::: demo
```html
<AmButton @click='add'>You clicked me {{ count }} times.</AmButton>

<script>
export default {
    data() {
        return {
            count: 0,
        };
    },
    methods: {
        add(){
            this.count++;
        }
    }
}
</script>
```
:::

