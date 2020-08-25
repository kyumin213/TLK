<template>
	<view>
		<tabTop left-icon="back" title="狮子王分红加权" />
		<view class="box">
			<view class="box_left">
				<view class="title">{{languageInfo.DisneyTheLionKing}}</view>
				<view class="jieshao">{{languageInfo.test1}}</view>
				<view class="num">{{languageInfo.test2}}<text>{{obj.r_num}}</text>{{languageInfo.name}}</view>
			</view>
			<view class="box_right">
				<view class="text">{{languageInfo.contract}} {{obj.num}} TLK</view>
				<view class="btn" @tap="btn">{{languageInfo.buyNow}}</view>
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
				obj:{},
				languageInfo: {}
			};
		},
		mounted() {
			this.get('api/getLion',{}).then((res)=>{
				this.obj = res.data.res;
			})
		},
		onShow() {
			this.languageInfo = this.linkTo.showLanguage();
		},
		methods:{
			btn(){
				this.post('api/lion',{}).then((res)=>{
					this.linkTo.$noToast(`${res.data.message}`)
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
	.box{
		width: 95%;
		height: 270rpx;
		margin: 20rpx auto;
		box-sizing: border-box;
		padding: 20rpx 30rpx;
		background:linear-gradient(90deg,rgba(50,65,99,1) 0%,rgba(10,20,41,1) 100%);
		border-radius:10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		opacity: .8;
		.box_left{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: 65%;
			height: 100%;
			.title{
				font-size: 40rpx;
				color: white;
			}
			.jieshao{
				font-size: 30rpx;
				color: white;
				text{
					font-size: 34rpx;
					color: #2DEAB7;
				}
			}
			.num{
				font-size: 30rpx;
				color: white;
				text{
					font-size: 36rpx;
					color: #EA2D2D;
				}
			}
		}
		.box_right{
			width: 35%;
			height: 100%;
			display: flex;
			justify-content: space-around;
			flex-direction: column;
			.text{
				font-size: 30rpx;
				color: white;
				white-space: nowrap;
				overflow: hidden;
			}
			.btn{
				background: url(../../../static/game/small_bk.png) no-repeat;
				background-size: cover;
				text-align: center;
				font-size: 30rpx;
				color: white;
				box-sizing: border-box;
				border-radius: 10rpx;
				padding: 10rpx 0;
			}
		}
	}
</style>
