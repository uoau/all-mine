/* eslint-disable */
// 引入图标字体文件
import './iconfont/default';
// 引入组件
import AmButton from './components/button';
import AmIcon from './components/icon';
import AmDivider from './components/divider';
import AmInput from './components/input';
import AmLabel from './components/label';
import AmBreadcrumb from './components/breadcrumb';
import AmBreadcrumbItem from './components/breadcrumb-item';
import AmMessage from './components/message';
import AmBacktop from './components/backtop';
import AmDialog from './components/dialog';
import AmNotification from './components/notification';

// 引入指令
import Clipboard from './directives/clipboard';
import clickoutside from './directives/clickoutside';
import VueHotkey from 'v-hotkey';
import VueLazyload from 'vue-lazyload';
import fold from './directives/fold';
import tooltip from './directives/tooltip';

const AM = {
    AmButton,
    AmIcon,
    AmDivider,
    AmInput,
    AmLabel,
    AmBreadcrumb,
    AmBreadcrumbItem,
    AmNotification,
};

const install = (Vue) => {
    Object.keys(AM).forEach((key) => {
        const component = AM[key];
        Vue.component(component.name, component);
    });
    // 通过安装的方式
    Vue.use(AmMessage);
    Vue.use(AmBacktop);
    Vue.use(AmDialog);

    // 指令
    Vue.use(Clipboard);
    Vue.use(VueHotkey);
    Vue.directive('clickoutside', clickoutside);
    Vue.use(VueLazyload);
    Vue.directive('fold',fold);
    Vue.use(tooltip);
};
AM.install = install;

export default AM;
