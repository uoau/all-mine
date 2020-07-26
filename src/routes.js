/*
 * @Author: XuX
 * @Date: 2020-07-08 13:15:00
 * @Description: routes file
 */

const nav = [
    {
        name: 'BASE',
        children: [
            { name: 'usage', cnName: '用法' },
            { name: 'color', cnName: '色彩' },
            { name: 'icon', cnName: '图标' },
            { name: 'font', cnName: '字体' },
            { name: 'design', cnName: '设计规范' },
        ],
    },
    {
        name: 'STYLESHEET',
        children: [
            { name: 'reset.css', cnName: '样式重置' },
            { name: 'markdown.css', cnName: 'MD 样式' },
        ],
    },
    {
        name: 'UTILS',
        children: [
            { name: 'RegExp', cnName: '正则' },
            { name: 'array', cnName: '数组' },
        ],
    },
    {
        name: 'COMPONENT',
        children: [
            { name: 'button', cnName: '按钮' },
            { name: 'input', cnName: '输入框' },
            { name: 'label', cnName: '' },
            { name: 'divider', cnName: '分隔符' },
            { name: 'breadcrumb', cnName: '面包屑' },
            { name: 'message', cnName: '消息' },
            { name: 'backtop', cnName: '回到顶部' },
            { name: 'dialog', cnName: '对话框' },
            { name: 'notification', cnName: '通知' },
        ],
    },
    {
        name: 'DIRECTIVES',
        children: [
            { name: 'v-clipboard', cnName: '复制' },
            { name: 'v-hotkey', cnName: '热键' },
            { name: 'v-clickoutside', cnName: '点击外部' },
            { name: 'v-lazyload', cnName: '懒加载' },
            { name: 'v-fold', cnName: '折叠' },
            { name: 'v-tooltip', cnName: '小提示' },
        ],
    },
];

const routes = [];
nav.forEach((one) => {
    one.children.forEach((two) => {
        // eslint-disable-next-line import/no-dynamic-require
        const component = (r) => require.ensure([], () => r(require(`./docs/${two.name}.md`)), 'component');
        routes.push({
            path: `/${two.name}`,
            component,
        });
    });
});

export {
    nav,
    routes,
};
