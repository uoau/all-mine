<template>
    <div class='am-dialog'>
        <transition
            name='an-dialog__anime'
            v-on:after-leave='afterLeave'>
            <div
                class='am-dialog__body'
                v-show='show'>
                <div class='hd'>
                    <span>提示</span>
                    <i @click='clickCancel'></i>
                </div>
                <div class='bd'>
                    <p>{{ content }}</p>
                </div>
                <div class='ft'>
                    <a class='ok' @click='clickConfirm'>确定</a>
                    <a class='no' @click='clickCancel'>取消</a>
                </div>
            </div>
        </transition>
        <transition
            name='am-dialog__mask-anime'>
            <div class='am-dialog__mask' v-show='show'></div>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            content: '',
            result: '',
            show: false,
        };
    },
    methods: {
        confirm() {
        },
        cancel() {
        },
        clickConfirm() {
            this.result = 'ok';
            this.show = false;
        },
        clickCancel() {
            this.result = 'no';
            this.show = false;
        },
        afterLeave() {
            if (this.result === 'ok') {
                this.confirm();
            } else {
                this.cancel();
            }
        },

    },
};
</script>

<style lang='less'>
.am-dialog {
    &__body {
        position:fixed;
        top:0;
        left: 50%;
        transform: translate(-50%, 50px);
        min-width:300px;
        min-height:150px;
        z-index:21;
        background:#fff;
        display:flex;
        flex-direction:column;
        border-radius:4px;
        padding:15px;
        .hd {
            width:100%;
            position:relative;
            display:flex;
            align-items:center;
            justify-content: space-between;
            span {
                font-size:16px;
            }
            i {
                display:inline-flex;
                width:25px;
                height:25px;
                position:relative;
                cursor:pointer;
                &:before,&:after {
                    content:'';
                    display:inline-block;
                    width:15px;
                    height:2px;
                    background:#111;
                    position:absolute;
                    left:0;
                    right:0;
                    top:0;
                    bottom:0;
                    margin:auto;
                }
                &:before {
                    transform:rotate(45deg);
                }
                &:after {
                    transform:rotate(-45deg);
                }
                &:hover {
                    color:#666;
                }
            }
        }
        .bd {
            flex:1;
            padding:10px 0;
            p {
                font-size:15px;
            }
        }
        .ft {
            width:100%;
            height:30px;
            display:flex;
            align-items:center;
            justify-content:flex-end;
            a {
                height:30px;
                width:60px;
                background:blue;
                display:inline-flex;
                align-items:center;
                justify-content:center;
                margin-left:10px;
                color:#fff;
                font-size:14px;
                border-radius:4px;
                &.ok {
                    background:#007acc;
                }
                &.no {
                    background:#999;
                }
            }
        }
    }
    &.am-dialog__anime-enter-active {
        animation: dialog-in .3s;
    }
    &.am-dialog__anime-leave-active {
        animation: dialog-in .3s reverse;
    }
    @keyframes dialog-in {
        from {
            opacity: 0;
            transform: translate(-50%, 30px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 50px);
        }
    }
    &__mask {
        width:100vw;
        height:100vh;
        position:fixed;
        left:0;
        top:0;
        background:rgba(0,0,0,.4);
        z-index:20;
    }
    &__mask-anime-enter-active {
        animation: dialog-mask-in .5s;
    }
    &__mask-anime-leave-active {
        animation: dialog-mask-in .5s reverse;
    }
    @keyframes dialog-mask-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
}
</style>
