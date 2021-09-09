export default {
    props: {
        validate: {
            type: [Boolean, Function],
            default: false,
        },
        validateType: {
            type: [Array, String],
            default: () => ['input', 'change', 'blur', 'focus'],
        },
    },
    data() {
        return {
            validateMsg: '',
        };
    },
    methods: {
        // 校验器监听所有事件
        async validatorOnAllEvent(eventType, value) {
            if (!this.validate) return;
            let { validateType } = this;
            if (typeof validateType === 'string') {
                validateType = [validateType];
            }
            if (!validateType.find((i) => i === eventType)) return;

            const validateMsg = await this.validate(value);
            this.validateMsg = validateMsg;
        },
        // 清除校验器信息
        validatorClearMsg() {
            this.validateMsg = '';
        },
    },
};
