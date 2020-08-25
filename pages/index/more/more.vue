<template>
	<!--更多-->
	<view class="more">
		<tabTop :title="languageInfo.more" :open='false' />
		<view class="lists">
			<view class="list" v-for="(item,index) in lists" :key='index' @tap="navMore(index)">
				<view class="icon" :style="{'backgroundImage':item.icon}"></view>
				<view class="title-box">
					<view class="c-title">{{item.cTitle}}</view>
					<view class="title">{{item.title}}</view>
				</view>
				<view class="more-tap">
					<text class="more-tap-title"></text>
				</view>
				<view v-if="item.lists && itemListOpen" class="childs">
					<view class="childs-lists" @click='navHref(cindex)' v-for="(citem,cindex) in item.lists" :key='"c"+cindex'>
						{{citem.address}}
					</view>
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
		onShow() {
			this.languageInfo = this.linkTo.showLanguage();
			this.lists = this.languageInfo.moreLists;
		},
		methods: {
			getData(){},
			navHref(index){
				plus.runtime.openURL(this.lists[3].lists[index].url);
			},
			// 交易所地址1
			addressOne(){
				plus.runtime.openURL('https://www.zb.live/cn/');
				this.exchangeShow = false
			},	
			// 交易所地址2
			addressTwo(){
				plus.runtime.openURL('https://www.huobi.me');
				this.exchangeShow = false
			},	
			// 交易所地址3
			addressThree(){
				plus.runtime.openURL('https://www.coinbase.com/');
				this.exchangeShow = false
			},	
			// 交易所地址4
			addressFour(){
				plus.runtime.openURL('https://www.okex.me/');
				this.exchangeShow = false
			},
			navMore(index) {
				switch (index) {
					case 0:
						uni.navigateTo({
							url: '../whitePaper/whitePaper'
						});
						break
					case 3:
						// plus.runtime.openURL('https://www.okex.me/');
						this.itemListOpen = !this.itemListOpen;
						let tabs = this.lists[index].exchangeShow
						console.log(tabs)
						let shows = this.exchangeShow
						if(tabs==false && shows==false){
							this.lists[index].exchangeShow= true
							this.exchangeShow = true
						}else{
							this.lists[index].exchangeShow= false
							this.exchangeShow = false
						}
						// this.lists[index].exchangeShow = true
						// this.exchangeShow = true
						break;
					case 1:
						uni.navigateTo({
							url:'../introduce/introduce'
						});
						break;
					default:
						uni.showToast({
							title: this.languageInfo.inDev,
							icon: "none"
						})
				}
			}
		},
		data() {
			return {
				languageInfo: {},
				lists: [],
				itemListOpen:false,
				exchangeShow:false
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
	.more {
		@include levelCen();
		
		@include bg() .lists {
			padding-top: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			
			.list {
				@include size(710rpx, 100rpx, #1E2B49);
				border-radius: 10rpx;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				padding: 0 30rpx 0 35rpx;
				margin-top: 10rpx;
				position: relative;
				.childs{
					@include size(710rpx, auto, none);
					position: absolute;
					left: 0;
					top: 100rpx;
					z-index: 100;
					.childs-lists{
						@include size(710rpx, 100rpx, #2C405A);
						@include font(24rpx,#fff);
						@include cen();
						margin-top: 10rpx;
					}
				}
				
				.icon {
					@include size(40rpx, 40rpx, none);
					background-size: 100%, 100%;
					background-repeat: no-repeat;
				}

				.title-box {
					height: 100rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					margin-left: 12rpx;

					.c-title {
						@include font(24rpx, #fff);
					}

					.title {
						@include font(14rpx, #2DEAB7);
					}
				}

				.more-tap {
					@include size(24rpx, 24rpx, none);
					box-sizing: border-box;
					border: 1rpx #2DEAB7 solid;
					border-radius: 50%;
					@include cen();
					padding-bottom: 3rpx;
					margin-left: auto;

					.more-tap-title {
						width: 8rpx;
						height: 8rpx;
						border-top: 2rpx solid #2DEAB7;
						border-right: 2rpx solid #2DEAB7;
						transform: rotate(45deg);
					}
				}
			}
		}
	}
</style>
