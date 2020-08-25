<template>
	<view class="container">
		<tabTop left-icon="" :title="languageInfo.mine" />
		<view class="contenBox">
			<view class="userName" v-if="infoData.is_god == '1'">{{languageInfo.CreateTheWorldMe}}</view>
			<view class="lanRight">
				<picker @change="checkLanguage" :value="index" :range="languageData" mode="selector" style="width: 100%;">
					<image class="languageIcon" v-show="index == 0" src='~@/static/me/language/cn_icon.png'></image>
					<image class="languageIcon" v-show="index ==1" src='~@/static/me/language/en.png'></image>
					<image class="languageIcon" v-show="index ==2" src='~@/static/me/language/han.png'></image>
					<image class="languageIcon" v-show="index ==3" src='~@/static/me/language/jap.png'></image>
				</picker>
				<!-- <label class="selectIcon"></label> -->
			</view>
			<view class="borderBg">
				<image class="userBg" src="~@/static/me/personal/bg_user.png"></image>
			</view>
			<view class="imgBox">
				<view class="imgItem">
					<view>
						<image class="userLeft" v-if="infoData.level == '0'" src="~@/static/me/level/daxiang00.png"></image>
						<image class="userLeft" v-if="infoData.level == '1'" src="~@/static/me/level/daxiang.png"></image>
						<image class="userLeft" v-if="infoData.level == '2'" src="~@/static/me/level/lang.png"></image>
						<image class="userLeft" v-if="infoData.level == '3'" src="~@/static/me/level/hu.png"></image>
						<image class="userLeft" v-if="infoData.level == '4'" src="~@/static/me/level/baozi.png"></image>

						<view class="levelTxt">
							<image class="levelIcon" src="~@/static/me/personal/level.png"></image>
							<label for="">{{infoData.level}}</label>
							<label v-if="infoData.level == '1'" class="levelItem">({{languageInfo.elephant}})</label>
							<label v-if="infoData.level == '2'" class="levelItem">({{languageInfo.wolf}})</label>
							<label v-if="infoData.level == '3'" class="levelItem">({{languageInfo.tiger}})</label>
							<label v-if="infoData.level == '4'" class="levelItem">({{languageInfo.leopard}})</label>
						</view>
					</view>
				</view>
				<!-- </view> -->
				<view class="userHead">
					<image class="userPic" v-if="infoData.image == ''" :src="suprizeImg"></image>
					<image class="userPic" v-else :src="infoData.image"></image>
				</view>
				<view class="imgItem">
					<image class="userRight" v-if="infoData.is_lion == '1'" src="~@/static/me/level/shiziwang.png"></image>
					<image class="userRight" v-else src="~@/static/me/level/szw_no.png"></image>
					<view class="userRightTxt">{{languageInfo.DisneyTheLionKing}}</view>
				</view>
			</view>
			<!-- userName -->
			<view class="fz24 Names">{{infoData.nickname}}</view>
			<!-- 设置 -->
			<view class="listBox">
				<view class="itemList" @tap="centerSet">
					<view class="listLeft">
						<image class="itemListIcon" src="~@/static/me/personal/anquan_icon.png"></image>
						<label class="fz24">{{languageInfo.securitySetting}}</label>
					</view>
					<view class="nextIcon"></view>
				</view>
				<view class="itemList">
					<view class="listLeft">
						<image class="itemListIcon" src="~@/static/me/personal/women_icon.png"></image>
						<label class="fz24">{{languageInfo.aboutUs}}</label>
					</view>
					<view class="nextIcon"></view>
				</view>
				<view class="itemList" @tap="goTo('../index/messageCenter/messageCenter')">
					<view class="listLeft">
						<image class="itemListIcon" src="~@/static/me/personal/xiaoxi_icon.png"></image>
						<label class="fz24">{{languageInfo.messageCenter}}</label>
					</view>
					<view class="nextIcon"></view>
				</view>
				<view class="itemList" @tap="goTo('feedBack/feedBack')">
					<view class="listLeft">
						<image class="itemListIcon" src="~@/static/me/personal/yijian_icon.png"></image>
						<label class="fz24">{{languageInfo.feedBack}}</label>
					</view>
					<view class="nextIcon"></view>
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
				lanIcon: '../../static/me/language/cn_icon.png',
				languageData: ['中文', 'English', '한글', '日本語'], //语言
				infoData: [], //个人信息
				index: 0,
				languageType: '', //切换语言
				languageInfo: {},
				suprizeImg: ''
			}
		},
		onShow() {
			this.getInfo()
			this.randerPic()
			this.languageInfo = this.linkTo.showLanguage();
		},
		methods: {
			// 安全设置
			centerSet() {
				let names = uni.getStorageSync('userName')
				uni.navigateTo({
					url: 'SecurityCenter/SecurityCenter?names=' + names
				})
			},
			randerPic() {
				this.tagHash = {
					"1": {
						headUrl: '../../static/me/personal/head1.png'
					},
					"2": {
						headUrl: '../../static/me/personal/head2.png'
					},
					"3": {
						headUrl: '../../static/me/personal/head3.png'
					},
					"4": {
						headUrl: '../../static/me/personal/head4.png'
					},
					"5": {
						headUrl: '../../static/me/personal/head5.png'
					}
				};
				let randomKeys = ["1", "2", "3", "4"];
				let index = Math.floor(Math.random() * 4);
				this.suprizeImg = this.tagHash[randomKeys[index]].headUrl;
			},
			// 跳转
			goTo(url) {
				this.linkTo.navTo(url);
			},
			// 个人信息
			getInfo() {
				let _this = this
				_this.get('api/myInfo').then(res => {
					if (res.data.code == 200) {
						_this.infoData = res.data.res
						uni.setStorageSync('headImg', res.data.res.image)
						uni.setStorageSync('userName', res.data.res.nickname)
					}
				})
			},
			// 切换国家
			checkLanguage(e) {
				let _this = this
				_this.index = e.detail.value
				let index = e.detail.value
				if (index == 0) {
					_this.languageType = 'zh-cn'
					uni.setStorageSync('languageType', 'zh-cn')
					uni.setStorageSync('lang', 'zh-cn')
				} else if (index == 1) {
					_this.languageType = 'en-us'
					uni.setStorageSync('languageType', 'en-us')
					uni.setStorageSync('lang', 'en-us')
				} else if (index == 2) {
					_this.languageType = 'ko-kr'
					uni.setStorageSync('languageType', 'ko-kr')
					uni.setStorageSync('lang', 'ko-kr')
				} else if (index == 3) {
					_this.languageType = 'ja-jp'
					uni.setStorageSync('languageType', 'ja-jp')
					uni.setStorageSync('lang', 'ja-jp')
				}
				let data = {
					lang: _this.languageType
				}
				_this.languageInfo = _this.linkTo.showLanguage();
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
	view {
		line-height: 1;
	}

	.fz24 {
		font-size: 28rpx;
	}

	$colTxt:#2DEAB7;
		picker {
			position: relative;
			right: 30rpx;
		}

		picker::after {
			content: '';
			width: 0;
			height: 0;
			border-left: 5px solid transparent;
			border-right: 5px solid transparent;
			border-top: 6px solid #2DE9B7;
			position: absolute;
			right: -26rpx;
			bottom: 10rpx;
		}
	.container {
		.Names {
			display: inline-block;
			position: absolute;
			top: 358rpx;
			left: 50%;
			transform: translate(-50%, 50%);
			color: $colTxt;
			font-size: 30rpx;
			text-shadow: 0 0 0.2em #0f192a,
				-0 -0 0.2em #0f192a;
		}

		box-sizing: border-box;

		.contenBox {
			position: relative;
			top: 0;
			left: 0;
			// z-index: 9999;
		}

		.userName {
			position: absolute;
			left: 50%;
			text-align: center;
			color: $colTxt;
			font-size: 32rpx;
			margin: 54rpx auto 42rpx auto;
			transform: translateX(-50%);
		text-shadow: 0 0 0.2em #0f192a,
			-0 -0 0.2em #0f192a;
		}

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

		.borderBg {
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			top: 228rpx;
			left: 50%;
			transform: translate(-50%, -50%);

			.userBg {
				width: 708rpx;
				height: 176rpx;
				position: absolute;
				// margin: 0 auto;
				top: 0;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}

		.imgBox {
			// width: 100rpx;
			height: 2rpx;
			width: 100%;
			position: absolute;
			display: flex;
			justify-content: center;
			align-items: center;
			top: 228rpx;
			// margin: 0 20rpx;
			// box-sizing: border-box;
			text-align: center;

			.imgItem {
				width: 30%;
			}

			.leftBox {
				// width: 33.3%;
				text-align: center;
			}

			.userHead {
				margin: 0 40rpx;
			}

			.userLeft,
			.userRight {
				width: 108rpx;
				height: 108rpx;
				margin-top: 10rpx;
			}

			.userPic {
				width: 150rpx;
				height: 150rpx;
				background: #fff;
				border-radius: 50%;
			}

			.levelIcon {
				width: 24rpx;
				height: 20rpx;
				background-size: cover;
			}

			.level {
				color: $colTxt;
				font-size: 18rpx;
			}

			.levelTxt {
				font-size: 24rpx;
				color: $colTxt;
			}
			.levelItem{
				display: inline-block;
				font-size: 28rpx;
			}

			.userRightTxt {
				color: $colTxt;
				font-size: 28rpx;
				height: 22rpx;
			}
		}

		.listBox {
			position: absolute;
			top: 444rpx;
			left: 0;
			right: 0;

			// margin-top: 444rpx;
			.itemList {
				width: 100%;
				height: 80rpx;
				background: #1E2B49;
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: $colTxt;
				padding: 0 62rpx;
				border-bottom: 2rpx solid #42537A;
				box-sizing: border-box;
				opacity: .8;
				.listLeft {
					display: flex;
					justify-content: flex-start;
					align-items: center;
				}

				.itemListIcon {
					width: 36rpx;
					height: 36rpx;
					margin-right: 18rpx;
				}
				.nextIcon{
					width: 16rpx;
					height:16rpx;
					border-top: 4rpx solid $colTxt;
					border-right: 4rpx solid $colTxt;
					transform: rotate(45deg);
				}
			}
		}


	}
</style>
