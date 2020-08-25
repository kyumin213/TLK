<template>
	<view class="transaction">
		<tabTop left-icon="back" :title="languageInfo.transaction" />
		<view class="transaction-top">
			<view class="icon"></view>
			<view class="title-box">
				<view class="c-title">{{languageInfo.assets}}</view>
				<view class="title">Account assets</view>
			</view>
			<view class="more-tap">
				<text class="more-tap-title">{{balance}}</text>
			</view>
		</view>
		
		<view class="transaction-taps">
			<view class="taps" @tap="navMarket">
				<view class="icon market2"></view>
				<view class="title-box">
					<text class="title">{{languageInfo.transactionTaps1}}</text>
				</view>
			</view>
			<view class="taps" @tap="navOrder">
				<view class="icon market3"></view>
				<view class="title-box">
					<text class="title">{{languageInfo.transactionTaps2}}</text>
				</view>
			</view>
		</view>
		
		<view class="market">
			<view class="market-box">
				<myTitle :cTitle='languageInfo.transactionTitle' title='Asset Details' :icon='false' :more='false'/>
			</view>
			<view class="market-lists">
				
				<view class="list" v-for="(item,index) in lists" :key='index'>
					<view class="icon" 
					:class="{
						TLK:item.currency_id==1,
						CUB:item.currency_id==2,
						TRX:item.currency_id==3
					}"></view>
					<view class="title">{{getName(item.currency_id)}}</view>
					<view class="mid">
						<text class="usable fz24">{{languageInfo.transactionListVal1}}：{{item.num}}</text>
						<text class="freeze fz24">{{languageInfo.transactionListVal2}}：{{item.forzen_num}}</text>
						<!-- <text class="leave">矿池余额：465.15</text> -->
					</view>
					<!-- <view class="all">
						<text class="total-title">总金额</text>
						<text class="float">8924.5244554</text>
						<text class="total">￥4721.95</text>
					</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import myTitle from '@/components/myTitle.vue';
	import tabTop from '@/components/tabTop.vue';
	export default {
		components:{myTitle,tabTop},
		onShow(){
			this.getData();
			this.languageInfo = this.linkTo.showLanguage();
		},
		data(){
			return {
				balance:0,
				currency_id:0,
				lists:[],
				languageInfo:{},
			}
		},
		methods:{
			navMarket(){
				uni.navigateTo({
					url:'market/market'
				})
			},
			navOrder(){
				uni.navigateTo({
					url:'./order/order'
				})
			},
			getData(){
				this.get('api/gameWallet')
				.then(res => {
					console.log(res);
					this.lists = res.data.res;
					for(let i=0;i<this.lists.length;i++){
						if(this.lists[i].currency_id == 1){
							this.$store.commit('SET_TLK',this.lists[i])
						}else if(this.lists[i].currency_id == 2){
							console.log(this.lists[i])
							this.balance = this.lists[i].num;
							this.$store.commit('SET_CUB',this.lists[i])
						}
					}
					
				})
			}
		},
		computed:{
			getName(id){
				return id => {
					return id == 1? 'TLK' : (id == 2? 'CUB':'TRX')
				}
			}
		},
		
	}
</script>

<style lang="scss" scoped>
	.fz24{
		font-size: 24rpx;
	}
	.transaction{
		@include levelCen();
		@include bg()
		.transaction-top{
			@include size(710rpx,100rpx,#1E2B49);
			border-radius: 10rpx;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			padding: 0 30rpx 0 35rpx;
			margin-top:22rpx;
			opacity:.8;
			.icon{
				@include size(40rpx,38rpx,none);
				@include icon('~@/static/game/acc.png')
			}
			
			.title-box{
				height: 100rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				margin-left: 12rpx;
				.c-title{
					@include font(24rpx,#fff);
				}
				.title{
					display: inline-block;
					@include font(30rpx,#2DEAB7);
				}
			}
			
			.more-tap{
				box-sizing: border-box;
				@include cen();
				padding-bottom: 3rpx;
				margin-left: auto;
				.more-tap-title{
					@include font(28rpx,#2DEAB7);
				}
			}
		}
		
		.transaction-taps{
			width: 100%;
			display: flex;
			justify-content: space-around;
			margin-top: 40rpx;
			.taps{
				@include size(221rpx,61rpx,none);
				border: 1rpx solid #2DEAB7;
				box-sizing: border-box;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 4rpx;
				width: 35%;
				font-size: 30rpx;
				background:linear-gradient(left,#9449E7,#136BBD);
				.icon{
					@include size(30rpx,30rpx,black);
				}
				.market2{
					@include icon('~@/static/transaction/market2.png');
				}
				.market3{
					@include icon('~@/static/transaction/market3.png');
				}
				.title-box{
					margin-left: 10rpx;
					@include font(24rpx,#fff);
				}
			}
		}
		
		.market{
			margin-top: 50rpx;
			.market-box{
				@include size(710rpx,auto,none);
			}
			.market-lists{
				.TLK{
					@include icon('~@/static/transaction/TLK.png');
				}
				.CUB{
					@include icon('~@/static/transaction/CUB.png');
				}
				.JDT{
					@include icon('~@/static/game/JDTicon.png');
				}
				.TCNY{
					@include icon('~@/static/game/TCNYicon.png');
				}
				.TRX{
					@include icon('~@/static/game/TRXicon.png');
				}
				.JDQ{
					@include icon('~@/static/game/JDQicon.png');
				}
				.USDT{
					@include icon('~@/static/game/USDTicon.png');
				}
				.list{
					@include size(710rpx,151rpx,none);
					background:linear-gradient(90deg,rgba(50,65,99,1) 0%,rgba(10,20,41,1) 100%);
					border-radius: 15rpx;
					margin-top: 10rpx;
					display: flex;
					align-items: center;
					box-sizing: border-box;
					padding-left: 27rpx;
					padding-right: 30rpx;
					opacity: .8;
					.icon{
						@include size(61rpx,61rpx,none);
					}
					.title{
						@include font(30rpx,#fff);
						margin-left: 19rpx;
					}
					.mid{
						display: flex;
						margin-left: auto;
						@include font(24rpx,#2BDAAA);
						flex-direction: column;
						justify-content: center;
					}
					.all{
						display: flex;
						margin-left: auto;
						flex-direction: column;
						justify-content: center;
						.total-title{
							@include font(22rpx,#fff);
						}
						.float{
							@include font(22rpx,#fff)
						}
						.total{
							@include font(16rpx,#8EA2C1);
						}
					}
				}
			}
		}
	}
</style>
