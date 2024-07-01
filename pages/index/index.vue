<template>
	<view class="index">
		<DetailPanel v-if="visualize.isShowDetailPanel"/>
		<NestedCheckbox v-if="visualize.isShowCheckbox"/>
		<TipIndicator v-if="builder.isShowTipIndicator"/>
		<view class="largeTitleContainer">
			<view class="largeTitle">CONFIG (◡‿◡✿)</view>
			<view class="functionalBtnContainer">
				<view
					v-for="(index, name) in settings.mainPagefunctionalBtns"
					:key="index"
					:class="isSelected(index) ? 'selectedBtn' : 'functionalBtn'"
					@click="selectPage(index)"
					>
					{{ name }}
				</view>
			</view>
		</view>
		<view v-if="!settings.is404">
			<VisListPanel v-if="settings.selectedPage === 0"/>
			<ConfigBuilder v-if="settings.selectedPage === 1"/>
		</view>
		<view class="label404" v-else>啊噢！数据库走丢了</view>

		<!-- <view class="ttBtn" @click="uuu">tt</view> -->
	</view>
</template>

<script>
	import VisListPanel from '@/components/VisListPanel.vue';
	import NestedCheckbox from '@/components/NestedCheckbox.vue';
	import DetailPanel from '@/components/DetailPanel.vue';
	import ConfigBuilder from '@/components/ConfigBuilder.vue';
	import TipIndicator from '@/components/TipIndicator.vue';

	export default {
		components: {
			VisListPanel,
			NestedCheckbox,
			DetailPanel,
			ConfigBuilder,
			TipIndicator
		},
		created() {
			this.$store.dispatch('visualize/fetchBaseData');
		},
		data() {
			return {
			}
		},
		computed: {
			settings() {
				return this.$store.state.settings
			},
			visualize() {
				return this.$store.state.visualize;
			},
			builder() {
				return this.$store.state.builder;
			},
			baseDataConfig() {
				return this.visualize.baseData[this.visualize.selectedMMLabToolbox].config;
			},
		},
		methods: {
			uuu() {
				uniCloud.callFunction({
					name: 'updateBaseData',
					data: {
						baseData: this.visualize.baseData
					}
				}).then(res => {
					console.log(res);
				});
			},
			isSelected(index) {
				return index === this.settings.selectedPage;
			},
			selectPage(index) {
				this.$store.commit('settings/updateSelectedPage', index);
			},
			async refreshBaseData() {
				// try {
				// 	const res = await uniCloud.callFunction({
				// 		name: 'getBaseData',
				// 		data: {}
				// 	});
				// 	this.$store.commit('visualize/setBaseData', res.result.data[0].data);
				// } catch (error) {

				// 	this.$store.commit('settings/set404', true);
				// 	alert(`Error: 数据库走丢啦！`);
				// }
			}
		},
		mounted() {
			this.$store.commit('settings/updateSelectedPage', 0);
			this.refreshBaseData();
		}
	}
</script>

<style>
	.ttBtn {
		position: fixed;
		bottom: 20px;
		right: 20px;
		background: #f0f0f0;
		color: #000;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		width: 50px;
		height: 50px;
		cursor: pointer;
	}

	.index {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.label404 {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		font-family: 'Ali';
		font-weight: 300;
		font-size: 24px;
		color: #3269f6;
		z-index: 1000;
	}
</style>
