<template>
    <div class="am-dialog">
        <AmPopup
            :show.sync="show"
            @after-leave="afterLeave">

            <template>
                <p>{{ content }}</p>
            </template>
            <template slot="ft">
                <AmButton @click="clickCancelBtn">{{ cancelText }}</AmButton>
                <AmButton type="primary" @click="clickConfirmBtn">{{ confirmText }}</AmButton>
            </template>
        </AmPopup>
    </div>
</template>

<script>
export default {
    name: 'AmDialog',
    data() {
        return {
            show: false,
            content: '',
            cancelText: '取消',
            confirmText: '确认',
            clickResult: 'cancel',
        };
    },
    methods: {
        cancel() {},
        confirm() {},
        clickCancelBtn() {
            this.clickResult = 'cancel';
            this.show = false;
        },
        clickConfirmBtn() {
            this.clickResult = 'confirm';
            this.show = false;
        },
        afterLeave() {
            if (this.clickResult === 'cancel') {
                this.cancel();
            } else {
                this.confirm();
            }
        },
    },
};
</script>

<style lang='less'>
.am-dialog {
    .am-popup {
        .bd {

        }
    }
}
</style>
