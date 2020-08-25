<template>
	<view>
		<tabTop left-icon="back" :title="languageInfo.promotionReward" />
		<view class="box">
			<view class="guize">
				<view class="left">{{languageInfo.communityPromotionAward}}</view>
				<view class="right" @tap="goTo('./guize')">
					<image src="../../../static/game/fenxiang_icon1.png" mode="widthFix"></image>
					<text>{{languageInfo.promotionOfIncentiveRules}}</text>
				</view>
			</view>
			<view class="msg">
				<view class="left">
					<view class="top">{{languageInfo.communityLevel}}：<text>{{ExpandStatistics.grade}}</text></view>
					<view class="text1">{{languageInfo.communityDividendCoefficient}}：<text>{{ExpandStatistics.community_dividend_sale*100}}%</text></view>
					<view class="text2">{{languageInfo.yesterdaycoefficient}}：<text>{{ExpandStatistics.community_dividend_num}}</text></view>
					<view class="bk" @tap="goTo('./communityPromotionRecord')">{{languageInfo.communityPromotionIncentiveRecord}}</view>
				</view>
				<view class="right">
					<view class="top">{{languageInfo.gamesCompletedToday}}：<text style="color: red;font-weight: 400;">{{ExpandStatistics.yesterday_game_num}}</text></view>
					<view class="text1">{{languageInfo.accumulatedCommunityDividendsObtained}}：<text>{{ExpandStatistics.community_dividend_total}} CUB</text></view>
					<view class="text2">{{languageInfo.yesterdayCommunityBonusAccumulated}}：<text>{{ExpandStatistics.yesterday_community_dividend_total}} CUB</text></view>
					<view class="bk" @tap="goTo('./communityPromotionRanking')">{{languageInfo.listOfCommunityPromotionIncentives}}</view>
				</view>
			</view>
		</view>
		<view class="box">
			<view class="guize">
				<view class="left">{{languageInfo.individualPromotionAward}}</view>
				<view class="right" @tap="goTo('./myRecords')">
					<image src="../../../static/game/fenxiang_icon1.png" mode="widthFix"></image>
					<text>{{languageInfo.myPushRecord}}</text>
				</view>
			</view>
			<view class="msg">
				<view class="left bomLeft">
					<view class="text1">{{languageInfo.usersHaveBeenPromotedDirectly}} <text>{{ExpandStatistics.direct}}</text>{{languageInfo.name}}</view>
					<view class="text1">{{languageInfo.indirectlyPromotedUsers}}<text>{{ExpandStatistics.indirect}}</text>{{languageInfo.name}}</view>
					<view class="text2">{{languageInfo.accumulatedIndividualPromotionAwards}}：<text>{{ExpandStatistics.person_dividend_total}}</text></view>
					<view class="bk" @tap="goTo('./personalRecord')">{{languageInfo.personalPromotionIncentiveRecord}}</view>
				</view>
				<view class="right">
					<view class="text1">{{languageInfo.numberOfGamesDirectlyPromotedToday}}：<text style="color: #2DE9B7;font-weight: 400;">{{ExpandStatistics.today_direct_game_num}}</text>局</view>
					<view class="text1">{{languageInfo.numberOfGamesPromotedIndirectlyToday}}：<text>{{ExpandStatistics.today_indirect_game_num}}</text>局</view>
					<!-- <view class="text2" style="text-align: right;color: #2DE9B7;opacity: 0;">5511.9 TCNY</view> -->
					<view class="bk"  @tap="goTo('./personalRank')">{{languageInfo.personalPromotionIncentiveRanking}}</view>
				</view>
			</view>
		</view>
		<view class="fox">
			<view class="img_left">
				<image src="../../../static/game/fenxiang_icon3.png" mode="widthFix"></image>
				<view class="">
					<text style="font-size: 26rpx;">{{languageInfo.shareMyPromotionAchievements}}</text>
					<text style="font-size: 32rpx;">{{languageInfo.inviteMoreFriends}}</text>
				</view>
			</view>
			<view class="img_right">
				<image src="../../../static/game/fenxiang_icon2.png" mode="widthFix"></image>
				<view class="" @tap="goTo('./erweima')">{{languageInfo.shareNow}}</view>
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
				ExpandStatistics:{},
				languageInfo: {}
			};
		},
		mounted() {
			this.expandStatistics();//推广统计
		},
		onShow() {
			this.languageInfo = this.linkTo.showLanguage();
		},
		methods:{
			goTo(val){
				this.linkTo.navTo(val)
			},
			expandStatistics(){
				this.get('api/expandStatistics',{}).then((res)=>{
					this.ExpandStatistics = res.data.res;
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
		margin-bottom: 50rpx;
		margin: 0 20rpx;
		box-sizing: border-box;
		.guize{
			width: 100%;
			margin: 20rpx auto;
			box-sizing: border-box;
			padding: 30rpx 25rpx;
			background:linear-gradient(90deg,rgba(50,65,99,1) 0%,rgba(10,20,41,1) 100%);
			border-radius: 10rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: white;
			opacity: .8;
			.left{
				font-size: 35rpx;
			}
			.right{
				display: flex;
				flex-direction: row;
				align-items: center;
				border: 1px solid #2DEAB7;
				box-sizing: border-box;
				padding: 10rpx 20rpx;
				border-radius: 5rpx;
				image{
					width: 40rpx;
					height: 46rpx;
					margin-right: 10rpx;
				}
				text{
					font-size: 28rpx;
				}
			}
		}
		.msg{
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			margin: 0 auto;
			.left,.right{
				display: flex;
				flex-direction: column;
				// width: 50%;
				.top{
					margin-bottom: 20rpx;
				}
			}
			.left{
				width:45%;
			}
			.bomLeft{
				width: 50%;
			}
			.left,.right{
				.top{
					font-size: 32rpx;
					color: white;
					text{
						font-weight: bold;
					}
				}
				.text1,.text2{
					font-size: 26rpx;
					color: white;
					margin: 10rpx 0;
					text{
						color: #2DEAB7;
					}
				}
				.bk{
					width: 96%;
					background: url(../../../static/game/small_bk.png) no-repeat;
					background-size: cover;
					box-sizing: border-box;
					text-align: center;
					padding: 15rpx 0;
					font-size: 28rpx;
					color: white;
					border-radius: 10rpx;
					margin-top: 20rpx;
				}
			
			}
		}
	}
	.fox{
		display: flex;
		justify-content: space-between;
		align-items: center;
		background:linear-gradient(90deg,rgba(50,65,99,1) 0%,rgba(10,20,41,1) 100%);
		padding: 20rpx 30rpx;
		border-radius: 15rpx;
		opacity: .8;
		margin: 20rpx;
		box-sizing: border-box;
	
		.img_left{
			display: flex;
			flex-direction: row;
			align-items: center;
			image{
				width: 85rpx;
				margin-right: 10rpx;
			}
			view{
				display: flex;
				flex-direction: column;
				align-items: center;
				color: white;
			}
		}
		.img_right{
			border: 1px solid   #2DEAB7;
			border-radius: 8rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			box-sizing: border-box;
			padding: 8rpx 30rpx;
			white-space: nowrap;
			overflow: hidden;
			image{
				width: 40rpx;
				margin-right: 10rpx;
			}
			view{
				font-size: 26rpx;
				color: white;
			}
		}
	}
</style>
