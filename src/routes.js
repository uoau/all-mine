/*
 * @Author: XuX
 * @Date: 2020-07-08 13:15:00
 * @Description: routes file
 */

const nav = [
    {
        name: '基础',
        children: [
            { name: 'usage', cnName: '用法' },
            { name: 'color', cnName: '颜色' },
            { name: 'icon', cnName: '图标' },
            { name: 'text', cnName: '文字' },
            { name: 'name-rule', cnName: '命名规则' },
            // { name: 'todo', cnName: '待办清单' },
        ],
    },
    {
        name: '风格',
        children: [
            { name: 'reset.css', cnName: '样式重置' },
            { name: 'markdown.css', cnName: 'MD 样式' },
        ],
    },

    {
        name: '组件：表单',
        children: [
            { name: 'form', cnName: '表单' },
            { name: 'input', cnName: '输入框' },
            { name: 'textarea', cnName: '文本框' },
            { name: 'select', cnName: '选择器' },
            { name: 'checkbox', cnName: '复选框' },
            { name: 'radio', cnName: '单选框' },
            { name: 'switch', cnName: '开关' },
            { name: 'date-picker', cnName: '日期选择器' },
        ],
    },
    {
        name: '组件：弹出',
        children: [
            { name: 'message', cnName: '消息' },
            { name: 'dialog', cnName: '对话框' },
            { name: 'popover', cnName: '弹出框' },
            { name: 'popup', cnName: '弹出层' },
        ],
    },

    // {
    //     name: 'UTILS',
    //     children: [
    //         { name: 'RegExp', cnName: '正则' },
    //         { name: 'array', cnName: '数组' },
    //     ],
    // },
    {
        name: 'COMPONENT',
        children: [
            { name: 'button', cnName: '按钮' },
            { name: 'icon-button', cnName: '图标按钮' },
            { name: 'divider', cnName: '分隔符' },
            { name: 'breadcrumb', cnName: '面包屑' },
            { name: 'tag', cnName: '标签' },
            { name: 'date-format', cnName: '日期格式化' },

            { name: 'backtop', cnName: '回到顶部' },
            // { name: 'notification', cnName: '通知' },
            { name: 'movie-screen', cnName: '电影银幕' },

            { name: 'pagination', cnName: '分页' },
            { name: 'dropdown', cnName: '下拉菜单' },
            { name: 'popup', cnName: '弹出层' },
            { name: 'fixed-bottom-bar', cnName: '固定底部栏' },
            { name: 'table', cnName: '表格' },
            { name: 'img-viewer', cnName: '图片预览' },
            // { name: 'upload', cnName: '图片上传' },
            { name: 'color-picker', cnName: '颜色选择器' },
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
            { name: 'v-loading', cnName: '加载' },
            { name: 'v-clickanime', cnName: '点击动画' },
        ],
    },
    {
        name: 'BIG THING',
        children: [
            { name: 'editor', cnName: '文章编辑器' },
            { name: 'cropper', cnName: '图片裁剪' },
        ],
    },
    {
        name: 'TOOL',
        children: [
            { name: 'webpack', cnName: '构建配置' },
            { name: 'eslint', cnName: '规范检查' },
        ],
    },
];

const routes = [{
    path: '/',
    redirect: {
        path: '/usage',
    },
}];
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
