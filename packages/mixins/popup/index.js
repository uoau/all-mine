// import manager from './manager';

export default {
    props: {
        appendToBody: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {

        };
    },
    mounted() {
        if (this.appendToBody) {
            document.body.append(this.$el);
        }
    },

};
