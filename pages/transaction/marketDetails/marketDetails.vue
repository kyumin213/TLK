<template>
	<view class="marketDetails">
		<tabTop :title="languageInfo.market" :open='false' ></tabTop>
		<view class="marketDetails-top">
			<view class="title">TLK/CUB</view>
			<view class="bottom-box">
				<view class="left">
					<view class="top">
						<text class="text-left">{{exchange.price}}</text>
						<text class="text-right">{{exchange.curve}}%</text>
						<text class="text-icon">↑</text>
					</view>
					<view class="bottom">
						<text class="text-top">{{languageInfo.market_24hDeal}}：</text>
						<text class="text-bottom">{{exchange.total ? exchange.total:0}}TLK</text>
					</view>
				</view>
				<view class="right">
					<view class="right-box">
						<text class="top-text">{{languageInfo.market_24hTop}}</text>
						<text class="bottom-text">{{exchange.high_24h?exchange.high_24h:0}}</text>
					</view>
					<view class="right-box top-30">
						<text class="top-text">{{languageInfo.market_24hLow}}</text>
						<text class="bottom-text active">{{exchange.low_24h?exchange.low_24h:0}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="taps">
			<view class="taps-text" @tap="tapsCheckout(0)" :class="{'active':tapsNum===0}">{{languageInfo.marketDetailsVal1}}</view>
			<view class="taps-text" @tap="tapsCheckout(1)" :class="{'active':tapsNum===1}">{{languageInfo.marketDetailsVal2}}</view>
		</view>
		
		<view class="lists-top">
			<text class="lists-top-text">{{tapsNum == 0? languageInfo.marketListTitle1:languageInfo.marketListTitle4}}</text>
			<!-- <text class="lists-top-text">{{tapsNum == 0? languageInfo.marketListTitle2:languageInfo.marketListTitle5}}</text> -->
			<text class="lists-top-text">{{tapsNum == 0? languageInfo.marketListTitle3:languageInfo.marketListTitle2}}</text>
			<text class="lists-top-text">{{tapsNum == 0? languageInfo.marketListTitle2:languageInfo.marketListTitle6}}</text>
		</view>
		<view class="lists" v-show="tapsNum === 1">
			<view class="list" v-for="(item,index) in lists" :key='index'>
				<text class="list-text t1">{{getDate(item.trade_time)}}</text>
				<!-- <text class="list-text t2"></text> -->
				<text class="list-text t3">{{item.trade_price}}</text>
				<text class="list-text t4">{{item.trade_num}}</text>
			</view>
		</view>
		<view class="lists2" v-show="tapsNum === 0">
			<view class="lists-left">
				<view class="list-ex" v-for="(item,index) in buy" :key='index'>
					<text>{{item.trade_num}}</text>
					<text>{{item.trade_price}}</text>
				</view>
				<!-- <text class="list-text">2020.06.19  18:20:02</text>
				<text class="list-text">3.965</text>
				<text class="list-text">3.965</text>
				<text class="list-text">6.0k</text> -->
			</view>
			<view class="lists-right">
				<view class="list-ex" v-for="(item,index) in sell" :key='index'>
					<text>{{item.trade_num}}</text>
					<text>{{item.trade_price}}</text>
				</view>
			</view>
		</view>
		<view class="fooer">
			<view class="btn" @tap="navMarket(true)">{{languageInfo.marketBuy}}</view>
			<view class="btn active" @tap="navMarket(false)">{{languageInfo.marketSell}}</view>
		</view>
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue';
	export default {
		components:{tabTop},
		onShow(){
			this.languageInfo = this.linkTo.showLanguage();
		},
		data(){
			return{
				languageInfo:{},
				tapsNum:0,
				exchange:{},
				lists:[],
				sell:[],
				buy:[]
			}
		},
		computed:{
			getDate(){
				return date => {
					const newDate = new Date(date * 1000);
					const yea = newDate.getFullYear();
					const mon = newDate.getMonth() + 1;
					const day = newDate.getDate();
					const h = newDate.getHours();
					const m = newDate.getHours();
					const s = newDate.getSeconds();
					const setMon = mon < 10 ? '0' + mon:mon;
					const setDay = day < 10 ? '0' + day:day;
					const setH = h < 10 ? '0' + h:h;
					const setM = m < 10 ? '0' + m:m;
					const setS = s < 10 ? '0' + s:s;
					return yea + '-'+ setMon + '-' + setDay + ' ' + setH + ':' + setM + ':' + setS;
				}
			},
		},
		methods:{
			tapsCheckout(index){
				this.tapsNum = index
			},
			navMarket(bl){
				this.$store.commit('SET_MARKET_TYPE',bl)
				uni.navigateBack();
			},
			getData(){
				this.get('api/tlkExchange')
				.then(res=>{
					this.exchange = res.data.res;
				});
				this.get('api/depth')
				.then(res=>{
					console.log(res)
					this.sell = res.data.res.sell;
					this.buy = res.data.res.buy;
				});
				this.get('api/newTransfer')
				.then(res=>{
					this.lists = res.data.res
				})
			}
		},
		mounted(){
			this.getData();
		}
	}
</script>

<style lang="scss" scoped>
	.marketDetails{
		@include levelCen();
		@include bg();
		display: flex;
		flex-direction: column;
		align-items: center;
		.marketDetails-top{
			@include size(710rpx,301rpx,none);
			background: linear-gradient(90deg,rgba(50,65,99,1) 0%,rgba(10,20,41,1) 100%);
			box-sizing: border-box;
			border: 1rpx solid #fff;
			margin-top: 21rpx;
			display: flex;
			flex-direction: column;
			border-radius:10px;
			.title{
				width: 100%;
				@include font(36rpx,#fff);
				@include cen();
				margin-top: 42rpx;
			}
			.bottom-box{
				display: flex;
				box-sizing: border-box;
				padding-left: 40rpx;
				.left{
					width: 50%;
					.top{
						display: flex;
						justify-content: flex-start;
						align-items: center;
						
						.text-left{
							@include font(40rpx,#FFFFFF);
							margin-right: 21rpx;
						}
						.text-right{
							@include font(24rpx,#2DEAB7);
						}
						.text-icon{
							@include font(24rpx,#2DEAB7);
						}
					}
					.bottom{
						display: flex;
						flex-direction: column;
						margin-top: 40rpx;
						.text-top{
							@include font(24rpx,#AAAAAA);
						}
						.text-bottom{
							@include font(26rpx,#FFFFFF);
						}
					}
				}
				.right{
					width: 50%;
					box-sizing: border-box;
					margin-left: 150rpx;
					// padding-top: 42rpx;
					.right-box{
						display: flex;
						flex-direction: column;
					}
					.top-text{
						@include font(26rpx,#AAAAAA)
					}
					.bottom-text{
						@include font(26rpx,#2DEAB7)
					}
					.active{
						color: #EA2D2D;
					}
					.top-30{
						margin-top: 30rpx;
					}
				}
			}
		}
		
		.taps{
			margin-top: 37rpx;
			@include size(710rpx,56rpx,none);
			box-sizing: border-box;
			border: 1rpx #2B66BC solid;
			display: flex;
			
			.taps-text{
				width: 50%;
				height: 56rpx;
				@include font(26rpx,#fff);
				@include cen()
			}
			.active{
				background:linear-gradient(90deg,rgba(43,102,188,1),rgba(7,157,117,1))
			}
		}
		
		.lists-top{
			@include size(710rpx,56rpx,none);
			box-sizing: border-box;
			border-bottom: 1rpx #2B66BC solid;
			display: flex;
			margin-top: 10rpx;
			background: #2C405A;
			border-top-left-radius: 8rpx;
			border-top-right-radius: 8rpx;
			.lists-top-text{
				width: 50%;
				height: 56rpx;
				@include font(26rpx,#2DEAB7);
				@include cen();
			}
		}
		
		.lists{
			
			// width: 710rpx;
			display: flex;
			flex-direction: column;
			background: #2C405A;
			.list{
				border-bottom-left-radius: 8rpx;
				border-bottom-right-radius: 8rpx;
				@include size(710rpx,55rpx,none);
				box-sizing: border-box;
				border-bottom: 1rpx solid #5D72A4;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.list-text{
					display: inline-block;
					// width: 33%;
					@include font(26rpx,#fff);
					@include cen();
				}
		
				.t1{
					width: 40%;
					padding-left: 10rpx;
				}
				// .t2{
				// 	width: 25%;
				// }
				.t3{
					width: 30%;
				}
				.t4{
					width: 30%;
				}
			}
			
		}
		.lists2{
			width: 710rpx;
			display: flex;
			background: #2C405A;
			border-bottom-left-radius: 8rpx;
			border-bottom-right-radius: 8rpx;
			.lists-left{
				@include size(50%,auto,none);
				view{
					box-sizing: border-box;
					border-right: 1rpx #5D72A4 solid;
				}
			}
			.lists-right{
				@include size(50%,auto,none);
			}
			
			.list-ex{
				height: 55rpx;
				@include font(26rpx,#fff);
				display: flex;
				justify-content: space-around;
				align-items: center;
				box-sizing: border-box;
				border-bottom: 1rpx #5D72A4 solid;
				text{
					width: 50%;
					@include cen();
				}
			}
		}
		
		.fooer{
			@include size(710rpx,55rpx,none);
			display: flex;
			justify-content: space-between;
			position: fixed;
			bottom: 38rpx;
			.btn{
				background:linear-gradient(90deg,rgba(43,102,188,1),rgba(7,157,117,1));
				border-radius:4px;
				@include size(346rpx,67rpx,white);
				@include font(26rpx,#fff);
				@include cen();
			}
			.active{
				background:linear-gradient(90deg,rgba(148,73,231,1),rgba(19,107,189,1));
				border-radius:4px
			}
		}
	}
	
</style>
