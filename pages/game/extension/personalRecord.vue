<template>
	<view>
		<tabTop left-icon="back" :title="languageInfo.personalPromotionIncentiveRecord" />
		<view class="box">
			<view class="head">
				<text>{{languageInfo.dataTime}}</text>
				<text>TLK{{languageInfo.number}}</text>
			</view>
			<view class="item" v-if="list.length===0">
				<text>{{languageInfo.noDataAvailable}}</text>
			</view>
			<view class="item" v-for="(item,index) in list" :key="index">
				<text>{{item.add_time}}</text>
				<text>{{item.num*1}} TLK</text>
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
				list:[],
				languageInfo: {}
			};
		},
		 onReachBottom(){
			 console.log('上拉触发') 
		 },
		mounted() {
			this.getMsg();
		},
		onShow() {
			this.languageInfo = this.linkTo.showLanguage();
		},
		methods:{
			getMsg(){
				let data = {expand_type:1}
				this.get('api/personExpandLog',data).then((res)=>{
					this.list = res.data.res.data;
					// console.log(res)
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
		box-sizing: border-box;
		background:rgba(30,43,73,0.8);
		border:1px solid rgba(93,114,164,1);
		border-radius:6rpx;
		margin: 20rpx auto;
		.head{
			display: flex;
			justify-content:space-between;
			align-items: center;
			border-bottom: 1px solid rgba(93,114,164,1);
			box-sizing: border-box;
			padding: 20rpx 30rpx;
			font-size: 27rpx;
			color: #2DEAB7;
		}
		.item{
			display: flex;
			justify-content:space-between;
			align-items: center;
			border-bottom: 1px solid rgba(93,114,164,1);
			box-sizing: border-box;
			padding: 20rpx 30rpx;
			font-size: 27rpx;
			color: #90A3C6;
		}
	}
</style>
