<template>
    <view class="DetialPanel">
        <view class="panelScaler">
            <view class="TitleBarContainer">
                <view class="TitleBarWarp">
                    <view class="reutrnBtn" @click="closePanel">⤫</view>
                    <view class="largeTitle deeppinkTitle">{{ visualize.detailPanelData.modelName }}</view>
                    <view class="largeTitle blackNormalTitle" v-if="visualize.detailPanelData.paramType !== 'type'">{{ visualize.detailPanelData.paramType }}</view>
                    <view class="largeTitle blackNormalTitle">{{ visualize.detailPanelData.paramName }}</view>
                </view>
                <view v-if="typeof visualize.detailPanelData.paramValue === 'object' && !Array.isArray(visualize.detailPanelData.paramValue)">
                </view>
                <view v-else>
                    <view class="TitleBarFunctionalWarp">
                        <view class="largeTitle purpleNormalTitle">{{ truncatedParamValue }}</view>
                    </view>
                </view>
            </view>
            <view class="contentContainer">
                <view class="paddingArea">.</view>
                <view v-if="typeof visualize.detailPanelData.paramValue === 'object' && !Array.isArray(visualize.detailPanelData.paramValue)">
                    <view class="largeMarginTitle">参数值字典</view>
                    <view class="paramContainer" v-for="(value, index) in visualize.detailPanelData.paramValue" :key="index">
                        <view class="paramName">{{ index }}</view>
                        <pre class="paramValue">{{ value === undefined ? '无' : value }}</pre>
                    </view>
                    <view class="largeMarginTitle">{{visualize.detailPanelData.paramType + visualize.detailPanelModelData.name }}源码信息</view>
                    <view class="paramContainer" v-for="(value, index) in visualize.detailPanelData.model" :key="index">
                        <view class="paramName">{{ indexCN[index] }}</view>
                        <view v-if="index === 'code'">
                            <markdown-it-vue :content="value === undefined ? '无' : '```' + value + '```'"/>
                        </view>
                        <view v-else>
                            <pre class="paramValue">{{ value === undefined ? '无' : value }}</pre>
                        </view>
                    </view>
                </view>
                <view v-else>
                    <view class="largeMarginTitle">{{ '[' + visualize.detailPanelData.paramType + '] ' + visualize.detailPanelModelData.name }}源码信息</view>
                    <view class="paramContainer" v-for="(value, index) in visualize.detailPanelData.model" :key="index">
                        <view class="paramName">{{ index2CN[index] }}</view>
                        <view v-if="index === 'code'">
                            <markdown-it-vue :content="value === undefined ? '无' : '```\n' + value + '\n```'"/>
                        </view>
                        <view v-else>
                            <pre class="paramValue">{{ value === undefined ? '无' : value }}</pre>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'

export default {
    name: 'DetailPanel',
    components: {
        MarkdownItVue
    },
    created() {
        this.$store.dispatch('visualize/fetchBaseData');
    },
    data() {
        return {
            index2CN: {
                codeClassName: '类名',
                codeDocString: '源码注释',
                initArgs: '初始化参数',
                code: '源码',
            }
        };
    },
    computed: {
        visualize() {
            return this.$store.state.visualize;
        },
        truncatedParamValue() {
            if (typeof this.visualize.detailPanelData.paramValue === 'object' && (Array.isArray(this.visualize.detailPanelData.paramValue) || !Array.isArray(this.visualize.detailPanelData.paramValue))) {
                return '略';
            } else {
                return this.visualize.detailPanelData.paramValue;
            }
        }
    },
    methods: {
        closePanel() {
            this.$store.commit('visualize/setShowDetailPanel', false);
        }
    }
};
</script>

<style scoped>
/* global */
.generalTitle {
    margin-left: 16px;
}

.paddingArea {
    height: 50px;
}

/* general */
.contentContainer {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
}

.paramContainer {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 10px;
    padding: 16px;
    border-radius: 8px;
    border-bottom: 1px solid #f0f0f0;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1.05);
}

.paramContainer:hover {
    background: #f0f0f0;
}

.paramName {
    font-family: "Ali";
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 6px;
    color: #333;
}

.paramValue {
    font-size: 13px;
    color: #666;
}

@media (max-width: 768px) {
    .panelScaler {
        width: 100%;
        height: 100%;
        border-radius: 0;
    }

    .TitleBarFunctionalWarp {
        display: none;
    }

    .deeppinkTitle {
        display: none;
    }
}
</style>