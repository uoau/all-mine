<template>
    <div class="am-cropper">
        <AmPopup
            :show.sync="show"
            :width="viewport[0]+ 100 +64 + 'px'"
            @after-leave="afterLeave"
        >
            <!-- 控制栏 -->
            <div class="am-cropper__control-bar">
                <AmButton type="primary" class="i1">
                    选择图片
                    <input type="file" @change="selectImg"/>
                </AmButton>
                <AmInput placeholder="输入网络地址,回车确认" v-model="inputUrl" @enter="enterImg"/>
            </div>
            <!-- 裁剪容器 -->
            <div
                id="cropperBox"
                class="am-cropper__cropper-box"
                :style="{
                    minWidth: viewport[0] + 50 + 'px',
                    height: viewport[1] + 50 + 'px',
                }"
            ></div>
            <!-- 底部控制 -->
            <template slot="ft">
                <AmButton @click="clickCancel">取消</AmButton>
                <AmButton @click="clickConfirm" type="primary">确定</AmButton>
            </template>
        </AmPopup>
    </div>
</template>

<script>
import Croppie from 'croppie';
import 'croppie/croppie.css';
import { fileTo64 } from '../../utils/browser';

export default {
    name: 'AmCropper',
    props: {
        // 显示隐藏
        show: {
            type: Boolean,
            default: true,
        },
        // 初始图片
        img: {
            type: String,
            default: '',
        },
        // 切割规格大小
        viewport: {
            type: Array,
            default: () => [240, 240],
        },

        // 输出图片格式
        resultType: {
            type: String,
            default: 'base64', // base64\blob\canvas
        },
        // 输出图片后缀
        resultFormat: {
            type: String,
            default: 'png', // jpeg
        },
    },
    data() {
        return {
            croppie: null,
            inputUrl: '',
        };
    },
    methods: {
        // 点击取消
        clickCancel() {
            this.$emit('update:show', false);
            this.$emit('cancel');
        },
        // 点击确认
        async clickConfirm() {
            if (!this.croppie) {
                this.$message.fail('请先选择图片');
                return;
            }
            const result = await this.croppie.result({
                type: this.resultType,
                size: 'viewport',
                format: this.resultFormat,
            });
            this.$emit('confirm', result);
            this.$emit('update:show', false);
        },
        // 选择图片
        async selectImg(e) {
            const file = e.target.files[0];
            const base64 = await fileTo64(file);
            this.loadCropie(base64);
        },
        // 输入图片地址
        enterImg() {
            this.loadCropie(this.inputUrl);
        },
        // 加载图片
        loadCropie(file) {
            if (this.croppie) {
                this.croppie.destroy();
                this.croppie = null;
            }
            this.croppie = new Croppie(document.getElementById('cropperBox'), {
                url: file,
                viewport: { width: this.viewport[0], height: this.viewport[1] },
                showZoomer: false,
            });
        },
        afterLeave() {
            this.inputUrl = '';
            if (this.croppie) {
                this.croppie.destroy();
                this.croppie = null;
            }
        },
    },
};
</script>

<style lang="less">
.am-cropper {
    &__control-bar {
        display: flex;
        margin-bottom: 16px;
        .am-button {
            margin-right: 8px;
        }
        .am-input {
            width: auto;
            flex: 1;
        }
        .i1 {
            position: relative;
            overflow: hidden;
            input {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
                cursor: pointer;
            }
        }
    }
    &__cropper-box {
        width: 100%;
        background: #eee;
    }
}
</style>
