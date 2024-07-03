<template>
    <view class="VisualizingPanel">
        <view class="TitleBarContainer">
            <view class="TitleBarWarp">
                <view class="reutrnBtn" @click="closePanel">⤫</view>
                <view class="largeTitle whiteTitle">{{ visualize.selectedMMLabToolbox }}</view>
            </view>
            <view class="TitleBarFunctionalWarp">
                <view class="checkbox" @click="toggleCheckbox(getOptionsDirectly())">模型｜{{ visualize.selectedModelPath[0] ? visualize.selectedModelPath[0] : '未选择' }}</view>
                <view class="checkbox" @click="toggleCheckbox(getOptions(visualize.selectedModelPath[0]))" v-if="visualize.selectedModelPath[0]">变种｜{{ visualize.selectedModelPath[1] ? visualize.selectedModelPath[1] : '未选择' }}</view>
            </view>
        </view>
        <view class="nothingHereContainer" v-if="!visualize.selectedModelPath[1]">
            <view class="nothingHereLabel">✦ 空空如也 ✦</view>
        </view>
        <view class="contentContainer" v-if="visualize.selectedModelPath.length === 2">
            <view class="paddingArea">.</view>
            <view class="summaryPanelContainer">
                <view class="summaryContainer" v-for="(summary, index) in summaryData" :key="index">
                    <view class="summaryTitle">{{ index }}</view>
                    <view class="summaryData">{{ summary }}</view>
                </view>
            </view>
            <view class="ParamContainer" v-for="(meta, index) in modelMeta" :key="index">
                <view class="whiteTitle generalTitle">{{ index }}</view>
                <view v-if="typeof meta === 'object'">
                    <view :class="label === 'type' ? 'recordSpecialContainer' : 'recordContainer'" v-for="(record, label) in meta" :key="label">
                        <view class="recordLabel">{{ label }}</view>
                        <view v-if="typeof record === 'object' && !Array.isArray(record)">
                            <view class="record" @click="viewDetailPanel(index, label, record, meta)">详情</view>
                        </view>
                        <view v-else>
                            <view class="record" @click="viewDetailPanel(index, label, record, meta)">{{ record }}</view>
                        </view>
                    </view>
                </view>
                <view class="recordContainer" v-else>
                    <view class="recordLabel">{{ index }}</view>
                    <pre class="record" @click="viewDetailPanel(index, index, meta, meta)">{{ meta }}</pre>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: 'VisualizingPanel',
    created() {
        this.$store.dispatch('visualize/fetchBaseData');
    },
    computed: {
        visualize() {
            return this.$store.state.visualize;
        },
        summaryData() {
            return {
                '当前基线': this.visualize.selectedModelPath[0],
                '本站可展示的变种数量': Object.keys(this.visualize.baseData[this.visualize.selectedMMLabToolbox].config[this.visualize.selectedModelPath[0]]).length
            };
        },
    },
    data() {
        return {
            modelMeta: {},
            configOptions: {},
        };
    },
    methods: {
        closePanel() {
            this.$store.commit('visualize/cleanSelectedMMLabToolbox');
        },
        toggleCheckbox(options) {
            this.$store.commit('settings/setNestedCheckboxOptions', options);
            this.$store.commit('visualize/setShowCheckbox', !this.visualize.isShowCheckbox);
        },
        getOptionsDirectly() {
            this.configOptions = Object.keys(this.visualize.baseData[this.visualize.selectedMMLabToolbox].config);
            return this.configOptions;
        },
        getOptions(modelName) {
            return Object.keys(this.visualize.baseData[this.visualize.selectedMMLabToolbox].config[modelName]);
        },
        getModelMeta() {
            // return this.visualize.baseData[this.visualize.selectedMMLabToolbox].config[this.visualize.selectedModelPath[0]][this.visualize.selectedModelPath[1]]['py'].model;
            return this.visualize.baseData[this.visualize.selectedMMLabToolbox].config[this.visualize.selectedModelPath[0]][this.visualize.selectedModelPath[1]].model;
        },
        viewDetailPanel(index, label, record, meta) {
            this.$store.commit('visualize/setShowDetailPanel', true);
            if (typeof meta === 'object' && !Array.isArray(meta)) {
                this.$store.commit('visualize/refreshModelData', meta['type']);
            } else {
                this.$store.commit('visualize/refreshModelData', meta);
            }
            const detailData = {
                modelName: this.visualize.selectedModelPath[0],
                variantName: this.visualize.selectedModelPath[1],
                paramType: index,
                paramName: label,
                paramValue: record,
                model: {
                    codeClassName: this.visualize.detailPanelModelData.name,
                    codeDocString: this.visualize.detailPanelModelData.docstring,
                    initArgs: this.visualize.detailPanelModelData.init_args,
                    code: this.visualize.detailPanelModelData.code
                }
            };
            this.$store.commit('visualize/setDetailPanelData', detailData);
        },
    },
    watch: {
        '$store.state.settings.nestedCheckboxSelectedValue' (newVal) {
            if (this.configOptions.includes(newVal)) {
                this.$store.commit('visualize/setSelectedModelPath', [newVal]);
            } else {
                this.$store.commit('visualize/setSelectedModelPath', [this.visualize.selectedModelPath[0], newVal]);
            }
        },
        '$store.state.visualize.selectedModelPath' (newVal) {
            if (newVal.length === 2) {
                this.modelMeta = this.getModelMeta();
                this.$store.commit('visualize/setNavDirectory', Object.keys(this.modelMeta));
            }
        }
    }
};
</script>

<style scoped>
/* global */
.paddingArea {
    padding-top: 40px;
}

/* general */
.contentContainer {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: auto;
    /* gap: 20px; */
}

.ParamContainer {
    padding: 10px 16px;
    margin: 0 10px;
    border-radius: 6px;
    display: inline-block;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1.05);
}

.ParamContainer:hover {
    background: rgba(0, 0, 0, 0.1);
}

.recordContainer, .recordSpecialContainer {
    background: #fff;
    min-width: fit-content;
    display: flex;
    flex-direction: row;
    border-radius: 6px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
    margin: 6px;
    padding: 3px 10px;
    display: inline-block;
    white-space: nowrap;
}

.recordContainer:hover {
    /* border: 1px solid #6638f0; */
    box-shadow: 0 0 0 1px #6638f03c inset;
}

.recordSpecialContainer {
    border: 1px solid #6638f0;
}

.recordLabel {
    color: #000;
    font-size: 13px;
}

.record {
    color: gray;
    font-size: 13px;
}

.record:hover {
    color: #6638f0;
}

.summaryPanelContainer {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 10px 20px;
    gap: 10px;
}

.summaryContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 3px 5px;
    border-radius: 6px;
    box-shadow: 0 0 5px rgba(255, 255, 255, 1);
    background: #fff;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1.05);
    gap: 10px;
}

.summaryContainer:hover {
    box-shadow: 0 0 0 1px #6638f03c inset;
}

.summaryTitle {
    font-size: 14px;
    color: #6638f0;
}

.summaryData {
    background: #6638f0;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    color: #fff;
    font-weight: 700;
    font-size: 14px;
    padding: 3px 6px;
    border-radius: 4px;
}

@media (max-width: 768px) {
    .largeTitle {
        display: none;
    }

    .checkbox {
        max-width: 120px;
    }
}
</style>