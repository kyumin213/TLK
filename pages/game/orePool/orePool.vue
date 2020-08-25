<template>
	<view>
		<tabTop left-icon="back" :title="languageInfo.orePool" />
		<view class="radio">
			<view class="bk1">
				<view style="font-size: 24rpx;">{{languageInfo.cumulativeRelease}}</view>
				<view style="font-size: 32rpx;">{{release_tlk*1}}</view>
			</view>
			<view class="bk2">
				<view style="font-size: 24rpx;">{{languageInfo.minePoolBalance}}</view>
				<view style="font-size: 32rpx;">{{tlk*1}}</view>
			</view>
			<view class="bk3">
				<view style="font-size: 24rpx;">{{languageInfo.releaseCoefficient}}</view>
				<view style="font-size: 42rpx;">{{release_sale*100}}%</view>
			</view>
		</view>
		<view class="box">
			<view class="title"><text>{{languageInfo.releaseRecord}}</text></view>
			<view class="item" v-if="list.length===0">
				<text class="time">{{languageInfo.noRecord}}</text>
			</view>
			<view class="item" v-for="(item,index) in list">
				<text class="time">{{item.add_time}}</text>
				<view class="num"><text class="num1">{{item.prize_num}}</text><text class="num2">TLK</text></view>
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
				release_sale:'',
				release_tlk:'',
				tlk:'',
				list:[],
				languageInfo: {}
			};
		},
		mounted() {
			this.releaseInfo();//释放信息
			this.releaseLog();//释放记录
		},
		onShow() {
			this.languageInfo = this.linkTo.showLanguage();
		},
		methods:{
			releaseInfo(){
				this.get('api/releaseInfo',{}).then((res)=>{
					console.log(res)
					this.tlk = res.data.res.tlk;
					this.release_sale = res.data.res.release_sale;
					this.release_tlk = res.data.res.release_tlk;
				})
			},
			releaseLog(){
				this.get('api/releaseLog',{}).then((res)=>{
					this.list = res.data.res.data;
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
	.radio{
		width: 95%;
		height: 500rpx;
		margin: 30rpx auto;
		box-sizing: border-box;
		padding: 30rpx;
		display: flex;
		justify-content: space-between;
		view{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			color: #2DEAB7;
			padding-bottom: 10rpx;
			// line-height: 20rpx;
		}
		.bk1,.bk2,.bk3{
			white-space: nowrap;
			overflow: hidden;
		}
		.bk1{
			width: 200rpx;
			height: 200rpx;
			background: url(../../../static/game/bk1.png) no-repeat;
			background-size: cover;
			display: flex;
			align-self: flex-end;
			// line-height: 50rpx;
		}
		.bk2{
			width: 300rpx;
			height: 300rpx;
			background: url(../../../static/game/bk2.png) no-repeat;
			background-size: cover;
			display: flex;
			align-self: center;
		}
		.bk3{
			width: 140rpx;
			height: 140rpx;
			background: url(../../../static/game/bk3.png) no-repeat;
			background-size: 100% 100%;
			display: flex;
			align-self: flex-start;
			text-align: center;
			padding-bottom: 0rpx;
			line-height: 30rpx;
		}
	}
	.box{
		width: 95%;
		margin: 0 auto;
		box-sizing: border-box;
		border-radius: 10rpx;
		background:rgba(30,43,73,0.8);
		border:1px solid rgba(93,114,164,1);
		.title{
			text-align: center;
			color: #2DEAB7;
			font-size: 32rpx;
			box-sizing: border-box;
			padding: 15rpx 0;
			border-bottom: 1px solid rgba(93,114,164,1);
		}
		.item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding: 20rpx 20rpx;
			border-bottom: 1px solid rgba(93,114,164,1);
			
			.time{
				color: #2DEAB7;
				font-size: 24rpx;
			}
			.num{
				font-size: 26rpx;
				.num1{
					color: white;
				}
				.num2{
					color: #2DEAB7;
					margin-left: 10rpx;
				}
			}
		}
	}

</style>
