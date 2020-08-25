<template>
	<view>
		<tabTop left-icon="back" :title="languageInfo.listOfCommunityPromotionIncentives" />
		<view class="bk">
			<label v-if="lang == 'zh-cn'" class="bkTxt">好友玩,你更赚</label>
			<label v-if="lang == 'en-us'" class="bkTxt en fz24">Friends make more money playing</label>
			<label v-if="lang == 'ja-jp'" class="bkTxt fz24">友達はあなたがもっと稼ぐ</label>
			<label v-if="lang == 'ko-kr'" class="bkTxt fz24">친구는 당신이 더 많은 수익을 재생</label>
			<image src="../../../static/game/picnew.png" mode="widthFix"></image>
		</view>
		<view class="box">
			<view class="head">
				<text>{{languageInfo.user}}</text>
				<text>{{languageInfo.cumulativeCubQuantity}}</text>
			</view>
			<view class="item" v-if="list.length===0">
				<text>{{languageInfo.noDataAvailable}}</text>
			</view>
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="num">
					<view :class="[index<3?'active':'']" class="radio"><text>{{index+1}}</text></view>
					<text :class="[index<3?'active_text':'']">{{item.user.nickname}}</text>
				</view>
				<text :class="[index<3?'active_text':'']">{{item.yeji_day*1}} CUB</text>
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
				languageInfo: {},
				lang:''
			};
		},
		mounted() {
			this.getMsg();
		},
		onShow() {
			this.languageInfo = this.linkTo.showLanguage();
			this.lang = uni.getStorageSync('languageType')
		},
		methods:{
			getMsg(){
				let data = {expand_type:2}
				this.get('api/expandRanking',data).then((res)=>{
					this.list = res.data.res.data;
					console.log(res)
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
	.active{
		border: 1px solid red !important;
		color: red;
	}
	.active_text{
		color: red;
	}
	.bk{
		width: 95%;
		margin: 30rpx auto;
		position: relative;
		image{
			width: 100%;
		}
		.bkTxt{
			width: 100%;
			position: absolute;
			z-index: 100;
			top: 50%;
			left: 50%;
			transform: translate(-40%,-50%);
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			font-size: 48rpx;
			box-sizing: border-box;
		}
		.en{
			transform: translate(-37%,-50%);
		}
		.fz24{
			font-size: 28rpx;
		}
		
	}
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
			border-bottom: 1px solid rgba(93,114,164,0.5);
			box-sizing: border-box;
			padding: 30rpx 30rpx;
			font-size: 27rpx;
			color: #90A3C6;
			border-radius: 10rpx;
			.num{
				display: flex;
				flex-direction: row;
				align-items: center;
				.radio{
					width: 50rpx;
					height: 50rpx;
					border-radius: 50%;
					border: 1px solid #91A4C6;
					display: flex;
					justify-content: center;
					align-items: center;
					box-sizing: border-box;
					margin-right: 10rpx;
				}
			}
		}
	}
</style>
