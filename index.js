const mdLoader = require('./show-page/build/md-loader/index');

const res = mdLoader(`
# nihao
< 2222
::: demo
\`\`\`html
<template>
    <div>
        <button v-on:click="count++">You clicked me {{ count }} times.</button>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            count: 0,
        };
    },
}
</script>
\`\`\`
:::
`);

console.log(res);
