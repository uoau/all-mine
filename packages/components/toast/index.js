import Vue from 'vue';
import Main from './index.vue';

const NotificationConstructor = Vue.extend(Main);

const instances = [];
let seed = 1;

const Notification = function (options) {
    if (Vue.prototype.$isServer) return;
    options = options || {};
    const userOnClose = options.onClose;
    const id = `notification_${seed}`;
    const position = options.position || 'top-right';

    seed += 1;

    options.onClose = function () {
        Notification.close(id, userOnClose);
    };

    const instance = new NotificationConstructor({
        data: options,
    });

    if (isVNode(options.message)) {
        instance.$slots.default = [options.message];
        options.message = 'REPLACED_BY_VNODE';
    }
    instance.id = id;
    instance.$mount();
    document.body.appendChild(instance.$el);
    instance.visible = true;
    instance.dom = instance.$el;
    instance.dom.style.zIndex = PopupManager.nextZIndex();

    let verticalOffset = options.offset || 0;
    instances.filter((item) => item.position === position).forEach((item) => {
        verticalOffset += item.$el.offsetHeight + 16;
    });
    verticalOffset += 16;
    instance.verticalOffset = verticalOffset;
    instances.push(instance);
    return instance;
};

['success', 'warning', 'info', 'error', 'help'].forEach((type) => {
    Notification[type] = (options) => {
        if (typeof options === 'string' || isVNode(options)) {
            options = {
                message: options,
            };
        }
        options.type = type;
        return Notification(options);
    };
});

Notification.close = function (id, userOnClose) {
    let index = -1;
    const len = instances.length;
    const instance = instances.filter((ins, i) => {
        if (ins.id === id) {
            index = i;
            return true;
        }
        return false;
    })[0];

    if (!instance) return;

    if (typeof userOnClose === 'function') {
        userOnClose.call(instance, instance);
    }
    instances.splice(index, 1);

    if (len <= 1) return;
    const { position } = instance;
    const removedHeight = instance.dom.offsetHeight;
    for (let i = index; i < len - 1; i += 1) {
        if (instances[i].position === position) {
            // eslint-disable-next-line max-len
            instances[i].dom.style[instance.verticalProperty] = `${parseInt(instances[i].dom.style[instance.verticalProperty], 10) - removedHeight - 16}px`;
        }
    }
};

Notification.closeAll = function () {
    for (let i = instances.length - 1; i >= 0; i -= 1) {
        instances[i].close();
    }
};

export default Notification;
