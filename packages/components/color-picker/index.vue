<template>
    <div
        class="am-color-picker"
        v-clickoutside="()=>{show=false}"
    >
        <div
            class="am-color-picker__btn"
            ref="btn"
            @click="clickBtn"
        >
            <slot v-if="$slots.default"/>
            <template v-else>
                选择颜色
            </template>
        </div>
        <AmPopover
            v-show="linkEl"
            :link-el="linkEl"
            :show.sync="show"
        >
            <div class="am-color-picker__box" :id="'colorPicker'+random" spellcheck="false"></div>
        </AmPopover>
    </div>
</template>

<script>
import Picker from 'vanilla-picker';
import { uuid } from '../../utils/base';

let picker = null;

export default {
    name: 'AmColorPicker',
    props: {
        color: {
            type: String,
            default: '#fff',
        },
        showAlpha: {
            type: Boolean,
            default: false,
        },
        showInput: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            linkEl: '',
            show: false,
            random: 0,
        };
    },
    watch: {
        color(val) {
            if (val !== this.color) {
                picker.setColor(this.color);
            }
        },
    },
    async mounted() {
        this.random = uuid();
        await this.$nextTick();
        this.linkEl = this.$refs.btn;
        const parent = document.querySelector(`#colorPicker${this.random}`);
        picker = new Picker({
            parent,
            popup: false,
            alpha: this.showAlpha,
            editor: this.showInput,
            color: this.color,
        });
        picker.onDone = (color) => {
            this.show = false;
            this.$emit('done', color);
        };
        picker.onChange = (color) => {
            this.$emit('change', color);
            this.$emit('update:color', color.hex);
        };
    },
    methods: {
        clickBtn() {
            this.show = !this.show;
        },
    },
};
</script>

<style lang="less">
.am-color-picker {
    display: inline-flex;
    &__btn {
        display: inline-flex;
    }
    &__box {
        // 外层
        .picker_wrapper {
            width: 200px!important;
            background: #fff;
            border: none;
            box-shadow: none;
            padding: 0!important;
        }
        // 滑条
        .picker_slider {
            margin: 0!important;
            margin-bottom: 16px!important;
            width: 100%;
            padding: 4px!important;
            box-shadow: none;
            border-radius: 3px;
            // 滑块
            .picker_selector {
                border-radius: 50%;
                padding: 6px;
                border: 2px solid #fff;
                box-shadow: var(--shadow-1);
            }
        }
        // 选色区
        .picker_sl {
            margin: 0!important;
            width: 100%;
            box-shadow: none;
            border-radius: 3px;
            margin-bottom: 8px!important;
            .picker_selector {
                padding: 6px!important;
                box-shadow: var(--shadow-1);
            }
        }
        // 输入框
        .picker_editor {
            margin: 0!important;
            height: 24px;
            background: var(--border);
            margin-right: 8px!important;
            border-radius: 3px;
            input {
                border: none;
                box-shadow: none;
                background: none;
                outline: none;
                font-size: 12px!important;
                padding: 0 8px!important;
                font-family: -apple-system,
                    BlinkMacSystemFont,
                    'Microsoft YaHei',
                    'Segoe UI Emoji',
                    'Apple Color Emoji';
                -webkit-font-smoothing: antialiased;
                &:focus {
                    box-shadow: none;
                }
            }
        }
        // 结果框
        .picker_sample {
            margin: 0!important;
            height: 24px;
            box-shadow: none;
            margin-right: 8px!important;
            border-radius: 3px;
            overflow: hidden;
        }
        // 确认按钮
        .picker_done {
            margin: 0!important;
            height: 24px;
            width: 40px;
            background: var(--primary);
            border-radius: 3px;
            transition: background .2s;
            &:hover {
                background: var(--dark-primary);
            }
            button {
                padding: 0;
                width: 100%;
                height: 100%;
                background: none;
                border: none;
                box-shadow: none;
                color: #fff;
                font-size: 0!important;
                &:hover {
                    background: none;
                }
                &:before {
                    content: 'ok';
                    font-size: 14px;
                }
            }
        }
    }
    .am-popover__pop {
        padding: 16px;
    }
}
</style>
