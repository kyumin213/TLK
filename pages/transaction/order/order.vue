<template>
	<view class="order">
		<tabTop left-icon="back" :title="languageInfo.order" />
		<view class="taps">
			<view class="list border-r" :class="{'active':tapsNum===0}" @tap="tapsCheckout(0)">
				{{languageInfo.orderTaps1}}
			</view>
			<view class="list" :class="{'active':tapsNum===1}" @tap="tapsCheckout(1)">
				{{languageInfo.orderTaps2}}
			</view>
		</view>
		<view class="orders">
			<view class="order" v-for="(item,index) in lists" :key='index' v-show="tapsNum===0">
				<view class="titles">
					<view class="title l">{{getDate(item.add_time)}}</view>
					<view class="title m " :class="{buy:item.sell_id ==0,sell:item.sell_id >0}"><text class="mr10" v-if="item.sell_id >0">{{languageInfo.sell}}</text><text class="mr10" v-if="item.sell_id ==0">{{languageInfo.buyIn}}</text>{{getStatus(item.sell_id)}}</view>
					<view class="title r">{{item.type == 1 ? languageInfo.orderListVal4:languageInfo.orderListVal1}}</view>
				</view>
				<view class="state">
					<view class="list list-border">
						<view class="copy">
							<text class="num">{{item.entrust_price ? item.entrust_price : '---'}}</text>
							<text class="bottom-num">{{languageInfo.marketListTitle2}}(CUB)</text>
						</view>
						<view class="copy">
							<text class="top-num">{{item.entrust_num}}</text>
							<text class="bottom-num">{{languageInfo.marketListTitle6}}(TLK)</text>
						</view>
						<view class="copy copy-right">
							<view class="btn" :class="{'btn-active':item.status == 3,'btn-none':item.status==4}">{{getOrderStatus(item.status)}}</view>
							<view class="btn ml10" @tap="deleteOrder(index)" v-if="item.status==1 || item.status==2" :class="{'btn-active':item.status == 3}">{{languageInfo.undo}}</view>
						</view>
					</view>
					<view class="list">
						<view class="copy">
							<text class="num">{{item.avg_price?item.avg_price:'---'}}</text>
							<text class="bottom-num">{{languageInfo.orderListVal5}}(CUB)</text>
						</view>
						<view class="copy">
							<text class="top-num">{{item.success_num}}</text>
							<text class="bottom-num">{{languageInfo.orderListVal6}}(TLK)</text>
						</view>
						<view class="copy num-active">
							<text class="top-num">{{item.total_money ? item.total_money : '---'}}</text>
							<text class="bottom-num">{{languageInfo.orderListVal7}}(CUB)</text>
						</view>
					</view>
				</view>
			</view>

			<view class="order" v-for="(item,index) in lists2" :key='index+"c"' v-show="tapsNum===1">
				<view class="titles">
					<view class="title l">{{getDate(item.trade_time)}}</view>
					<view class="title m " :class="{buy:item.type === 1,sell:item.type === 2}">
						{{item.type === 1 ? languageInfo.marketBuy +'TLK/CUB':languageInfo.marketSell+ 'TLK/CUB'}}
					</view>
					<view class="title r">{{item.type == 1 ? languageInfo.orderListVal8+item.buy_fee:languageInfo.orderListVal8+item.sell_fee}}CUB</view>
				</view>
				<view class="state">
					<view class="list">
						<view class="copy">
							<text class="num">{{item.trade_price?item.trade_price:'---'}}</text>
							<text class="bottom-num">{{languageInfo.marketListTitle2}}(CUB)</text>
						</view>
						<view class="copy">
							<text class="top-num">{{item.trade_num}}</text>
							<text class="bottom-num">{{languageInfo.marketListTitle6}}(TLK)</text>
						</view>
						<view class="copy num-active">
							<text class="top-num">{{item.trade_money ? item.trade_money : '---'}}</text>
							<text class="bottom-num">{{languageInfo.orderListVal9}}(CUB)</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="box">
				<view class="close" @tap="closeModal"></view>
				<view class="title">{{languageInfo.cancelOrder}}</view>
				<!-- <view class="input"><input type="password" value="" v-model="password" /></view> -->
				<view class="btn">
					<view class="cancel" @tap="closeModal">{{languageInfo.cancel}}</view>
					<view class="yes" @tap="veriPassword">{{languageInfo.determine}}</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	// import myTitle from '@/components/myTitle.vue';
	import tabTop from '@/components/tabTop.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	export default {
		components: {
			tabTop,uniPopup
		},
		data() {
			return {
				languageInfo: {},
				lists: [],
				lists2: [],
				tapsNum: 0,
				historyEntrustPage: 1,
				historyEntrustRowNum: 10,
				historyEntrustTotal: 0,
				transferLogPage: 1,
				transferLogRowNum: 10,
				transferLogTotal: 0,
				orderId:'',
				orderListVal2:'' //已完成
			}
		},
		computed: {
			getOrderStatus(status) {
				return status => {
					const i = status * 1;
					let title = '';
					switch (i) {
						case 1:
							title = this.languageInfo.processing;
							break;
						case 2:
							title = this.languageInfo.processing;
							break;
						case 3:
							title = this.languageInfo.orderListVal2;
							break;
						default:
							title = this.languageInfo.revoked;
					};
					return title
				}
			},
			getDate() {
				return date => {
					const newDate = new Date(date * 1000);
					const yea = newDate.getFullYear();
					const mon = newDate.getMonth() + 1;
					const day = newDate.getDate();
					const h = newDate.getHours();
					const m = newDate.getHours();
					const s = newDate.getSeconds();
					const setMon = mon < 10 ? '0' + mon : mon;
					const setDay = day < 10 ? '0' + day : day;
					const setH = h < 10 ? '0' + h : h;
					const setM = m < 10 ? '0' + m : m;
					const setS = s < 10 ? '0' + s : s;
					return yea + '-' + setMon + '-' + setDay + '  ' + setH + ':' + setM + ':' + setS;
				}
			},
			getStatus(uid) {
				//传入卖家ID
				return uid => {
					const id = uid * 1
					let title = '';
					switch (id) {
						case 0:
							title = 'TLK/CUB';
							break;
						default:
							title = 'TLK/CUB';
					};
					return title
				}
			}
		},
		onLoad(){
			// this.getHistoryEntrustData()
			// this.getTransferLog()
		},
		onShow() {
			let _this = this
			this.languageInfo = this.linkTo.showLanguage();
			this.getHistoryEntrustData()
			this.getTransferLog()
			// setTimeout(function() {
			// 	_this.getmorenews();
			// }, 1000);
			// setTimeout(function() {
			// 	_this.getMoreTrans();
			// }, 1000);
		},
		// onPullDownRefresh() {
		// 	this.getHistoryEntrustData()
		// 	this.getTransferLog()
		// },
		// onReachBottom() {
		// 	let _this = this
		// 	let arr = _this.lists.length
		// 	let total = _this.historyEntrustTotal
		// 	let transTotal = _this.lists2.length
		// 	let totals = _this.transferLogTotal
		// 	let nums = _this.tapsNum
		// 	console.log(nums)
		// 	if (nums == 0) {
		// 		if (arr < total) {
		// 			_this.getmorenews();
		// 		}
		// 	} else {
		// 		if (transTotal < totals) {
		// 			_this.getMoreTrans()
		// 		}
		// 	}


		// },
		methods: {
			// 撤销
			deleteOrder(index){
				this.orderId = this.lists[index].id
				this.$refs.popup.open()
			},
			veriPassword(){
				let _this = this
				let orderNum = _this.orderId
				let data = {
					id:orderNum
				}
				_this.post('api/cancelOrder',data).then(res=>{
					if(res.data.code == 200){
						uni.showToast({
							icon:'success'
						})
						this.$refs.popup.close();
						_this.getHistoryEntrustData()
					}
				})
			},
			// 关闭密码框
			closeModal(){
				let _this = this
				this.$refs.popup.close();
			},
			tapsCheckout(index) {
				this.tapsNum = index
				// if (this.tapsNum == 1) {
				// 	this.getTransferLog();
				// } else {
				// 	this.getHistoryEntrustData();
				// }
			},
			// 委托记录
			getHistoryEntrustData() {
				let _this = this
				// _this.loadingType = 0;
				uni.showNavigationBarLoading()
				let page = parseInt(_this.historyEntrustPage)
				let data = {
					page: _this.historyEntrustPage,
					rowNum: _this.historyEntrustRowNum
				}
				_this.get('api/historyEntrust', data).then(res => {
					if (res.data.code == 200) {
						_this.lists = res.data.res.data
						_this.historyEntrustTotal = res.data.res.total
						_this.historyEntrustPage = res.data.res.currency_page;
					}
					// page++
					uni.hideNavigationBarLoading(); //关闭加载动画
					uni.stopPullDownRefresh(); //得到数据后停止下拉刷新
				}).catch(err => {
					console.log(err)
				})
				// this.get('api/historyEntrust',data)
				// .then(res =>{
				// 	this.lists = res.data.res.data;
				// 	this.historyEntrustPage = res.data.res.currency_page;
				// 	this.historyEntrustRowNum = res.data.res.per_page;
				// 	this.historyEntrustTotal = res.data.res.total;
				// })
			},
			// 成交记录
			getTransferLog() {
				let _this = this
				uni.showNavigationBarLoading()
				let page = parseInt(_this.transferLogPage)
				let data = {
					page: _this.transferLogPage,
					rowNum: _this.transferLogRowNum
				}
				_this.get('api/transferLog', data).then(res => {
					if (res.data.code == 200) {
						_this.lists2 = res.data.res.data
						_this.transferLogTotal = res.data.res.total
						_this.transferLogPage = res.data.res.currency_page;
					}
					// page++
					uni.hideNavigationBarLoading(); //关闭加载动画
					uni.stopPullDownRefresh(); //得到数据后停止下拉刷新
				}).catch(err => {
					console.log(err)
				})
				// this.get('api/transferLog',data)
				// .then(res =>{
				// 	this.lists2 = res.data.res.data;
				// 	this.transferLogPage = res.data.res.currency_page;
				// 	this.transferLogRowNum = res.data.res.per_page;
				// 	this.transferLogTotal = res.data.res.total;
				// })
			},
			// 委托记录上拉加载// 上拉加载
			getmorenews() {
				let _this = this
				let page = parseInt(_this.historyEntrustPage)
				page++
				uni.showNavigationBarLoading(); //显示加载动画
				let data = {
					page: _this.historyEntrustPage,
					rowNum: _this.historyEntrustRowNum
				}
				_this.get('api/historyEntrust', data).then(res => {
					if (res.data.res.data == null) {
						uni.hideNavigationBarLoading(); //关闭加载动画
						return;
					} else {
						_this.lists = _this.lists.concat(res.data.res.data); //将数据拼接在一起
						// let list = _this.lists.length
						// for (let i = list; i < res.data.res.total; i++) {
						// }
						uni.hideNavigationBarLoading(); //关闭加载动画
					}
				})
			},
			// 成交记录上拉
			getMoreTrans() {
				let _this = this
				let page = parseInt(_this.transferLogPage)
				page++
				uni.showNavigationBarLoading(); //显示加载动画
				let data = {
					page: _this.transferLogPage,
					rowNum: _this.transferLogRowNum
				}
				_this.get('api/transferLog', data).then(res => {
					if (res.data.res.data == null) {
						uni.hideNavigationBarLoading(); //关闭加载动画
						return;
					} else {
						_this.lists2 = _this.lists2.concat(res.data.res.data); //将数据拼接在一起
						// let list = _this.lists2.length
						// for (let i = list; i < res.data.res.total; i++) {
						// }
						uni.hideNavigationBarLoading(); //关闭加载动画
					}
				})
			},
		},
		// mounted() {
		// 	this.getHistoryEntrustData();
		// }
	}
</script>

<style lang="scss" scoped>
	page {
		background-image: url(~@/static/bg.png);
		background-size: 100% 100%;
	}
	.box{
		width: 650rpx;
		background: #075F4D;
		border-radius:15rpx;
		box-sizing: border-box;
		padding: 50rpx 30rpx;
		.close{
			display: inline-block;
			width: 30rpx;
			height: 2rpx;
			background: #fff;
			transform: rotate(45deg);
			position:absolute;
			top: 30rpx;
			right: 20rpx;
		}
		.close::after{
			content: '';
			width: 30rpx;
			height: 2rpx;
			background: #fff;
			transform: rotate(90deg);
			position: absolute;
		}
		.title{
			text-align: center;
			color: white;
			font-size: 32rpx;
			margin-bottom: 30rpx;
		}
		.input{
			width: 90%;
			margin: 30rpx auto;
			background:rgba(18,25,42,0.5);
			border:1px solid rgba(45,234,183,1);
			border-radius:8rpx;
			text-indent: 10rpx;
			box-sizing: border-box;
			padding: 8rpx 0;
			text-align: center;
			color: #fff;
		}
		.btn{
			width: 80%;
			margin: 0 auto;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			view{
				background:rgba(18,25,42,0.5);
				border:1px solid rgba(45,234,183,1);
				border-radius:4px;
				box-sizing: border-box;
				color: white;
				font-size: 27rpx;
				padding: 15rpx 70rpx;
			}
		}
	}
	.ml10{
		margin-left: 10rpx;
	}
	.mr10{
		margin-right: 10rpx;
	}
	@mixin padding {
		box-sizing: border-box;
		padding-left: 21rpx;
		padding-right: 21rpx;
	}

	.order {
		@include levelCen();
		@include bg();

		.taps {
			@include size(710rpx, 56rpx, none);
			border: 1rpx #075F4D solid;
			margin-top: 20rpx;
			display: flex;

			.list {
				@include size(50%, 100%, none);
				@include font(28rpx, #fff);
				@include cen();

			}

			.active {
				background: linear-gradient(90deg, rgba(43, 102, 188, 1), rgba(7, 157, 117, 1));
			}
		}

		.orders {
			height: calc(100vh - 88rpx - 44px);
			margin-top: 10rpx;
			overflow: auto;
			padding-bottom: 50rpx;

			.order {
				@include size(710rpx, auto, none);
				margin-top: 10rpx;
				background: linear-gradient(90deg, rgba(50, 65, 99, 1) 0%, rgba(10, 20, 41, 1) 100%);
				border-radius: 10px;

				.titles {
					width: 100%;
					display: flex;
					justify-content: space-between;
					margin-top: 21rpx;
					@include padding();

					.title {

						@include font(24rpx, #fff);
					}

					.l {
						display: inline-block;
						width: 33.3%;
						box-sizing: border-box;
						padding-left: 10rpx;
						/* #ifdef H5 */
						white-space: nowrap;
						/* #endif */
					}

					.m {
						display: inline-block;
						width: 33.3%;
						display: flex;
						justify-content: center;
						font-size: 24rpx;
					}

					.r {
						display: inline-block;
						width: 33.3%;
						text-align: right;
						box-sizing: border-box;
						font-size: 24rpx;
						/* #ifdef APP-PLUS */
						padding-right: 15rpx;
						/* #endif */
					}

					.time {
						color: #AAAAAA;
					}

					.buy {
						color: #2DEAB7;
					}

					.sell {
						color: #EA2D2D;
					}
				}

				.state {
					width: 100%;

					.list {
						height: 105rpx;
						padding-bottom: 10rpx;
						display: flex;
						@include padding();

						.copy {
							height: 110rpx;
							@include cen();
							@include size(33.33%, auto, none);
							@include font(24rpx, #fff);
							display: flex;
							flex-direction: column;

							.bottom-num {
								margin-top: 5rpx;
							}
						}

						.num-active {
							display: flex;
							flex-direction: column;
							align-items: flex-end;
						}

						.copy-right {
							display: flex;
							flex-direction: row;
							justify-content: flex-end !important;

							.btn {
								// @include size(81rpx, 40rpx, none);
								padding:12rpx 16rpx;
								background: linear-gradient(90deg, rgba(148, 73, 231, 1), rgba(19, 107, 189, 1));
								font-size: 16rpx;
								border-radius: 8rpx;
								@include cen();
								box-sizing: border-box;

							}

							.btn-active {
								background: linear-gradient(90deg, rgba(43, 102, 188, 1), rgba(7, 157, 117, 1));
							}

							.btn-none {
								background: #616C81;
							}
						}
					}

					.list-border {
						border-bottom: 1rpx solid #5D72A4;
					}

					.right {
						width: 110rpx;

					}
				}
			}
		}

	}
</style>
