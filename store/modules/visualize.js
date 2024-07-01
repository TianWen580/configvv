export default {
    namespaced: true,
    state () {
        return {

            baseData: {},
            navPath: [],
            navDirectory: [],
            selectableMMLabToolboxes: ['mmsegmentation', 'mmpretrain', 'mmdetection'],
            selectedMMLabToolbox: '',
            selectedModelPath: [],
            detailPanelData: {},
            detailPanelModelData: {},

            //boolean
            isShowCheckbox: false,
            isShowDetailPanel: false,
        }
    },
    mutations: {
        setBaseData(state, data) {
            state.baseData = data;
        },
        setNavDirectory(state, data) {
            state.navDirectory = data
        },
        setSelectedMMLabToolbox(state, toolbox) {
            state.selectedMMLabToolbox = toolbox
            state.navPath.push(toolbox)
        },
        cleanSelectedMMLabToolbox(state) {
            state.selectedMMLabToolbox = ''
            this.commit('visualize/cleanSelectedModelPath')
            state.navPath = []
            state.navDirectory = []
        },
        setSelectedModelPath(state, path) {
            state.selectedModelPath = path
            if (path.length === 1) {
                if (state.navPath.length === 1){
                    state.navPath.push(path[0])
                    state.navDirectory = []
                } else {
                    state.navPath.splice(1, 1, path[0])
                    state.navDirectory = []
                }
            } else {
                if (state.navPath.length === 2){
                    state.navPath.push(path[1])
                } else {
                    state.navPath.splice(2, 1, path[1])
                }
            }
        },
        cleanSelectedModelPath(state) {
            state.selectedModelPath = []
        },
        setShowCheckbox(state, isShow) {
            state.isShowCheckbox = isShow;
        },
        setShowDetailPanel(state, isShow) {
            state.isShowDetailPanel = isShow;
            if (!isShow) {
                state.detailPanelData = {};
                state.detailPanelModelData = {};
            }
        },
        setDetailPanelData(state, data) {
            state.detailPanelData = data;
        },
        refreshModelData(state, type) {
            const bilinks = state.baseData[state.selectedMMLabToolbox].bilinks;
            const instruction = state.baseData[state.selectedMMLabToolbox].instruction;
            let bilinksKey = '';

            if (bilinks) {
                Object.entries(bilinks).forEach(([key, value]) => {
                    if (Array.isArray(value)) {
                        value.forEach(item => {
                            if (typeof item === 'string' && item.includes(type)) {
                                bilinksKey = key;
                            }
                        });
                    }
                });
            }

            if (bilinksKey) {
                for (const item in instruction[bilinksKey]) {
                    let isFind = false;
                    for (const classItem of instruction[bilinksKey][item].classes) {
                        if (classItem.name === type) {
                            state.detailPanelModelData = classItem;
                            isFind = true;
                            break;
                        }
                    }
                    if (isFind) {
                        break;
                    }
                }
            } else {
                state.detailPanelModelData = {};
            }
        }
    },
    actions: {
        fetchBaseData({ commit }) {
            fetch('../../static/baseData.json')
                .then(response => response.json())
                .then(data => {
                    commit('setBaseData', data);
                })
                .catch(error => {
                    console.error('Error loading baseData:', error);
                });
        },
    },
    getters: {}
}