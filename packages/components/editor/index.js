import AmEditor from './index.vue';

AmEditor.install = (Vue) => {
    Vue.component(AmEditor.name, AmEditor);
};

export default AmEditor;
