<template>
    <view class="VisListPanel">
        <view class="paddingTopArea">.</view>
        <transition name="fade">
            <view class="navPathBarContainer" v-if="visualize.navPath.length > 0">
                <view class="pathNode rootPathNode" @click="$store.commit('visualize/cleanSelectedMMLabToolbox')">⎈</view>
                <view class="pathWarp" v-for="(name, index) in visualize.navPath" :key="index">
                    <view class="pathNode">{{ name }}</view>
                    <span>·</span>
                </view>
            </view>
        </transition>
        <view class="contentContainer">
            <transition name="fade">
                <view class="navDirectoryLeftbarContainer" v-if="visualize.navDirectory.length > 0">
                    <view class="generalTitle">目录</view>
                    <view v-for="(name, index) in visualize.navDirectory" :key="index">
                        <view class="directoryhNode">{{ name }}</view>
                    </view>
                </view>
            </transition>
            <view class="mainSelectorContainer withPadding" v-if="visualize.selectedMMLabToolbox === ''">
                <view class="blackTitle largeTitle">OpenMMLab 工具箱</view>
                <view class="toolboxInfoGridContainer">
                    <view class="toolboxInfoContainer" v-for="(toolbox, index) in visualize.selectableMMLabToolboxes" :key="index">
                        <view class="toolboxNameLabel">{{ toolbox }}</view>
                        <view class="infoLabel">{{ visualize.baseData[toolbox].info }}</view>
                        <img :src="visualize.baseData[toolbox].starlink" alt="star">
                        <view class="selectBtn" @click="setSelectedToolbox(toolbox)">浏览模型</view>
                    </view>
                </view>
                <view class="blackTitle largeTitle">我的配置文件</view>
                <view>✦ 空空如也</view>
            </view>
            <view class="mainSelectorContainer" v-else>
                <VisualizingPanel />
            </view>
        </view>
        <view class=""></view>
    </view>
</template>

<script>
import VisualizingPanel from '@/components/VisualizingPanel.vue';

export default {
    name: 'VisListPanel',
    components: {
        VisualizingPanel
    },
    created() {
        this.$store.dispatch('visualize/fetchBaseData');
    },
    computed: {
        visualize() {
            return this.$store.state.visualize
        }
    },
    methods: {
        setSelectedToolbox(toolbox) {
            this.$store.commit('visualize/setSelectedMMLabToolbox', toolbox);
        }
    }
}
</script>

<style scoped>
.navPathBarContainer {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin: 6px 0;
    padding: 6px;
    border-radius: 6px;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1.05);
}

.navPathBarContainer:hover {
    background: #f0f0f0;
}

.pathWarp {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.rootPathNode {
    background: #fff;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    color: #2552d6 !important;
    padding: 0 2px;
    border-radius: 3px;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1.05);
}

.rootPathNode:hover {
    background: #3269f6;
    color: white !important;
}

.pathNode {
    color: #93a6c6;
    margin: 0 3px;
    cursor: pointer;
}

.pathNode:hover {
    color: #3269f6;
}

.contentContainer {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: calc(100% - 100px);
    gap: 6px;
}

.navDirectoryLeftbarContainer {
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 10px;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1.05);
}

.directoryhNode {
    background: #fff;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    color: #2552d6;
    padding: 3px 6px;
    border-radius: 6px;
    margin: 6px 0;
    cursor: pointer;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1.05);
}

.withPadding {
    padding: 20px;
}

.mainSelectorContainer {
    background: #fff;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    border-radius: 16px;
    gap: 16px;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1.05);
}

.toolboxInfoGridContainer {
    display: flex;
    gap: 16px;
}

.toolboxInfoContainer {
    position: relative;
    background: #fff;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    min-width: 160px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 10px;
    /* border: 1px solid lightgray; */
    border-radius: 16px;
    gap: 6px;
}

.toolboxInfoContainer:hover {
    box-shadow: 0 0 0 1px #3269f6 inset;
}

.toolboxNameLabel {
    font-family: 'Ali', sans-serif;
    font-size: 20px;
    font-weight: 300;
    text-transform: uppercase;
    color: #2552d6;
}

.infoLabel {
    font-family: 'Ali', sans-serif;
    font-size: 12px;
    margin: 6px 0;
    color: #000;
}

img {
    position: absolute;
    bottom: 10px;
    right: 10px;
    border-radius: 5px;
    border: 1px solid #fff;
    -webkit-user-drag: none;
}

.selectBtn {
    background: #f5f5f5;
    color: #2552d6;
    font-size: 12px;
    padding: 3px 10px;
    border-radius: 3px 3px 3px 10px;
    cursor: pointer;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1.05);
}

.selectBtn:hover {
    color: #000;
}

.selectBtn:active {
    transform: scale(0.95);
}
</style>