<template>
    <view class="TipIndicator">
        <view class="panelScaler">
            <view class="TitleBarContainer">
                <view class="TitleBarWarp">
                    <view class="reutrnBtn" @click="closePanel">⤫</view>
                    <view class="largeTitle deeppinkTitle">提示器</view>
                </view>
                <view class="TitleBarFunctionalWarp">
                    <view class="functionalTitle">组件</view>
                    <view class="checkbox" @click="toggleCheckbox(getComponentOptions())">{{ builder.curTipReferenceBelonger }}</view>
                </view>
                <view class="TitleBarFunctionalWarp">
                    <view class="functionalTitle">工具</view>
                    <view class="checkbox" @click="saveAll">保存</view>
                </view>
            </view>
            <view class="warningIndicatorContainer">
                <view v-if="isNotWarningToSaveAll">
                    <view class="statusLabel" :style="{ color: 'green' }">✦｜就绪</view>
                </view>
                <view class="horizontal" v-else>
                    <view class="statusLabel" :style="{ color: 'orangered' }">注意｜</view>
                    <view class="warningInfo" :style="{ color: 'orangered' }">{{ builder.tipIndicatorWarning }}</view>
                </view>
            </view>
            <view class="firstContainer">
                <view class="paddingTopArea">.</view>
                <view class="largeTitle deeppinkTitle">可选项</view>
                <view class="caption">当前已构建的 {{ builder.curTipReferenceBelonger }} 变种｜{{ builder.modelStructure['components'][builder.curTipReferenceBelonger].type }}</view>
                <view class="largeCheckboxContainer">
                    <view
                        class="largeCheckbox"
                        @click="toggleCheckbox(getTipOptions())"
                        :style="builder.selectedTipOption !== '' ? {'border': '1px solid #6638f0'} : {}"
                        >
                        基线｜{{ builder.selectedTipOption === '' ? '如换变种，先换基线' : builder.selectedTipOption }}
                    </view>
                    <view
                        class="largeCheckbox"
                        @click="toggleCheckbox(getTipVariantOptions())"
                        :style="(builder.selectedTipVariance !== '' || builder.selectedTipVariance !== undefined) ? {'border': '1px solid #6638f0'} : {}"
                        >
                        变种｜{{ (builder.selectedTipVariance === '' || builder.selectedTipVariance === undefined) ? '可更换' : builder.selectedTipVariance }}
                    </view>
                </view>
                <view class="largeTitle deeppinkTitle">参数配置</view>
                <view class="addableTipContainer">
                    <view v-for="(param, index) in getAllParams()" :key="index"
                        :class="getParamClass(param)">
                        <view class="paramName">{{ param }}</view>
                        <view class="paramValue">{{ getParamValue(param) }}</view>
                        <view class="addBtn" v-if="showAddButton(param)" @click="addNewParam(param)">+ 添加</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: 'TipIndicator',
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
        isNotWarningToSaveAll() {
            if (this.builder.selectedTipVariance !== '' && this.builder.curTipReferenceBelonger !== '') {
                const curType = this.builder.modelStructure['components'][this.builder.curTipReferenceBelonger].type;
                const variants = this.builder.selectedTipVariance;

                return curType === variants
            }
            return false;
        },
    },
    data() {
        return {
            tempModelStructure: {}
        }
    },
    methods: {
        closePanel() {
            if (this.isNotWarningToSaveAll) {
                this.$store.commit('builder/setShowTipIndicator', false);
            } else {
                if (confirm("确定要退出吗？还没保存哦")) {
                    this.$store.commit('builder/setShowTipIndicator', false);
                }
            }
        },
        toggleCheckbox(options) {
            this.$store.commit('settings/setNestedCheckboxOptions', options);
            this.$store.commit('visualize/setShowCheckbox', !this.visualize.isShowCheckbox);
        },
        getTipOptions() {
            const options = Object.keys(this.builder.tipReference);
            this.$store.commit('builder/setTipOptions', options);
            return options;
        },
        getComponentOptions() {
            const options = Object.keys(this.builder.component2InstructionRefer);
            return options;
        },
        getTipVariantOptions() {
            const options = Object.keys(this.builder.tipReference[this.builder.selectedTipOption]).map(option => this.builder.tipReference[this.builder.selectedTipOption][option].name);
            this.$store.commit('builder/setTipVariantOptions', options);
            return options;
        },
        getParams() {
            const variants = this.builder.tipReference[this.builder.selectedTipOption];
            for (const variant in variants) {
                if (variants[variant].name === this.builder.selectedTipVariance) {
                    return variants[variant].init_args;
                }
            }
        },
        getAllParams() {
            const tipParams = this.getParams() || [];
            const componentParams = Object.keys(this.tempModelStructure['components'][this.builder.curTipReferenceBelonger]);
            return Array.from(new Set([...tipParams, ...componentParams]));
        },
        wasAdded(param) {
            const modelStructureParams = Object.keys(this.tempModelStructure['components'][this.builder.curTipReferenceBelonger]);
            return modelStructureParams.includes(param);
        },
        showAddButton(param) {
            return this.getParams()?.includes(param) && !this.wasAdded(param);
        },
        getParamClass(param) {
            if (this.wasAdded(param) && this.getParams()?.includes(param)) {
                return 'paramAddedContainer';
            } else if (this.wasAdded(param)) {
                return 'paramExtraContainer';
            }
            return 'paramContainer';
        },
        getParamValue(param) {
            return this.tempModelStructure['components'][this.builder.curTipReferenceBelonger][param] || '';
        },
        refreshTipReference(index) {
            this.$store.commit('builder/refreshTipReference', { componentName: index, instruction: this.visualize.baseData[this.builder.selectedToolbox].instruction})
        },
        addNewParam(param) {
            this.$set(this.tempModelStructure.components[this.builder.curTipReferenceBelonger], param, '');
        },
        saveAll() {
            if (this.isNotWarningToSaveAll) {
                alert('不需要保存哦');
            } else {
                this.$store.commit('builder/refreshModelStructure', this.tempModelStructure);
                alert('保存成功！');
            }
        }
    },
    mounted() {
        this.tempModelStructure = JSON.parse(JSON.stringify(this.builder.modelStructure));
    },
    watch: {
    '$store.state.settings.nestedCheckboxSelectedValue'(newVal) {
        if (Object.keys(this.builder.component2InstructionRefer).includes(newVal)) {
            this.refreshTipReference(newVal);
        } else if (this.builder.tipOptions.includes(newVal)) {
            this.$store.commit('builder/setSelectedTipOption', newVal);
        } else if (this.builder.variantOptions.includes(newVal)) {
            this.$store.commit('builder/setSelectedTipVariance', newVal);
            this.tempModelStructure.components[this.builder.curTipReferenceBelonger].type = newVal;
        }
    }
}
}
</script>

<style scoped>
/* global */
.paddingTopArea {
    padding-top: 50px;
}

/* general */
.firstContainer {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 0 10px;
    padding: 6px 16px;
    overflow: auto;
}

.largeCheckboxContainer {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 6px;
}

.largeCheckbox {
    max-width: fit-content;
    margin: 10px 0;
    padding: 3px 10px;
    font-size: 14px;
    color: #333;
    background-color: #f0f0f0;
    border-radius: 8px;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1.05);
}

.largeCheckbox:hover {
    background-color: #e0e0e0;
}

.addableTipContainer {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 0;
    gap: 6px;
}

.paramContainer, .paramAddedContainer, .paramExtraContainer {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    max-width: fit-content;
    align-items: center;
    padding: 6px 10px;
    background: #f0f0f0;
    border-radius: 8px;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1.05);
    gap: 10px;
}

.paramContainer:hover, .paramAddedContainer:hover, .paramExtraContainer:hover {
    box-shadow: 0 0 0 1px #6638f03c inset;
}

.paramAddedContainer {
    border: 1px solid orange;
    background: #ffecb3;
}

.paramExtraContainer {
    border: 1px solid #6638f0;
    background: #6638f03c;
}

.paramName {
    font-weight: 700;
    font-size: 14px;
    color: #333;
}

.addBtn {
    font-size: 14px;
    color: #6638f0;
    cursor: pointer;
}

.paramValue {
    font-size: 14px;
    color: #333;
}

.caption {
    font-size: 14px;
    color: lightgray;
}
</style>