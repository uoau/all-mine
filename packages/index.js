/* eslint-disable */
// 引入图标字体文件
import './iconfont/default';
// 引入基础样式
import './stylesheet/default.theme.less';
import './stylesheet/reset.css';
// 引入组件
import AmButton from './components/button';
import AmIcon from './components/icon';
import AmDivider from './components/divider';
import AmInput from './components/input';
import AmForm from './components/form';
import AmFormItem from './components/form-item';
import AmBreadcrumb from './components/breadcrumb';
import AmBreadcrumbItem from './components/breadcrumb-item';
import AmMessage from './components/message';
import AmBacktop from './components/backtop';
import AmDialog from './components/dialog';
import AmNotification from './components/notification';
import AmPopover from './components/popover';
import AmSelect from './components/select';
import AmOption from './components/option';
import AmCheckbox from './components/checkbox';
import AmRadio from './components/radio';
import AmSwitch from './components/switch';
import AmDatePicker from './components/date-picker';
import AmPagination from './components/pagination';
import AmDropdown from './components/dropdown';
import AmDropdownItem from './components/dropdown-item';
import AmPopup from './components/popup';
import AmTable from './components/table';
import AmTableColumn from './components/table-column';
import AmPreview from './components/preview';
import AmTextarea from './components/textarea';
import AmUpload from './components/upload';
import AmFixedBottomBar from './components/fixed-bottom-bar';

// 引入指令
import Clipboard from './directives/clipboard';
import clickoutside from './directives/clickoutside';
import VueHotkey from 'v-hotkey';
import fold from './directives/fold';
import tooltip from './directives/tooltip';
import clickanime from './directives/clickanime';

const AM = {
    AmButton,
    AmIcon,
    AmDivider,
    AmInput,
    AmForm,
    AmFormItem,
    AmBreadcrumb,
    AmBreadcrumbItem,
    AmNotification,
    AmPopover,
    AmSelect,
    AmOption,
    AmCheckbox,
    AmRadio,
    AmSwitch,
    AmDatePicker,
    AmPagination,
    AmDropdown,
    AmDropdownItem,
    AmPopup,
    AmTable,
    AmTableColumn,
    AmPreview,
    AmTextarea,
    AmUpload,
    AmFixedBottomBar,
};

const install = (Vue) => {
    Object.keys(AM).forEach((key) => {
        const component = AM[key];
        if(component.name){
            Vue.component(component.name, component);
        }
    });
    // 通过安装的方式
    Vue.use(AmMessage);
    Vue.use(AmBacktop);
    Vue.use(AmDialog);

    // 指令
    Vue.use(Clipboard);
    Vue.use(VueHotkey);
    Vue.directive('clickoutside', clickoutside);
    Vue.directive('fold',fold);
    Vue.directive('clickanime',clickanime);
    Vue.use(tooltip);
};
AM.install = install;

export default AM;
