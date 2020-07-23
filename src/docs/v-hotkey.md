# v-hotkey
为元素添加快捷键事件。
> 功能来源 `https://www.npmjs.com/package/v-hotkey`

## 用法
::: demo
``` html
<p>{{ count }}</p>
<AmButton v-hotkey="keymap">按下`↑`增加，按下`↓`减少</AmButton>

<script>
export default {
    data() {
        return {
            count: 1,
        }
    },
    computed: {
        keymap() {
            return {
                'up': {
                    keydown: this.add,
                },
                'down': {
                    keydown: this.reduce,
                }
            }
        }
    },
    methods: {
        add() {
            this.count++;
        },
        reduce() {
            this.count--;
        }
    }
}
</script>
<style>
p {
    color: red;
}
</style>
```
:::

