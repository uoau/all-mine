/*
 * @Author: xux
 * @Date: 2020-07-08 13:33:06
 * @Description: new md container
 */

const md = require('markdown-it')();
const mdContainer = require('markdown-it-container');

md.use(mdContainer, 'demo', {
    validate: (params) => params.trim().match(/^demo(.*)$/),

    render: (tokens, idx) => {
        const m = tokens[idx].info.trim().match(/^demo(.*)$/);
        if (tokens[idx].nesting === 1) {
            return `<!--vue-demo start-->${m[1]}`;
        }
        return '\n<!--vue-demo end-->';
    },
});

md.use(mdContainer, 'example', {
    validate: (params) => params.trim().match(/^example(.*)$/),

    render: (tokens, idx) => {
        const m = tokens[idx].info.trim().match(/^example(.*)$/);
        if (tokens[idx].nesting === 1) {
            return `<!--vue-example start-->${m[1]}`;
        }
        return '\n<!--vue-example end-->';
    },
});

module.exports = md;
