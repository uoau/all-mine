/*
 * @Author: XuX
 * @Date: 2020-07-08 13:15:00
 * @Description: routes file
 */

const nav = [
    {
        name: 'BASE',
        children: ['usage', 'markdown', 'color', 'icon', 'font'],
    },
    {
        name: 'STYLESHEET',
        children: ['reset.css', 'markdown.css'],
    },
    {
        name: 'UTILS',
        children: ['array'],
    },
    {
        name: 'COMPONENT',
        children: ['markdown'],
    },
    {
        name: 'DIRECTIVES',
        children: ['markdown'],
    },
];

const routes = [];
nav.forEach((one) => {
    one.children.forEach((two) => {
        // eslint-disable-next-line import/no-dynamic-require
        const component = (r) => require.ensure([], () => r(require(`./docs/${two}.md`)), 'compontent');
        routes.push({
            path: `/${two}`,
            component,
        });
    });
});

// console.log(routes);

export {
    nav,
    routes,
};
