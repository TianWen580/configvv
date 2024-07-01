import Vue from 'vue';

export default {
    namespaced: true,
    state () {
        return {
            warning: '',
            tipIndicatorWarning: '当前变种或参数配置已发生改变。如果不保存将会丢失！',
            selectedToolbox: '',
            // modelStructure: {
            //     "name": '',
            //     "components": {}
            // },
            component2InstructionRefer: {
                "backbone": "backbones",
                "neck": "necks",
                "decode_head": "decode_heads"
            },
            instructionRefer2Component: {
                "backbones": "backbone",
                "necks": "neck",
                "decode_heads": "decode_head"
            },
            tipReference: {},
            curTipReferenceBelonger: '',
            tipOptions: {},
            selectedTipOption: '',
            variantOptions: {},
            selectedTipVariance: '',
            componentCaptions: {
                "type": "定义",
                "data_preprocessor": "数据预处理",
                "backbone": "主干网络",
                "neck": "在输入解码器之前的特征融合模块",
                "decode_head": "解码器",
                "train_cfg": "模型的训练配置（通常关闭）",
                "test_cfg": "模型的测试配置"
            },
            changeRules: {
                "type": [],
                "data_preprocessor": ["mean", "std", "bgr_to_rgb", "pad_val", "seg_pad_val", "size"],
                "backbone": ["reverse", "norm_cfg"],
                "neck": ["all"],
                "decode_head": ["reverse", "norm_cfg", "loss_decode"],
                "train_cfg": [],
                "test_cfg": []
            },
            noTipComponents: ["type", "data_preprocessor", "train_cfg", "test_cfg"],
            loading: {
                "framework": {
                    "name": '',
                    "components": {
                        "type": "EncoderDecoder",
                        "data_preprocessor": {
                            "type": "SegDataPreProcessor",
                            "mean": [
                                123.675,
                                116.28,
                                103.53
                            ],
                            "std": [
                                58.395,
                                57.12,
                                57.375
                            ],
                            "bgr_to_rgb": true,
                            "pad_val": 0,
                            "seg_pad_val": 255,
                            "size": [
                                512,
                                512
                            ]
                        },
                        "backbone": {},
                        "neck": {},
                        "decode_head": {},
                        "train_cfg": {},
                        "test_cfg": {}
                    }
                },
                "demo": {
                    "name": '',
                    "components": {
                        "type": "EncoderDecoder",
                        "data_preprocessor": {
                            "type": "SegDataPreProcessor",
                            "mean": [
                                123.675,
                                116.28,
                                103.53
                            ],
                            "std": [
                                58.395,
                                57.12,
                                57.375
                            ],
                            "bgr_to_rgb": true,
                            "pad_val": 0,
                            "seg_pad_val": 255,
                            "size": [
                                512,
                                512
                            ]
                        },
                        "backbone": {
                            "type": "ResNetV1c",
                            "depth": 50,
                            "num_stages": 4,
                            "out_indices": [
                                0,
                                1,
                                2,
                                3
                            ],
                            "dilations": [
                                1,
                                1,
                                1,
                                1
                            ],
                            "strides": [
                                1,
                                2,
                                2,
                                2
                            ],
                            "norm_cfg": {
                                "type": "SyncBN",
                                "requires_grad": true
                            },
                            "norm_eval": false,
                            "style": "pytorch",
                            "contract_dilation": true
                        },
                        "neck": {
                            "type": "FPN",
                            "in_channels": [
                                256,
                                512,
                                1024,
                                2048
                            ],
                            "out_channels": 256,
                            "num_outs": 4
                        },
                        "decode_head": {
                            "type": "FPNHead",
                            "in_channels": [
                                256,
                                256,
                                256,
                                256
                            ],
                            "in_index": [
                                0,
                                1,
                                2,
                                3
                            ],
                            "feature_strides": [
                                4,
                                8,
                                16,
                                32
                            ],
                            "channels": 128,
                            "dropout_ratio": 0.1,
                            "num_classes": 150,
                            "norm_cfg": {
                                "type": "SyncBN",
                                "requires_grad": true
                            },
                            "align_corners": false,
                            "loss_decode": {
                                "type": "CrossEntropyLoss",
                                "use_sigmoid": false,
                                "loss_weight": 1.0
                            }
                        },
                        "train_cfg": {},
                        "test_cfg": {
                            "mode": "whole"
                        }
                    }
                },
            },
            modelStructure: {},

            // boolean
            isShowValueEditor: false,
            isShowTipIndicator: false,
        }
    },
    mutations: {
        updateComponentParamValue (state, obj) {
            const componentName = obj.index;
            const paramName = obj.label;
            const newValue = obj.newValue;

            state.modelStructure.components[componentName][paramName] = newValue;
        },
        setShowValueEditor (state, isShowValueEditor) {
            state.isShowValueEditor = isShowValueEditor
        },
        setWarning (state, warning) {
            state.warning = warning
        },
        setTipIndicatorWarning (state, warning) {
            state.tipIndicatorWarning = warning
        },
        cleanWarning (state) {
            state.warning = ''
        },
        refreshTipReference(state, obj) {
            this.commit('builder/resetTipReference');

            const componentName = obj.componentName;
            const instruction = obj.instruction;

            const referKey = state.component2InstructionRefer[componentName];
            const instructions = instruction[referKey];
            let newTipReference = {};

            for (const key in instructions) {
                if (instructions[key].hasOwnProperty("classes")) {
                    newTipReference[key] = instructions[key]["classes"];
                }
            }

            state.curTipReferenceBelonger = componentName;
            state.tipReference = newTipReference;

            this.commit('builder/setSelectedTipVariance', state.modelStructure['components'][state.curTipReferenceBelonger].type)
        },
        resetTipReference (state) {
            state.tipReference = {};
            state.curTipReferenceBelonger = '';
            state.tipOptions = {};
            state.selectedTipOption = '';
        },
        setShowTipIndicator (state, isShowTipIndicator) {
            state.isShowTipIndicator = isShowTipIndicator
        },
        setTipOptions (state, tipOptions) {
            state.tipOptions = tipOptions
        },
        setSelectedTipOption (state, selectedTipOption) {
            state.selectedTipOption = selectedTipOption
            state.variantOptions = state.tipReference[selectedTipOption]
            state.selectedTipVariance = ''
        },
        setTipVariantOptions (state, variantOptions) {
            state.variantOptions = variantOptions
        },
        setSelectedTipVariance (state, selectedTipVariance) {
            state.selectedTipVariance = selectedTipVariance
        },
        refreshModelStructure(state, modelStructure) {
            Vue.set(state, 'modelStructure', JSON.parse(JSON.stringify(modelStructure)));
        },
        loadModelStructure(state, source) {
            Vue.set(state, 'modelStructure', JSON.parse(JSON.stringify(source)));
        },
        addComponentParam(state, obj) {
            state.modelStructure.components[obj.componentName][obj.paramName] = '';
        }
    },
    actions: {},
    getters: {}
}