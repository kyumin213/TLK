<template>
	<view>
		<tabTop left-icon="back" title="狮子王" />
		<view>
			<view class="contenBg">
				<!-- 用户名 -->
				<view class="headFlex">
					<view class="headLeft" @tap="checkOut">
						<image class="headImg" v-if="infoData.image == ''" :src="suprizeImg"></image>
						<image class="headImg" v-else :src="infoData.image"></image>
						<label class="colorTxt fz30 userName">{{infoData.nickname}}</label>
						<label class="checkUserIcon"></label>
					</view>
					<view @tap="goTo('messageCenter/messageCenter')">
						<image class="message" src="~@/static/index/xiaoxi_icon.png"></image>
					</view>
				</view>
				<!-- 我的资产 -->
				<view class="circle2">
					<view class="circle1">
						<view>
							<image src="~@/static/index/index-icon.gif" class="indexIcon"></image>
						</view>
						<view class="yuan"></view>
						<view class="assetsBox">
							<label class="assetsTxt">{{languageInfo.MyAssets}}</label>
							<view>
								<label class="curr">$</label>
								<label class="curr assetsNum">{{trx}}</label>
							</view>
						</view>
					</view>
				</view>
				<!-- 转账、收款 、更多-->
				<view class="itemBox">
					<view class="item" @tap="goTo('transferAccount/transferAccount')">
						<image class="imageIcon" src="~@/static/index/zhuanzhang_icon.png"></image>
						<view class="itemTxt">{{languageInfo.transferAmountIndex}}</view>
					</view>
					<view class="item" @tap="goTo('transferCollection/transferCollection')">
						<image class="imageIcon" src="~@/static/index/shoukuan_icon.png"></image>
						<view class="itemTxt">{{languageInfo.collectionIndex}}</view>
					</view>
					<view class="item" @tap="goTo('more/more')">
						<image class="imageIcon" src="~@/static/index/gengduo_icon.png"></image>
						<view class="itemTxt">{{languageInfo.more}}</view>
					</view>
				</view>
				<!-- 官方公告 -->
				<view class="noticeBox" @tap="goTo('../game/notice/notice')">
					<image class="noticIcon" src="~@/static/index/gonggao_icon.png"></image>
					<view class="noticList">
						<view class="ml18 noticTxt">{{languageInfo.officialAnnouncement}}：</view>
						<swiper class="swiper" :indicator-dots="indicatorDots" vertical circular :autoplay="autoplay" :interval="interval"
						 :duration="duration">
							<swiper-item v-for="(item,index) in noticeAlertsList" :key="index">
								<view class="swiper-item uni-bg-red">
									<text style="margin-right: 25rpx;" class="fz24">{{item.title}}</text>
									<text>{{item.add_time}}</text>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
				<!-- 列表 -->
				<view class="listBox">
					<view class="listItem1">
						<view class="listItemLeft">
							<image class="itemIcon" src="~@/static/index/trx_icon.png"></image>
							<label class="ml18 colFFF itemTxt">TRX</label>
						</view>
						<view class="listItemCen">
							<view class="colFFF itemMoney">{{trx}}</view>
							<view class="itemNum">￥{{trxData.price}}</view>
						</view>
						<view>
							<view class="listRight">
								<image v-if="trxData.up_down == 1" class="itemBor" src="../../static/index/up.png">
									<image v-if="trxData.up_down == 2" class="itemBor" src="../../static/index/down.png">
									</image>
									<view class="increaseBox">
										<label v-if="trxData.up_down == 1" class="increaseTxt upTxt">{{trxData.curve}}%</label>
										<label v-if="trxData.up_down == 2" class="increaseTxt">{{trxData.curve}}%</label>
									</view>
							</view>
						</view>
					</view>
				</view>
				<view class="listBox">
					<view class="listItem1">
						<view class="listItemLeft">
							<image class="itemIcon" src="~@/static/index/tlk_icon.png"></image>
							<label class="ml18 colFFF itemTxt">TLK</label>
						</view>
						<view class="listItemCen">
							<view class="colFFF itemMoney">{{tlk}}</view>
							<view class="itemNum">￥{{tlkData.price}}</view>
						</view>
						<view>
							<view class="listRight">
								<image v-if="tlkData.up_down == 1" class="itemBor" src="../../static/index/up.png"></image>
								<image v-if="tlkData.up_down == 2" class="itemBor" src="../../static/index/down.png"></image>
								<view class="increaseBox">
									<label v-if="tlkData.up_down == 1" class="increaseTxt upTxt">{{tlkData.curve}}%</label>
									<label v-if="tlkData.up_down == 2" class="increaseTxt">{{tlkData.curve}}%</label>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="statusBox" v-if="statusModalShow">
			<view class="statusModal">
				<view class="titleTip">{{languageInfo.reminder}}</view>
				<view>
					<view class="modalContent">{{languageInfo.YourContractExpire}}</view>
				</view>
			</view>
		</view>
		<!-- <router></router> -->
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue';
	import router from '@/components/router.vue';
	export default {
		components: {
			tabTop,
			router
		},
		data() {
			return {
				indicatorDots: false,
				autoplay: true,
				interval: 3000,
				duration: 500,
				tlk: 0, //tlk余额
				trx: 0, //trx余额
				languageInfo: {},
				noticeAlertsList: [], //公告
				tlkData: [],
				trxData: [],
				infoData: [],
				suprizeImg: '', //默认头像
				statusModalShow: false //合约提示
			}
		},
		onLoad(){
			// this.myProperty()
			let token = uni.getStorageSync('token')
			if(!token){
				uni.navigateTo({
					url:'guidePage/guidePage'
				})
			}
		},
		onShow() {
			// console.log(this.$mp)
			this.myProperty()
			this.trxExchange()
			this.tlkExchange()
			this.noticeAlerts()
			this.getInfo()
			this.getStatus()
			this.randerPic()
			this.languageInfo = this.linkTo.showLanguage();

		},
		
		methods: {
		
			// 状态提示
			getStatus() {
				let _this = this
				let status = uni.getStorageSync('statusTip')
				_this.get('api/contractStatus').then(res => {
					if (res.data.code == 200) {
						if (res.data.res.is_remind == 1 && status == '1') {
							_this.statusModalShow = true
							uni.setStorageSync('statusTip', '2')
							setTimeout(() => {
								_this.statusModalShow = false
							}, 3000)
						}
					}
				})
			},
			// 跳转
			goTo(url) {
				this.linkTo.navTo(url);
			},
			// 默认头像
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
			// 个人信息
			getInfo() {
				let _this = this
				_this.get('api/myInfo').then(res => {
					if (res.data.code == 200) {
						_this.infoData = res.data.res
					}
				})
			},
			// 官方公告
			noticeAlerts() {
				let data = {
					page: '1',
					rowNum: '5'
				};
				this.get('api/noticeAlerts', data).then((res) => {
					this.noticeAlertsList = res.data.res.data;
				})
			},
			// 我的资产
			myProperty() {
				let _this = this
				_this.get('api/myProperty').then(res => {
					if (res.data.code == 200) {
						_this.tlk = res.data.res.tlk
						_this.trx = res.data.res.trx
						uni.setStorageSync('tlk', JSON.stringify(res.data.res.tlk))
						uni.setStorageSync('trx', JSON.stringify(res.data.res.trx))
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
			// trx汇率
			trxExchange() {
				let _this = this
				_this.get('api/trxExchange').then(res => {
					if (res.data.code == 200) {

						_this.trxData = res.data.res
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
			// tlk汇率
			tlkExchange() {
				let _this = this
				_this.get('api/tlkExchange').then(res => {
					if (res.data.code == 200) {
						_this.tlkData = res.data.res
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
			// 切换钱包
			checkOut() {
				uni.navigateTo({
					url: 'checkout/checkout'
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

	view {
		line-height: 1;
	}


	$txtCol:#2DEAB7;

	.statusBox {
		.statusModal {
			position: fixed;
			top: 40%;
			left: 40rpx;
			right: 40rpx;
			text-align: center;
			background: #075F4D;
			height: 250rpx;
			border-radius: 14rpx;
			box-sizing: border-box;
			color: #fff;
			z-index: 99;
			.titleTip {
				font-size: 30rpx;
				padding: 40rpx;
			}

			.modalContent {
				padding: 10rpx 0 30rpx 0;
				font-size: 30rpx;
			}
		}
	}

	.colorTxt {
		color: $txtCol;
	}

	.colFFF {
		color: #fff;
	}

	.fz26 {
		font-size: 26rpx;
	}
	.fz30{
		font-size: 30rpx;
	}

	.ml18 {
		margin-left: 18rpx;
	}


	.content {
		display: flex;
		justify-content: center;
	}

	.headFlex {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 30rpx;
	}

	.contenBg {
		padding-top: 50rpx;
		.headLeft {
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}

		.headImg {
			background: #fff;
			width: 55rpx;
			height: 55rpx;
			border-radius: 50%;
		}

		.message {
			width: 36rpx;
			height: 36rpx;
		}

		.userName {
			margin-left: 10rpx;
		}

		.checkUserIcon {
			width: 0;
			height: 0;
			margin-left: 10rpx;
			border-right: 6px solid transparent;
			border-left: 6px solid transparent;
			border-top: 6px solid $txtCol;
			margin-top: 6rpx;
		}

		.circle1 {
			width: 368rpx;
			height: 368rpx;
			background-image: url(~@/static/index/circle01.png) !important;
			background-size: cover;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);

		}

		.circle2 {
			width: 266rpx;
			height: 266rpx;
			background-image: url(~@/static/index/circle02.gif) !important;
			background-size: cover;
			position: relative;
			top: 80rpx;
			margin: 0 auto;
			// -webkit-animation:rotateImg 5s linear infinite;
		}

		.yuan {
			width: 258rpx;
			height: 258rpx;
			border: 10rpx solid #0d1422;
			border-radius: 50%;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}

		.assetsBox {
			text-align: center;
			position: absolute;
			left: 50%;
			top: 70rpx;
			transform: translate(-50%, 40rpx);
			box-sizing: border-box;
		}

		.indexIcon {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 200rpx;
			height: 200rpx;
			background-size: cover;
		}

		.assetsTxt {
			display: inline-block;
			color: #AAAAAA;
			font-size: 18rpx;
			margin-bottom: 14rpx;
		}

		.curr {
			color: #2A58E3;
			font-size: 48rpx;
			font-family: Impact;

		}

		.assetsNum {
			// background-image: -webkit-linear-gradient(left, #2A53E3, #2DE9B7);
			// -webkit-background-clip: text;
			// -webkit-text-fill-color: transparent;
			font-weight: 600;
			color: #2A53E3;
			font-family: Impact;
		}

		.itemBox {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 184rpx 124rpx 0 124rpx;

			.item {
				text-align: center;

				.imageIcon {
					width: 80rpx;
					height: 80rpx;
				}

				.itemTxt {
					color: #fff;
					font-size: 26rpx;
				}
			}
		}

		.noticeBox {
			display: flex;
			align-items: center;
			height: 60rpx;
			background: #23355B;
			border-radius: 4rpx;
			margin: 30rpx 44rpx 30rpx 44rpx;
			padding: 0 30rpx;
			box-sizing: border-box;
			opacity: .8;
			.noticList {
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
			}

			swiper {
				width: 70%;
				height: 42rpx;
				font-size: 26rpx;
				line-height: 42rpx;
				color: #2BDDAD;
				overflow: hidden;
			}

			.swiper-item {
				height: 42rpx;
				line-height: 42rpx;
			}

			.notic {
				width: 100%;
			}

			.noticIcon {
				width: 24rpx;
				height: 20rpx;
			}

			.noticTxt {
				display: inline-block;
				font-size: 26rpx;
				font-family: 'PingFang-SC-Regular';
				color: #25EDDC;
				line-height: 42rpx;
				height: 42rpx;
				white-space: nowrap;
				overflow: hidden;
				margin-right: 18rpx;
			}
		}

		.listBox {
			display: flex;
			justify-content: center;
			margin: 10rpx 44rpx;
		}

		.listItem1 {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 156rpx;
			width: 100%;
			padding-left: 28rpx;
			background: linear-gradient(left, #067456, #0A1429);
			border-radius: 14rpx;
			opacity: .8;
			.listItemLeft {
				height: 100%;
				display: flex;
				align-items: center;
			}

			.listItemCen {
				width: 30%;
				text-align: left;
			}

			.itemIcon {
				width: 60rpx;
				height: 60rpx;
			}

			.itemTxt {
				font-size: 26rpx;
			}

			.itemMoney {
				font-size: 30rpx;
			}

			.listRight {
				height: 130rpx;
			}

			.itemBor {
				display: flex;
				// align-items: center;
				width: 188rpx;
				height: 130rpx;
				position: relative;
				bottom: -12rpx;
			}

			.itemBorUp {
				background: linear-gradient(left, #B4EF65, #60ED8C);
			}

			.increaseBox {
				width: 188rpx;
				height: 130rpx;
				position: relative;
				top: -50rpx;
				transform: translateY(-50%);
				display: flex;
				align-items: center;
				// margin: 0 46rpx;
				justify-content: space-between;
			}

			.itemNum {
				font-size: 20rpx;
				color: #2BDAAA;
				margin-top: 8rpx;

			}

			.increaseTxt {
				display: inline-block;
				position: relative;
				z-index: 9999;
				opacity: 1;
				font-size: 24rpx;
				color: #C78B9F;
				margin-right: 16rpx;
				width: 100%;
				text-align: center;
			}

			.insDown {
				width: 10rpx;
				height: 32rpx;
			}

			.upTxt {
				color: #61ED8B;
			}

		}

	}
</style>
