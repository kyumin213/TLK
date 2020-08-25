<template>
	<view>
		<tabTop left-icon="back" :title="languageInfo.tronTransferCollection" />
		<view class="contenBg">
			<view class="searCon">
				<view style="width: 100%;">
					<view class="iconBox">
						<image class="tokenIcon" src="~@/static/tron_icon.png"></image>
					</view>
					<view class="txtCenter">
						<image class="qrCode" :src="qrCode"></image>
					</view>
					<view class="border"></view>
					<view class="txtCol txtCenter codes">{{token}}</view>
				</view>
			</view>
			<view class="txtCenter disFlex">
				<view>
					<image class="tipIcon" src="~@/static/jinggao_icon.png"></image>
				</view>
				<view class="txtCol tipTxt">{{languageInfo.collectionTron}}</view>
			</view>
			<view class="btnBox">
				<button class="addBtn" @tap="copyKey(token)">{{languageInfo.copyCollectionAddress}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue'
	export default {
		components: {
			tabTop
		},
		data() {
			return {
				token:'',
				qrCode:"", //二维码
				languageInfo:{}
			}
		},
		onLoad(){
			this.getCollection()
		},
		onShow() {
			this.languageInfo = this.linkTo.showLanguage();
		},
		methods: {
			getCollection(){
				let _this = this
				_this.post('api/collection').then(res=>{
					if(res.data.code == 200){
						_this.qrCode = (res.data.res.qrcode).replace(/[\r\n]/g,'')
						_this.token = res.data.res.token
					}else{
						uni.showToast({
							title: res.data.message,
							icon:'none'
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			// 复制收款地址
			copyKey(value) {
				uni.setClipboardData({
					data: value, // 要复制的文字
					success: function(res) {
						uni.getClipboardData({
							success: function(res) {
								uni.showToast({
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
		background-image: url(../../../static/bg.png);
		background-size: 100% 100%;
	}
</style>
<style lang="scss" scoped>
	view {
		line-height: 1;
	}

	.fz24 {
		font-size: 24rpx;
	}

	.txtCenter {
		text-align: center;
	}

	.txtCol {
		color: #2DE9B7;
	}
	.contenBg {

		.searCon {
			display: flex;
			justify-content: center;
			height: 650rpx;
			background: #1D2B49;
			margin: 50rpx 50rpx 30rpx 50rpx;
			padding: 0 44rpx;
			border: 2rpx solid #8DA1C0;
			box-sizing: border-box;
			border-radius: 10rpx;
		}

		.iconBox {
			margin: 0 auto;
			text-align: center;
		}

		.tokenIcon {
			width: 100rpx;
			height: 100rpx;
			margin: 80rpx auto 50rpx auto;
		}

		.qrCode {
			width: 250rpx;
			height: 250rpx;
		}

		.border {
			display: flex;
			justify-content: center;
			width: 100%;
			height: 2rpx;
			background: #8397B7;
			border-radius: 1rpx;
			margin-top: 70rpx;
		}

		.codes {
			font-size: 20rpx;
			margin-top: 22rpx;
		}

		.tipTxt {
			font-size: 18rpx;
			line-height: 36rpx;
		}

		.tipIcon {
			width: 28rpx;
			height: 28rpx;
			margin-right: 10rpx;
		}

		.disFlex {
			display: flex;
			// align-items: center;
			justify-content: center;
			margin: 0 50rpx;
		}

		.addBtn {
			width: 560rpx;
			height: 68rpx;
			line-height: 68rpx;
			color: #fff;
			font-size: 24rpx;
			background: linear-gradient(left, #2A65BC, #079D74);
			border-radius: 6rpx;
			position: fixed;
			bottom: 82rpx;
			left: 50%;
			transform: translateX(-50%);
		}
	}
</style>
