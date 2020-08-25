<template>
	<view>
		<tabTop left-icon="" :title="languageInfo.CreateWalletGuidPage" />
		<view class="contentBg">
			<view class="content">
				<view class="lanRight">
					<picker @change="checkLanguage" :value="index" :range="languageData" mode="selector" style="width: 100%;">
						<image class="languageIcon" v-show="index == 0" src='~@/static/me/language/cn_icon.png'></image>
						<image class="languageIcon" v-show="index ==1" src='~@/static/me/language/en.png'></image>
						<image class="languageIcon" v-show="index ==2" src='~@/static/me/language/han.png'></image>
						<image class="languageIcon" v-show="index ==3" src='~@/static/me/language/jap.png'></image>
					</picker>
					<label class="selectIcon"></label>
				</view>
				<view class="disFlex">
					<view class="guideImgBox">
						<image class="guideImg" src="~@/static/index/guide.png"></image>
					</view>
					<view class="txtTip">{{languageInfo.pleaseOpenWallet}}</view>
					<view class="btnBox" @tap="createWallet">
						<image class="guideIcon" src="~@/static/index/chuangjian@2x.png"></image>
						<label class="ml10">{{languageInfo.createWallet}}</label>
					</view>
					<view class="btnBox" @tap="exportWallet">
						<image class="guideIcon" src="~@/static/index/daoru@2x.png"></image>
						<label class="ml10">{{languageInfo.importWallet}}</label>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue'
	export default {
		data() {
			return {
				languageInfo: {},
				lanIcon: '../../static/me/language/cn_icon.png',
				languageData: ['中文', 'English', '한글', '日本語'], //语言
				index: 0,
				languageType: '', //切换语言
			}
		},
		components: {
			tabTop
		},
		onLoad(){
			this.getBack()
		},
		onShow() {
			this.languageInfo = this.linkTo.showLanguage();
		},
		methods: {
			// 切换国家
			checkLanguage(e) {
				let _this = this
				_this.index = e.detail.value
				let index = e.detail.value
				if (index == 0) {
					_this.languageType = 'zh-cn'
					uni.setStorageSync('languageType', 'zh-cn')
				} else if (index == 1) {
					_this.languageType = 'en-us'
					uni.setStorageSync('languageType', 'en-us')
				} else if (index == 2) {
					_this.languageType = 'ko-kr'
					uni.setStorageSync('languageType', 'ko-kr')
				} else if (index == 3) {
					_this.languageType = 'ja-jp'
					uni.setStorageSync('languageType', 'ja-jp')
				}
				let data = {
					lang: _this.languageType
				}
				_this.languageInfo = _this.linkTo.showLanguage();
			},
			// 跳转
			goTo(url) {
				this.linkTo.navTo(url);
			},
			// 创建钱包
			createWallet() {
				uni.navigateTo({
					url: '../createdWallet/createdWallet'
				})
				
			},
			// 导入钱包
			exportWallet() {
				uni.navigateTo({
					url: '../importWallet/importWallet'
				})
			},
			getBack(){
				if (uni.getStorageSync('token')) { // 有token直接进入首页
					setTimeout(function() {
						uni.switchTab({
							url: '../index',
							animationType: 'pop-in',
							animationDuration: 300
						});
					}, 1000)
				}
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
	.ml10 {
		margin-left: 10rpx;
	}

	.contentBg {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 88rpx;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, .4);
		z-index: 99;
		.lanRight {
			display: flex;
			align-items: center;
			position: absolute;
			text-align: right;
			right: 30rpx;
			top: 48rpx;
		
			.selectIcon {
				width: 0;
				height: 0;
				border-left: 5px solid transparent;
				border-right: 5px solid transparent;
				border-top: 6px solid #2DE9B7;
				margin-left: 10rpx;
			}
		
			.languageIcon {
				width: 40rpx;
				height: 28rpx;
			}
		}
	}

	.content {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 202rpx 124rpx auto 124rpx;
		box-sizing: border-box;

		.disFlex {
			width: 100%;
		}

		.btnBox {
			width: 100%;
			height: 66rpx;
			color: #fff;
			font-size: 24rpx;
			border: 2rpx solid #2DEAB7;
			margin-bottom: 50rpx;
			border-radius: 4rpx;
			background: #0E151e;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.guideImgBox {
			width: 100%;
			text-align: center;
		}

		.guideImg {
			width: 194rpx;
			height: 194rpx;
		}

		.guideIcon {
			width: 28rpx;
			height: 30rpx;
		}

		.txtTip {
			font-size: 24rpx;
			color: #FDFFFE;
			margin: 50rpx auto;
			text-align: center;
		}
	}
</style>
