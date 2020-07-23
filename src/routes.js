/*
 * @Author: XuX
 * @Date: 2020-07-08 13:15:00
 * @Description: routes file
 */

const nav = [
    {
        name: 'BASE',
        children: ['usage', 'color', 'icon', 'font'],
    },
    {
        name: 'STYLESHEET',
        children: ['reset.css', 'markdown.css'],
    },
    {
        name: 'UTILS',
        children: ['RegExp', 'array'],
    },
    {
        name: 'COMPONENT',
        children: ['button', 'input', 'label', 'divider', 'bread'],
    },
    {
        name: 'DIRECTIVES',
        children: ['v-clipboard', 'v-hotkey', 'v-clickoutside', 'v-lazyload', 'v-fold'],
    },
];

const routes = [];
nav.forEach((one) => {
    one.children.forEach((two) => {
        // eslint-disable-next-line import/no-dynamic-require
        const component = (r) => require.ensure([], () => r(require(`./docs/${two}.md`)), 'component');
        routes.push({
            path: `/${two}`,
            component,
        });
    });
});

export {
    nav,
    routes,
};
