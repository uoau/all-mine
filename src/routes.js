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
            { name: 'rules', cnName: '一些规则' },
            { name: 'todo', cnName: '待办清单' },
            { name: 'all', cnName: '显示所有组件' },
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
            { name: 'divider', cnName: '分隔符' },
            { name: 'breadcrumb', cnName: '面包屑' },
            { name: 'message', cnName: '消息' },
            { name: 'backtop', cnName: '回到顶部' },
            { name: 'dialog', cnName: '对话框' },
            { name: 'notification', cnName: '通知' },
            { name: 'popover', cnName: '弹出框' },

            { name: 'form', cnName: '表单' },
            { name: 'input', cnName: '输入框' },
            { name: 'select', cnName: '选择器' },
            { name: 'checkbox', cnName: '复选框' },
            { name: 'radio', cnName: '单选框' },
            { name: 'switch', cnName: '开关' },
            { name: 'date-picker', cnName: '日期选择器' },
            { name: 'pagination', cnName: '分页' },
            { name: 'dropdown', cnName: '下拉菜单' },
            { name: 'popup', cnName: '弹出层' },
            { name: 'table', cnName: '表格' },
            { name: 'preview', cnName: '图片预览' },
            { name: 'textarea', cnName: '文本框' },
            { name: 'upload', cnName: '图片上传' },
        ],
    },
    {
        name: 'DIRECTIVES',
        children: [
            { name: 'v-clipboard', cnName: '复制' },
            { name: 'v-hotkey', cnName: '热键' },
            { name: 'v-clickoutside', cnName: '点击外部' },
            { name: 'v-fold', cnName: '折叠' },
            { name: 'v-tooltip', cnName: '小提示' },
            { name: 'v-clickanime', cnName: '点击动画' },
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
