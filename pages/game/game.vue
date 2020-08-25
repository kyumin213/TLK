<template>
	<view>
		<view>
			<tabTop left-icon="back" :title="languageInfo.game" />
			<view class="banner">
				<image v-show="lang == 'zh-cn'" src="~@/static/game/pic01.png" mode="widthFix"></image>
				<image v-show="lang == 'en-us'" src="~@/static/game/new01.png" mode="widthFix"></image>
				<image v-show="lang == 'ja-jp'" src="~@/static/game/new02.png" mode="widthFix"></image>
				<image v-show="lang == 'ko-kr'" src="~@/static/game/new03.png" mode="widthFix"></image>
			</view>
			<view class="swiperTop" @tap="goTo('game/notice/notice')">
				<!-- <view class="icon">
				<image src="../../static/game/quan.png" mode="widthFix"></image>
			</view> -->
				<view class="swiper_box">
					<view class="text" style="white-space: nowrap;overflow: hidden;margin-right: 15rpx;">{{languageInfo.officialAnnouncement}}：</view>
					<swiper class="swiper" :indicator-dots="indicatorDots" vertical circular :autoplay="autoplay" :interval="interval"
					 :duration="duration">
						<swiper-item v-for="(item,index) in noticeAlertsList" :key="index">
							<view class="swiper-item uni-bg-red">
								<text style="margin-right: 25rpx;">{{item.title}}</text>
								<text>{{item.add_time}}</text>
							</view>
						</swiper-item>

					</swiper>
				</view>
				<view class="go_icon">
					<image src="../../static/game/quan.png" mode="widthFix"></image>
				</view>
			</view>

			<view class="account_assets" @tap="goTo('game/accountAssets/accountAssets')">
				<view class="icon">
					<image src="../../static/game/acc.png" mode="widthFix"></image>
					<view class="text">
						<text class="chi">{{languageInfo.accountAssets}}</text>
						<text class="eng">Account assets</text>
					</view>
				</view>
				<view class="num">
					<text>{{cub}} CUB</text>
				</view>
			</view>

			<view class="set_btn">
				<view class="item" @tap="goTo('game/recharge/recharge')">
					<image src="../../static/game/chongzhi.png" mode="widthFix"></image>
					<text>{{languageInfo.recharge}}</text>
				</view>
				<!-- <view class="item" @tap="goTo('./back/back')">
					<image src="../../static/game/chongzhi.png" mode="widthFix"></image>
					<text>{{languageInfo.recharge}}</text>
				</view> -->
				<view class="item" @tap="goTo('game/assetsWithdrawal/assetsWithdrawal')">
					<image src="../../static/game/tixian.png" mode="widthFix"></image>
					<text>{{languageInfo.withdrawal}}</text>
				</view>
				<view class="item" @tap="goTo('game/orePool/orePool')">
					<image src="../../static/game/kuangchi.png" mode="widthFix"></image>
					<text>{{languageInfo.orePool}}</text>
				</view>
			</view>

			<view class="img" @tap="goTo('game/bonus/bonus')">
				<image v-show="lang == 'zh-cn'" src="~@/static/game/pic02.png" mode="widthFix"></image>
				<image v-show="lang == 'ko-kr'" src="~@/static/game/lion01.png" mode="widthFix"></image>
				<image v-show="lang == 'ja-jp'" src="~@/static/game/lion02.png" mode="widthFix"></image>
				<image v-show="lang == 'en-us'" src="~@/static/game/lion03.png" mode="widthFix"></image>
			</view>
			<view class="img" @tap="goTo('game/extension/extension')">
				<image v-show="lang == 'zh-cn'" src="~@/static/game/pic03.png" mode="widthFix"></image>
				<image v-show="lang == 'en-us'" src="~@/static/game/invi01.png" mode="widthFix"></image>
				<image v-show="lang == 'ja-jp'" src="~@/static/game/invi02.png" mode="widthFix"></image>
				<image v-show="lang == 'ko-kr'" src="~@/static/game/invi03.png" mode="widthFix"></image>
			</view>

			<view class="game_tite">
				<view class="icon">
					<image src="../../static/game/game.png" mode="widthFix"></image>
					<view class="text">
						<text class="chi">{{languageInfo.accountAssets}}</text>
						<text class="eng">Account assets</text>
					</view>
				</view>
			</view>

			<view class="account_assets" @tap="goTo('game/laohu/laohu')">
				<view class="icon">
					<image src="../../static/game/lion.png" mode="widthFix" style="width: 100rpx;"></image>
					<view class="text">
						<text class="chi">{{languageInfo.DisneyTheLionKing}}</text>
						<text class="eng">The Lion King</text>
					</view>
				</view>
				<view class="num">
					<image src="../../static/game/quan.png" mode="widthFix"></image>
				</view>
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
				background: ['color1', 'color2', 'color3'],
				indicatorDots: false,
				autoplay: true,
				interval: 3000,
				duration: 500,
				test: false,
				noticeAlertsList: [],
				trx: '',
				tlk: '',
				cub: '',
				languageInfo: {},
				lang:'' //语言
			}
		},
		mounted() {
			this.test = true;
			this.noticeAlerts(); //公告
			this.getTRX(); //显示TRX余额
		},
		onShow() {
			// // #ifdef APP-PLUS
			// plus.screen.lockOrientation('portrait-primary');
			// // #endif
			this.languageInfo = this.linkTo.showLanguage();
			 this.lang = uni.getStorageSync('languageType')
			 
		},
		onHide() {
			this.test = false;
		},
		methods: {
			play(){
				uni.navigateTo({
					url:'laohu/laohu'
				})
			},
			goTo(url) {
				this.$next(url);
			},
			noticeAlerts() {
				let data = {
					page: '1',
					rowNum: '5'
				};
				this.get('api/noticeAlerts', data).then((res) => {
					this.noticeAlertsList = res.data.res.data;
					// console.log(res.data.res.data)
				})
			},
			getTRX() {
				this.get('api/gameWallet', {}).then((res) => {
					console.log(res);
					res.data.res.forEach((val, ind) => {
						if (val.currency_id === '1') {
							this.tlk = val.num;
						} else if (val.currency_id === '2') {
							this.cub = val.num;
						} else if (val.currency_id === '3') {
							this.trx = val.num;
						}

					})
				})
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
	.banner {
		width: 100%;

		image {
			width: 100%;
		}
	}

	.swiperTop {
		width: 95%;
		margin: 30rpx auto;
		box-sizing: border-box;
		padding: 5rpx 20rpx;
		border-radius: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #1E2B49;
		opacity: .8;
		.icon,
		.go_icon {
			width: 30rpx;

			image {
				width: 100%;
			}
		}

		.swiper_box {
			width: 85%;
			display: flex;
			flex-direction: row;
			align-items: center;

			.text {
				font-size: 27rpx;
				color: #2BDDAD;
			}

			swiper {
				width: 70%;
				height: 50rpx;
				font-size: 26rpx;
				line-height: 50rpx;
				color: #2BDDAD;
			}
		}
	}

	.account_assets {
		// width: 95%;
		margin: 30rpx 20rpx;
		padding: 25rpx 20rpx;
		border-radius: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #1E2B49;
		opacity: .8;
		box-sizing: border-box;
		.icon {
			display: flex;
			flex-direction: row;
			align-items: center;

			image {
				width: 60rpx;
				margin-right: 10rpx;
			}
		}

		.num {
			font-size: 30rpx;
			color: rgba(45, 234, 183, 1);

			image {
				width: 30rpx;
			}
		}

		.text {
			display: flex;
			flex-direction: column;

			.chi {
				font-weight: bold;
				font-size: 28rpx;
				color: rgba(255, 255, 255, 1);
			}

			.eng {
				color: rgba(45, 234, 183, 1);
				font-size: 26rpx;
			}
		}
	}

	.set_btn {
		width: 95%;
		margin: 30rpx auto;
		box-sizing: border-box;
		padding: 25rpx 20rpx;
		border-radius: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.item {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 28%;
			box-sizing: border-box;
			padding: 8rpx 0rpx;
			border-radius: 8rpx;
			// border: 1px solid rgba(45, 234, 183, 1);
			background:linear-gradient(left,#9449E7,#136BBD);
			image {
				width: 40rpx;
				margin-right: 15rpx;
			}

			text {
				color: rgba(255, 255, 255, 1);
				font-weight: 400;
				font-size: 28rpx;
			}
		}
	}

	.img {
		width: 95%;
		margin: 5rpx auto;

		image {
			width: 100%;
		}
	}

	.game_tite {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 30rpx 0 20rpx 0;

		.icon {
			display: flex;
			flex-direction: row;
			align-items: center;

			image {
				width: 60rpx;
				margin-right: 10rpx;
			}
		}

		.text {
			display: flex;
			flex-direction: column;

			.chi {
				font-weight: bold;
				font-size: 28rpx;
				color: rgba(255, 255, 255, 1);
			}

			.eng {
				color: rgba(45, 234, 183, 1);
				font-size: 26rpx;
			}
		}
	}
</style>
