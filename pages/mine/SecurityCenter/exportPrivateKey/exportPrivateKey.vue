<template>
	<view>
		<tab-top left-icon='back' :title="languageInfo.exportPrivateKeyMe"></tab-top>
		<view class="container">
			<view class="tipBox">
				<view class="tipFlex">
					<label class="tipIcon">></label>
					<label class="tipTxt">{{languageInfo.exportKeyTip}}</label>
				</view>
			</view>
			<view class="keyBox">
				<label class="privateKey">{{privateKey}}</label>
			</view>
			<view>
				<button class="copyBtn" @tap="copyKey(privateKey)">{{languageInfo.copyPrivateKey}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue'
	export default {
		data() {
			return {
				privateKey: '',
				languageInfo:{}
			}
		},
		components: {
			tabTop
		},
		onLoad() {
			this.getPrivateKay()
		},
		onShow() {
			this.languageInfo = this.linkTo.showLanguage();
		},
		methods: {
			// 初始化私钥
			getPrivateKay() {
				let _this = this
				_this.get('api/exportPrivateKey').then(res => {
					if (res.data.code == 200) {
						_this.privateKey = res.data.res.privateKey
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 复制私钥
			copyKey(value) {
				uni.setClipboardData({
					data: value, // 要复制的文字
					success: function(res) {
						uni.getClipboardData({
							success: function(res) {
								uni.showToast({
									title: '复制成功',
									icon:'success'
								});
							}
						});
					}
				});
			}
		}
	}
</script>
<style>
	page {
		background-image: url(~@/static/bg.png);
		background-size: 100% 100%;
	}
</style>
<style lang="scss" scoped>

	$colTxt:#2DEAB7;

	view {
		line-height: 1;
	}

	.container {
		.tipItem {
			display: flex;
			justify-content: flex-start;
		}
		.tipFlex{
			display: flex;
			justify-content: flex-start;
		}

		.tipBox {
			margin: 50rpx 64rpx;
		}

		.tipIcon {
			color: $colTxt;
		}

		.tipTxt {
			color: #fff;
			font-size: 24rpx;
			margin-left: 10rpx;
			line-height: 38rpx;
		}

		.keyBox {
			display: flex;
			justify-content: flex-start;
			margin: 0 64rpx;
			box-sizing: border-box;
			border: 2rpx solid $colTxt;
			border-radius: 10rpx;
			background-color: rgba(14, 21, 30, .5);

			.privateKey {
				width: 100%;
				display: inline-block;
				color: $colTxt;
				font-size: 18rpx;
				line-height: 24rpx;
				padding: 24rpx 40rpx;
				box-sizing: border-box;
				word-wrap: break-word;
				word-break: normal;
			}
		}

		.copyBtn {
			position: fixed;
			left: 124rpx;
			right: 124rpx;
			bottom: 82rpx;
			height: 66rpx;
			line-height: 66rpx;
			font-size: 24rpx;
			color: #fff;
			border-radius: 4rpx;
			background: linear-gradient(left, #2B66BC, #079D75);
		}
	}
</style>
