<template>
    <label class="am-upload">
        <slot v-if="$slots.default"/>
        <div class="inner" v-else>
            <AmIcon name="plus" />
        </div>
        <input type="file" :multiple="multiple" @change="changeFile" ref="input"/>
    </label>
</template>

<script>
export default {
    name: 'AmUpload',
    props: {
        // 多选
        multiple: Boolean,
    },
    methods: {
        changeFile(e) {
            const { files } = e.target;
            this.$emit('after-selected', files);
        },
    },
};
</script>

<style lang="less">
.am-upload {
    position: relative;
    input {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }
    .inner {
        width: 100px;
        height: 100px;
        border: 1px dashed var(--border);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background .2s;
        .am-icon {
            font-size: 30px;
            color: #999;
        }
        &:hover {
            background: var(--light-bg);
        }
    }
}
</style>
