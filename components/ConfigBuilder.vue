<template>
    <view class="ConfigBuilder">
        <view class="TitleBarContainer">
            <view class="TitleBarWarp">
                <view class="largeTitle deeppinkTitle">创建模型</view>
            </view>
            <view class="TitleBarFunctionalWarp">
                <view class="checkbox" @click="toggleCheckbox(visualize.selectableMMLabToolboxes)">✦｜{{ isToolboxSelected ? builder.selectedToolbox : '请选择 MMLab 工具箱' }}</view>
            </view>
            <view class="TitleBarFunctionalWarp" v-if="isToolboxSelected">
                <view class="functionalTitle">载入</view>
                <view class="checkbox" @click="loadFramework">骨架</view>
                <view class="checkbox" @click="loadDemo">参考</view>
            </view>
            <view class="TitleBarFunctionalWarp" v-if="isToolboxSelected">
                <view class="functionalTitle">预设</view>
                <view class="checkbox">backbone</view>
                <view class="checkbox">neck</view>
                <view class="checkbox">head</view>
            </view>
            <view class="TitleBarFunctionalWarp" v-if="isToolboxSelected">
                <view class="functionalTitle">工具</view>
                <view class="checkbox" @click="refreshTipReference('backbone')">提示器</view>
                <view class="checkbox" @click="exportPyConfig">导出</view>
            </view>
        </view>
        <view class="nothingHereContainer" v-if="Object.keys(builder.modelStructure) <= 0">
            <view class="nothingHereLabel">✦ 空空如也 ✦</view>
        </view>
        <view class="paddingTopArea">.</view>
        <view class="scrollButtonsContainer">
            <view class="leftButton" @click="scroll('left')">👈</view>
            <view class="rightButton" @click="scroll('right')">👉</view>
        </view>
        <view class="warningIndicatorContainer">
            <view v-if="builder.warning === ''">
                <view class="statusLabel" :style="{ color: 'green' }">✦｜无异常</view>
            </view>
            <view v-else>
                <view class="statusLabel" :style="{ color: 'orangered' }">注意｜</view>
                <view class="warningInfo" :style="{ color: 'orangered' }">{{ builder.warning }}</view>
            </view>
        </view>
        <div class="builderContainer" ref="scrollContainer">
            <view class="componentContainer" v-for="(component, index) in builder.modelStructure.components" :key="index">
                <view class="componentTitle">{{ index }}</view>
                <view class="componentCaption">{{ builder.componentCaptions[index] }}</view>
                <view class="componentTipBtn" v-if="!builder.noTipComponents.includes(index)" @click="refreshTipReference(index)">✦ 获取提示</view>
                <view v-if="typeof component === 'object'">
                    <view class="componentContentContainer">
                        <view
                            :class="isInChangeRules(index, label) ? 'componentParamContainer' : 'componentFrozenParamContainer'"
                            v-for="(param, label) in component" :key="label"
                            @click="$store.commit('builder/setShowValueEditor', true)"
                            >
                            <view class="componentParamLabel">{{ label }}</view>
                            <view :class="isInChangeRules(index, label) ? 'componentParamValue' : 'componentFrozenParamValue'">{{ param }}</view>
                            <transition name="popIn">
                                <input
                                    class="inputArea"
                                    v-if="isInChangeRules(index, label) && builder.isShowValueEditor"
                                    :value="Array.isArray(param) ? '[ ' + param.join(', ') + ' ]' : param"
                                    @input="param = $event.target.value"
                                    @keydown.enter.prevent="refreshValue(index, label, param)"
                                />
                            </transition>
                        </view>
                        <view class="addParamBtn" v-if="!builder.noTipComponents.includes(index)" @click="addParam(index)">+ 手动添加</view>
                    </view>
                </view>
                <view v-else>
                    <view class="componentContentContainer">
                        <view :class="isInChangeRules(index, label) ? 'componentParamContainer' : 'componentFrozenParamContainer'">
                            <view class="componentParamLabel">{{ index }}</view>
                            <view :class="isInChangeRules(index, label) ? 'componentParamValue' : 'componentFrozenParamValue'">{{ component }}</view>
                        </view>
                    </view>
                </view>
            </view>
        </div>
    </view>
</template>

<script>

export default {
    name: 'ConfigBuilder',
    created() {
        this.$store.dispatch('visualize/fetchBaseData');
    },
    computed: {
        builder() {
            return this.$store.state.builder;
        },
        visualize() {
            return this.$store.state.visualize;
        },
        settings() {
            return this.$store.state.settings;
        },
        isToolboxSelected() {
            return this.builder.selectedToolbox !== '';
        },
    },
    data() {
        return {
        };
    },
    methods: {
        toggleCheckbox(options) {
            this.$store.commit('settings/setNestedCheckboxOptions', options);
            this.$store.commit('visualize/setShowCheckbox', !this.visualize.isShowCheckbox);
        },
        isInChangeRules(index, label) {
            if (this.builder.changeRules[index]) {
                if (this.builder.changeRules[index][0] === 'all') {
                    return true;
                } else if (this.builder.changeRules[index][0] === 'reverse') {
                    return !this.builder.changeRules[index].includes(label);
                } else {
                    return this.builder.changeRules[index].includes(label);
                }
            }
        },
        scroll(direction) {
            const container = this.$refs.scrollContainer;
            const scrollAmount = window.innerWidth / 2;
            const scrollOptions = {
                left: direction === 'left' ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount,
                behavior: 'smooth'
            };
            container.scrollTo(scrollOptions);
        },
        refreshValue(index, label, newValue) {
            this.$store.commit('builder/updateComponentParamValue', {
                index: index,
                label: label,
                newValue: newValue
            });
            this.$store.commit('builder/setShowValueEditor', false);
        },
        refreshTipReference(index) {
            this.$store.commit('builder/refreshTipReference', { componentName: index, instruction: this.visualize.baseData[this.builder.selectedToolbox].instruction})
            this.$store.commit('builder/setShowTipIndicator', true);
        },
        loadFramework() {
            this.$store.commit('builder/loadModelStructure', this.builder.loading.framework);
        },
        loadDemo() {
            this.$store.commit('builder/loadModelStructure', this.builder.loading.demo);
        },
        addParam(componentName) {
            const newParam = prompt('请输入新参数名');
            if (newParam && typeof newParam === 'string') {
                this.$set(this.builder.modelStructure.components[componentName], newParam, ''); // 默认值可设为合适的初始值
                this.$store.commit('builder/addComponentParam', {
                    componentName: componentName,
                    paramName: newParam,
                });
            }
        },
        exportPyConfig() {
            const demo = this.builder.modelStructure;

            function convertToPythonDict(obj, indent = 4, level = 1) {
                function formatValue(value, indentLevel) {
                    if (Array.isArray(value)) {
                        return `[\n${value.map(v => ' '.repeat(indentLevel + 4) + formatValue(v, indentLevel + 4)).join(',\n')}\n${' '.repeat(indentLevel)}]`;
                    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                        return convertToPythonDict(value, indentLevel + 4, level + 1);
                    } else if (typeof value === 'string') {
                        return `'${value}'`;
                    } else if (typeof value === 'boolean') {
                        return value ? 'True' : 'False';
                    } else {
                        return value;
                    }
                }

                const entries = Object.entries(obj).map(([key, value]) => {
                    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
                        return `${' '.repeat(indent * level)}${key}=${convertToPythonDict(value, indent, level + 1)}`;
                    } else {
                        return `${' '.repeat(indent * level)}${key}=${formatValue(value, indent * level)}`;
                    }
                });

                return `dict(\n${entries.join(',\n')}\n${' '.repeat(indent * (level - 1))})`;
            }

            const pythonDictString = `model = ${convertToPythonDict(demo.components)}`;
            const blob = new Blob([pythonDictString], { type: 'text/plain' });
            const link = document.createElement('a');

            alert('导出成功！');

            link.href = URL.createObjectURL(blob);
            link.download = 'model_config.py';
            link.click();
            URL.revokeObjectURL(link.href);
        }
    },
    watch: {
        '$store.state.settings.nestedCheckboxSelectedValue' (newVal) {
            if (this.visualize.selectableMMLabToolboxes.includes(newVal)) {
                this.builder.selectedToolbox = newVal;
            }
        }
    }
};
</script>

<style scoped>
.TitleBarContainer {
    top: 60px;
}

.paddingTopArea {
    padding-top: 70px;
}

.scrollButtonsContainer {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: calc(100% - 20px);
    display: flex;
    justify-content: space-between;
    padding: 10px;
    pointer-events: none;
    z-index: 1000;
}

.leftButton, .rightButton {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    padding: 20px 8px;
    background-color: #fff;
    border: 1px solid #f5e966;
    border-radius: 5px;
    pointer-events: auto;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1.05);
}

.leftButton:hover, .rightButton:hover {
    transform: scale(1.1, 1.2);
    background-color: #fff9e6;
}

.builderContainer {
    width: calc(100% - 40px);
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 20px;
    gap: 10px;
    overflow: auto;
}

.componentContainer {
    border: 1px solid #f0f0f0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 6px;
    border-radius: 6px;
    gap: 6px;
}

.componentTitle {
    font-size: 18px;
    font-weight: bold;
    color: #333;
}

.componentCaption {
    font-size: 14px;
    color: lightgray;
}

.componentTipBtn {
    white-space: nowrap;
    font-size: 14px;
    background: #fff;
    color: dodgerblue;
    border: 1px solid dodgerblue;
    padding: 0 2px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
    transform: translateX(0);
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1.05);
}

.componentContentContainer {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 6px;
}

.componentParamContainer, .componentFrozenParamContainer {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    max-width: fit-content;
    padding: 6px;
    border-radius: 6px;
    background: #f0f0f0;
    gap: 10px;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1.05);
}

.componentParamContainer:hover {
    background: #fff;
    box-shadow: 0 0 0 1px #6638f03c inset;
}

.componentFrozenParamContainer:hover {
    background: #e0e0e0;
}

.componentParamLabel {
    font-size: 14px;
    color: #333;
}

.componentParamValue {
    white-space: nowrap;
    font-size: 14px;
    color: #2552d6;
    cursor: text;
}

.componentParamValue:hover {
    color: #6638f0;
}

.componentFrozenParamValue {
    white-space: nowrap;
    font-size: 14px;
    color: #999;
}

.inputArea {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    color: dodgerblue;
    background: #eff3ff;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
    border-left: 2px solid dodgerblue;
    border-right: 2px solid dodgerblue;
    border-top: 1px solid dodgerblue;
    border-bottom: 1px solid dodgerblue;
    border-radius: 6px;
    padding: 3px 6px;
    font-size: 14px;
}

.tipBtn {
    white-space: nowrap;
    font-size: 14px;
    background: #fff;
    color: dodgerblue;
    border: 1px solid dodgerblue;
    padding: 0 2px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
    transform: translateX(0);
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1.05);
    z-index: 1000;
}

.tipBtn:hover, .componentTipBtn:hover {
    background: dodgerblue;
    color: #fff;
    transform: translateX(-2px);
}

.addParamBtn {
    margin-left: 6px;
    font-size: 12px;
    font-weight: 700;
    color: lightgray;
    cursor: pointer;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1.05);
}

.addParamBtn:hover {
    color: #333;
}
</style>