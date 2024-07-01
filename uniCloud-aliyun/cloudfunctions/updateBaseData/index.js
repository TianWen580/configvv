'use strict';

const db = uniCloud.database()

exports.main = async (event, context) => {
	// 先从vuex获取现在的数据
	let baseData = event.baseData
	baseData.mmsegmentation.config = {
		"sem_fpn": {
			"fpn_r50_4xb4-160k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
			"fpn_r50_4xb2-80k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
						"num_classes": 19,
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
			}
		},
		"ann": {
			"ann_r50-d8_4xb4-40k_voc12aug-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ANNHead",
						"in_channels": [
							1024,
							2048
						],
						"in_index": [
							2,
							3
						],
						"channels": 512,
						"project_channels": 256,
						"query_scales": [
							1
						],
						"key_pool_scales": [
							1,
							3,
							6,
							8
						],
						"dropout_ratio": 0.1,
						"num_classes": 21,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 21,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"ann_r50-d8_4xb4-80k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ANNHead",
						"in_channels": [
							1024,
							2048
						],
						"in_index": [
							2,
							3
						],
						"channels": 512,
						"project_channels": 256,
						"query_scales": [
							1
						],
						"key_pool_scales": [
							1,
							3,
							6,
							8
						],
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"ann_r50-d8_4xb4-20k_voc12aug-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ANNHead",
						"in_channels": [
							1024,
							2048
						],
						"in_index": [
							2,
							3
						],
						"channels": 512,
						"project_channels": 256,
						"query_scales": [
							1
						],
						"key_pool_scales": [
							1,
							3,
							6,
							8
						],
						"dropout_ratio": 0.1,
						"num_classes": 21,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 21,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"ann_r50-d8_4xb4-160k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ANNHead",
						"in_channels": [
							1024,
							2048
						],
						"in_index": [
							2,
							3
						],
						"channels": 512,
						"project_channels": 256,
						"query_scales": [
							1
						],
						"key_pool_scales": [
							1,
							3,
							6,
							8
						],
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"ann_r50-d8_4xb2-40k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ANNHead",
						"in_channels": [
							1024,
							2048
						],
						"in_index": [
							2,
							3
						],
						"channels": 512,
						"project_channels": 256,
						"query_scales": [
							1
						],
						"key_pool_scales": [
							1,
							3,
							6,
							8
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			},
			"ann_r50-d8_4xb2-80k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ANNHead",
						"in_channels": [
							1024,
							2048
						],
						"in_index": [
							2,
							3
						],
						"channels": 512,
						"project_channels": 256,
						"query_scales": [
							1
						],
						"key_pool_scales": [
							1,
							3,
							6,
							8
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"ann_r50-d8_4xb2-40k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ANNHead",
						"in_channels": [
							1024,
							2048
						],
						"in_index": [
							2,
							3
						],
						"channels": 512,
						"project_channels": 256,
						"query_scales": [
							1
						],
						"key_pool_scales": [
							1,
							3,
							6,
							8
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"ann_r50-d8_4xb2-80k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ANNHead",
						"in_channels": [
							1024,
							2048
						],
						"in_index": [
							2,
							3
						],
						"channels": 512,
						"project_channels": 256,
						"query_scales": [
							1
						],
						"key_pool_scales": [
							1,
							3,
							6,
							8
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			}
		},
		"emanet": {
			"emanet_r50-d8_4xb2-80k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "EMAHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 256,
						"ema_channels": 512,
						"num_bases": 64,
						"num_stages": 3,
						"momentum": 0.1,
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"emanet_r50-d8_4xb2-80k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "EMAHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 256,
						"ema_channels": 512,
						"num_bases": 64,
						"num_stages": 3,
						"momentum": 0.1,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			}
		},
		"swin": {
			"swin-tiny-patch4-window7-in1k-pre_upernet_8xb2-160k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": null,
					"backbone": {
						"type": "SwinTransformer",
						"pretrain_img_size": 224,
						"embed_dims": 96,
						"patch_size": 4,
						"window_size": 7,
						"mlp_ratio": 4,
						"depths": [
							2,
							2,
							6,
							2
						],
						"num_heads": [
							3,
							6,
							12,
							24
						],
						"strides": [
							4,
							2,
							2,
							2
						],
						"out_indices": [
							0,
							1,
							2,
							3
						],
						"qkv_bias": true,
						"qk_scale": null,
						"patch_norm": true,
						"drop_rate": 0.0,
						"attn_drop_rate": 0.0,
						"drop_path_rate": 0.3,
						"use_abs_pos_embed": false,
						"act_cfg": {
							"type": "GELU"
						},
						"norm_cfg": {
							"type": "LN",
							"requires_grad": true
						},
						"init_cfg": {
							"type": "Pretrained",
							"checkpoint": "https://download.openmmlab.com/mmsegmentation/v0.5/pretrain/swin/swin_tiny_patch4_window7_224_20220317-1cdeb081.pth"
						}
					},
					"decode_head": {
						"type": "UPerHead",
						"in_channels": [
							96,
							192,
							384,
							768
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"channels": 512,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 384,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"swin-tiny-patch4-window7_upernet_1xb8-20k_levir-256x256.py": {
				"model": {
					"type": "EncoderDecoder",
					"data_preprocessor": {
						"type": "SegDataPreProcessor",
						"mean": [
							123.675,
							116.28,
							103.53,
							123.675,
							116.28,
							103.53
						],
						"std": [
							58.395,
							57.12,
							57.375,
							58.395,
							57.12,
							57.375
						],
						"bgr_to_rgb": true,
						"pad_val": 0,
						"seg_pad_val": 255,
						"size": [
							256,
							256
						]
					},
					"pretrained": null,
					"backbone": {
						"type": "SwinTransformer",
						"pretrain_img_size": 224,
						"embed_dims": 96,
						"patch_size": 4,
						"window_size": 7,
						"mlp_ratio": 4,
						"depths": [
							2,
							2,
							6,
							2
						],
						"num_heads": [
							3,
							6,
							12,
							24
						],
						"strides": [
							4,
							2,
							2,
							2
						],
						"out_indices": [
							0,
							1,
							2,
							3
						],
						"qkv_bias": true,
						"qk_scale": null,
						"patch_norm": true,
						"drop_rate": 0.0,
						"attn_drop_rate": 0.0,
						"drop_path_rate": 0.3,
						"use_abs_pos_embed": false,
						"act_cfg": {
							"type": "GELU"
						},
						"norm_cfg": {
							"type": "LN",
							"requires_grad": true
						},
						"in_channels": 6
					},
					"decode_head": {
						"type": "UPerHead",
						"in_channels": [
							96,
							192,
							384,
							768
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"channels": 512,
						"dropout_ratio": 0.1,
						"num_classes": 2,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 384,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 2,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			}
		},
		"convnext": {
			"convnext-base_upernet_8xb2-amp-40k_farm-512x512.py": {
				"model": {
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
					"pretrained": null,
					"backbone": {
						"type": "mmpretrain.ConvNeXt",
						"arch": "base",
						"out_indices": [
							0,
							1,
							2,
							3
						],
						"drop_path_rate": 0.4,
						"layer_scale_init_value": 1.0,
						"gap_before_final_norm": false,
						"init_cfg": {
							"type": "Pretrained",
							"checkpoint": "https://download.openmmlab.com/mmclassification/v0/convnext/downstream/convnext-base_3rdparty_32xb128-noema_in1k_20220301-2a0ee547.pth",
							"prefix": "backbone."
						}
					},
					"decode_head": {
						"type": "UPerHead",
						"in_channels": [
							128,
							256,
							512,
							1024
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"channels": 512,
						"dropout_ratio": 0.1,
						"num_classes": 2,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 512,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 2,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							512,
							512
						],
						"stride": [
							341,
							341
						]
					}
				}
			},
			"convnext-xlarge_upernet_8xb2-amp-160k_ade20k-640x640.py": {
				"model": {
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
							640,
							640
						]
					},
					"pretrained": null,
					"backbone": {
						"type": "mmpretrain.ConvNeXt",
						"arch": "xlarge",
						"out_indices": [
							0,
							1,
							2,
							3
						],
						"drop_path_rate": 0.4,
						"layer_scale_init_value": 1.0,
						"gap_before_final_norm": false,
						"init_cfg": {
							"type": "Pretrained",
							"checkpoint": "https://download.openmmlab.com/mmclassification/v0/convnext/downstream/convnext-xlarge_3rdparty_in21k_20220301-08aa5ddc.pth",
							"prefix": "backbone."
						}
					},
					"decode_head": {
						"type": "UPerHead",
						"in_channels": [
							256,
							512,
							1024,
							2048
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"channels": 512,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							640,
							640
						],
						"stride": [
							426,
							426
						]
					}
				}
			},
			"convnext-base_upernet_8xb2-amp-40k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": null,
					"backbone": {
						"type": "mmpretrain.ConvNeXt",
						"arch": "base",
						"out_indices": [
							0,
							1,
							2,
							3
						],
						"drop_path_rate": 0.4,
						"layer_scale_init_value": 1.0,
						"gap_before_final_norm": false,
						"init_cfg": {
							"type": "Pretrained",
							"checkpoint": "https://download.openmmlab.com/mmclassification/v0/convnext/downstream/convnext-base_3rdparty_32xb128-noema_in1k_20220301-2a0ee547.pth",
							"prefix": "backbone."
						}
					},
					"decode_head": {
						"type": "UPerHead",
						"in_channels": [
							128,
							256,
							512,
							1024
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"channels": 512,
						"dropout_ratio": 0.1,
						"num_classes": 2,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 512,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 2,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							512,
							512
						],
						"stride": [
							341,
							341
						]
					}
				}
			},
			"convnext-large_upernet_8xb2-amp-160k_ade20k-640x640.py": {
				"model": {
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
							640,
							640
						]
					},
					"pretrained": null,
					"backbone": {
						"type": "mmpretrain.ConvNeXt",
						"arch": "large",
						"out_indices": [
							0,
							1,
							2,
							3
						],
						"drop_path_rate": 0.4,
						"layer_scale_init_value": 1.0,
						"gap_before_final_norm": false,
						"init_cfg": {
							"type": "Pretrained",
							"checkpoint": "https://download.openmmlab.com/mmclassification/v0/convnext/downstream/convnext-large_3rdparty_in21k_20220301-e6e0ea0a.pth",
							"prefix": "backbone."
						}
					},
					"decode_head": {
						"type": "UPerHead",
						"in_channels": [
							192,
							384,
							768,
							1536
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"channels": 512,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 768,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							640,
							640
						],
						"stride": [
							426,
							426
						]
					}
				}
			},
			"convnext-base_upernet_8xb2-amp-160k_ade20k-640x640.py": {
				"model": {
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
							640,
							640
						]
					},
					"pretrained": null,
					"backbone": {
						"type": "mmpretrain.ConvNeXt",
						"arch": "base",
						"out_indices": [
							0,
							1,
							2,
							3
						],
						"drop_path_rate": 0.4,
						"layer_scale_init_value": 1.0,
						"gap_before_final_norm": false,
						"init_cfg": {
							"type": "Pretrained",
							"checkpoint": "https://download.openmmlab.com/mmclassification/v0/convnext/downstream/convnext-base_3rdparty_in21k_20220301-262fd037.pth",
							"prefix": "backbone."
						}
					},
					"decode_head": {
						"type": "UPerHead",
						"in_channels": [
							128,
							256,
							512,
							1024
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"channels": 512,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 512,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							640,
							640
						],
						"stride": [
							426,
							426
						]
					}
				}
			},
			"convnext-small_upernet_8xb2-amp-160k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": null,
					"backbone": {
						"type": "mmpretrain.ConvNeXt",
						"arch": "small",
						"out_indices": [
							0,
							1,
							2,
							3
						],
						"drop_path_rate": 0.3,
						"layer_scale_init_value": 1.0,
						"gap_before_final_norm": false,
						"init_cfg": {
							"type": "Pretrained",
							"checkpoint": "https://download.openmmlab.com/mmclassification/v0/convnext/downstream/convnext-small_3rdparty_32xb128-noema_in1k_20220301-303e75e3.pth",
							"prefix": "backbone."
						}
					},
					"decode_head": {
						"type": "UPerHead",
						"in_channels": [
							96,
							192,
							384,
							768
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"channels": 512,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 384,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							512,
							512
						],
						"stride": [
							341,
							341
						]
					}
				}
			},
			"convnext-tiny_upernet_8xb2-amp-160k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": null,
					"backbone": {
						"type": "mmpretrain.ConvNeXt",
						"arch": "tiny",
						"out_indices": [
							0,
							1,
							2,
							3
						],
						"drop_path_rate": 0.4,
						"layer_scale_init_value": 1.0,
						"gap_before_final_norm": false,
						"init_cfg": {
							"type": "Pretrained",
							"checkpoint": "https://download.openmmlab.com/mmclassification/v0/convnext/downstream/convnext-tiny_3rdparty_32xb128-noema_in1k_20220301-795e9634.pth",
							"prefix": "backbone."
						}
					},
					"decode_head": {
						"type": "UPerHead",
						"in_channels": [
							96,
							192,
							384,
							768
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"channels": 512,
						"dropout_ratio": 0.1,
						"num_classes": 2,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 384,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 2,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							512,
							512
						],
						"stride": [
							341,
							341
						]
					}
				}
			},
			"convnext-large_upernet_8xb2-amp-160k_farm-640x640.py": {
				"model": {
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
							640,
							640
						]
					},
					"pretrained": null,
					"backbone": {
						"type": "mmpretrain.ConvNeXt",
						"arch": "large",
						"out_indices": [
							0,
							1,
							2,
							3
						],
						"drop_path_rate": 0.4,
						"layer_scale_init_value": 1.0,
						"gap_before_final_norm": false,
						"init_cfg": {
							"type": "Pretrained",
							"checkpoint": "https://download.openmmlab.com/mmclassification/v0/convnext/downstream/convnext-large_3rdparty_in21k_20220301-e6e0ea0a.pth",
							"prefix": "backbone."
						}
					},
					"decode_head": {
						"type": "UPerHead",
						"in_channels": [
							192,
							384,
							768,
							1536
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"channels": 512,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 768,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							640,
							640
						],
						"stride": [
							426,
							426
						]
					}
				}
			},
			"convnext-base_upernet_8xb2-amp-160k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": null,
					"backbone": {
						"type": "mmpretrain.ConvNeXt",
						"arch": "base",
						"out_indices": [
							0,
							1,
							2,
							3
						],
						"drop_path_rate": 0.4,
						"layer_scale_init_value": 1.0,
						"gap_before_final_norm": false,
						"init_cfg": {
							"type": "Pretrained",
							"checkpoint": "https://download.openmmlab.com/mmclassification/v0/convnext/downstream/convnext-base_3rdparty_32xb128-noema_in1k_20220301-2a0ee547.pth",
							"prefix": "backbone."
						}
					},
					"decode_head": {
						"type": "UPerHead",
						"in_channels": [
							128,
							256,
							512,
							1024
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"channels": 512,
						"dropout_ratio": 0.1,
						"num_classes": 2,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 512,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 2,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							512,
							512
						],
						"stride": [
							341,
							341
						]
					}
				}
			},
			"convnext-base_upernet_8xb2-amp-160k_farm-512x512.py": {
				"model": {
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
					"pretrained": null,
					"backbone": {
						"type": "mmpretrain.ConvNeXt",
						"arch": "base",
						"out_indices": [
							0,
							1,
							2,
							3
						],
						"drop_path_rate": 0.4,
						"layer_scale_init_value": 1.0,
						"gap_before_final_norm": false,
						"init_cfg": {
							"type": "Pretrained",
							"checkpoint": "https://download.openmmlab.com/mmclassification/v0/convnext/downstream/convnext-base_3rdparty_32xb128-noema_in1k_20220301-2a0ee547.pth",
							"prefix": "backbone."
						}
					},
					"decode_head": {
						"type": "UPerHead",
						"in_channels": [
							128,
							256,
							512,
							1024
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"channels": 512,
						"dropout_ratio": 0.1,
						"num_classes": 2,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 512,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 2,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							512,
							512
						],
						"stride": [
							341,
							341
						]
					}
				}
			}
		},
		"erfnet": {
			"erfnet_fcn_4xb4-160k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": null,
					"backbone": {
						"type": "ERFNet",
						"in_channels": 3,
						"enc_downsample_channels": [
							16,
							64,
							128
						],
						"enc_stage_non_bottlenecks": [
							5,
							8
						],
						"enc_non_bottleneck_dilations": [
							2,
							4,
							8,
							16
						],
						"enc_non_bottleneck_channels": [
							64,
							128
						],
						"dec_upsample_channels": [
							64,
							16
						],
						"dec_stages_non_bottleneck": [
							2,
							2
						],
						"dec_non_bottleneck_channels": [
							64,
							16
						],
						"dropout_ratio": 0.1,
						"init_cfg": null
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 16,
						"channels": 128,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
			}
		},
		"fcn": {
			"fcn_r50-d8_4xb4-20k_voc12aug-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"num_convs": 2,
						"concat_input": true,
						"dropout_ratio": 0.1,
						"num_classes": 21,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 21,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"fcn_r50-d8_4xb2-80k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"num_convs": 2,
						"concat_input": true,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			},
			"fcn_r50-d8_4xb4-160k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"num_convs": 2,
						"concat_input": true,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"fcn_r50-d8_4xb4-80k_pascal-context-480x480.py": {
				"model": {
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
							480,
							480
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"num_convs": 2,
						"concat_input": true,
						"dropout_ratio": 0.1,
						"num_classes": 60,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 60,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							480,
							480
						],
						"stride": [
							320,
							320
						]
					}
				}
			},
			"fcn_r50-d8_4xb4-40k_voc12aug-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"num_convs": 2,
						"concat_input": true,
						"dropout_ratio": 0.1,
						"num_classes": 21,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 21,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"fcn_r50-d8_4xb2-40k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"num_convs": 2,
						"concat_input": true,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			},
			"fcn_r50-d8_4xb4-80k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"num_convs": 2,
						"concat_input": true,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"fcn_r50-d8_4xb4-80k_pascal-context-59-480x480.py": {
				"model": {
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
							480,
							480
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"num_convs": 2,
						"concat_input": true,
						"dropout_ratio": 0.1,
						"num_classes": 59,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 59,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							480,
							480
						],
						"stride": [
							320,
							320
						]
					}
				}
			},
			"fcn_r50-d8_4xb2-40k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"num_convs": 2,
						"concat_input": true,
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"fcn_r50-d8_4xb2-80k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"num_convs": 2,
						"concat_input": true,
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"fcn-d6_r50-d16_4xb2-40k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2
						],
						"strides": [
							1,
							2,
							2,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"num_convs": 2,
						"concat_input": true,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						},
						"dilation": 6
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						},
						"dilation": 6
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			},
			"fcn_r50-d8_4xb4-40k_pascal-context-59-480x480.py": {
				"model": {
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
							480,
							480
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"num_convs": 2,
						"concat_input": true,
						"dropout_ratio": 0.1,
						"num_classes": 59,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 59,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							480,
							480
						],
						"stride": [
							320,
							320
						]
					}
				}
			},
			"fcn_r50-d8_4xb4-40k_pascal-context-480x480.py": {
				"model": {
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
							480,
							480
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"num_convs": 2,
						"concat_input": true,
						"dropout_ratio": 0.1,
						"num_classes": 60,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 60,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							480,
							480
						],
						"stride": [
							320,
							320
						]
					}
				}
			},
			"fcn-d6_r50-d16_4xb2-40k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2
						],
						"strides": [
							1,
							2,
							2,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"num_convs": 2,
						"concat_input": true,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						},
						"dilation": 6
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						},
						"dilation": 6
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"fcn-d6_r50-d16_4xb2-80k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2
						],
						"strides": [
							1,
							2,
							2,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"num_convs": 2,
						"concat_input": true,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						},
						"dilation": 6
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						},
						"dilation": 6
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"fcn-d6_r50-d16_4xb2-80k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2
						],
						"strides": [
							1,
							2,
							2,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"num_convs": 2,
						"concat_input": true,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						},
						"dilation": 6
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						},
						"dilation": 6
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			}
		},
		"fastfcn": {
			"fastfcn_r50-d32_jpu_psp_4xb4-80k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
					"backbone": {
						"type": "ResNetV1c",
						"depth": 50,
						"num_stages": 4,
						"dilations": [
							1,
							1,
							2,
							4
						],
						"strides": [
							1,
							2,
							2,
							2
						],
						"out_indices": [
							1,
							2,
							3
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
						"type": "JPU",
						"in_channels": [
							512,
							1024,
							2048
						],
						"mid_channels": 512,
						"start_level": 0,
						"end_level": -1,
						"dilations": [
							1,
							2,
							4,
							8
						],
						"align_corners": false,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						}
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 2,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 1,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"fastfcn_r50-d32_jpu_psp_4xb4-160k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
					"backbone": {
						"type": "ResNetV1c",
						"depth": 50,
						"num_stages": 4,
						"dilations": [
							1,
							1,
							2,
							4
						],
						"strides": [
							1,
							2,
							2,
							2
						],
						"out_indices": [
							1,
							2,
							3
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
						"type": "JPU",
						"in_channels": [
							512,
							1024,
							2048
						],
						"mid_channels": 512,
						"start_level": 0,
						"end_level": -1,
						"dilations": [
							1,
							2,
							4,
							8
						],
						"align_corners": false,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						}
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 2,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 1,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"fastfcn_r50-d32_jpu_psp_4xb2-80k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
					"backbone": {
						"type": "ResNetV1c",
						"depth": 50,
						"num_stages": 4,
						"dilations": [
							1,
							1,
							2,
							4
						],
						"strides": [
							1,
							2,
							2,
							2
						],
						"out_indices": [
							1,
							2,
							3
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
						"type": "JPU",
						"in_channels": [
							512,
							1024,
							2048
						],
						"mid_channels": 512,
						"start_level": 0,
						"end_level": -1,
						"dilations": [
							1,
							2,
							4,
							8
						],
						"align_corners": false,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						}
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 2,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 1,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"fastfcn_r50-d32_jpu_psp_4xb4-80k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
					"backbone": {
						"type": "ResNetV1c",
						"depth": 50,
						"num_stages": 4,
						"dilations": [
							1,
							1,
							2,
							4
						],
						"strides": [
							1,
							2,
							2,
							2
						],
						"out_indices": [
							1,
							2,
							3
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
						"type": "JPU",
						"in_channels": [
							512,
							1024,
							2048
						],
						"mid_channels": 512,
						"start_level": 0,
						"end_level": -1,
						"dilations": [
							1,
							2,
							4,
							8
						],
						"align_corners": false,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						}
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 2,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 1,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			}
		},
		"hrnet": {
			"fcn_hr18_4xb2-160k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://msra/hrnetv2_w18",
					"backbone": {
						"type": "HRNet",
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"extra": {
							"stage1": {
								"num_modules": 1,
								"num_branches": 1,
								"block": "BOTTLENECK",
								"num_blocks": [
									4
								],
								"num_channels": [
									64
								]
							},
							"stage2": {
								"num_modules": 1,
								"num_branches": 2,
								"block": "BASIC",
								"num_blocks": [
									4,
									4
								],
								"num_channels": [
									18,
									36
								]
							},
							"stage3": {
								"num_modules": 4,
								"num_branches": 3,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72
								]
							},
							"stage4": {
								"num_modules": 3,
								"num_branches": 4,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72,
									144
								]
							}
						}
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": [
							18,
							36,
							72,
							144
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"channels": 270,
						"input_transform": "resize_concat",
						"kernel_size": 1,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": -1,
						"num_classes": 19,
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
			"fcn_hr18_4xb4-20k_voc12aug-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://msra/hrnetv2_w18",
					"backbone": {
						"type": "HRNet",
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"extra": {
							"stage1": {
								"num_modules": 1,
								"num_branches": 1,
								"block": "BOTTLENECK",
								"num_blocks": [
									4
								],
								"num_channels": [
									64
								]
							},
							"stage2": {
								"num_modules": 1,
								"num_branches": 2,
								"block": "BASIC",
								"num_blocks": [
									4,
									4
								],
								"num_channels": [
									18,
									36
								]
							},
							"stage3": {
								"num_modules": 4,
								"num_branches": 3,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72
								]
							},
							"stage4": {
								"num_modules": 3,
								"num_branches": 4,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72,
									144
								]
							}
						}
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": [
							18,
							36,
							72,
							144
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"channels": 270,
						"input_transform": "resize_concat",
						"kernel_size": 1,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": -1,
						"num_classes": 21,
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
			"fcn_hr18_4xb4-80k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://msra/hrnetv2_w18",
					"backbone": {
						"type": "HRNet",
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"extra": {
							"stage1": {
								"num_modules": 1,
								"num_branches": 1,
								"block": "BOTTLENECK",
								"num_blocks": [
									4
								],
								"num_channels": [
									64
								]
							},
							"stage2": {
								"num_modules": 1,
								"num_branches": 2,
								"block": "BASIC",
								"num_blocks": [
									4,
									4
								],
								"num_channels": [
									18,
									36
								]
							},
							"stage3": {
								"num_modules": 4,
								"num_branches": 3,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72
								]
							},
							"stage4": {
								"num_modules": 3,
								"num_branches": 4,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72,
									144
								]
							}
						}
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": [
							18,
							36,
							72,
							144
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"channels": 270,
						"input_transform": "resize_concat",
						"kernel_size": 1,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": -1,
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
			"fcn_hr18_4xb4-40k_pascal-context-480x480.py": {
				"model": {
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
							480,
							480
						]
					},
					"pretrained": "open-mmlab://msra/hrnetv2_w18",
					"backbone": {
						"type": "HRNet",
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"extra": {
							"stage1": {
								"num_modules": 1,
								"num_branches": 1,
								"block": "BOTTLENECK",
								"num_blocks": [
									4
								],
								"num_channels": [
									64
								]
							},
							"stage2": {
								"num_modules": 1,
								"num_branches": 2,
								"block": "BASIC",
								"num_blocks": [
									4,
									4
								],
								"num_channels": [
									18,
									36
								]
							},
							"stage3": {
								"num_modules": 4,
								"num_branches": 3,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72
								]
							},
							"stage4": {
								"num_modules": 3,
								"num_branches": 4,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72,
									144
								]
							}
						}
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": [
							18,
							36,
							72,
							144
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"channels": 270,
						"input_transform": "resize_concat",
						"kernel_size": 1,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": -1,
						"num_classes": 60,
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
						"mode": "slide",
						"crop_size": [
							480,
							480
						],
						"stride": [
							320,
							320
						]
					}
				}
			},
			"fcn_hr18_4xb2-80k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://msra/hrnetv2_w18",
					"backbone": {
						"type": "HRNet",
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"extra": {
							"stage1": {
								"num_modules": 1,
								"num_branches": 1,
								"block": "BOTTLENECK",
								"num_blocks": [
									4
								],
								"num_channels": [
									64
								]
							},
							"stage2": {
								"num_modules": 1,
								"num_branches": 2,
								"block": "BASIC",
								"num_blocks": [
									4,
									4
								],
								"num_channels": [
									18,
									36
								]
							},
							"stage3": {
								"num_modules": 4,
								"num_branches": 3,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72
								]
							},
							"stage4": {
								"num_modules": 3,
								"num_branches": 4,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72,
									144
								]
							}
						}
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": [
							18,
							36,
							72,
							144
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"channels": 270,
						"input_transform": "resize_concat",
						"kernel_size": 1,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": -1,
						"num_classes": 19,
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
			"fcn_hr18_4xb4-80k_loveda-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://msra/hrnetv2_w18",
					"backbone": {
						"type": "HRNet",
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"extra": {
							"stage1": {
								"num_modules": 1,
								"num_branches": 1,
								"block": "BOTTLENECK",
								"num_blocks": [
									4
								],
								"num_channels": [
									64
								]
							},
							"stage2": {
								"num_modules": 1,
								"num_branches": 2,
								"block": "BASIC",
								"num_blocks": [
									4,
									4
								],
								"num_channels": [
									18,
									36
								]
							},
							"stage3": {
								"num_modules": 4,
								"num_branches": 3,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72
								]
							},
							"stage4": {
								"num_modules": 3,
								"num_branches": 4,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72,
									144
								]
							}
						}
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": [
							18,
							36,
							72,
							144
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"channels": 270,
						"input_transform": "resize_concat",
						"kernel_size": 1,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": -1,
						"num_classes": 7,
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
			"fcn_hr18_4xb2-40k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://msra/hrnetv2_w18",
					"backbone": {
						"type": "HRNet",
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"extra": {
							"stage1": {
								"num_modules": 1,
								"num_branches": 1,
								"block": "BOTTLENECK",
								"num_blocks": [
									4
								],
								"num_channels": [
									64
								]
							},
							"stage2": {
								"num_modules": 1,
								"num_branches": 2,
								"block": "BASIC",
								"num_blocks": [
									4,
									4
								],
								"num_channels": [
									18,
									36
								]
							},
							"stage3": {
								"num_modules": 4,
								"num_branches": 3,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72
								]
							},
							"stage4": {
								"num_modules": 3,
								"num_branches": 4,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72,
									144
								]
							}
						}
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": [
							18,
							36,
							72,
							144
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"channels": 270,
						"input_transform": "resize_concat",
						"kernel_size": 1,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": -1,
						"num_classes": 19,
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
			"fcn_hr18_4xb4-40k_voc12aug-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://msra/hrnetv2_w18",
					"backbone": {
						"type": "HRNet",
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"extra": {
							"stage1": {
								"num_modules": 1,
								"num_branches": 1,
								"block": "BOTTLENECK",
								"num_blocks": [
									4
								],
								"num_channels": [
									64
								]
							},
							"stage2": {
								"num_modules": 1,
								"num_branches": 2,
								"block": "BASIC",
								"num_blocks": [
									4,
									4
								],
								"num_channels": [
									18,
									36
								]
							},
							"stage3": {
								"num_modules": 4,
								"num_branches": 3,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72
								]
							},
							"stage4": {
								"num_modules": 3,
								"num_branches": 4,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72,
									144
								]
							}
						}
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": [
							18,
							36,
							72,
							144
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"channels": 270,
						"input_transform": "resize_concat",
						"kernel_size": 1,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": -1,
						"num_classes": 21,
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
			"fcn_hr18_4xb4-160k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://msra/hrnetv2_w18",
					"backbone": {
						"type": "HRNet",
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"extra": {
							"stage1": {
								"num_modules": 1,
								"num_branches": 1,
								"block": "BOTTLENECK",
								"num_blocks": [
									4
								],
								"num_channels": [
									64
								]
							},
							"stage2": {
								"num_modules": 1,
								"num_branches": 2,
								"block": "BASIC",
								"num_blocks": [
									4,
									4
								],
								"num_channels": [
									18,
									36
								]
							},
							"stage3": {
								"num_modules": 4,
								"num_branches": 3,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72
								]
							},
							"stage4": {
								"num_modules": 3,
								"num_branches": 4,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72,
									144
								]
							}
						}
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": [
							18,
							36,
							72,
							144
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"channels": 270,
						"input_transform": "resize_concat",
						"kernel_size": 1,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": -1,
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
			"fcn_hr18_4xb4-80k_vaihingen-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://msra/hrnetv2_w18",
					"backbone": {
						"type": "HRNet",
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"extra": {
							"stage1": {
								"num_modules": 1,
								"num_branches": 1,
								"block": "BOTTLENECK",
								"num_blocks": [
									4
								],
								"num_channels": [
									64
								]
							},
							"stage2": {
								"num_modules": 1,
								"num_branches": 2,
								"block": "BASIC",
								"num_blocks": [
									4,
									4
								],
								"num_channels": [
									18,
									36
								]
							},
							"stage3": {
								"num_modules": 4,
								"num_branches": 3,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72
								]
							},
							"stage4": {
								"num_modules": 3,
								"num_branches": 4,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72,
									144
								]
							}
						}
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": [
							18,
							36,
							72,
							144
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"channels": 270,
						"input_transform": "resize_concat",
						"kernel_size": 1,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": -1,
						"num_classes": 6,
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
			"fcn_hr18_4xb4-80k_pascal-context-59-480x480.py": {
				"model": {
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
							480,
							480
						]
					},
					"pretrained": "open-mmlab://msra/hrnetv2_w18",
					"backbone": {
						"type": "HRNet",
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"extra": {
							"stage1": {
								"num_modules": 1,
								"num_branches": 1,
								"block": "BOTTLENECK",
								"num_blocks": [
									4
								],
								"num_channels": [
									64
								]
							},
							"stage2": {
								"num_modules": 1,
								"num_branches": 2,
								"block": "BASIC",
								"num_blocks": [
									4,
									4
								],
								"num_channels": [
									18,
									36
								]
							},
							"stage3": {
								"num_modules": 4,
								"num_branches": 3,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72
								]
							},
							"stage4": {
								"num_modules": 3,
								"num_branches": 4,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72,
									144
								]
							}
						}
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": [
							18,
							36,
							72,
							144
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"channels": 270,
						"input_transform": "resize_concat",
						"kernel_size": 1,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": -1,
						"num_classes": 59,
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
						"mode": "slide",
						"crop_size": [
							480,
							480
						],
						"stride": [
							320,
							320
						]
					}
				}
			},
			"fcn_hr18_4xb4-80k_potsdam-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://msra/hrnetv2_w18",
					"backbone": {
						"type": "HRNet",
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"extra": {
							"stage1": {
								"num_modules": 1,
								"num_branches": 1,
								"block": "BOTTLENECK",
								"num_blocks": [
									4
								],
								"num_channels": [
									64
								]
							},
							"stage2": {
								"num_modules": 1,
								"num_branches": 2,
								"block": "BASIC",
								"num_blocks": [
									4,
									4
								],
								"num_channels": [
									18,
									36
								]
							},
							"stage3": {
								"num_modules": 4,
								"num_branches": 3,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72
								]
							},
							"stage4": {
								"num_modules": 3,
								"num_branches": 4,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72,
									144
								]
							}
						}
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": [
							18,
							36,
							72,
							144
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"channels": 270,
						"input_transform": "resize_concat",
						"kernel_size": 1,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": -1,
						"num_classes": 6,
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
			"fcn_hr18_4xb4-40k_pascal-context-59-480x480.py": {
				"model": {
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
							480,
							480
						]
					},
					"pretrained": "open-mmlab://msra/hrnetv2_w18",
					"backbone": {
						"type": "HRNet",
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"extra": {
							"stage1": {
								"num_modules": 1,
								"num_branches": 1,
								"block": "BOTTLENECK",
								"num_blocks": [
									4
								],
								"num_channels": [
									64
								]
							},
							"stage2": {
								"num_modules": 1,
								"num_branches": 2,
								"block": "BASIC",
								"num_blocks": [
									4,
									4
								],
								"num_channels": [
									18,
									36
								]
							},
							"stage3": {
								"num_modules": 4,
								"num_branches": 3,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72
								]
							},
							"stage4": {
								"num_modules": 3,
								"num_branches": 4,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72,
									144
								]
							}
						}
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": [
							18,
							36,
							72,
							144
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"channels": 270,
						"input_transform": "resize_concat",
						"kernel_size": 1,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": -1,
						"num_classes": 59,
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
						"mode": "slide",
						"crop_size": [
							480,
							480
						],
						"stride": [
							320,
							320
						]
					}
				}
			},
			"fcn_hr18_4xb4-80k_isaid-896x896.py": {
				"model": {
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
							896,
							896
						]
					},
					"pretrained": "open-mmlab://msra/hrnetv2_w18",
					"backbone": {
						"type": "HRNet",
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"extra": {
							"stage1": {
								"num_modules": 1,
								"num_branches": 1,
								"block": "BOTTLENECK",
								"num_blocks": [
									4
								],
								"num_channels": [
									64
								]
							},
							"stage2": {
								"num_modules": 1,
								"num_branches": 2,
								"block": "BASIC",
								"num_blocks": [
									4,
									4
								],
								"num_channels": [
									18,
									36
								]
							},
							"stage3": {
								"num_modules": 4,
								"num_branches": 3,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72
								]
							},
							"stage4": {
								"num_modules": 3,
								"num_branches": 4,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72,
									144
								]
							}
						}
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": [
							18,
							36,
							72,
							144
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"channels": 270,
						"input_transform": "resize_concat",
						"kernel_size": 1,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": -1,
						"num_classes": 16,
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
			"fcn_hr18_4xb4-80k_pascal-context-480x480.py": {
				"model": {
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
							480,
							480
						]
					},
					"pretrained": "open-mmlab://msra/hrnetv2_w18",
					"backbone": {
						"type": "HRNet",
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"extra": {
							"stage1": {
								"num_modules": 1,
								"num_branches": 1,
								"block": "BOTTLENECK",
								"num_blocks": [
									4
								],
								"num_channels": [
									64
								]
							},
							"stage2": {
								"num_modules": 1,
								"num_branches": 2,
								"block": "BASIC",
								"num_blocks": [
									4,
									4
								],
								"num_channels": [
									18,
									36
								]
							},
							"stage3": {
								"num_modules": 4,
								"num_branches": 3,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72
								]
							},
							"stage4": {
								"num_modules": 3,
								"num_branches": 4,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72,
									144
								]
							}
						}
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": [
							18,
							36,
							72,
							144
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"channels": 270,
						"input_transform": "resize_concat",
						"kernel_size": 1,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": -1,
						"num_classes": 60,
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
						"mode": "slide",
						"crop_size": [
							480,
							480
						],
						"stride": [
							320,
							320
						]
					}
				}
			}
		},
		"dmnet": {
			"dmnet_r50-d8_4xb2-40k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DMHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"filter_sizes": [
							1,
							3,
							5,
							7
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			},
			"dmnet_r50-d8_4xb2-80k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DMHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"filter_sizes": [
							1,
							3,
							5,
							7
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			},
			"dmnet_r50-d8_4xb2-80k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DMHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"filter_sizes": [
							1,
							3,
							5,
							7
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"dmnet_r50-d8_4xb2-40k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DMHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"filter_sizes": [
							1,
							3,
							5,
							7
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"dmnet_r50-d8_4xb4-80k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DMHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"filter_sizes": [
							1,
							3,
							5,
							7
						],
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"dmnet_r50-d8_4xb4-160k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DMHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"filter_sizes": [
							1,
							3,
							5,
							7
						],
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			}
		},
		"ccnet": {
			"ccnet_r50-d8_4xb4-20k_voc12aug-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "CCHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"recurrence": 2,
						"dropout_ratio": 0.1,
						"num_classes": 21,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 21,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"ccnet_r50-d8_4xb4-40k_voc12aug-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "CCHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"recurrence": 2,
						"dropout_ratio": 0.1,
						"num_classes": 21,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 21,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"ccnet_r50-d8_4xb4-80k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "CCHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"recurrence": 2,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"ccnet_r50-d8_4xb2-80k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "CCHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"recurrence": 2,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			},
			"ccnet_r50-d8_4xb2-40k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "CCHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"recurrence": 2,
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"ccnet_r50-d8_4xb2-80k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "CCHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"recurrence": 2,
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"ccnet_r50-d8_4xb4-160k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "CCHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"recurrence": 2,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"ccnet_r50-d8_4xb2-40k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "CCHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"recurrence": 2,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			}
		},
		"fastscnn": {
			"fast_scnn_8xb4-160k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"backbone": {
						"type": "FastSCNN",
						"downsample_dw_channels": [
							32,
							48
						],
						"global_in_channels": 64,
						"global_block_channels": [
							64,
							96,
							128
						],
						"global_block_strides": [
							2,
							2,
							1
						],
						"global_out_channels": 128,
						"higher_in_channels": 64,
						"lower_in_channels": 128,
						"fusion_out_channels": 128,
						"out_indices": [
							0,
							1,
							2
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true,
							"momentum": 0.01
						},
						"align_corners": false
					},
					"decode_head": {
						"type": "DepthwiseSeparableFCNHead",
						"in_channels": 128,
						"channels": 128,
						"concat_input": false,
						"num_classes": 19,
						"in_index": -1,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true,
							"momentum": 0.01
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": true,
							"loss_weight": 1
						}
					},
					"auxiliary_head": [
						{
							"type": "FCNHead",
							"in_channels": 128,
							"channels": 32,
							"num_convs": 1,
							"num_classes": 19,
							"in_index": -2,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true,
								"momentum": 0.01
							},
							"concat_input": false,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": true,
								"loss_weight": 0.4
							}
						},
						{
							"type": "FCNHead",
							"in_channels": 64,
							"channels": 32,
							"num_convs": 1,
							"num_classes": 19,
							"in_index": -3,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true,
								"momentum": 0.01
							},
							"concat_input": false,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": true,
								"loss_weight": 0.4
							}
						}
					],
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			}
		},
		"bisenetv1": {
			"bisenetv1_r50-d32_4xb4-160k_cityscapes-1024x1024.py": {
				"model": {
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
							1024,
							1024
						]
					},
					"backbone": {
						"type": "BiSeNetV1",
						"in_channels": 3,
						"context_channels": [
							512,
							1024,
							2048
						],
						"spatial_channels": [
							256,
							256,
							256,
							512
						],
						"out_indices": [
							0,
							1,
							2
						],
						"out_channels": 1024,
						"backbone_cfg": {
							"type": "ResNet",
							"in_channels": 3,
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
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"init_cfg": null
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 0,
						"channels": 1024,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": [
						{
							"type": "FCNHead",
							"in_channels": 512,
							"channels": 256,
							"num_convs": 1,
							"num_classes": 19,
							"in_index": 1,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"concat_input": false
						},
						{
							"type": "FCNHead",
							"in_channels": 512,
							"channels": 256,
							"num_convs": 1,
							"num_classes": 19,
							"in_index": 2,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"concat_input": false
						}
					],
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"bisenetv1_r50-d32_4xb4-160k_coco-stuff164k-512x512.py": {
				"model": {
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
						"type": "BiSeNetV1",
						"in_channels": 3,
						"context_channels": [
							512,
							1024,
							2048
						],
						"spatial_channels": [
							256,
							256,
							256,
							512
						],
						"out_indices": [
							0,
							1,
							2
						],
						"out_channels": 1024,
						"backbone_cfg": {
							"type": "ResNet",
							"in_channels": 3,
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
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"init_cfg": null
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 0,
						"channels": 1024,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 171,
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
					"auxiliary_head": [
						{
							"type": "FCNHead",
							"in_channels": 512,
							"channels": 256,
							"num_convs": 1,
							"num_classes": 171,
							"in_index": 1,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"concat_input": false,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 1.0
							}
						},
						{
							"type": "FCNHead",
							"in_channels": 512,
							"channels": 256,
							"num_convs": 1,
							"num_classes": 171,
							"in_index": 2,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"concat_input": false,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 1.0
							}
						}
					],
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"bisenetv1_r18-d32_4xb4-160k_coco-stuff164k-512x512.py": {
				"model": {
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
						"type": "BiSeNetV1",
						"in_channels": 3,
						"context_channels": [
							128,
							256,
							512
						],
						"spatial_channels": [
							64,
							64,
							64,
							128
						],
						"out_indices": [
							0,
							1,
							2
						],
						"out_channels": 256,
						"backbone_cfg": {
							"type": "ResNet",
							"in_channels": 3,
							"depth": 18,
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
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"init_cfg": null
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 256,
						"in_index": 0,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 171,
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
					"auxiliary_head": [
						{
							"type": "FCNHead",
							"in_channels": 128,
							"channels": 64,
							"num_convs": 1,
							"num_classes": 171,
							"in_index": 1,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"concat_input": false,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 1.0
							}
						},
						{
							"type": "FCNHead",
							"in_channels": 128,
							"channels": 64,
							"num_convs": 1,
							"num_classes": 171,
							"in_index": 2,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"concat_input": false,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 1.0
							}
						}
					],
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"bisenetv1_r18-d32_4xb4-160k_cityscapes-1024x1024.py": {
				"model": {
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
							1024,
							1024
						]
					},
					"backbone": {
						"type": "BiSeNetV1",
						"in_channels": 3,
						"context_channels": [
							128,
							256,
							512
						],
						"spatial_channels": [
							64,
							64,
							64,
							128
						],
						"out_indices": [
							0,
							1,
							2
						],
						"out_channels": 256,
						"backbone_cfg": {
							"type": "ResNet",
							"in_channels": 3,
							"depth": 18,
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
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"init_cfg": null
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 256,
						"in_index": 0,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": [
						{
							"type": "FCNHead",
							"in_channels": 128,
							"channels": 64,
							"num_convs": 1,
							"num_classes": 19,
							"in_index": 1,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"concat_input": false,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 1.0
							}
						},
						{
							"type": "FCNHead",
							"in_channels": 128,
							"channels": 64,
							"num_convs": 1,
							"num_classes": 19,
							"in_index": 2,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"concat_input": false,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 1.0
							}
						}
					],
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"bisenetv1_r101-d32_4xb4-160k_coco-stuff164k-512x512.py": {
				"model": {
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
						"type": "BiSeNetV1",
						"in_channels": 3,
						"context_channels": [
							512,
							1024,
							2048
						],
						"spatial_channels": [
							256,
							256,
							256,
							512
						],
						"out_indices": [
							0,
							1,
							2
						],
						"out_channels": 1024,
						"backbone_cfg": {
							"type": "ResNet",
							"in_channels": 3,
							"depth": 101,
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
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"init_cfg": null
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 0,
						"channels": 1024,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 171,
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
					"auxiliary_head": [
						{
							"type": "FCNHead",
							"in_channels": 512,
							"channels": 256,
							"num_convs": 1,
							"num_classes": 171,
							"in_index": 1,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"concat_input": false,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 1.0
							}
						},
						{
							"type": "FCNHead",
							"in_channels": 512,
							"channels": 256,
							"num_convs": 1,
							"num_classes": 171,
							"in_index": 2,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"concat_input": false,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 1.0
							}
						}
					],
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"bisenetv1_r18-d32-in1k-pre_4xb4-160k_cityscapes-1024x1024.py": {
				"model": {
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
							1024,
							1024
						]
					},
					"backbone": {
						"type": "BiSeNetV1",
						"in_channels": 3,
						"context_channels": [
							128,
							256,
							512
						],
						"spatial_channels": [
							64,
							64,
							64,
							128
						],
						"out_indices": [
							0,
							1,
							2
						],
						"out_channels": 256,
						"backbone_cfg": {
							"type": "ResNet",
							"in_channels": 3,
							"depth": 18,
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
							"contract_dilation": true,
							"init_cfg": {
								"type": "Pretrained",
								"checkpoint": "open-mmlab://resnet18_v1c"
							}
						},
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"init_cfg": null
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 256,
						"in_index": 0,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": [
						{
							"type": "FCNHead",
							"in_channels": 128,
							"channels": 64,
							"num_convs": 1,
							"num_classes": 19,
							"in_index": 1,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"concat_input": false,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 1.0
							}
						},
						{
							"type": "FCNHead",
							"in_channels": 128,
							"channels": 64,
							"num_convs": 1,
							"num_classes": 19,
							"in_index": 2,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"concat_input": false,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 1.0
							}
						}
					],
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			}
		},
		"nonlocal_net": {
			"nonlocal_r50-d8_4xb4-80k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "NLHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dropout_ratio": 0.1,
						"reduction": 2,
						"use_scale": true,
						"mode": "embedded_gaussian",
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"nonlocal_r50-d8_4xb4-20k_voc12aug-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "NLHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dropout_ratio": 0.1,
						"reduction": 2,
						"use_scale": true,
						"mode": "embedded_gaussian",
						"num_classes": 21,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 21,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"nonlocal_r50-d8_4xb4-160k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "NLHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dropout_ratio": 0.1,
						"reduction": 2,
						"use_scale": true,
						"mode": "embedded_gaussian",
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"nonlocal_r50-d8_4xb4-40k_voc12aug-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "NLHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dropout_ratio": 0.1,
						"reduction": 2,
						"use_scale": true,
						"mode": "embedded_gaussian",
						"num_classes": 21,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 21,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"nonlocal_r50-d8_4xb2-40k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "NLHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dropout_ratio": 0.1,
						"reduction": 2,
						"use_scale": true,
						"mode": "embedded_gaussian",
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"nonlocal_r50-d8_4xb2-80k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "NLHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dropout_ratio": 0.1,
						"reduction": 2,
						"use_scale": true,
						"mode": "embedded_gaussian",
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"nonlocal_r50-d8_4xb2-40k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "NLHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dropout_ratio": 0.1,
						"reduction": 2,
						"use_scale": true,
						"mode": "embedded_gaussian",
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			},
			"nonlocal_r50-d8_4xb2-80k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "NLHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dropout_ratio": 0.1,
						"reduction": 2,
						"use_scale": true,
						"mode": "embedded_gaussian",
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			}
		},
		"twins": {
			"twins_svt-s_fpn_fpnhead_8xb4-80k_ade20k-512x512.py": {
				"model": {
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
						"type": "SVT",
						"init_cfg": {
							"type": "Pretrained",
							"checkpoint": "https://download.openmmlab.com/mmsegmentation/v0.5/pretrain/twins/alt_gvt_small_20220308-7e1c3695.pth"
						},
						"in_channels": 3,
						"embed_dims": [
							64,
							128,
							256,
							512
						],
						"num_heads": [
							2,
							4,
							8,
							16
						],
						"patch_sizes": [
							4,
							2,
							2,
							2
						],
						"strides": [
							4,
							2,
							2,
							2
						],
						"mlp_ratios": [
							4,
							4,
							4,
							4
						],
						"out_indices": [
							0,
							1,
							2,
							3
						],
						"qkv_bias": true,
						"norm_cfg": {
							"type": "LN"
						},
						"depths": [
							2,
							2,
							10,
							4
						],
						"sr_ratios": [
							8,
							4,
							2,
							1
						],
						"norm_after_stage": true,
						"drop_rate": 0.0,
						"attn_drop_rate": 0.0,
						"drop_path_rate": 0.2,
						"windiow_sizes": [
							7,
							7,
							7,
							7
						]
					},
					"neck": {
						"type": "FPN",
						"in_channels": [
							64,
							128,
							256,
							512
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
			"twins_pcpvt-s_fpn_fpnhead_8xb4-80k_ade20k-512x512.py": {
				"model": {
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
						"type": "PCPVT",
						"init_cfg": {
							"type": "Pretrained",
							"checkpoint": "https://download.openmmlab.com/mmsegmentation/v0.5/pretrain/twins/pcpvt_small_20220308-e638c41c.pth"
						},
						"in_channels": 3,
						"embed_dims": [
							64,
							128,
							320,
							512
						],
						"num_heads": [
							1,
							2,
							5,
							8
						],
						"patch_sizes": [
							4,
							2,
							2,
							2
						],
						"strides": [
							4,
							2,
							2,
							2
						],
						"mlp_ratios": [
							8,
							8,
							4,
							4
						],
						"out_indices": [
							0,
							1,
							2,
							3
						],
						"qkv_bias": true,
						"norm_cfg": {
							"type": "LN"
						},
						"depths": [
							3,
							4,
							6,
							3
						],
						"sr_ratios": [
							8,
							4,
							2,
							1
						],
						"norm_after_stage": false,
						"drop_rate": 0.0,
						"attn_drop_rate": 0.0,
						"drop_path_rate": 0.2
					},
					"neck": {
						"type": "FPN",
						"in_channels": [
							64,
							128,
							320,
							512
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
			"twins_svt-s_uperhead_8xb2-160k_ade20k-512x512.py": {
				"model": {
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
						"type": "SVT",
						"init_cfg": {
							"type": "Pretrained",
							"checkpoint": "https://download.openmmlab.com/mmsegmentation/v0.5/pretrain/twins/alt_gvt_small_20220308-7e1c3695.pth"
						},
						"in_channels": 3,
						"embed_dims": [
							64,
							128,
							256,
							512
						],
						"num_heads": [
							2,
							4,
							8,
							16
						],
						"patch_sizes": [
							4,
							2,
							2,
							2
						],
						"strides": [
							4,
							2,
							2,
							2
						],
						"mlp_ratios": [
							4,
							4,
							4,
							4
						],
						"out_indices": [
							0,
							1,
							2,
							3
						],
						"qkv_bias": true,
						"norm_cfg": {
							"type": "LN"
						},
						"depths": [
							2,
							2,
							10,
							4
						],
						"sr_ratios": [
							8,
							4,
							2,
							1
						],
						"norm_after_stage": true,
						"drop_rate": 0.0,
						"attn_drop_rate": 0.0,
						"drop_path_rate": 0.2,
						"windiow_sizes": [
							7,
							7,
							7,
							7
						]
					},
					"decode_head": {
						"type": "UPerHead",
						"in_channels": [
							64,
							128,
							256,
							512
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"channels": 512,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 256,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"twins_pcpvt-s_uperhead_8xb4-160k_ade20k-512x512.py": {
				"model": {
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
						"type": "PCPVT",
						"init_cfg": {
							"type": "Pretrained",
							"checkpoint": "https://download.openmmlab.com/mmsegmentation/v0.5/pretrain/twins/pcpvt_small_20220308-e638c41c.pth"
						},
						"in_channels": 3,
						"embed_dims": [
							64,
							128,
							320,
							512
						],
						"num_heads": [
							1,
							2,
							5,
							8
						],
						"patch_sizes": [
							4,
							2,
							2,
							2
						],
						"strides": [
							4,
							2,
							2,
							2
						],
						"mlp_ratios": [
							8,
							8,
							4,
							4
						],
						"out_indices": [
							0,
							1,
							2,
							3
						],
						"qkv_bias": true,
						"norm_cfg": {
							"type": "LN"
						},
						"depths": [
							3,
							4,
							6,
							3
						],
						"sr_ratios": [
							8,
							4,
							2,
							1
						],
						"norm_after_stage": false,
						"drop_rate": 0.0,
						"attn_drop_rate": 0.0,
						"drop_path_rate": 0.2
					},
					"decode_head": {
						"type": "UPerHead",
						"in_channels": [
							64,
							128,
							320,
							512
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"channels": 512,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 320,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			}
		},
		"pspnet": {
			"pspnet_r50-d8_4xb4-40k_pascal-context-480x480.py": {
				"model": {
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
							480,
							480
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 60,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 60,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							480,
							480
						],
						"stride": [
							320,
							320
						]
					}
				}
			},
			"pspnet_r50-d8_4xb4-20k_voc12aug-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 21,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 21,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"pspnet_r50-d8_4xb2-40k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			},
			"pspnet_r50-d8_4xb4-80k_coco-stuff164k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 171,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 171,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"pspnet_r50-d8_4xb2-40k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"pspnet_r50-d8_4xb2-80k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"pspnet_r50-d8_4xb4-160k_coco-stuff164k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 171,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 171,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"pspnet_r50-d8-rsb_4xb2-adamw-80k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": null,
					"backbone": {
						"type": "ResNet",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true,
						"init_cfg": {
							"type": "Pretrained",
							"prefix": "backbone.",
							"checkpoint": "https://download.openmmlab.com/mmclassification/v0/resnet/resnet50_8xb256-rsb-a1-600e_in1k_20211228-20e21305.pth"
						}
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"pspnet_r50-d8_4xb4-80k_isaid-896x896.py": {
				"model": {
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
							896,
							896
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 16,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 16,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"pspnet_r50-d8_4xb2-40k_cityscapes-512x1024_night-driving-1920x1080.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"pspnet_r50-d8_4xb2-80k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			},
			"pspnet_r50-d8_4xb4-80k_potsdam-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 6,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 6,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"pspnet_r50-d8_4xb4-40k_voc12aug-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 21,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 21,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"pspnet_r50-d8_4xb4-40k_pascal-context-59-480x480.py": {
				"model": {
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
							480,
							480
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 59,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 59,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							480,
							480
						],
						"stride": [
							320,
							320
						]
					}
				}
			},
			"pspnet_r50-d8_4xb2-80k_cityscapes-512x1024_dark-zurich-1920x1080.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"pspnet_r50-d8_4xb4-80k_pascal-context-59-480x480.py": {
				"model": {
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
							480,
							480
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 59,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 59,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							480,
							480
						],
						"stride": [
							320,
							320
						]
					}
				}
			},
			"pspnet_r50-d8_4xb4-80k_vaihingen-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 6,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 6,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"pspnet_r50-d8_4xb2-40k_cityscapes-512x1024_dark-zurich-1920x1080.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"pspnet_r50-d8_4xb2-80k_cityscapes-512x1024_night-driving-1920x1080.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"pspnet_r50b-d32_4xb2-80k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "torchvision://resnet50",
					"backbone": {
						"type": "ResNet",
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
							2,
							4
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
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"pspnet_r50-d8_4xb4-320k_coco-stuff164k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 171,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 171,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"pspnet_r50-d8_4xb4-40k_coco-stuff10k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 171,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 171,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"pspnet_r50-d8_4xb4-160k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"pspnet_r50-d8_4xb4-80k_loveda-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 7,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 7,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"pspnet_r50-d8_4xb4-80k_pascal-context-480x480.py": {
				"model": {
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
							480,
							480
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 60,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 60,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							480,
							480
						],
						"stride": [
							320,
							320
						]
					}
				}
			},
			"pspnet_r50-d8_4xb4-80k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"pspnet_r50-d32_4xb2-80k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
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
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"pspnet_r50-d32_rsb_4xb2-adamw-80k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": null,
					"backbone": {
						"type": "ResNet",
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
							2,
							4
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
						"contract_dilation": true,
						"init_cfg": {
							"type": "Pretrained",
							"prefix": "backbone.",
							"checkpoint": "https://download.openmmlab.com/mmclassification/v0/resnet/resnet50_8xb256-rsb-a1-600e_in1k_20211228-20e21305.pth"
						}
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"pspnet_r50-d8_4xb4-20k_coco-stuff10k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 171,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 171,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			}
		},
		"dpt": {
			"dpt_vit-b16_8xb2-160k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "pretrain/vit-b16_p16_224-80ecf9dd.pth",
					"backbone": {
						"type": "VisionTransformer",
						"img_size": 224,
						"embed_dims": 768,
						"num_layers": 12,
						"num_heads": 12,
						"out_indices": [
							2,
							5,
							8,
							11
						],
						"final_norm": false,
						"with_cls_token": true,
						"output_cls_token": true
					},
					"decode_head": {
						"type": "DPTHead",
						"in_channels": [
							768,
							768,
							768,
							768
						],
						"channels": 256,
						"embed_dims": 768,
						"post_process_channels": [
							96,
							192,
							384,
							768
						],
						"num_classes": 150,
						"readout_type": "project",
						"input_transform": "multiple_select",
						"in_index": [
							0,
							1,
							2,
							3
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": null,
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			}
		},
		"gcnet": {
			"gcnet_r50-d8_4xb4-40k_voc12aug-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "GCHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"ratio": 0.25,
						"pooling_type": "att",
						"fusion_types": [
							"channel_add"
						],
						"dropout_ratio": 0.1,
						"num_classes": 21,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 21,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"gcnet_r50-d8_4xb2-80k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "GCHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"ratio": 0.25,
						"pooling_type": "att",
						"fusion_types": [
							"channel_add"
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			},
			"gcnet_r50-d8_4xb2-40k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "GCHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"ratio": 0.25,
						"pooling_type": "att",
						"fusion_types": [
							"channel_add"
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			},
			"gcnet_r50-d8_4xb2-80k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "GCHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"ratio": 0.25,
						"pooling_type": "att",
						"fusion_types": [
							"channel_add"
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"gcnet_r50-d8_4xb2-40k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "GCHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"ratio": 0.25,
						"pooling_type": "att",
						"fusion_types": [
							"channel_add"
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"gcnet_r50-d8_4xb4-20k_voc12aug-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "GCHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"ratio": 0.25,
						"pooling_type": "att",
						"fusion_types": [
							"channel_add"
						],
						"dropout_ratio": 0.1,
						"num_classes": 21,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 21,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"gcnet_r50-d8_4xb4-160k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "GCHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"ratio": 0.25,
						"pooling_type": "att",
						"fusion_types": [
							"channel_add"
						],
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"gcnet_r50-d8_4xb4-80k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "GCHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"ratio": 0.25,
						"pooling_type": "att",
						"fusion_types": [
							"channel_add"
						],
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			}
		},
		"apcnet": {
			"apcnet_r50-d8_4xb4-80k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "APCHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"apcnet_r50-d8_4xb4-160k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "APCHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"apcnet_r50-d8_4xb2-40k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "APCHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"apcnet_r50-d8_4xb2-80k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "APCHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"apcnet_r50-d8_4xb2-80k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "APCHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			},
			"apcnet_r50-d8_4xb2-40k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "APCHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			}
		},
		"point_rend": {
			"pointrend_r50_4xb2-80k_cityscapes-512x1024.py": {
				"model": {
					"type": "CascadeEncoderDecoder",
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
							1024
						]
					},
					"num_stages": 2,
					"pretrained": "open-mmlab://resnet50_v1c",
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
					"decode_head": [
						{
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
							"dropout_ratio": -1,
							"num_classes": 19,
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
						{
							"type": "PointHead",
							"in_channels": [
								256
							],
							"in_index": [
								0
							],
							"channels": 256,
							"num_fcs": 3,
							"coarse_pred_each_layer": true,
							"dropout_ratio": -1,
							"num_classes": 19,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 1.0
							}
						}
					],
					"train_cfg": {
						"num_points": 2048,
						"oversample_ratio": 3,
						"importance_sample_ratio": 0.75
					},
					"test_cfg": {
						"mode": "whole",
						"subdivision_steps": 2,
						"subdivision_num_points": 8196,
						"scale_factor": 2
					}
				}
			},
			"pointrend_r50_4xb4-160k_ade20k-512x512.py": {
				"model": {
					"type": "CascadeEncoderDecoder",
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
					"num_stages": 2,
					"pretrained": "open-mmlab://resnet50_v1c",
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
					"decode_head": [
						{
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
							"dropout_ratio": -1,
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
						{
							"type": "PointHead",
							"in_channels": [
								256
							],
							"in_index": [
								0
							],
							"channels": 256,
							"num_fcs": 3,
							"coarse_pred_each_layer": true,
							"dropout_ratio": -1,
							"num_classes": 150,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 1.0
							}
						}
					],
					"train_cfg": {
						"num_points": 2048,
						"oversample_ratio": 3,
						"importance_sample_ratio": 0.75
					},
					"test_cfg": {
						"mode": "whole",
						"subdivision_steps": 2,
						"subdivision_num_points": 8196,
						"scale_factor": 2
					}
				}
			}
		},
		"dnlnet": {
			"dnl_r50-d8_4xb4-80k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DNLHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dropout_ratio": 0.1,
						"reduction": 2,
						"use_scale": true,
						"mode": "embedded_gaussian",
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"dnl_r50-d8_4xb2-80k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DNLHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dropout_ratio": 0.1,
						"reduction": 2,
						"use_scale": true,
						"mode": "embedded_gaussian",
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"dnl_r50-d8_4xb2-40k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DNLHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dropout_ratio": 0.1,
						"reduction": 2,
						"use_scale": true,
						"mode": "embedded_gaussian",
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"dnl_r50-d8_4xb2-80k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DNLHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dropout_ratio": 0.1,
						"reduction": 2,
						"use_scale": true,
						"mode": "embedded_gaussian",
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			},
			"dnl_r50-d8_4xb2-40k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DNLHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dropout_ratio": 0.1,
						"reduction": 2,
						"use_scale": true,
						"mode": "embedded_gaussian",
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			},
			"dnl_r50-d8_4xb4-160k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DNLHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dropout_ratio": 0.1,
						"reduction": 2,
						"use_scale": true,
						"mode": "embedded_gaussian",
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			}
		},
		"stdc": {
			"stdc1_4xb12-80k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": null,
					"backbone": {
						"type": "STDCContextPathNet",
						"backbone_cfg": {
							"type": "STDCNet",
							"stdc_type": "STDCNet1",
							"in_channels": 3,
							"channels": [
								32,
								64,
								256,
								512,
								1024
							],
							"bottleneck_type": "cat",
							"num_convs": 4,
							"norm_cfg": {
								"type": "BN",
								"requires_grad": true
							},
							"act_cfg": {
								"type": "ReLU"
							},
							"with_final_conv": false
						},
						"last_in_channels": [
							1024,
							512
						],
						"out_channels": 128,
						"ffm_cfg": {
							"in_channels": 384,
							"out_channels": 256,
							"scale_factor": 4
						}
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 256,
						"channels": 256,
						"num_convs": 1,
						"num_classes": 19,
						"in_index": 3,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"norm_cfg": {
							"type": "BN",
							"requires_grad": true
						},
						"align_corners": true,
						"sampler": {
							"type": "OHEMPixelSampler",
							"thresh": 0.7,
							"min_kept": 10000
						},
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": [
						{
							"type": "FCNHead",
							"in_channels": 128,
							"channels": 64,
							"num_convs": 1,
							"num_classes": 19,
							"in_index": 2,
							"norm_cfg": {
								"type": "BN",
								"requires_grad": true
							},
							"concat_input": false,
							"align_corners": false,
							"sampler": {
								"type": "OHEMPixelSampler",
								"thresh": 0.7,
								"min_kept": 10000
							},
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 1.0
							}
						},
						{
							"type": "FCNHead",
							"in_channels": 128,
							"channels": 64,
							"num_convs": 1,
							"num_classes": 19,
							"in_index": 1,
							"norm_cfg": {
								"type": "BN",
								"requires_grad": true
							},
							"concat_input": false,
							"align_corners": false,
							"sampler": {
								"type": "OHEMPixelSampler",
								"thresh": 0.7,
								"min_kept": 10000
							},
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 1.0
							}
						},
						{
							"type": "STDCHead",
							"in_channels": 256,
							"channels": 64,
							"num_convs": 1,
							"num_classes": 2,
							"boundary_threshold": 0.1,
							"in_index": 0,
							"norm_cfg": {
								"type": "BN",
								"requires_grad": true
							},
							"concat_input": false,
							"align_corners": true,
							"loss_decode": [
								{
									"type": "CrossEntropyLoss",
									"loss_name": "loss_ce",
									"use_sigmoid": true,
									"loss_weight": 1.0
								},
								{
									"type": "DiceLoss",
									"loss_name": "loss_dice",
									"loss_weight": 1.0
								}
							]
						}
					],
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			}
		},
		"unet": {
			"unet_s5-d16_deeplabv3_4xb4-40k_chase-db1-128x128.py": {
				"model": {
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
							128,
							128
						]
					},
					"pretrained": null,
					"backbone": {
						"type": "UNet",
						"in_channels": 3,
						"base_channels": 64,
						"num_stages": 5,
						"strides": [
							1,
							1,
							1,
							1,
							1
						],
						"enc_num_convs": [
							2,
							2,
							2,
							2,
							2
						],
						"dec_num_convs": [
							2,
							2,
							2,
							2
						],
						"downsamples": [
							true,
							true,
							true,
							true
						],
						"enc_dilations": [
							1,
							1,
							1,
							1,
							1
						],
						"dec_dilations": [
							1,
							1,
							1,
							1
						],
						"with_cp": false,
						"conv_cfg": null,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"act_cfg": {
							"type": "ReLU"
						},
						"upsample_cfg": {
							"type": "InterpConv"
						},
						"norm_eval": false
					},
					"decode_head": {
						"type": "ASPPHead",
						"in_channels": 64,
						"in_index": 4,
						"channels": 16,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"dropout_ratio": 0.1,
						"num_classes": 2,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 128,
						"in_index": 3,
						"channels": 64,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 2,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							128,
							128
						],
						"stride": [
							85,
							85
						]
					}
				}
			},
			"unet-s5-d16_fcn_4xb4-40k_stare-128x128.py": {
				"model": {
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
							128,
							128
						]
					},
					"pretrained": null,
					"backbone": {
						"type": "UNet",
						"in_channels": 3,
						"base_channels": 64,
						"num_stages": 5,
						"strides": [
							1,
							1,
							1,
							1,
							1
						],
						"enc_num_convs": [
							2,
							2,
							2,
							2,
							2
						],
						"dec_num_convs": [
							2,
							2,
							2,
							2
						],
						"downsamples": [
							true,
							true,
							true,
							true
						],
						"enc_dilations": [
							1,
							1,
							1,
							1,
							1
						],
						"dec_dilations": [
							1,
							1,
							1,
							1
						],
						"with_cp": false,
						"conv_cfg": null,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"act_cfg": {
							"type": "ReLU"
						},
						"upsample_cfg": {
							"type": "InterpConv"
						},
						"norm_eval": false
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 64,
						"in_index": 4,
						"channels": 64,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 2,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 128,
						"in_index": 3,
						"channels": 64,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 2,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							128,
							128
						],
						"stride": [
							85,
							85
						]
					}
				}
			},
			"unet-s5-d16_fcn_4xb4-160k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": null,
					"backbone": {
						"type": "UNet",
						"in_channels": 3,
						"base_channels": 64,
						"num_stages": 5,
						"strides": [
							1,
							1,
							1,
							1,
							1
						],
						"enc_num_convs": [
							2,
							2,
							2,
							2,
							2
						],
						"dec_num_convs": [
							2,
							2,
							2,
							2
						],
						"downsamples": [
							true,
							true,
							true,
							true
						],
						"enc_dilations": [
							1,
							1,
							1,
							1,
							1
						],
						"dec_dilations": [
							1,
							1,
							1,
							1
						],
						"with_cp": false,
						"conv_cfg": null,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"act_cfg": {
							"type": "ReLU"
						},
						"upsample_cfg": {
							"type": "InterpConv"
						},
						"norm_eval": false
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 64,
						"in_index": 4,
						"channels": 64,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 128,
						"in_index": 3,
						"channels": 64,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole",
						"crop_size": 256,
						"stride": 170
					}
				}
			},
			"unet-s5-d16_pspnet_4xb4-40k_hrf-256x256.py": {
				"model": {
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
							256,
							256
						]
					},
					"pretrained": null,
					"backbone": {
						"type": "UNet",
						"in_channels": 3,
						"base_channels": 64,
						"num_stages": 5,
						"strides": [
							1,
							1,
							1,
							1,
							1
						],
						"enc_num_convs": [
							2,
							2,
							2,
							2,
							2
						],
						"dec_num_convs": [
							2,
							2,
							2,
							2
						],
						"downsamples": [
							true,
							true,
							true,
							true
						],
						"enc_dilations": [
							1,
							1,
							1,
							1,
							1
						],
						"dec_dilations": [
							1,
							1,
							1,
							1
						],
						"with_cp": false,
						"conv_cfg": null,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"act_cfg": {
							"type": "ReLU"
						},
						"upsample_cfg": {
							"type": "InterpConv"
						},
						"norm_eval": false
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 64,
						"in_index": 4,
						"channels": 16,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 2,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 128,
						"in_index": 3,
						"channels": 64,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 2,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							256,
							256
						],
						"stride": [
							170,
							170
						]
					}
				}
			},
			"unet-s5-d16_pspnet_4xb4-40k_chase-db1-128x128.py": {
				"model": {
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
							128,
							128
						]
					},
					"pretrained": null,
					"backbone": {
						"type": "UNet",
						"in_channels": 3,
						"base_channels": 64,
						"num_stages": 5,
						"strides": [
							1,
							1,
							1,
							1,
							1
						],
						"enc_num_convs": [
							2,
							2,
							2,
							2,
							2
						],
						"dec_num_convs": [
							2,
							2,
							2,
							2
						],
						"downsamples": [
							true,
							true,
							true,
							true
						],
						"enc_dilations": [
							1,
							1,
							1,
							1,
							1
						],
						"dec_dilations": [
							1,
							1,
							1,
							1
						],
						"with_cp": false,
						"conv_cfg": null,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"act_cfg": {
							"type": "ReLU"
						},
						"upsample_cfg": {
							"type": "InterpConv"
						},
						"norm_eval": false
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 64,
						"in_index": 4,
						"channels": 16,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 2,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 128,
						"in_index": 3,
						"channels": 64,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 2,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							128,
							128
						],
						"stride": [
							85,
							85
						]
					}
				}
			},
			"unet-s5-d16_deeplabv3_4xb4-40k_drive-64x64.py": {
				"model": {
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
							64,
							64
						]
					},
					"pretrained": null,
					"backbone": {
						"type": "UNet",
						"in_channels": 3,
						"base_channels": 64,
						"num_stages": 5,
						"strides": [
							1,
							1,
							1,
							1,
							1
						],
						"enc_num_convs": [
							2,
							2,
							2,
							2,
							2
						],
						"dec_num_convs": [
							2,
							2,
							2,
							2
						],
						"downsamples": [
							true,
							true,
							true,
							true
						],
						"enc_dilations": [
							1,
							1,
							1,
							1,
							1
						],
						"dec_dilations": [
							1,
							1,
							1,
							1
						],
						"with_cp": false,
						"conv_cfg": null,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"act_cfg": {
							"type": "ReLU"
						},
						"upsample_cfg": {
							"type": "InterpConv"
						},
						"norm_eval": false
					},
					"decode_head": {
						"type": "ASPPHead",
						"in_channels": 64,
						"in_index": 4,
						"channels": 16,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"dropout_ratio": 0.1,
						"num_classes": 2,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 128,
						"in_index": 3,
						"channels": 64,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 2,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							64,
							64
						],
						"stride": [
							42,
							42
						]
					}
				}
			},
			"unet-s5-d16_fcn_4xb4-40k_chase-db1-128x128.py": {
				"model": {
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
							128,
							128
						]
					},
					"pretrained": null,
					"backbone": {
						"type": "UNet",
						"in_channels": 3,
						"base_channels": 64,
						"num_stages": 5,
						"strides": [
							1,
							1,
							1,
							1,
							1
						],
						"enc_num_convs": [
							2,
							2,
							2,
							2,
							2
						],
						"dec_num_convs": [
							2,
							2,
							2,
							2
						],
						"downsamples": [
							true,
							true,
							true,
							true
						],
						"enc_dilations": [
							1,
							1,
							1,
							1,
							1
						],
						"dec_dilations": [
							1,
							1,
							1,
							1
						],
						"with_cp": false,
						"conv_cfg": null,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"act_cfg": {
							"type": "ReLU"
						},
						"upsample_cfg": {
							"type": "InterpConv"
						},
						"norm_eval": false
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 64,
						"in_index": 4,
						"channels": 64,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 2,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 128,
						"in_index": 3,
						"channels": 64,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 2,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							128,
							128
						],
						"stride": [
							85,
							85
						]
					}
				}
			},
			"unet-s5-d16_fcn_4xb4-40k_drive-64x64.py": {
				"model": {
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
							64,
							64
						]
					},
					"pretrained": null,
					"backbone": {
						"type": "UNet",
						"in_channels": 3,
						"base_channels": 64,
						"num_stages": 5,
						"strides": [
							1,
							1,
							1,
							1,
							1
						],
						"enc_num_convs": [
							2,
							2,
							2,
							2,
							2
						],
						"dec_num_convs": [
							2,
							2,
							2,
							2
						],
						"downsamples": [
							true,
							true,
							true,
							true
						],
						"enc_dilations": [
							1,
							1,
							1,
							1,
							1
						],
						"dec_dilations": [
							1,
							1,
							1,
							1
						],
						"with_cp": false,
						"conv_cfg": null,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"act_cfg": {
							"type": "ReLU"
						},
						"upsample_cfg": {
							"type": "InterpConv"
						},
						"norm_eval": false
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 64,
						"in_index": 4,
						"channels": 64,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 2,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 128,
						"in_index": 3,
						"channels": 64,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 2,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							64,
							64
						],
						"stride": [
							42,
							42
						]
					}
				}
			},
			"unet-s5-d16_deeplabv3_4xb4-40k_stare-128x128.py": {
				"model": {
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
							128,
							128
						]
					},
					"pretrained": null,
					"backbone": {
						"type": "UNet",
						"in_channels": 3,
						"base_channels": 64,
						"num_stages": 5,
						"strides": [
							1,
							1,
							1,
							1,
							1
						],
						"enc_num_convs": [
							2,
							2,
							2,
							2,
							2
						],
						"dec_num_convs": [
							2,
							2,
							2,
							2
						],
						"downsamples": [
							true,
							true,
							true,
							true
						],
						"enc_dilations": [
							1,
							1,
							1,
							1,
							1
						],
						"dec_dilations": [
							1,
							1,
							1,
							1
						],
						"with_cp": false,
						"conv_cfg": null,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"act_cfg": {
							"type": "ReLU"
						},
						"upsample_cfg": {
							"type": "InterpConv"
						},
						"norm_eval": false
					},
					"decode_head": {
						"type": "ASPPHead",
						"in_channels": 64,
						"in_index": 4,
						"channels": 16,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"dropout_ratio": 0.1,
						"num_classes": 2,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 128,
						"in_index": 3,
						"channels": 64,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 2,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							128,
							128
						],
						"stride": [
							85,
							85
						]
					}
				}
			},
			"unet-s5-d16_pspnet_4xb4-40k_stare-128x128.py": {
				"model": {
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
							128,
							128
						]
					},
					"pretrained": null,
					"backbone": {
						"type": "UNet",
						"in_channels": 3,
						"base_channels": 64,
						"num_stages": 5,
						"strides": [
							1,
							1,
							1,
							1,
							1
						],
						"enc_num_convs": [
							2,
							2,
							2,
							2,
							2
						],
						"dec_num_convs": [
							2,
							2,
							2,
							2
						],
						"downsamples": [
							true,
							true,
							true,
							true
						],
						"enc_dilations": [
							1,
							1,
							1,
							1,
							1
						],
						"dec_dilations": [
							1,
							1,
							1,
							1
						],
						"with_cp": false,
						"conv_cfg": null,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"act_cfg": {
							"type": "ReLU"
						},
						"upsample_cfg": {
							"type": "InterpConv"
						},
						"norm_eval": false
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 64,
						"in_index": 4,
						"channels": 16,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 2,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 128,
						"in_index": 3,
						"channels": 64,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 2,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							128,
							128
						],
						"stride": [
							85,
							85
						]
					}
				}
			},
			"unet-s5-d16_fcn_4xb4-40k_hrf-256x256.py": {
				"model": {
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
							256,
							256
						]
					},
					"pretrained": null,
					"backbone": {
						"type": "UNet",
						"in_channels": 3,
						"base_channels": 64,
						"num_stages": 5,
						"strides": [
							1,
							1,
							1,
							1,
							1
						],
						"enc_num_convs": [
							2,
							2,
							2,
							2,
							2
						],
						"dec_num_convs": [
							2,
							2,
							2,
							2
						],
						"downsamples": [
							true,
							true,
							true,
							true
						],
						"enc_dilations": [
							1,
							1,
							1,
							1,
							1
						],
						"dec_dilations": [
							1,
							1,
							1,
							1
						],
						"with_cp": false,
						"conv_cfg": null,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"act_cfg": {
							"type": "ReLU"
						},
						"upsample_cfg": {
							"type": "InterpConv"
						},
						"norm_eval": false
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 64,
						"in_index": 4,
						"channels": 64,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 2,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 128,
						"in_index": 3,
						"channels": 64,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 2,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							256,
							256
						],
						"stride": [
							170,
							170
						]
					}
				}
			},
			"unet-s5-d16_deeplabv3_4xb4-40k_hrf-256x256.py": {
				"model": {
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
							256,
							256
						]
					},
					"pretrained": null,
					"backbone": {
						"type": "UNet",
						"in_channels": 3,
						"base_channels": 64,
						"num_stages": 5,
						"strides": [
							1,
							1,
							1,
							1,
							1
						],
						"enc_num_convs": [
							2,
							2,
							2,
							2,
							2
						],
						"dec_num_convs": [
							2,
							2,
							2,
							2
						],
						"downsamples": [
							true,
							true,
							true,
							true
						],
						"enc_dilations": [
							1,
							1,
							1,
							1,
							1
						],
						"dec_dilations": [
							1,
							1,
							1,
							1
						],
						"with_cp": false,
						"conv_cfg": null,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"act_cfg": {
							"type": "ReLU"
						},
						"upsample_cfg": {
							"type": "InterpConv"
						},
						"norm_eval": false
					},
					"decode_head": {
						"type": "ASPPHead",
						"in_channels": 64,
						"in_index": 4,
						"channels": 16,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"dropout_ratio": 0.1,
						"num_classes": 2,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 128,
						"in_index": 3,
						"channels": 64,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 2,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							256,
							256
						],
						"stride": [
							170,
							170
						]
					}
				}
			},
			"unet-s5-d16_pspnet_4xb4-40k_drive-64x64.py": {
				"model": {
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
							64,
							64
						]
					},
					"pretrained": null,
					"backbone": {
						"type": "UNet",
						"in_channels": 3,
						"base_channels": 64,
						"num_stages": 5,
						"strides": [
							1,
							1,
							1,
							1,
							1
						],
						"enc_num_convs": [
							2,
							2,
							2,
							2,
							2
						],
						"dec_num_convs": [
							2,
							2,
							2,
							2
						],
						"downsamples": [
							true,
							true,
							true,
							true
						],
						"enc_dilations": [
							1,
							1,
							1,
							1,
							1
						],
						"dec_dilations": [
							1,
							1,
							1,
							1
						],
						"with_cp": false,
						"conv_cfg": null,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"act_cfg": {
							"type": "ReLU"
						},
						"upsample_cfg": {
							"type": "InterpConv"
						},
						"norm_eval": false
					},
					"decode_head": {
						"type": "PSPHead",
						"in_channels": 64,
						"in_index": 4,
						"channels": 16,
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"dropout_ratio": 0.1,
						"num_classes": 2,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 128,
						"in_index": 3,
						"channels": 64,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 2,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							64,
							64
						],
						"stride": [
							42,
							42
						]
					}
				}
			}
		},
		"icnet": {
			"icnet_r50-d8_4xb2-80k_cityscapes-832x832.py": {
				"model": {
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
							832,
							832
						]
					},
					"backbone": {
						"type": "ICNet",
						"backbone_cfg": {
							"type": "ResNetV1c",
							"in_channels": 3,
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
								2,
								4
							],
							"strides": [
								1,
								2,
								1,
								1
							],
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"norm_eval": false,
							"style": "pytorch",
							"contract_dilation": true
						},
						"in_channels": 3,
						"layer_channels": [
							512,
							2048
						],
						"light_branch_middle_channels": 32,
						"psp_out_channels": 512,
						"out_channels": [
							64,
							256,
							256
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false
					},
					"neck": {
						"type": "ICNeck",
						"in_channels": [
							64,
							256,
							256
						],
						"out_channels": 128,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 128,
						"channels": 128,
						"num_convs": 1,
						"in_index": 2,
						"dropout_ratio": 0,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"concat_input": false,
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": [
						{
							"type": "FCNHead",
							"in_channels": 128,
							"channels": 128,
							"num_convs": 1,
							"num_classes": 19,
							"in_index": 0,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"concat_input": false,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						},
						{
							"type": "FCNHead",
							"in_channels": 128,
							"channels": 128,
							"num_convs": 1,
							"num_classes": 19,
							"in_index": 1,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"concat_input": false,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						}
					],
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"icnet_r50-d8_4xb2-160k_cityscapes-832x832.py": {
				"model": {
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
							832,
							832
						]
					},
					"backbone": {
						"type": "ICNet",
						"backbone_cfg": {
							"type": "ResNetV1c",
							"in_channels": 3,
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
								2,
								4
							],
							"strides": [
								1,
								2,
								1,
								1
							],
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"norm_eval": false,
							"style": "pytorch",
							"contract_dilation": true
						},
						"in_channels": 3,
						"layer_channels": [
							512,
							2048
						],
						"light_branch_middle_channels": 32,
						"psp_out_channels": 512,
						"out_channels": [
							64,
							256,
							256
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false
					},
					"neck": {
						"type": "ICNeck",
						"in_channels": [
							64,
							256,
							256
						],
						"out_channels": 128,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 128,
						"channels": 128,
						"num_convs": 1,
						"in_index": 2,
						"dropout_ratio": 0,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"concat_input": false,
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": [
						{
							"type": "FCNHead",
							"in_channels": 128,
							"channels": 128,
							"num_convs": 1,
							"num_classes": 19,
							"in_index": 0,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"concat_input": false,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						},
						{
							"type": "FCNHead",
							"in_channels": 128,
							"channels": 128,
							"num_convs": 1,
							"num_classes": 19,
							"in_index": 1,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"concat_input": false,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						}
					],
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			}
		},
		"vit": {
			"vit_vit-b16-ln_mln_upernet_8xb2-160k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "pretrain/vit_base_patch16_224.pth",
					"backbone": {
						"type": "VisionTransformer",
						"img_size": [
							512,
							512
						],
						"patch_size": 16,
						"in_channels": 3,
						"embed_dims": 768,
						"num_layers": 12,
						"num_heads": 12,
						"mlp_ratio": 4,
						"out_indices": [
							2,
							5,
							8,
							11
						],
						"qkv_bias": true,
						"drop_rate": 0.0,
						"attn_drop_rate": 0.0,
						"drop_path_rate": 0.1,
						"with_cls_token": true,
						"norm_cfg": {
							"type": "LN",
							"eps": 1e-06
						},
						"act_cfg": {
							"type": "GELU"
						},
						"norm_eval": false,
						"interpolate_mode": "bicubic",
						"final_norm": true
					},
					"neck": {
						"type": "MultiLevelNeck",
						"in_channels": [
							768,
							768,
							768,
							768
						],
						"out_channels": 768,
						"scales": [
							4,
							2,
							1,
							0.5
						]
					},
					"decode_head": {
						"type": "UPerHead",
						"in_channels": [
							768,
							768,
							768,
							768
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"channels": 512,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 768,
						"in_index": 3,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"vit_vit-b16_mln_upernet_8xb2-160k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "pretrain/vit_base_patch16_224.pth",
					"backbone": {
						"type": "VisionTransformer",
						"img_size": [
							512,
							512
						],
						"patch_size": 16,
						"in_channels": 3,
						"embed_dims": 768,
						"num_layers": 12,
						"num_heads": 12,
						"mlp_ratio": 4,
						"out_indices": [
							2,
							5,
							8,
							11
						],
						"qkv_bias": true,
						"drop_rate": 0.0,
						"attn_drop_rate": 0.0,
						"drop_path_rate": 0.0,
						"with_cls_token": true,
						"norm_cfg": {
							"type": "LN",
							"eps": 1e-06
						},
						"act_cfg": {
							"type": "GELU"
						},
						"norm_eval": false,
						"interpolate_mode": "bicubic"
					},
					"neck": {
						"type": "MultiLevelNeck",
						"in_channels": [
							768,
							768,
							768,
							768
						],
						"out_channels": 768,
						"scales": [
							4,
							2,
							1,
							0.5
						]
					},
					"decode_head": {
						"type": "UPerHead",
						"in_channels": [
							768,
							768,
							768,
							768
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"channels": 512,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 768,
						"in_index": 3,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"vit_vit-b16_mln_upernet_8xb2-80k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "pretrain/vit_base_patch16_224.pth",
					"backbone": {
						"type": "VisionTransformer",
						"img_size": [
							512,
							512
						],
						"patch_size": 16,
						"in_channels": 3,
						"embed_dims": 768,
						"num_layers": 12,
						"num_heads": 12,
						"mlp_ratio": 4,
						"out_indices": [
							2,
							5,
							8,
							11
						],
						"qkv_bias": true,
						"drop_rate": 0.0,
						"attn_drop_rate": 0.0,
						"drop_path_rate": 0.0,
						"with_cls_token": true,
						"norm_cfg": {
							"type": "LN",
							"eps": 1e-06
						},
						"act_cfg": {
							"type": "GELU"
						},
						"norm_eval": false,
						"interpolate_mode": "bicubic"
					},
					"neck": {
						"type": "MultiLevelNeck",
						"in_channels": [
							768,
							768,
							768,
							768
						],
						"out_channels": 768,
						"scales": [
							4,
							2,
							1,
							0.5
						]
					},
					"decode_head": {
						"type": "UPerHead",
						"in_channels": [
							768,
							768,
							768,
							768
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"channels": 512,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 768,
						"in_index": 3,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			}
		},
		"segformer": {
			"segformer_mit-b0_8xb2-160k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": null,
					"backbone": {
						"type": "MixVisionTransformer",
						"in_channels": 3,
						"embed_dims": 32,
						"num_stages": 4,
						"num_layers": [
							2,
							2,
							2,
							2
						],
						"num_heads": [
							1,
							2,
							5,
							8
						],
						"patch_sizes": [
							7,
							3,
							3,
							3
						],
						"sr_ratios": [
							8,
							4,
							2,
							1
						],
						"out_indices": [
							0,
							1,
							2,
							3
						],
						"mlp_ratio": 4,
						"qkv_bias": true,
						"drop_rate": 0.0,
						"attn_drop_rate": 0.0,
						"drop_path_rate": 0.1,
						"init_cfg": {
							"type": "Pretrained",
							"checkpoint": "https://download.openmmlab.com/mmsegmentation/v0.5/pretrain/segformer/mit_b0_20220624-7e0fe6dd.pth"
						}
					},
					"decode_head": {
						"type": "SegformerHead",
						"in_channels": [
							32,
							64,
							160,
							256
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"channels": 256,
						"dropout_ratio": 0.1,
						"num_classes": 1,
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
			"segformer_mit-b0_8xb1-160k_cityscapes-1024x1024.py": {
				"model": {
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
							1024,
							1024
						]
					},
					"pretrained": null,
					"backbone": {
						"type": "MixVisionTransformer",
						"in_channels": 3,
						"embed_dims": 32,
						"num_stages": 4,
						"num_layers": [
							2,
							2,
							2,
							2
						],
						"num_heads": [
							1,
							2,
							5,
							8
						],
						"patch_sizes": [
							7,
							3,
							3,
							3
						],
						"sr_ratios": [
							8,
							4,
							2,
							1
						],
						"out_indices": [
							0,
							1,
							2,
							3
						],
						"mlp_ratio": 4,
						"qkv_bias": true,
						"drop_rate": 0.0,
						"attn_drop_rate": 0.0,
						"drop_path_rate": 0.1,
						"init_cfg": {
							"type": "Pretrained",
							"checkpoint": "https://download.openmmlab.com/mmsegmentation/v0.5/pretrain/segformer/mit_b0_20220624-7e0fe6dd.pth"
						}
					},
					"decode_head": {
						"type": "SegformerHead",
						"in_channels": [
							32,
							64,
							160,
							256
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"channels": 256,
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
						"mode": "slide",
						"crop_size": [
							1024,
							1024
						],
						"stride": [
							768,
							768
						]
					}
				}
			}
		},
		"mae": {
			"mae-base_upernet_8xb2-amp-160k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "./pretrain/mae_pretrain_vit_base_mmcls.pth",
					"backbone": {
						"type": "MAE",
						"img_size": [
							512,
							512
						],
						"patch_size": 16,
						"in_channels": 3,
						"embed_dims": 768,
						"num_layers": 12,
						"num_heads": 12,
						"mlp_ratio": 4,
						"out_indices": [
							3,
							5,
							7,
							11
						],
						"attn_drop_rate": 0.0,
						"drop_path_rate": 0.1,
						"norm_cfg": {
							"type": "LN",
							"eps": 1e-06
						},
						"act_cfg": {
							"type": "GELU"
						},
						"norm_eval": false,
						"init_values": 1.0
					},
					"neck": {
						"type": "Feature2Pyramid",
						"embed_dim": 768,
						"rescales": [
							4,
							2,
							1,
							0.5
						]
					},
					"decode_head": {
						"type": "UPerHead",
						"in_channels": [
							768,
							768,
							768,
							768
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"channels": 768,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 768,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							512,
							512
						],
						"stride": [
							341,
							341
						]
					}
				}
			}
		},
		"upernet": {
			"upernet_r50_4xb4-160k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
					"decode_head": {
						"type": "UPerHead",
						"in_channels": [
							256,
							512,
							1024,
							2048
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"channels": 512,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"upernet_r18_4xb4-160k_ade20k-512x512.py": {
				"model": {
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
						"seg_pad_val": 255
					},
					"pretrained": "open-mmlab://resnet18_v1c",
					"backbone": {
						"type": "ResNetV1c",
						"depth": 18,
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
					"decode_head": {
						"type": "UPerHead",
						"in_channels": [
							64,
							128,
							256,
							512
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"channels": 512,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 256,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"upernet_r50_4xb4-80k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
					"decode_head": {
						"type": "UPerHead",
						"in_channels": [
							256,
							512,
							1024,
							2048
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"channels": 512,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"upernet_r18_4xb4-20k_voc12aug-512x512.py": {
				"model": {
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
						"seg_pad_val": 255
					},
					"pretrained": "open-mmlab://resnet18_v1c",
					"backbone": {
						"type": "ResNetV1c",
						"depth": 18,
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
					"decode_head": {
						"type": "UPerHead",
						"in_channels": [
							64,
							128,
							256,
							512
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"channels": 512,
						"dropout_ratio": 0.1,
						"num_classes": 21,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 256,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 21,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"upernet_r18_4xb4-40k_voc12aug-512x512.py": {
				"model": {
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
						"seg_pad_val": 255
					},
					"pretrained": "open-mmlab://resnet18_v1c",
					"backbone": {
						"type": "ResNetV1c",
						"depth": 18,
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
					"decode_head": {
						"type": "UPerHead",
						"in_channels": [
							64,
							128,
							256,
							512
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"channels": 512,
						"dropout_ratio": 0.1,
						"num_classes": 21,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 256,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 21,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"upernet_r50_4xb2-80k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
					"decode_head": {
						"type": "UPerHead",
						"in_channels": [
							256,
							512,
							1024,
							2048
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"channels": 512,
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"upernet_r50_4xb2-40k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
					"decode_head": {
						"type": "UPerHead",
						"in_channels": [
							256,
							512,
							1024,
							2048
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"channels": 512,
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"upernet_r50_4xb2-40k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
					"decode_head": {
						"type": "UPerHead",
						"in_channels": [
							256,
							512,
							1024,
							2048
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"channels": 512,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			},
			"upernet_r50_4xb4-20k_voc12aug-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
					"decode_head": {
						"type": "UPerHead",
						"in_channels": [
							256,
							512,
							1024,
							2048
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"channels": 512,
						"dropout_ratio": 0.1,
						"num_classes": 21,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 21,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"upernet_r50_4xb4-40k_voc12aug-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
					"decode_head": {
						"type": "UPerHead",
						"in_channels": [
							256,
							512,
							1024,
							2048
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"channels": 512,
						"dropout_ratio": 0.1,
						"num_classes": 21,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 21,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"upernet_r50_4xb2-80k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
					"decode_head": {
						"type": "UPerHead",
						"in_channels": [
							256,
							512,
							1024,
							2048
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"channels": 512,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			},
			"upernet_r18_4xb4-80k_ade20k-512x512.py": {
				"model": {
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
						"seg_pad_val": 255
					},
					"pretrained": "open-mmlab://resnet18_v1c",
					"backbone": {
						"type": "ResNetV1c",
						"depth": 18,
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
					"decode_head": {
						"type": "UPerHead",
						"in_channels": [
							64,
							128,
							256,
							512
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"channels": 512,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 256,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			}
		},
		"setr": {
			"setr_vit-l_naive_8xb1-80k_cityscapes-768x768.py": {
				"model": {
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
							768,
							768
						]
					},
					"pretrained": null,
					"backbone": {
						"type": "VisionTransformer",
						"img_size": [
							768,
							768
						],
						"patch_size": 16,
						"in_channels": 3,
						"embed_dims": 1024,
						"num_layers": 24,
						"num_heads": 16,
						"out_indices": [
							9,
							14,
							19,
							23
						],
						"drop_rate": 0.0,
						"norm_cfg": {
							"type": "LN",
							"eps": 1e-06,
							"requires_grad": true
						},
						"with_cls_token": true,
						"interpolate_mode": "bilinear",
						"init_cfg": {
							"type": "Pretrained",
							"checkpoint": "pretrain/vit_large_p16.pth"
						}
					},
					"decode_head": {
						"type": "SETRUPHead",
						"in_channels": 1024,
						"channels": 256,
						"in_index": 3,
						"num_classes": 19,
						"dropout_ratio": 0,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"num_convs": 1,
						"up_scale": 4,
						"kernel_size": 1,
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": [
						{
							"type": "SETRUPHead",
							"in_channels": 1024,
							"channels": 256,
							"in_index": 0,
							"num_classes": 19,
							"dropout_ratio": 0,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"num_convs": 1,
							"up_scale": 4,
							"kernel_size": 1,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						},
						{
							"type": "SETRUPHead",
							"in_channels": 1024,
							"channels": 256,
							"in_index": 1,
							"num_classes": 19,
							"dropout_ratio": 0,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"num_convs": 1,
							"up_scale": 4,
							"kernel_size": 1,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						},
						{
							"type": "SETRUPHead",
							"in_channels": 1024,
							"channels": 256,
							"in_index": 2,
							"num_classes": 19,
							"dropout_ratio": 0,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"num_convs": 1,
							"up_scale": 4,
							"kernel_size": 1,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						}
					],
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							768,
							768
						],
						"stride": [
							512,
							512
						]
					}
				}
			},
			"setr_vit-l_pup_8xb2-160k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": null,
					"backbone": {
						"type": "VisionTransformer",
						"img_size": [
							512,
							512
						],
						"patch_size": 16,
						"in_channels": 3,
						"embed_dims": 1024,
						"num_layers": 24,
						"num_heads": 16,
						"out_indices": [
							9,
							14,
							19,
							23
						],
						"drop_rate": 0.0,
						"norm_cfg": {
							"type": "LN",
							"eps": 1e-06,
							"requires_grad": true
						},
						"with_cls_token": true,
						"interpolate_mode": "bilinear",
						"init_cfg": {
							"type": "Pretrained",
							"checkpoint": "pretrain/vit_large_p16.pth"
						}
					},
					"decode_head": {
						"type": "SETRUPHead",
						"in_channels": 1024,
						"channels": 256,
						"in_index": 3,
						"num_classes": 150,
						"dropout_ratio": 0,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"num_convs": 4,
						"up_scale": 2,
						"kernel_size": 3,
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": [
						{
							"type": "SETRUPHead",
							"in_channels": 1024,
							"channels": 256,
							"in_index": 0,
							"num_classes": 150,
							"dropout_ratio": 0,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"act_cfg": {
								"type": "ReLU"
							},
							"num_convs": 2,
							"kernel_size": 3,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						},
						{
							"type": "SETRUPHead",
							"in_channels": 1024,
							"channels": 256,
							"in_index": 1,
							"num_classes": 150,
							"dropout_ratio": 0,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"act_cfg": {
								"type": "ReLU"
							},
							"num_convs": 2,
							"kernel_size": 3,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						},
						{
							"type": "SETRUPHead",
							"in_channels": 1024,
							"channels": 256,
							"in_index": 2,
							"num_classes": 150,
							"dropout_ratio": 0,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"act_cfg": {
								"type": "ReLU"
							},
							"num_convs": 2,
							"kernel_size": 3,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						}
					],
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							512,
							512
						],
						"stride": [
							341,
							341
						]
					}
				}
			},
			"setr_vit-l_mla_8xb1-80k_cityscapes-768x768.py": {
				"model": {
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
							768,
							768
						]
					},
					"pretrained": null,
					"backbone": {
						"type": "VisionTransformer",
						"img_size": [
							768,
							768
						],
						"patch_size": 16,
						"in_channels": 3,
						"embed_dims": 1024,
						"num_layers": 24,
						"num_heads": 16,
						"out_indices": [
							5,
							11,
							17,
							23
						],
						"drop_rate": 0,
						"norm_cfg": {
							"type": "LN",
							"eps": 1e-06,
							"requires_grad": true
						},
						"with_cls_token": false,
						"interpolate_mode": "bilinear",
						"init_cfg": {
							"type": "Pretrained",
							"checkpoint": "pretrain/vit_large_p16.pth"
						}
					},
					"neck": {
						"type": "MLANeck",
						"in_channels": [
							1024,
							1024,
							1024,
							1024
						],
						"out_channels": 256,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"act_cfg": {
							"type": "ReLU"
						}
					},
					"decode_head": {
						"type": "SETRMLAHead",
						"in_channels": [
							256,
							256,
							256,
							256
						],
						"channels": 512,
						"in_index": [
							0,
							1,
							2,
							3
						],
						"dropout_ratio": 0,
						"mla_channels": 128,
						"num_classes": 19,
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
					"auxiliary_head": [
						{
							"type": "FCNHead",
							"in_channels": 256,
							"channels": 256,
							"in_index": 0,
							"dropout_ratio": 0,
							"num_convs": 0,
							"kernel_size": 1,
							"concat_input": false,
							"num_classes": 19,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						},
						{
							"type": "FCNHead",
							"in_channels": 256,
							"channels": 256,
							"in_index": 1,
							"dropout_ratio": 0,
							"num_convs": 0,
							"kernel_size": 1,
							"concat_input": false,
							"num_classes": 19,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						},
						{
							"type": "FCNHead",
							"in_channels": 256,
							"channels": 256,
							"in_index": 2,
							"dropout_ratio": 0,
							"num_convs": 0,
							"kernel_size": 1,
							"concat_input": false,
							"num_classes": 19,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						},
						{
							"type": "FCNHead",
							"in_channels": 256,
							"channels": 256,
							"in_index": 3,
							"dropout_ratio": 0,
							"num_convs": 0,
							"kernel_size": 1,
							"concat_input": false,
							"num_classes": 19,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						}
					],
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							768,
							768
						],
						"stride": [
							512,
							512
						]
					}
				}
			},
			"setr_vit-l_pup_8xb1-80k_cityscapes-768x768.py": {
				"model": {
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
							768,
							768
						]
					},
					"pretrained": null,
					"backbone": {
						"type": "VisionTransformer",
						"img_size": [
							768,
							768
						],
						"patch_size": 16,
						"in_channels": 3,
						"embed_dims": 1024,
						"num_layers": 24,
						"num_heads": 16,
						"out_indices": [
							9,
							14,
							19,
							23
						],
						"drop_rate": 0.0,
						"norm_cfg": {
							"type": "LN",
							"eps": 1e-06,
							"requires_grad": true
						},
						"with_cls_token": true,
						"interpolate_mode": "bilinear",
						"init_cfg": {
							"type": "Pretrained",
							"checkpoint": "pretrain/vit_large_p16.pth"
						}
					},
					"decode_head": {
						"type": "SETRUPHead",
						"in_channels": 1024,
						"channels": 256,
						"in_index": 3,
						"num_classes": 19,
						"dropout_ratio": 0,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"num_convs": 4,
						"up_scale": 2,
						"kernel_size": 3,
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": [
						{
							"type": "SETRUPHead",
							"in_channels": 1024,
							"channels": 256,
							"in_index": 0,
							"num_classes": 19,
							"dropout_ratio": 0,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"num_convs": 2,
							"up_scale": 4,
							"kernel_size": 3,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						},
						{
							"type": "SETRUPHead",
							"in_channels": 1024,
							"channels": 256,
							"in_index": 1,
							"num_classes": 19,
							"dropout_ratio": 0,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"num_convs": 2,
							"up_scale": 4,
							"kernel_size": 3,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						},
						{
							"type": "SETRUPHead",
							"in_channels": 1024,
							"channels": 256,
							"in_index": 2,
							"num_classes": 19,
							"dropout_ratio": 0,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"num_convs": 2,
							"up_scale": 4,
							"kernel_size": 3,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						}
					],
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							768,
							768
						],
						"stride": [
							512,
							512
						]
					}
				}
			},
			"setr_vit-l-mla_8xb1-160k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": null,
					"backbone": {
						"type": "VisionTransformer",
						"img_size": [
							512,
							512
						],
						"patch_size": 16,
						"in_channels": 3,
						"embed_dims": 1024,
						"num_layers": 24,
						"num_heads": 16,
						"out_indices": [
							5,
							11,
							17,
							23
						],
						"drop_rate": 0.0,
						"norm_cfg": {
							"type": "LN",
							"eps": 1e-06,
							"requires_grad": true
						},
						"with_cls_token": false,
						"interpolate_mode": "bilinear",
						"init_cfg": {
							"type": "Pretrained",
							"checkpoint": "pretrain/vit_large_p16.pth"
						}
					},
					"neck": {
						"type": "MLANeck",
						"in_channels": [
							1024,
							1024,
							1024,
							1024
						],
						"out_channels": 256,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"act_cfg": {
							"type": "ReLU"
						}
					},
					"decode_head": {
						"type": "SETRMLAHead",
						"in_channels": [
							256,
							256,
							256,
							256
						],
						"channels": 512,
						"in_index": [
							0,
							1,
							2,
							3
						],
						"dropout_ratio": 0,
						"mla_channels": 128,
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
					"auxiliary_head": [
						{
							"type": "FCNHead",
							"in_channels": 256,
							"channels": 256,
							"in_index": 0,
							"dropout_ratio": 0,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"act_cfg": {
								"type": "ReLU"
							},
							"num_convs": 0,
							"kernel_size": 1,
							"concat_input": false,
							"num_classes": 150,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						},
						{
							"type": "FCNHead",
							"in_channels": 256,
							"channels": 256,
							"in_index": 1,
							"dropout_ratio": 0,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"act_cfg": {
								"type": "ReLU"
							},
							"num_convs": 0,
							"kernel_size": 1,
							"concat_input": false,
							"num_classes": 150,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						},
						{
							"type": "FCNHead",
							"in_channels": 256,
							"channels": 256,
							"in_index": 2,
							"dropout_ratio": 0,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"act_cfg": {
								"type": "ReLU"
							},
							"num_convs": 0,
							"kernel_size": 1,
							"concat_input": false,
							"num_classes": 150,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						},
						{
							"type": "FCNHead",
							"in_channels": 256,
							"channels": 256,
							"in_index": 3,
							"dropout_ratio": 0,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"act_cfg": {
								"type": "ReLU"
							},
							"num_convs": 0,
							"kernel_size": 1,
							"concat_input": false,
							"num_classes": 150,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						}
					],
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							512,
							512
						],
						"stride": [
							341,
							341
						]
					}
				}
			},
			"setr_vit-l_naive_8xb2-160k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": null,
					"backbone": {
						"type": "VisionTransformer",
						"img_size": [
							512,
							512
						],
						"patch_size": 16,
						"in_channels": 3,
						"embed_dims": 1024,
						"num_layers": 24,
						"num_heads": 16,
						"out_indices": [
							9,
							14,
							19,
							23
						],
						"drop_rate": 0.0,
						"norm_cfg": {
							"type": "LN",
							"eps": 1e-06,
							"requires_grad": true
						},
						"with_cls_token": true,
						"interpolate_mode": "bilinear",
						"init_cfg": {
							"type": "Pretrained",
							"checkpoint": "pretrain/vit_large_p16.pth"
						}
					},
					"decode_head": {
						"type": "SETRUPHead",
						"in_channels": 1024,
						"channels": 256,
						"in_index": 3,
						"num_classes": 150,
						"dropout_ratio": 0,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"num_convs": 1,
						"up_scale": 4,
						"kernel_size": 1,
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": [
						{
							"type": "SETRUPHead",
							"in_channels": 1024,
							"channels": 256,
							"in_index": 0,
							"num_classes": 150,
							"dropout_ratio": 0,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"act_cfg": {
								"type": "ReLU"
							},
							"num_convs": 2,
							"kernel_size": 1,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						},
						{
							"type": "SETRUPHead",
							"in_channels": 1024,
							"channels": 256,
							"in_index": 1,
							"num_classes": 150,
							"dropout_ratio": 0,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"act_cfg": {
								"type": "ReLU"
							},
							"num_convs": 2,
							"kernel_size": 1,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						},
						{
							"type": "SETRUPHead",
							"in_channels": 1024,
							"channels": 256,
							"in_index": 2,
							"num_classes": 150,
							"dropout_ratio": 0,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"act_cfg": {
								"type": "ReLU"
							},
							"num_convs": 2,
							"kernel_size": 1,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						}
					],
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							512,
							512
						],
						"stride": [
							341,
							341
						]
					}
				}
			}
		},
		"san": {
			"san-vit-b16_voc12aug-640x640.py": {
				"model": {
					"type": "MultimodalEncoderDecoder",
					"data_preprocessor": {
						"type": "SegDataPreProcessor",
						"mean": [
							122.7709,
							116.746,
							104.0937
						],
						"std": [
							68.5005,
							66.6322,
							70.3232
						],
						"bgr_to_rgb": true,
						"pad_val": 0,
						"seg_pad_val": 255,
						"size_divisor": 640,
						"test_cfg": {
							"size_divisor": 32
						}
					},
					"pretrained": "pretrain/vit_base_patch16_224.pth",
					"asymetric_input": true,
					"encoder_resolution": 0.5,
					"image_encoder": {
						"type": "VisionTransformer",
						"img_size": [
							224,
							224
						],
						"patch_size": 16,
						"patch_pad": 0,
						"in_channels": 3,
						"embed_dims": 768,
						"num_layers": 9,
						"num_heads": 12,
						"mlp_ratio": 4,
						"out_origin": true,
						"out_indices": [
							2,
							5,
							8
						],
						"qkv_bias": true,
						"drop_rate": 0.0,
						"attn_drop_rate": 0.0,
						"drop_path_rate": 0.0,
						"with_cls_token": true,
						"output_cls_token": true,
						"patch_bias": false,
						"pre_norm": true,
						"norm_cfg": {
							"type": "LN",
							"eps": 1e-05
						},
						"act_cfg": {
							"type": "QuickGELU"
						},
						"norm_eval": false,
						"interpolate_mode": "bicubic",
						"frozen_exclude": [
							"pos_embed"
						]
					},
					"text_encoder": {
						"type": "CLIPTextEncoder",
						"dataset_name": "voc",
						"templates": "vild",
						"embed_dims": 512,
						"num_layers": 12,
						"num_heads": 8,
						"mlp_ratio": 4,
						"output_dims": 512,
						"cache_feature": true,
						"cat_bg": true,
						"norm_cfg": {
							"type": "LN",
							"eps": 1e-05
						}
					},
					"decode_head": {
						"type": "SideAdapterCLIPHead",
						"num_classes": 20,
						"deep_supervision_idxs": [
							7
						],
						"san_cfg": {
							"in_channels": 3,
							"clip_channels": 768,
							"embed_dims": 240,
							"patch_size": 16,
							"patch_bias": true,
							"num_queries": 100,
							"cfg_encoder": {
								"num_encode_layer": 8,
								"num_heads": 6,
								"mlp_ratio": 4
							},
							"fusion_index": [
								0,
								1,
								2,
								3
							],
							"cfg_decoder": {
								"num_heads": 12,
								"num_layers": 1,
								"embed_channels": 256,
								"mlp_channels": 256,
								"num_mlp": 3,
								"rescale": true
							},
							"norm_cfg": {
								"type": "LN",
								"eps": 1e-06
							}
						},
						"maskgen_cfg": {
							"sos_token_format": "cls_token",
							"sos_token_num": 100,
							"cross_attn": false,
							"num_layers": 3,
							"embed_dims": 768,
							"num_heads": 12,
							"mlp_ratio": 4,
							"qkv_bias": true,
							"out_dims": 512,
							"final_norm": true,
							"act_cfg": {
								"type": "QuickGELU"
							},
							"norm_cfg": {
								"type": "LN",
								"eps": 1e-05
							},
							"frozen_exclude": []
						},
						"align_corners": false,
						"train_cfg": {
							"num_points": 12544,
							"oversample_ratio": 3.0,
							"importance_sample_ratio": 0.75,
							"assigner": {
								"type": "HungarianAssigner",
								"match_costs": [
									{
										"type": "ClassificationCost",
										"weight": 2.0
									},
									{
										"type": "CrossEntropyLossCost",
										"weight": 5.0,
										"use_sigmoid": true
									},
									{
										"type": "DiceCost",
										"weight": 5.0,
										"pred_act": true,
										"eps": 1.0
									}
								]
							}
						},
						"loss_decode": [
							{
								"type": "CrossEntropyLoss",
								"loss_name": "loss_cls_ce",
								"loss_weight": 2.0,
								"class_weight": [
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									0.1
								]
							},
							{
								"type": "CrossEntropyLoss",
								"use_sigmoid": true,
								"loss_name": "loss_mask_ce",
								"loss_weight": 5.0
							},
							{
								"type": "DiceLoss",
								"ignore_index": null,
								"naive_dice": true,
								"eps": 1,
								"loss_name": "loss_mask_dice",
								"loss_weight": 5.0
							}
						]
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"san-vit-b16_coco-stuff164k-640x640.py": {
				"model": {
					"type": "MultimodalEncoderDecoder",
					"data_preprocessor": {
						"type": "SegDataPreProcessor",
						"mean": [
							122.7709,
							116.746,
							104.0937
						],
						"std": [
							68.5005,
							66.6322,
							70.3232
						],
						"bgr_to_rgb": true,
						"pad_val": 0,
						"seg_pad_val": 255,
						"size_divisor": 640,
						"test_cfg": {
							"size_divisor": 32
						}
					},
					"pretrained": "https://download.openmmlab.com/mmsegmentation/v0.5/san/clip_vit-base-patch16-224_3rdparty-d08f8887.pth",
					"asymetric_input": true,
					"encoder_resolution": 0.5,
					"image_encoder": {
						"type": "VisionTransformer",
						"img_size": [
							224,
							224
						],
						"patch_size": 16,
						"patch_pad": 0,
						"in_channels": 3,
						"embed_dims": 768,
						"num_layers": 9,
						"num_heads": 12,
						"mlp_ratio": 4,
						"out_origin": true,
						"out_indices": [
							2,
							5,
							8
						],
						"qkv_bias": true,
						"drop_rate": 0.0,
						"attn_drop_rate": 0.0,
						"drop_path_rate": 0.0,
						"with_cls_token": true,
						"output_cls_token": true,
						"patch_bias": false,
						"pre_norm": true,
						"norm_cfg": {
							"type": "LN",
							"eps": 1e-05
						},
						"act_cfg": {
							"type": "QuickGELU"
						},
						"norm_eval": false,
						"interpolate_mode": "bicubic",
						"frozen_exclude": [
							"pos_embed"
						]
					},
					"text_encoder": {
						"type": "CLIPTextEncoder",
						"dataset_name": "coco-stuff164k",
						"templates": "vild",
						"embed_dims": 512,
						"num_layers": 12,
						"num_heads": 8,
						"mlp_ratio": 4,
						"output_dims": 512,
						"cache_feature": true,
						"cat_bg": true,
						"norm_cfg": {
							"type": "LN",
							"eps": 1e-05
						}
					},
					"decode_head": {
						"type": "SideAdapterCLIPHead",
						"num_classes": 171,
						"deep_supervision_idxs": [
							7
						],
						"san_cfg": {
							"in_channels": 3,
							"clip_channels": 768,
							"embed_dims": 240,
							"patch_size": 16,
							"patch_bias": true,
							"num_queries": 100,
							"cfg_encoder": {
								"num_encode_layer": 8,
								"num_heads": 6,
								"mlp_ratio": 4
							},
							"fusion_index": [
								0,
								1,
								2,
								3
							],
							"cfg_decoder": {
								"num_heads": 12,
								"num_layers": 1,
								"embed_channels": 256,
								"mlp_channels": 256,
								"num_mlp": 3,
								"rescale": true
							},
							"norm_cfg": {
								"type": "LN",
								"eps": 1e-06
							}
						},
						"maskgen_cfg": {
							"sos_token_format": "cls_token",
							"sos_token_num": 100,
							"cross_attn": false,
							"num_layers": 3,
							"embed_dims": 768,
							"num_heads": 12,
							"mlp_ratio": 4,
							"qkv_bias": true,
							"out_dims": 512,
							"final_norm": true,
							"act_cfg": {
								"type": "QuickGELU"
							},
							"norm_cfg": {
								"type": "LN",
								"eps": 1e-05
							},
							"frozen_exclude": []
						},
						"align_corners": false,
						"train_cfg": {
							"num_points": 12544,
							"oversample_ratio": 3.0,
							"importance_sample_ratio": 0.75,
							"assigner": {
								"type": "HungarianAssigner",
								"match_costs": [
									{
										"type": "ClassificationCost",
										"weight": 2.0
									},
									{
										"type": "CrossEntropyLossCost",
										"weight": 5.0,
										"use_sigmoid": true
									},
									{
										"type": "DiceCost",
										"weight": 5.0,
										"pred_act": true,
										"eps": 1.0
									}
								]
							}
						},
						"loss_decode": [
							{
								"type": "CrossEntropyLoss",
								"loss_name": "loss_cls_ce",
								"loss_weight": 2.0,
								"class_weight": [
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									0.1
								]
							},
							{
								"type": "CrossEntropyLoss",
								"use_sigmoid": true,
								"loss_name": "loss_mask_ce",
								"loss_weight": 5.0
							},
							{
								"type": "DiceLoss",
								"ignore_index": null,
								"naive_dice": true,
								"eps": 1,
								"loss_name": "loss_mask_dice",
								"loss_weight": 5.0
							}
						]
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"san-vit-b16_pascal_context-640x640.py": {
				"model": {
					"type": "MultimodalEncoderDecoder",
					"data_preprocessor": {
						"type": "SegDataPreProcessor",
						"mean": [
							122.7709,
							116.746,
							104.0937
						],
						"std": [
							68.5005,
							66.6322,
							70.3232
						],
						"bgr_to_rgb": true,
						"pad_val": 0,
						"seg_pad_val": 255,
						"size_divisor": 640,
						"test_cfg": {
							"size_divisor": 32
						}
					},
					"pretrained": "pretrain/vit_base_patch16_224.pth",
					"asymetric_input": true,
					"encoder_resolution": 0.5,
					"image_encoder": {
						"type": "VisionTransformer",
						"img_size": [
							224,
							224
						],
						"patch_size": 16,
						"patch_pad": 0,
						"in_channels": 3,
						"embed_dims": 768,
						"num_layers": 9,
						"num_heads": 12,
						"mlp_ratio": 4,
						"out_origin": true,
						"out_indices": [
							2,
							5,
							8
						],
						"qkv_bias": true,
						"drop_rate": 0.0,
						"attn_drop_rate": 0.0,
						"drop_path_rate": 0.0,
						"with_cls_token": true,
						"output_cls_token": true,
						"patch_bias": false,
						"pre_norm": true,
						"norm_cfg": {
							"type": "LN",
							"eps": 1e-05
						},
						"act_cfg": {
							"type": "QuickGELU"
						},
						"norm_eval": false,
						"interpolate_mode": "bicubic",
						"frozen_exclude": [
							"pos_embed"
						]
					},
					"text_encoder": {
						"type": "CLIPTextEncoder",
						"dataset_name": "pascal_context",
						"templates": "vild",
						"embed_dims": 512,
						"num_layers": 12,
						"num_heads": 8,
						"mlp_ratio": 4,
						"output_dims": 512,
						"cache_feature": true,
						"cat_bg": true,
						"norm_cfg": {
							"type": "LN",
							"eps": 1e-05
						}
					},
					"decode_head": {
						"type": "SideAdapterCLIPHead",
						"num_classes": 59,
						"deep_supervision_idxs": [
							7
						],
						"san_cfg": {
							"in_channels": 3,
							"clip_channels": 768,
							"embed_dims": 240,
							"patch_size": 16,
							"patch_bias": true,
							"num_queries": 100,
							"cfg_encoder": {
								"num_encode_layer": 8,
								"num_heads": 6,
								"mlp_ratio": 4
							},
							"fusion_index": [
								0,
								1,
								2,
								3
							],
							"cfg_decoder": {
								"num_heads": 12,
								"num_layers": 1,
								"embed_channels": 256,
								"mlp_channels": 256,
								"num_mlp": 3,
								"rescale": true
							},
							"norm_cfg": {
								"type": "LN",
								"eps": 1e-06
							}
						},
						"maskgen_cfg": {
							"sos_token_format": "cls_token",
							"sos_token_num": 100,
							"cross_attn": false,
							"num_layers": 3,
							"embed_dims": 768,
							"num_heads": 12,
							"mlp_ratio": 4,
							"qkv_bias": true,
							"out_dims": 512,
							"final_norm": true,
							"act_cfg": {
								"type": "QuickGELU"
							},
							"norm_cfg": {
								"type": "LN",
								"eps": 1e-05
							},
							"frozen_exclude": []
						},
						"align_corners": false,
						"train_cfg": {
							"num_points": 12544,
							"oversample_ratio": 3.0,
							"importance_sample_ratio": 0.75,
							"assigner": {
								"type": "HungarianAssigner",
								"match_costs": [
									{
										"type": "ClassificationCost",
										"weight": 2.0
									},
									{
										"type": "CrossEntropyLossCost",
										"weight": 5.0,
										"use_sigmoid": true
									},
									{
										"type": "DiceCost",
										"weight": 5.0,
										"pred_act": true,
										"eps": 1.0
									}
								]
							}
						},
						"loss_decode": [
							{
								"type": "CrossEntropyLoss",
								"loss_name": "loss_cls_ce",
								"loss_weight": 2.0,
								"class_weight": [
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									1.0,
									0.1
								]
							},
							{
								"type": "CrossEntropyLoss",
								"use_sigmoid": true,
								"loss_name": "loss_mask_ce",
								"loss_weight": 5.0
							},
							{
								"type": "DiceLoss",
								"ignore_index": null,
								"naive_dice": true,
								"eps": 1,
								"loss_name": "loss_mask_dice",
								"loss_weight": 5.0
							}
						]
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			}
		},
		"mobilenet_v3": {
			"mobilenet-v3-d8-scratch_lraspp_4xb4-320k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"backbone": {
						"type": "MobileNetV3",
						"arch": "large",
						"out_indices": [
							1,
							3,
							16
						],
						"norm_cfg": {
							"type": "SyncBN",
							"eps": 0.001,
							"requires_grad": true
						}
					},
					"decode_head": {
						"type": "LRASPPHead",
						"in_channels": [
							16,
							24,
							960
						],
						"in_index": [
							0,
							1,
							2
						],
						"channels": 128,
						"input_transform": "multiple_select",
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"eps": 0.001,
							"requires_grad": true
						},
						"act_cfg": {
							"type": "ReLU"
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
			"mobilenet-v3-d8_lraspp_4xb4-320k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"backbone": {
						"type": "MobileNetV3",
						"arch": "large",
						"out_indices": [
							1,
							3,
							16
						],
						"norm_cfg": {
							"type": "SyncBN",
							"eps": 0.001,
							"requires_grad": true
						}
					},
					"decode_head": {
						"type": "LRASPPHead",
						"in_channels": [
							16,
							24,
							960
						],
						"in_index": [
							0,
							1,
							2
						],
						"channels": 128,
						"input_transform": "multiple_select",
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"eps": 0.001,
							"requires_grad": true
						},
						"act_cfg": {
							"type": "ReLU"
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
					},
					"pretrained": "open-mmlab://contrib/mobilenet_v3_large"
				}
			}
		},
		"beit": {
			"beit-base_upernet_8xb2-160k_ade20k-640x640.py": {
				"model": {
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
							640,
							640
						]
					},
					"pretrained": "pretrain/beit_base_patch16_224_pt22k_ft22k.pth",
					"backbone": {
						"type": "BEiT",
						"img_size": [
							640,
							640
						],
						"patch_size": 16,
						"in_channels": 3,
						"embed_dims": 768,
						"num_layers": 12,
						"num_heads": 12,
						"mlp_ratio": 4,
						"out_indices": [
							3,
							5,
							7,
							11
						],
						"qv_bias": true,
						"attn_drop_rate": 0.0,
						"drop_path_rate": 0.1,
						"norm_cfg": {
							"type": "LN",
							"eps": 1e-06
						},
						"act_cfg": {
							"type": "GELU"
						},
						"norm_eval": false,
						"init_values": 0.1
					},
					"neck": {
						"type": "Feature2Pyramid",
						"embed_dim": 768,
						"rescales": [
							4,
							2,
							1,
							0.5
						]
					},
					"decode_head": {
						"type": "UPerHead",
						"in_channels": [
							768,
							768,
							768,
							768
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"channels": 768,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 768,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							640,
							640
						],
						"stride": [
							426,
							426
						]
					}
				}
			},
			"beit-large_upernet_8xb1-amp-160k_ade20k-640x640.py": {
				"model": {
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
							640,
							640
						]
					},
					"pretrained": "pretrain/beit_large_patch16_224_pt22k_ft22k.pth",
					"backbone": {
						"type": "BEiT",
						"img_size": [
							640,
							640
						],
						"patch_size": 16,
						"in_channels": 3,
						"embed_dims": 1024,
						"num_layers": 24,
						"num_heads": 16,
						"mlp_ratio": 4,
						"out_indices": [
							7,
							11,
							15,
							23
						],
						"qv_bias": true,
						"attn_drop_rate": 0.0,
						"drop_path_rate": 0.2,
						"norm_cfg": {
							"type": "LN",
							"eps": 1e-06
						},
						"act_cfg": {
							"type": "GELU"
						},
						"norm_eval": false,
						"init_values": 1e-06
					},
					"neck": {
						"type": "Feature2Pyramid",
						"embed_dim": 1024,
						"rescales": [
							4,
							2,
							1,
							0.5
						]
					},
					"decode_head": {
						"type": "UPerHead",
						"in_channels": [
							1024,
							1024,
							1024,
							1024
						],
						"in_index": [
							0,
							1,
							2,
							3
						],
						"pool_scales": [
							1,
							2,
							3,
							6
						],
						"channels": 1024,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							640,
							640
						],
						"stride": [
							426,
							426
						]
					}
				}
			}
		},
		"danet": {
			"danet_r50-d8_4xb2-40k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DAHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pam_channels": 64,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			},
			"danet_r50-d8_4xb2-80k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DAHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pam_channels": 64,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			},
			"danet_r50-d8_4xb4-160k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DAHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pam_channels": 64,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"danet_r50-d8_4xb4-20k_voc12aug-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DAHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pam_channels": 64,
						"dropout_ratio": 0.1,
						"num_classes": 21,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 21,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"danet_r50-d8_4xb4-80k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DAHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pam_channels": 64,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"danet_r50-d8_4xb2-40k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DAHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pam_channels": 64,
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"danet_r50-d8_4xb2-80k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DAHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pam_channels": 64,
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"danet_r50-d8_4xb4-40k_voc12aug-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DAHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"pam_channels": 64,
						"dropout_ratio": 0.1,
						"num_classes": 21,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 21,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			}
		},
		"bisenetv2": {
			"bisenetv2_fcn_4xb4-160k_cityscapes-1024x1024.py": {
				"model": {
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
							1024,
							1024
						]
					},
					"pretrained": null,
					"backbone": {
						"type": "BiSeNetV2",
						"detail_channels": [
							64,
							64,
							128
						],
						"semantic_channels": [
							16,
							32,
							64,
							128
						],
						"semantic_expansion_ratio": 6,
						"bga_channels": 128,
						"out_indices": [
							0,
							1,
							2,
							3,
							4
						],
						"init_cfg": null,
						"align_corners": false
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 128,
						"in_index": 0,
						"channels": 1024,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": [
						{
							"type": "FCNHead",
							"in_channels": 16,
							"channels": 16,
							"num_convs": 2,
							"num_classes": 19,
							"in_index": 1,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"concat_input": false,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 1.0
							}
						},
						{
							"type": "FCNHead",
							"in_channels": 32,
							"channels": 64,
							"num_convs": 2,
							"num_classes": 19,
							"in_index": 2,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"concat_input": false,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 1.0
							}
						},
						{
							"type": "FCNHead",
							"in_channels": 64,
							"channels": 256,
							"num_convs": 2,
							"num_classes": 19,
							"in_index": 3,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"concat_input": false,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 1.0
							}
						},
						{
							"type": "FCNHead",
							"in_channels": 128,
							"channels": 1024,
							"num_convs": 2,
							"num_classes": 19,
							"in_index": 4,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"concat_input": false,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 1.0
							}
						}
					],
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"bisenetv2_fcn_4xb8-160k_cityscapes-1024x1024.py": {
				"model": {
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
							1024,
							1024
						]
					},
					"pretrained": null,
					"backbone": {
						"type": "BiSeNetV2",
						"detail_channels": [
							64,
							64,
							128
						],
						"semantic_channels": [
							16,
							32,
							64,
							128
						],
						"semantic_expansion_ratio": 6,
						"bga_channels": 128,
						"out_indices": [
							0,
							1,
							2,
							3,
							4
						],
						"init_cfg": null,
						"align_corners": false
					},
					"decode_head": {
						"type": "FCNHead",
						"in_channels": 128,
						"in_index": 0,
						"channels": 1024,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": [
						{
							"type": "FCNHead",
							"in_channels": 16,
							"channels": 16,
							"num_convs": 2,
							"num_classes": 19,
							"in_index": 1,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"concat_input": false,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 1.0
							}
						},
						{
							"type": "FCNHead",
							"in_channels": 32,
							"channels": 64,
							"num_convs": 2,
							"num_classes": 19,
							"in_index": 2,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"concat_input": false,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 1.0
							}
						},
						{
							"type": "FCNHead",
							"in_channels": 64,
							"channels": 256,
							"num_convs": 2,
							"num_classes": 19,
							"in_index": 3,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"concat_input": false,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 1.0
							}
						},
						{
							"type": "FCNHead",
							"in_channels": 128,
							"channels": 1024,
							"num_convs": 2,
							"num_classes": 19,
							"in_index": 4,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"concat_input": false,
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 1.0
							}
						}
					],
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			}
		},
		"vpd": {
			"vpd_sd_4xb8-25k_nyu-480x480.py": {
				"model": {
					"type": "DepthEstimator",
					"data_preprocessor": {
						"type": "SegDataPreProcessor",
						"mean": [
							127.5,
							127.5,
							127.5
						],
						"std": [
							127.5,
							127.5,
							127.5
						],
						"bgr_to_rgb": true,
						"pad_val": 0,
						"seg_pad_val": 0,
						"size": [
							480,
							480
						]
					},
					"backbone": {
						"type": "VPD",
						"diffusion_cfg": {
							"base_learning_rate": 0.0001,
							"target": "ldm.models.diffusion.ddpm.LatentDiffusion",
							"checkpoint": "https://download.openmmlab.com/mmsegmentation/v0.5/vpd/stable_diffusion_v1-5_pretrain_third_party.pth",
							"params": {
								"linear_start": 0.00085,
								"linear_end": 0.012,
								"num_timesteps_cond": 1,
								"log_every_t": 200,
								"timesteps": 1000,
								"first_stage_key": "jpg",
								"cond_stage_key": "txt",
								"image_size": 64,
								"channels": 4,
								"cond_stage_trainable": false,
								"conditioning_key": "crossattn",
								"monitor": "val/loss_simple_ema",
								"scale_factor": 0.18215,
								"use_ema": false,
								"scheduler_config": {
									"target": "ldm.lr_scheduler.LambdaLinearScheduler",
									"params": {
										"warm_up_steps": [
											10000
										],
										"cycle_lengths": [
											10000000000000
										],
										"f_start": [
											1e-06
										],
										"f_max": [
											1.0
										],
										"f_min": [
											1.0
										]
									}
								},
								"unet_config": {
									"target": "ldm.modules.diffusionmodules.openaimodel.UNetModel",
									"params": {
										"image_size": 32,
										"in_channels": 4,
										"out_channels": 4,
										"model_channels": 320,
										"attention_resolutions": [
											4,
											2,
											1
										],
										"num_res_blocks": 2,
										"channel_mult": [
											1,
											2,
											4,
											4
										],
										"num_heads": 8,
										"use_spatial_transformer": true,
										"transformer_depth": 1,
										"context_dim": 768,
										"use_checkpoint": true,
										"legacy": false
									}
								},
								"first_stage_config": {
									"target": "ldm.models.autoencoder.AutoencoderKL",
									"params": {
										"embed_dim": 4,
										"monitor": "val/rec_loss",
										"ddconfig": {
											"double_z": true,
											"z_channels": 4,
											"resolution": 256,
											"in_channels": 3,
											"out_ch": 3,
											"ch": 128,
											"ch_mult": [
												1,
												2,
												4,
												4
											],
											"num_res_blocks": 2,
											"attn_resolutions": [],
											"dropout": 0.0
										},
										"lossconfig": {
											"target": "torch.nn.Identity"
										}
									}
								},
								"cond_stage_config": {
									"target": "ldm.modules.encoders.modules.AbstractEncoder"
								}
							}
						},
						"class_embed_path": "https://download.openmmlab.com/mmsegmentation/v0.5/vpd/nyu_class_embeddings.pth",
						"class_embed_select": true,
						"pad_shape": 512,
						"unet_cfg": {
							"use_attn": false
						}
					},
					"decode_head": {
						"type": "VPDDepthHead",
						"in_channels": [
							320,
							640,
							1280,
							1280
						],
						"max_depth": 10,
						"fmap_border": [
							1,
							1
						]
					},
					"test_cfg": {
						"mode": "slide_flip",
						"crop_size": [
							480,
							480
						],
						"stride": [
							160,
							160
						]
					}
				}
			},
			"vpd_sd_4xb8-25k_nyu-512x512.py": {
				"model": {
					"type": "DepthEstimator",
					"data_preprocessor": {
						"type": "SegDataPreProcessor",
						"mean": [
							127.5,
							127.5,
							127.5
						],
						"std": [
							127.5,
							127.5,
							127.5
						],
						"bgr_to_rgb": true,
						"pad_val": 0,
						"seg_pad_val": 0,
						"size": [
							512,
							512
						]
					},
					"backbone": {
						"type": "VPD",
						"diffusion_cfg": {
							"base_learning_rate": 0.0001,
							"target": "ldm.models.diffusion.ddpm.LatentDiffusion",
							"checkpoint": "https://download.openmmlab.com/mmsegmentation/v0.5/vpd/stable_diffusion_v1-5_pretrain_third_party.pth",
							"params": {
								"linear_start": 0.00085,
								"linear_end": 0.012,
								"num_timesteps_cond": 1,
								"log_every_t": 200,
								"timesteps": 1000,
								"first_stage_key": "jpg",
								"cond_stage_key": "txt",
								"image_size": 64,
								"channels": 4,
								"cond_stage_trainable": false,
								"conditioning_key": "crossattn",
								"monitor": "val/loss_simple_ema",
								"scale_factor": 0.18215,
								"use_ema": false,
								"scheduler_config": {
									"target": "ldm.lr_scheduler.LambdaLinearScheduler",
									"params": {
										"warm_up_steps": [
											10000
										],
										"cycle_lengths": [
											10000000000000
										],
										"f_start": [
											1e-06
										],
										"f_max": [
											1.0
										],
										"f_min": [
											1.0
										]
									}
								},
								"unet_config": {
									"target": "ldm.modules.diffusionmodules.openaimodel.UNetModel",
									"params": {
										"image_size": 32,
										"in_channels": 4,
										"out_channels": 4,
										"model_channels": 320,
										"attention_resolutions": [
											4,
											2,
											1
										],
										"num_res_blocks": 2,
										"channel_mult": [
											1,
											2,
											4,
											4
										],
										"num_heads": 8,
										"use_spatial_transformer": true,
										"transformer_depth": 1,
										"context_dim": 768,
										"use_checkpoint": true,
										"legacy": false
									}
								},
								"first_stage_config": {
									"target": "ldm.models.autoencoder.AutoencoderKL",
									"params": {
										"embed_dim": 4,
										"monitor": "val/rec_loss",
										"ddconfig": {
											"double_z": true,
											"z_channels": 4,
											"resolution": 256,
											"in_channels": 3,
											"out_ch": 3,
											"ch": 128,
											"ch_mult": [
												1,
												2,
												4,
												4
											],
											"num_res_blocks": 2,
											"attn_resolutions": [],
											"dropout": 0.0
										},
										"lossconfig": {
											"target": "torch.nn.Identity"
										}
									}
								},
								"cond_stage_config": {
									"target": "ldm.modules.encoders.modules.AbstractEncoder"
								}
							}
						},
						"class_embed_path": "https://download.openmmlab.com/mmsegmentation/v0.5/vpd/nyu_class_embeddings.pth",
						"class_embed_select": true,
						"pad_shape": 512,
						"unet_cfg": {
							"use_attn": false
						}
					},
					"decode_head": {
						"type": "VPDDepthHead",
						"in_channels": [
							320,
							640,
							1280,
							1280
						],
						"max_depth": 10
					},
					"test_cfg": {
						"mode": "slide_flip",
						"crop_size": [
							512,
							512
						],
						"stride": [
							128,
							128
						]
					}
				}
			}
		},
		"ocrnet": {
			"ocrnet_r101-d8_4xb2-40k_cityscapes-512x1024.py": {
				"model": {
					"type": "CascadeEncoderDecoder",
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
							1024
						]
					},
					"num_stages": 2,
					"pretrained": "open-mmlab://resnet101_v1c",
					"backbone": {
						"type": "ResNetV1c",
						"depth": 101,
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": [
						{
							"type": "FCNHead",
							"in_channels": 1024,
							"in_index": 2,
							"channels": 256,
							"num_convs": 1,
							"concat_input": false,
							"dropout_ratio": 0.1,
							"num_classes": 19,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						},
						{
							"type": "OCRHead",
							"in_channels": 2048,
							"in_index": 3,
							"channels": 512,
							"ocr_channels": 256,
							"dropout_ratio": 0.1,
							"num_classes": 19,
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
						}
					],
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"ocrnet_hr18_4xb4-80k_ade20k-512x512.py": {
				"model": {
					"type": "CascadeEncoderDecoder",
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
					"num_stages": 2,
					"pretrained": "open-mmlab://msra/hrnetv2_w18",
					"backbone": {
						"type": "HRNet",
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"extra": {
							"stage1": {
								"num_modules": 1,
								"num_branches": 1,
								"block": "BOTTLENECK",
								"num_blocks": [
									4
								],
								"num_channels": [
									64
								]
							},
							"stage2": {
								"num_modules": 1,
								"num_branches": 2,
								"block": "BASIC",
								"num_blocks": [
									4,
									4
								],
								"num_channels": [
									18,
									36
								]
							},
							"stage3": {
								"num_modules": 4,
								"num_branches": 3,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72
								]
							},
							"stage4": {
								"num_modules": 3,
								"num_branches": 4,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72,
									144
								]
							}
						}
					},
					"decode_head": [
						{
							"type": "FCNHead",
							"in_channels": [
								18,
								36,
								72,
								144
							],
							"channels": 270,
							"in_index": [
								0,
								1,
								2,
								3
							],
							"input_transform": "resize_concat",
							"kernel_size": 1,
							"num_convs": 1,
							"concat_input": false,
							"dropout_ratio": -1,
							"num_classes": 150,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						},
						{
							"type": "OCRHead",
							"in_channels": [
								18,
								36,
								72,
								144
							],
							"in_index": [
								0,
								1,
								2,
								3
							],
							"input_transform": "resize_concat",
							"channels": 512,
							"ocr_channels": 256,
							"dropout_ratio": -1,
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
						}
					],
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"ocrnet_hr18_4xb2-160k_cityscapes-512x1024.py": {
				"model": {
					"type": "CascadeEncoderDecoder",
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
							1024
						]
					},
					"num_stages": 2,
					"pretrained": "open-mmlab://msra/hrnetv2_w18",
					"backbone": {
						"type": "HRNet",
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"extra": {
							"stage1": {
								"num_modules": 1,
								"num_branches": 1,
								"block": "BOTTLENECK",
								"num_blocks": [
									4
								],
								"num_channels": [
									64
								]
							},
							"stage2": {
								"num_modules": 1,
								"num_branches": 2,
								"block": "BASIC",
								"num_blocks": [
									4,
									4
								],
								"num_channels": [
									18,
									36
								]
							},
							"stage3": {
								"num_modules": 4,
								"num_branches": 3,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72
								]
							},
							"stage4": {
								"num_modules": 3,
								"num_branches": 4,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72,
									144
								]
							}
						}
					},
					"decode_head": [
						{
							"type": "FCNHead",
							"in_channels": [
								18,
								36,
								72,
								144
							],
							"channels": 270,
							"in_index": [
								0,
								1,
								2,
								3
							],
							"input_transform": "resize_concat",
							"kernel_size": 1,
							"num_convs": 1,
							"concat_input": false,
							"dropout_ratio": -1,
							"num_classes": 19,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						},
						{
							"type": "OCRHead",
							"in_channels": [
								18,
								36,
								72,
								144
							],
							"in_index": [
								0,
								1,
								2,
								3
							],
							"input_transform": "resize_concat",
							"channels": 512,
							"ocr_channels": 256,
							"dropout_ratio": -1,
							"num_classes": 19,
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
						}
					],
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"ocrnet_hr18_4xb4-20k_voc12aug-512x512.py": {
				"model": {
					"type": "CascadeEncoderDecoder",
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
					"num_stages": 2,
					"pretrained": "open-mmlab://msra/hrnetv2_w18",
					"backbone": {
						"type": "HRNet",
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"extra": {
							"stage1": {
								"num_modules": 1,
								"num_branches": 1,
								"block": "BOTTLENECK",
								"num_blocks": [
									4
								],
								"num_channels": [
									64
								]
							},
							"stage2": {
								"num_modules": 1,
								"num_branches": 2,
								"block": "BASIC",
								"num_blocks": [
									4,
									4
								],
								"num_channels": [
									18,
									36
								]
							},
							"stage3": {
								"num_modules": 4,
								"num_branches": 3,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72
								]
							},
							"stage4": {
								"num_modules": 3,
								"num_branches": 4,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72,
									144
								]
							}
						}
					},
					"decode_head": [
						{
							"type": "FCNHead",
							"in_channels": [
								18,
								36,
								72,
								144
							],
							"channels": 270,
							"in_index": [
								0,
								1,
								2,
								3
							],
							"input_transform": "resize_concat",
							"kernel_size": 1,
							"num_convs": 1,
							"concat_input": false,
							"dropout_ratio": -1,
							"num_classes": 21,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						},
						{
							"type": "OCRHead",
							"in_channels": [
								18,
								36,
								72,
								144
							],
							"in_index": [
								0,
								1,
								2,
								3
							],
							"input_transform": "resize_concat",
							"channels": 512,
							"ocr_channels": 256,
							"dropout_ratio": -1,
							"num_classes": 21,
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
						}
					],
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"ocrnet_hr18_4xb4-160k_ade20k-512x512.py": {
				"model": {
					"type": "CascadeEncoderDecoder",
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
					"num_stages": 2,
					"pretrained": "open-mmlab://msra/hrnetv2_w18",
					"backbone": {
						"type": "HRNet",
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"extra": {
							"stage1": {
								"num_modules": 1,
								"num_branches": 1,
								"block": "BOTTLENECK",
								"num_blocks": [
									4
								],
								"num_channels": [
									64
								]
							},
							"stage2": {
								"num_modules": 1,
								"num_branches": 2,
								"block": "BASIC",
								"num_blocks": [
									4,
									4
								],
								"num_channels": [
									18,
									36
								]
							},
							"stage3": {
								"num_modules": 4,
								"num_branches": 3,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72
								]
							},
							"stage4": {
								"num_modules": 3,
								"num_branches": 4,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72,
									144
								]
							}
						}
					},
					"decode_head": [
						{
							"type": "FCNHead",
							"in_channels": [
								18,
								36,
								72,
								144
							],
							"channels": 270,
							"in_index": [
								0,
								1,
								2,
								3
							],
							"input_transform": "resize_concat",
							"kernel_size": 1,
							"num_convs": 1,
							"concat_input": false,
							"dropout_ratio": -1,
							"num_classes": 150,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						},
						{
							"type": "OCRHead",
							"in_channels": [
								18,
								36,
								72,
								144
							],
							"in_index": [
								0,
								1,
								2,
								3
							],
							"input_transform": "resize_concat",
							"channels": 512,
							"ocr_channels": 256,
							"dropout_ratio": -1,
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
						}
					],
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"ocrnet_hr18_4xb2-80k_cityscapes-512x1024.py": {
				"model": {
					"type": "CascadeEncoderDecoder",
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
							1024
						]
					},
					"num_stages": 2,
					"pretrained": "open-mmlab://msra/hrnetv2_w18",
					"backbone": {
						"type": "HRNet",
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"extra": {
							"stage1": {
								"num_modules": 1,
								"num_branches": 1,
								"block": "BOTTLENECK",
								"num_blocks": [
									4
								],
								"num_channels": [
									64
								]
							},
							"stage2": {
								"num_modules": 1,
								"num_branches": 2,
								"block": "BASIC",
								"num_blocks": [
									4,
									4
								],
								"num_channels": [
									18,
									36
								]
							},
							"stage3": {
								"num_modules": 4,
								"num_branches": 3,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72
								]
							},
							"stage4": {
								"num_modules": 3,
								"num_branches": 4,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72,
									144
								]
							}
						}
					},
					"decode_head": [
						{
							"type": "FCNHead",
							"in_channels": [
								18,
								36,
								72,
								144
							],
							"channels": 270,
							"in_index": [
								0,
								1,
								2,
								3
							],
							"input_transform": "resize_concat",
							"kernel_size": 1,
							"num_convs": 1,
							"concat_input": false,
							"dropout_ratio": -1,
							"num_classes": 19,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						},
						{
							"type": "OCRHead",
							"in_channels": [
								18,
								36,
								72,
								144
							],
							"in_index": [
								0,
								1,
								2,
								3
							],
							"input_transform": "resize_concat",
							"channels": 512,
							"ocr_channels": 256,
							"dropout_ratio": -1,
							"num_classes": 19,
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
						}
					],
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"ocrnet_r101-d8_8xb2-80k_cityscapes-512x1024.py": {
				"model": {
					"type": "CascadeEncoderDecoder",
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
							1024
						]
					},
					"num_stages": 2,
					"pretrained": "open-mmlab://resnet101_v1c",
					"backbone": {
						"type": "ResNetV1c",
						"depth": 101,
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": [
						{
							"type": "FCNHead",
							"in_channels": 1024,
							"in_index": 2,
							"channels": 256,
							"num_convs": 1,
							"concat_input": false,
							"dropout_ratio": 0.1,
							"num_classes": 19,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						},
						{
							"type": "OCRHead",
							"in_channels": 2048,
							"in_index": 3,
							"channels": 512,
							"ocr_channels": 256,
							"dropout_ratio": 0.1,
							"num_classes": 19,
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
						}
					],
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"ocrnet_hr18_4xb4-40k_voc12aug-512x512.py": {
				"model": {
					"type": "CascadeEncoderDecoder",
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
					"num_stages": 2,
					"pretrained": "open-mmlab://msra/hrnetv2_w18",
					"backbone": {
						"type": "HRNet",
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"extra": {
							"stage1": {
								"num_modules": 1,
								"num_branches": 1,
								"block": "BOTTLENECK",
								"num_blocks": [
									4
								],
								"num_channels": [
									64
								]
							},
							"stage2": {
								"num_modules": 1,
								"num_branches": 2,
								"block": "BASIC",
								"num_blocks": [
									4,
									4
								],
								"num_channels": [
									18,
									36
								]
							},
							"stage3": {
								"num_modules": 4,
								"num_branches": 3,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72
								]
							},
							"stage4": {
								"num_modules": 3,
								"num_branches": 4,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72,
									144
								]
							}
						}
					},
					"decode_head": [
						{
							"type": "FCNHead",
							"in_channels": [
								18,
								36,
								72,
								144
							],
							"channels": 270,
							"in_index": [
								0,
								1,
								2,
								3
							],
							"input_transform": "resize_concat",
							"kernel_size": 1,
							"num_convs": 1,
							"concat_input": false,
							"dropout_ratio": -1,
							"num_classes": 21,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						},
						{
							"type": "OCRHead",
							"in_channels": [
								18,
								36,
								72,
								144
							],
							"in_index": [
								0,
								1,
								2,
								3
							],
							"input_transform": "resize_concat",
							"channels": 512,
							"ocr_channels": 256,
							"dropout_ratio": -1,
							"num_classes": 21,
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
						}
					],
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"ocrnet_r101-d8_8xb2-40k_cityscapes-512x1024.py": {
				"model": {
					"type": "CascadeEncoderDecoder",
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
							1024
						]
					},
					"num_stages": 2,
					"pretrained": "open-mmlab://resnet101_v1c",
					"backbone": {
						"type": "ResNetV1c",
						"depth": 101,
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": [
						{
							"type": "FCNHead",
							"in_channels": 1024,
							"in_index": 2,
							"channels": 256,
							"num_convs": 1,
							"concat_input": false,
							"dropout_ratio": 0.1,
							"num_classes": 19,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						},
						{
							"type": "OCRHead",
							"in_channels": 2048,
							"in_index": 3,
							"channels": 512,
							"ocr_channels": 256,
							"dropout_ratio": 0.1,
							"num_classes": 19,
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
						}
					],
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"ocrnet_hr18_4xb2-40k_cityscapes-512x1024.py": {
				"model": {
					"type": "CascadeEncoderDecoder",
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
							1024
						]
					},
					"num_stages": 2,
					"pretrained": "open-mmlab://msra/hrnetv2_w18",
					"backbone": {
						"type": "HRNet",
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"extra": {
							"stage1": {
								"num_modules": 1,
								"num_branches": 1,
								"block": "BOTTLENECK",
								"num_blocks": [
									4
								],
								"num_channels": [
									64
								]
							},
							"stage2": {
								"num_modules": 1,
								"num_branches": 2,
								"block": "BASIC",
								"num_blocks": [
									4,
									4
								],
								"num_channels": [
									18,
									36
								]
							},
							"stage3": {
								"num_modules": 4,
								"num_branches": 3,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72
								]
							},
							"stage4": {
								"num_modules": 3,
								"num_branches": 4,
								"block": "BASIC",
								"num_blocks": [
									4,
									4,
									4,
									4
								],
								"num_channels": [
									18,
									36,
									72,
									144
								]
							}
						}
					},
					"decode_head": [
						{
							"type": "FCNHead",
							"in_channels": [
								18,
								36,
								72,
								144
							],
							"channels": 270,
							"in_index": [
								0,
								1,
								2,
								3
							],
							"input_transform": "resize_concat",
							"kernel_size": 1,
							"num_convs": 1,
							"concat_input": false,
							"dropout_ratio": -1,
							"num_classes": 19,
							"norm_cfg": {
								"type": "SyncBN",
								"requires_grad": true
							},
							"align_corners": false,
							"loss_decode": {
								"type": "CrossEntropyLoss",
								"use_sigmoid": false,
								"loss_weight": 0.4
							}
						},
						{
							"type": "OCRHead",
							"in_channels": [
								18,
								36,
								72,
								144
							],
							"in_index": [
								0,
								1,
								2,
								3
							],
							"input_transform": "resize_concat",
							"channels": 512,
							"ocr_channels": 256,
							"dropout_ratio": -1,
							"num_classes": 19,
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
						}
					],
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			}
		},
		"segmenter": {
			"segmenter_vit-b_mask_8xb1-160k_ade20k-512x512.py": {
				"model": {
					"type": "EncoderDecoder",
					"data_preprocessor": {
						"type": "SegDataPreProcessor",
						"mean": [
							127.5,
							127.5,
							127.5
						],
						"std": [
							127.5,
							127.5,
							127.5
						],
						"bgr_to_rgb": true,
						"pad_val": 0,
						"seg_pad_val": 255,
						"size": [
							512,
							512
						]
					},
					"pretrained": "https://download.openmmlab.com/mmsegmentation/v0.5/pretrain/segmenter/vit_base_p16_384_20220308-96dfe169.pth",
					"backbone": {
						"type": "VisionTransformer",
						"img_size": [
							512,
							512
						],
						"patch_size": 16,
						"in_channels": 3,
						"embed_dims": 768,
						"num_layers": 12,
						"num_heads": 12,
						"drop_path_rate": 0.1,
						"attn_drop_rate": 0.0,
						"drop_rate": 0.0,
						"final_norm": true,
						"norm_cfg": {
							"type": "LN",
							"eps": 1e-06,
							"requires_grad": true
						},
						"with_cls_token": true,
						"interpolate_mode": "bicubic"
					},
					"decode_head": {
						"type": "SegmenterMaskTransformerHead",
						"in_channels": 768,
						"channels": 768,
						"num_classes": 150,
						"num_layers": 2,
						"num_heads": 12,
						"embed_dims": 768,
						"dropout_ratio": 0.0,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							512,
							512
						],
						"stride": [
							480,
							480
						]
					}
				}
			},
			"segmenter_vit-s_mask_8xb1-160k_ade20k-512x512.py": {
				"model": {
					"type": "EncoderDecoder",
					"data_preprocessor": {
						"type": "SegDataPreProcessor",
						"mean": [
							127.5,
							127.5,
							127.5
						],
						"std": [
							127.5,
							127.5,
							127.5
						],
						"bgr_to_rgb": true,
						"pad_val": 0,
						"seg_pad_val": 255,
						"size": [
							512,
							512
						]
					},
					"pretrained": "https://download.openmmlab.com/mmsegmentation/v0.5/pretrain/segmenter/vit_small_p16_384_20220308-410f6037.pth",
					"backbone": {
						"type": "VisionTransformer",
						"img_size": [
							512,
							512
						],
						"patch_size": 16,
						"in_channels": 3,
						"embed_dims": 384,
						"num_layers": 12,
						"num_heads": 6,
						"drop_path_rate": 0.1,
						"attn_drop_rate": 0.0,
						"drop_rate": 0.0,
						"final_norm": true,
						"norm_cfg": {
							"type": "LN",
							"eps": 1e-06,
							"requires_grad": true
						},
						"with_cls_token": true,
						"interpolate_mode": "bicubic"
					},
					"decode_head": {
						"type": "SegmenterMaskTransformerHead",
						"in_channels": 384,
						"channels": 384,
						"num_classes": 150,
						"num_layers": 2,
						"num_heads": 6,
						"embed_dims": 384,
						"dropout_ratio": 0.0,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							512,
							512
						],
						"stride": [
							480,
							480
						]
					}
				}
			},
			"segmenter_vit-l_mask_8xb1-160k_ade20k-512x512.py": {
				"model": {
					"type": "EncoderDecoder",
					"data_preprocessor": {
						"type": "SegDataPreProcessor",
						"mean": [
							127.5,
							127.5,
							127.5
						],
						"std": [
							127.5,
							127.5,
							127.5
						],
						"bgr_to_rgb": true,
						"pad_val": 0,
						"seg_pad_val": 255,
						"size": [
							640,
							640
						]
					},
					"pretrained": "https://download.openmmlab.com/mmsegmentation/v0.5/pretrain/segmenter/vit_large_p16_384_20220308-d4efb41d.pth",
					"backbone": {
						"type": "VisionTransformer",
						"img_size": [
							640,
							640
						],
						"patch_size": 16,
						"in_channels": 3,
						"embed_dims": 1024,
						"num_layers": 24,
						"num_heads": 16,
						"drop_path_rate": 0.1,
						"attn_drop_rate": 0.0,
						"drop_rate": 0.0,
						"final_norm": true,
						"norm_cfg": {
							"type": "LN",
							"eps": 1e-06,
							"requires_grad": true
						},
						"with_cls_token": true,
						"interpolate_mode": "bicubic"
					},
					"decode_head": {
						"type": "SegmenterMaskTransformerHead",
						"in_channels": 1024,
						"channels": 1024,
						"num_classes": 150,
						"num_layers": 2,
						"num_heads": 16,
						"embed_dims": 1024,
						"dropout_ratio": 0.0,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							640,
							640
						],
						"stride": [
							608,
							608
						]
					}
				}
			},
			"segmenter_vit-t_mask_8xb1-160k_ade20k-512x512.py": {
				"model": {
					"type": "EncoderDecoder",
					"data_preprocessor": {
						"type": "SegDataPreProcessor",
						"mean": [
							127.5,
							127.5,
							127.5
						],
						"std": [
							127.5,
							127.5,
							127.5
						],
						"bgr_to_rgb": true,
						"pad_val": 0,
						"seg_pad_val": 255,
						"size": [
							512,
							512
						]
					},
					"pretrained": "https://download.openmmlab.com/mmsegmentation/v0.5/pretrain/segmenter/vit_tiny_p16_384_20220308-cce8c795.pth",
					"backbone": {
						"type": "VisionTransformer",
						"img_size": [
							512,
							512
						],
						"patch_size": 16,
						"in_channels": 3,
						"embed_dims": 192,
						"num_layers": 12,
						"num_heads": 3,
						"drop_path_rate": 0.1,
						"attn_drop_rate": 0.0,
						"drop_rate": 0.0,
						"final_norm": true,
						"norm_cfg": {
							"type": "LN",
							"eps": 1e-06,
							"requires_grad": true
						},
						"with_cls_token": true,
						"interpolate_mode": "bicubic"
					},
					"decode_head": {
						"type": "SegmenterMaskTransformerHead",
						"in_channels": 192,
						"channels": 192,
						"num_classes": 150,
						"num_layers": 2,
						"num_heads": 3,
						"embed_dims": 192,
						"dropout_ratio": 0.0,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							512,
							512
						],
						"stride": [
							480,
							480
						]
					}
				}
			}
		},
		"isanet": {
			"isanet_r50-d8_4xb4-40k_voc12aug-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ISAHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"isa_channels": 256,
						"down_factor": [
							8,
							8
						],
						"dropout_ratio": 0.1,
						"num_classes": 21,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 21,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"isanet_r50-d8_4xb4-160k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ISAHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"isa_channels": 256,
						"down_factor": [
							8,
							8
						],
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"isanet_r50-d8_4xb4-80k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ISAHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"isa_channels": 256,
						"down_factor": [
							8,
							8
						],
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"isanet_r50-d8_4xb2-80k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ISAHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"isa_channels": 256,
						"down_factor": [
							8,
							8
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"isanet_r50-d8_4xb2-40k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ISAHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"isa_channels": 256,
						"down_factor": [
							8,
							8
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"isanet_r50-d8_4xb4-20k_voc12aug-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ISAHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"isa_channels": 256,
						"down_factor": [
							8,
							8
						],
						"dropout_ratio": 0.1,
						"num_classes": 21,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 21,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"isanet_r50-d8_4xb2-40k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ISAHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"isa_channels": 256,
						"down_factor": [
							8,
							8
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			},
			"isanet_r50-d8_4xb2-80k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ISAHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"isa_channels": 256,
						"down_factor": [
							8,
							8
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			}
		},
		"psanet": {
			"psanet_r50-d8_4xb4-160k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSAHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"mask_size": [
							66,
							66
						],
						"psa_type": "bi-direction",
						"compact": false,
						"shrink_factor": 2,
						"normalization_factor": 1.0,
						"psa_softmax": true,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"psanet_r50-d8_4xb2-80k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSAHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"mask_size": [
							97,
							97
						],
						"psa_type": "bi-direction",
						"compact": false,
						"shrink_factor": 2,
						"normalization_factor": 1.0,
						"psa_softmax": true,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			},
			"psanet_r50-d8_4xb4-20k_voc12aug-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSAHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"mask_size": [
							97,
							97
						],
						"psa_type": "bi-direction",
						"compact": false,
						"shrink_factor": 2,
						"normalization_factor": 1.0,
						"psa_softmax": true,
						"dropout_ratio": 0.1,
						"num_classes": 21,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 21,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"psanet_r50-d8_4xb4-40k_voc12aug-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSAHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"mask_size": [
							97,
							97
						],
						"psa_type": "bi-direction",
						"compact": false,
						"shrink_factor": 2,
						"normalization_factor": 1.0,
						"psa_softmax": true,
						"dropout_ratio": 0.1,
						"num_classes": 21,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 21,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"psanet_r50-d8_4xb2-40k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSAHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"mask_size": [
							97,
							97
						],
						"psa_type": "bi-direction",
						"compact": false,
						"shrink_factor": 2,
						"normalization_factor": 1.0,
						"psa_softmax": true,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			},
			"psanet_r50-d8_4xb4-80k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSAHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"mask_size": [
							66,
							66
						],
						"psa_type": "bi-direction",
						"compact": false,
						"shrink_factor": 2,
						"normalization_factor": 1.0,
						"psa_softmax": true,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"psanet_r50-d8_4xb2-80k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSAHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"mask_size": [
							97,
							97
						],
						"psa_type": "bi-direction",
						"compact": false,
						"shrink_factor": 2,
						"normalization_factor": 1.0,
						"psa_softmax": true,
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"psanet_r50-d8_4xb2-40k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "PSAHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"mask_size": [
							97,
							97
						],
						"psa_type": "bi-direction",
						"compact": false,
						"shrink_factor": 2,
						"normalization_factor": 1.0,
						"psa_softmax": true,
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			}
		},
		"deeplabv3plus": {
			"deeplabv3plus_r50-d8_4xb4-80k_isaid-896x896.py": {
				"model": {
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
							896,
							896
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DepthwiseSeparableASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"c1_in_channels": 256,
						"c1_channels": 48,
						"dropout_ratio": 0.1,
						"num_classes": 16,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 16,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"deeplabv3plus_r50-d8_4xb2-40k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DepthwiseSeparableASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"c1_in_channels": 256,
						"c1_channels": 48,
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"deeplabv3plus_r50-d8_4xb2-80k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DepthwiseSeparableASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"c1_in_channels": 256,
						"c1_channels": 48,
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"deeplabv3plus_r50-d8_4xb2-40k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DepthwiseSeparableASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"c1_in_channels": 256,
						"c1_channels": 48,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			},
			"deeplabv3plus_r50-d8_4xb4-40k_pascal-context-480x480.py": {
				"model": {
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
							480,
							480
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DepthwiseSeparableASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"c1_in_channels": 256,
						"c1_channels": 48,
						"dropout_ratio": 0.1,
						"num_classes": 60,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 60,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							480,
							480
						],
						"stride": [
							320,
							320
						]
					}
				}
			},
			"deeplabv3plus_r50-d8_4xb4-40k_pascal-context-59-480x480.py": {
				"model": {
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
							480,
							480
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DepthwiseSeparableASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"c1_in_channels": 256,
						"c1_channels": 48,
						"dropout_ratio": 0.1,
						"num_classes": 59,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 59,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							480,
							480
						],
						"stride": [
							320,
							320
						]
					}
				}
			},
			"deeplabv3plus_r50-d8_4xb4-80k_pascal-context-59-480x480.py": {
				"model": {
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
							480,
							480
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DepthwiseSeparableASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"c1_in_channels": 256,
						"c1_channels": 48,
						"dropout_ratio": 0.1,
						"num_classes": 59,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 59,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							480,
							480
						],
						"stride": [
							320,
							320
						]
					}
				}
			},
			"deeplabv3plus_r50-d8_4xb4-80k_potsdam-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DepthwiseSeparableASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"c1_in_channels": 256,
						"c1_channels": 48,
						"dropout_ratio": 0.1,
						"num_classes": 6,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 6,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"deeplabv3plus_r50-d8_4xb2-80k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DepthwiseSeparableASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"c1_in_channels": 256,
						"c1_channels": 48,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			},
			"deeplabv3plus_r50-d8_4xb4-80k_vaihingen-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DepthwiseSeparableASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"c1_in_channels": 256,
						"c1_channels": 48,
						"dropout_ratio": 0.1,
						"num_classes": 6,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 6,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"deeplabv3plus_r50-d8_4xb4-20k_voc12aug-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DepthwiseSeparableASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"c1_in_channels": 256,
						"c1_channels": 48,
						"dropout_ratio": 0.1,
						"num_classes": 21,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 21,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"deeplabv3plus_r50-d8_4xb4-160k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DepthwiseSeparableASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"c1_in_channels": 256,
						"c1_channels": 48,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"deeplabv3plus_r50-d8_4xb4-80k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DepthwiseSeparableASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"c1_in_channels": 256,
						"c1_channels": 48,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"deeplabv3plus_r50-d8_4xb4-80k_loveda-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DepthwiseSeparableASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"c1_in_channels": 256,
						"c1_channels": 48,
						"dropout_ratio": 0.1,
						"num_classes": 7,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 7,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"deeplabv3plus_r50-d8_4xb4-80k_pascal-context-480x480.py": {
				"model": {
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
							480,
							480
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DepthwiseSeparableASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"c1_in_channels": 256,
						"c1_channels": 48,
						"dropout_ratio": 0.1,
						"num_classes": 60,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 60,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							480,
							480
						],
						"stride": [
							320,
							320
						]
					}
				}
			},
			"deeplabv3plus_r50-d8_4xb4-40k_voc12aug-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "DepthwiseSeparableASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"c1_in_channels": 256,
						"c1_channels": 48,
						"dropout_ratio": 0.1,
						"num_classes": 21,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 21,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			}
		},
		"encnet": {
			"encnet_r50s-d8_4xb4-80k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true,
						"stem_channels": 128
					},
					"decode_head": {
						"type": "EncHead",
						"in_channels": [
							512,
							1024,
							2048
						],
						"in_index": [
							1,
							2,
							3
						],
						"channels": 512,
						"num_codes": 32,
						"use_se_loss": true,
						"add_lateral": false,
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
						},
						"loss_se_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": true,
							"loss_weight": 0.2
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"encnet_r50-d8_4xb4-160k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "EncHead",
						"in_channels": [
							512,
							1024,
							2048
						],
						"in_index": [
							1,
							2,
							3
						],
						"channels": 512,
						"num_codes": 32,
						"use_se_loss": true,
						"add_lateral": false,
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
						},
						"loss_se_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": true,
							"loss_weight": 0.2
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"encnet_r50-d8_4xb2-40k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "EncHead",
						"in_channels": [
							512,
							1024,
							2048
						],
						"in_index": [
							1,
							2,
							3
						],
						"channels": 512,
						"num_codes": 32,
						"use_se_loss": true,
						"add_lateral": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						},
						"loss_se_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": true,
							"loss_weight": 0.2
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"encnet_r50-d8_4xb2-80k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "EncHead",
						"in_channels": [
							512,
							1024,
							2048
						],
						"in_index": [
							1,
							2,
							3
						],
						"channels": 512,
						"num_codes": 32,
						"use_se_loss": true,
						"add_lateral": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						},
						"loss_se_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": true,
							"loss_weight": 0.2
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"encnet_r50-d8_4xb4-20k_voc12aug-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "EncHead",
						"in_channels": [
							512,
							1024,
							2048
						],
						"in_index": [
							1,
							2,
							3
						],
						"channels": 512,
						"num_codes": 32,
						"use_se_loss": true,
						"add_lateral": false,
						"dropout_ratio": 0.1,
						"num_classes": 21,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						},
						"loss_se_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": true,
							"loss_weight": 0.2
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 21,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"encnet_r50-d8_4xb2-40k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "EncHead",
						"in_channels": [
							512,
							1024,
							2048
						],
						"in_index": [
							1,
							2,
							3
						],
						"channels": 512,
						"num_codes": 32,
						"use_se_loss": true,
						"add_lateral": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						},
						"loss_se_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": true,
							"loss_weight": 0.2
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			},
			"encnet_r50-d8_4xb2-80k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "EncHead",
						"in_channels": [
							512,
							1024,
							2048
						],
						"in_index": [
							1,
							2,
							3
						],
						"channels": 512,
						"num_codes": 32,
						"use_se_loss": true,
						"add_lateral": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						},
						"loss_se_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": true,
							"loss_weight": 0.2
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			},
			"encnet_r50-d8_4xb4-40k_voc12aug-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "EncHead",
						"in_channels": [
							512,
							1024,
							2048
						],
						"in_index": [
							1,
							2,
							3
						],
						"channels": 512,
						"num_codes": 32,
						"use_se_loss": true,
						"add_lateral": false,
						"dropout_ratio": 0.1,
						"num_classes": 21,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						},
						"loss_se_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": true,
							"loss_weight": 0.2
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 21,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"encnet_r50-d8_4xb4-80k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "EncHead",
						"in_channels": [
							512,
							1024,
							2048
						],
						"in_index": [
							1,
							2,
							3
						],
						"channels": 512,
						"num_codes": 32,
						"use_se_loss": true,
						"add_lateral": false,
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
						},
						"loss_se_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": true,
							"loss_weight": 0.2
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			}
		},
		"deeplabv3": {
			"deeplabv3_r50-d8_4xb2-40k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"deeplabv3_r50-d8_4xb4-80k_pascal-context-59-480x480.py": {
				"model": {
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
							480,
							480
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"dropout_ratio": 0.1,
						"num_classes": 59,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 59,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							480,
							480
						],
						"stride": [
							320,
							320
						]
					}
				}
			},
			"deeplabv3_r50-d8_4xb2-80k_cityscapes-512x1024.py": {
				"model": {
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
							1024
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"deeplabv3_r50-d8_4xb4-40k_pascal-context-59-480x480.py": {
				"model": {
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
							480,
							480
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"dropout_ratio": 0.1,
						"num_classes": 59,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 59,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							480,
							480
						],
						"stride": [
							320,
							320
						]
					}
				}
			},
			"deeplabv3_r50-d8_4xb4-80k_coco-stuff164k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"dropout_ratio": 0.1,
						"num_classes": 171,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 171,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"deeplabv3_r50-d8_4xb4-320k_coco-stuff164k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"dropout_ratio": 0.1,
						"num_classes": 171,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 171,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"deeplabv3_r50-d8_4xb4-40k_pascal-context-480x480.py": {
				"model": {
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
							480,
							480
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"dropout_ratio": 0.1,
						"num_classes": 60,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 60,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							480,
							480
						],
						"stride": [
							320,
							320
						]
					}
				}
			},
			"deeplabv3_r50-d8_4xb4-20k_coco-stuff10k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"dropout_ratio": 0.1,
						"num_classes": 171,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 171,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"deeplabv3_r50-d8_4xb4-40k_voc12aug-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"dropout_ratio": 0.1,
						"num_classes": 21,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 21,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"deeplabv3_r50-d8_4xb4-80k_pascal-context-480x480.py": {
				"model": {
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
							480,
							480
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"dropout_ratio": 0.1,
						"num_classes": 60,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 60,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							480,
							480
						],
						"stride": [
							320,
							320
						]
					}
				}
			},
			"deeplabv3_r50-d8_4xb2-80k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			},
			"deeplabv3_r50-d8_4xb2-40k_cityscapes-769x769.py": {
				"model": {
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
							769,
							769
						]
					},
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 1.0
						}
					},
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 19,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": true,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "slide",
						"crop_size": [
							769,
							769
						],
						"stride": [
							513,
							513
						]
					}
				}
			},
			"deeplabv3_r50-d8_4xb4-40k_coco-stuff10k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"dropout_ratio": 0.1,
						"num_classes": 171,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 171,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"deeplabv3_r50-d8_4xb4-80k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"deeplabv3_r50-d8_4xb4-160k_ade20k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
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
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"deeplabv3_r50-d8_4xb4-20k_voc12aug-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"dropout_ratio": 0.1,
						"num_classes": 21,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 21,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			},
			"deeplabv3_r50-d8_4xb4-160k_coco-stuff164k-512x512.py": {
				"model": {
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
					"pretrained": "open-mmlab://resnet50_v1c",
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
							2,
							4
						],
						"strides": [
							1,
							2,
							1,
							1
						],
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"norm_eval": false,
						"style": "pytorch",
						"contract_dilation": true
					},
					"decode_head": {
						"type": "ASPPHead",
						"in_channels": 2048,
						"in_index": 3,
						"channels": 512,
						"dilations": [
							1,
							12,
							24,
							36
						],
						"dropout_ratio": 0.1,
						"num_classes": 171,
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
					"auxiliary_head": {
						"type": "FCNHead",
						"in_channels": 1024,
						"in_index": 2,
						"channels": 256,
						"num_convs": 1,
						"concat_input": false,
						"dropout_ratio": 0.1,
						"num_classes": 171,
						"norm_cfg": {
							"type": "SyncBN",
							"requires_grad": true
						},
						"align_corners": false,
						"loss_decode": {
							"type": "CrossEntropyLoss",
							"use_sigmoid": false,
							"loss_weight": 0.4
						}
					},
					"train_cfg": {},
					"test_cfg": {
						"mode": "whole"
					}
				}
			}
		}
	}

	// 更新configvv表的数据，将data.mmsegmentation.instruction的数据更新
	//把数据更新到数据库
	const res = await db.collection('configvv').doc('667fbb0fa7c432936bfeb0dd').update({
		data: baseData
	})

	return res
};
