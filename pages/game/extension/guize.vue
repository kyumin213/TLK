<template>
	<view>
		<tabTop left-icon="back" :title="languageInfo.promotionReward" />
		<view class="box">
			<view class="item">
				<view class="bk">
					<image src="../../../static/game/fenxiang_icon1.png" mode="widthFix"></image>
					<text>{{languageInfo.communityPromotionIncentive}}</text>
				</view>
				<view class="msg">
					<view class=""><text>1.{{languageInfo.test3}}<text class="color">30%</text>{{languageInfo.test4}}</text></view>
                    <text>2.{{languageInfo.test5}}<text class="color">30%</text>{{languageInfo.test6}}</text>
					<view class=""><text>3.{{languageInfo.test7}}</text></view>
				</view>
			</view>
		</view>
		
		
		<view class="box">
			<view class="item">
				<view class="bk">
					<image src="../../../static/game/fenxiang_icon1.png" mode="widthFix"></image>
					<text>{{languageInfo.individualPromotionAward}}</text>
				</view>
				<view class="msg">
					<view class=""><text>1.{{languageInfo.test8}}</text></view>
					<view class=""><text>2.{{languageInfo.test9}}</text></view>
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
		data() {
			return {
				languageInfo: {}
			};
		},
		onShow() {
			this.languageInfo = this.linkTo.showLanguage();
		},
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
		margin: 50rpx auto;
		box-sizing: border-box;
		// padding: 30rpx 0;
		.item{
			.bk{
				background:linear-gradient(90deg,rgba(50,65,99,1) 0%,rgba(10,20,41,1) 100%);
				box-sizing: border-box;
				border-radius: 8rpx;
				font-size: 30rpx;
				color: white;
				padding: 25rpx 0;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-bottom: 30rpx;
				image{
					width: 35rpx;
					margin-right: 15rpx;
				}
			}
			.msg{
				color: white;
				font-size: 26rpx;
				view{
					line-height: 60rpx;
				}
				.color{
					color: red;
					font-size: 28rpx;
					font-weight: 600;
				}
			}
		}
	}
</style>
