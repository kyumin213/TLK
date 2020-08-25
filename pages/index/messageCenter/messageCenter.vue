<template>
	<view>
		<tabTop left-icon="back" :title="languageInfo.messageCenter" />
		<view class="contenBg">
			<view class="messageBox">
				<view class="messageItem" v-for="(item,index) in propertyTransferData" :key='index' @tap="toView(index)">
					<view class="messageLeft">
						<view class="fz24 txtCol">您已成功转账
							<label class="num ml10">{{item.num}}</label>
							<label class="num ml10">{{item.currency_name}}</label>
						</view>
						<view class="times">{{item.add_time}}</view>
					</view>
					<view class="itemRight">{{languageInfo.blockchainBrowserView}}<label class="nextIcon ml10"></label></view>
				</view>
				<view class="loading-text">{{loadingText}}</view>
				<!-- 	<text class="loading-text">
					<text v-show="loadingType === 0">加载更多</text>
					<text v-show="loadingType === 1">上拉加载更多</text>
					<text v-show="loadingType === 2">到底了</text>
					{{loadingType === 0 ? contentText.contentdown : (loadingType === 1 ? contentText.contentrefresh : contentText.contentnomore)}}
				</text> -->
			</view>
		</view>
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue'
	var _this;
	export default {
		components: {
			tabTop
		},
		data() {
			return {
				loadingType: 0,
				page: 0, //页数
				rowNum: '10', //每页条数
				total: 0, // 总数
				type: 1,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				propertyTransferData: [],
				loadingText: '',
				languageInfo: {},
				loadingType: 0, //定义加载方式 0---contentdown  1---contentrefresh 2---contentnomore
			}
		},
		onLoad() {
			this.propertyTransfer()

		},
		onShow() {
			let _this = this
			_this.languageInfo = this.linkTo.showLanguage();
			// this.propertyTransfer()
			// setTimeout(function() {
			// 	_this.getmorenews();
			// }, 1000);
		},

		onPullDownRefresh() {
			this.propertyTransfer()
		},
		onReachBottom() {
			let _this = this
			let arr = _this.propertyTransferData.length
			console.log(arr)
			let total = _this.total
			console.log(total)
			if (arr < total) {
				_this.getmorenews()
			}
		},

		methods: {
			// 跳转
			goTo(url) {
				this.linkTo.navTo(url);
			},
			// 浏览器跳转
			toView(e) {
				plus.runtime.openURL('https://trx.tokenview.com/en/tx/' + this.propertyTransferData[e].ti_id);
				// window.location.href = 'https://tronscan.io/#/transaction/' + this.propertyTransferData[e].ti_id
			},
			// 资产交易记录
			propertyTransfer() {
				let _this = this
				_this.loadingType = 0;
				uni.showNavigationBarLoading()
				let page = parseInt(_this.page)
				let data = {
					page: _this.page,
					rowNum: _this.rowNum,
					type: _this.type
				}
				_this.get('api/propertyTransferLog', data).then(res => {
					if (res.data.code == 200) {
						_this.propertyTransferData = res.data.res.data
						_this.total = res.data.res.total
					}
					uni.hideNavigationBarLoading(); //关闭加载动画
					uni.stopPullDownRefresh(); //得到数据后停止下拉刷新
				}).catch(err => {
					console.log(err)
				})
			},
			// 上拉加载// 上拉加载
			getmorenews() {
				let _this = this
				let page = parseInt(_this.page)
				_this.page = page + 1
				_this.loadingType = 1;
				uni.showNavigationBarLoading(); //显示加载动画
				let data = {
					page: page.toString(),
					rowNum: _this.rowNum
				}
				_this.get('api/propertyTransferLog', data).then(res => {
					if (res.data.res.data == null) {
						// this.loadingType = 2;
						// _this.loadingType = 2;
						uni.hideNavigationBarLoading(); //关闭加载动画
						return false;
					} else {
						_this.propertyTransferData = _this.propertyTransferData.concat(res.data.res.data); //将数据拼接在一起
						uni.hideNavigationBarLoading(); //关闭加载动画
					}

					_this.loadingType = 0; //将loadingType归0重置

				})
			},

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
	$colTxt:#2DE9B7;
	$fz24:24rpx;

	.fz24 {
		font-size: 24rpx;
	}

	.ml10 {
		display: inline-block;
		margin-left: 10rpx;
	}

	.contenBg {
		width: 100%;

		.loading-text {
			display: inline-block;
			width: 100%;
			text-align: center;
			font-size: 24rpx;
			color: #ccc;
			// position: fixed;
			// bottom: 50rpx;
			height: 100rpx;
			line-height: 100rpx;
			// margin: 0 auto;
		}

		.messageBox {
			width: 100%;
			// height: calc(100vh - 88rpx - 44px);
			margin-top: 10rpx;
			overflow: auto;
			// margin-bottom: 110rpx;
		}

		.messageItem {
			height: 120rpx;
			margin: 10rpx 20rpx;
			padding: 0 30rpx;
			border-radius: 10rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: linear-gradient(left, #324063, #0A1429);
			box-sizing: border-box;
			opacity: .8;
		}

		.messageItem:first-child {
			margin-top: 20rpx;
		}

		.txtCol {
			color: #8DA1C0;
		}

		.num {
			color: $colTxt;
		}

		.times {
			color: #8DA1C0;
			font-size: 24rpx;
		}

		.itemRight {
			display: inline-block;
			color: $colTxt;
			font-size: 24rpx;
		}

		.nextIcon {
			width: 12rpx;
			height: 12rpx;
			border-top: 4rpx solid $colTxt;
			border-right: 4rpx solid $colTxt;
			transform: rotate(45deg);
		}
	}
</style>
