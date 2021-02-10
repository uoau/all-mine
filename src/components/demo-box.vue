<template>
    <div class="demo-box">
        <div class="demo">
            <slot name="demo"/>
        </div>
        <div class="btn" @click="()=>{open = !open}">
            <AmIcon :name="!open ? 'caret-bottom' : 'caret-top'" />
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
    border: 1px solid #e5e5e5;
    background: #fff;
    .demo {
        padding: 20px;
    }
    .code {
        >pre {
            >code {
                padding: 15px 15px;
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
        border-top: 1px solid #e5e5e5;
        user-select: none;
        cursor: pointer;
        &:hover {
            background: #f5f5f5;
        }
    }
    &:hover {

    }
}
</style>
