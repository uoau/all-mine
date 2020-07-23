<template>
    <div class="demo-box">
        <div class="demo">
            <slot name="demo"/>
        </div>
        <div class="btn" @click="()=>{open = !open}">
            {{ open ? 'close' : 'open' }}
        </div>
        <div class="code" v-fold="open">
            <slot name="code"/>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            open: false,
        };
    },
};
</script>

<style lang="less" scoped>
.demo-box {
    width: 100%;
    border: 1px solid #ccc;
    background: #fff;
    .demo {
        padding: 20px;
    }
    .code {
        >pre {
            >code {
                padding: 8px 10px;
                font-size: 13px;
                line-height: 1.5;
            }
        }
    }
    .btn {
        width: 100%;
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: 1px solid #ccc;
    }
}
</style>
