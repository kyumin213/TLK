<template>
	<view>
		<tabTop left-icon="back" :title="languageInfo.accountAssets" />
		<view class="item">
			<view class="icon">
				<image src="../../../static/game/TRXicon.png" mode="widthFix"></image>
				<text>TRX</text>
			</view>
			<view class="money">
				<text>{{languageInfo.availableBalance}}：{{trxObj.num}}</text>
				<text>{{languageInfo.frozenBalance}}：{{trxObj.forzen_num}}</text>
				<!-- <text>矿池余额：0</text> -->
			</view>
			<view class="all_money">
				<text>{{languageInfo.totalBalance}}</text>
				<!-- <text>8921.51234567</text> -->
				<text class="small_text">￥{{trxObj.num}}</text>
			</view>
		</view>
		<view class="item">
			<view class="icon">
				<image src="../../../static/game/tlk.png" mode="widthFix"></image>
				<text>TLK</text>
			</view>
			<view class="money">
				<text>{{languageInfo.availableBalance}}：{{tlkObj.num}}</text>
				<text>{{languageInfo.frozenBalance}}：{{tlkObj.forzen_num}}</text>
				<!-- <text>矿池余额：{{yue}}</text> -->
			</view>
			<view class="all_money">
				<text>{{languageInfo.totalBalance}}</text>
				<!-- <text>8921.51234567</text> -->
				<text class="small_text">￥{{tlkObj.num}}</text>
			</view>
		</view>
      <view class="item">
			<view class="icon">
				<image src="../../../static/game/cub.png" mode="widthFix"></image>
				<text>CUB</text>
			</view>
			<view class="money">
				<text>{{languageInfo.availableBalance}}：{{cubObj.num}}</text>
				<text>{{languageInfo.frozenBalance}}：{{cubObj.forzen_num}}</text>
				<!-- <text>矿池余额：{{yue}}</text> -->
			</view>
			<view class="all_money">
				<text>{{languageInfo.totalBalance}}</text>
				<!-- <text>8921.51234567</text> -->
				<text class="small_text">￥{{cubObj.num}}</text>
			</view>
		</view>
		<!--  -->
		<view class="history" >
			<view class="" @tap="goTo">
				<image src="../../../static/game/small_icon.png" mode="widthFix"></image>
				<text>{{languageInfo.assetRecords}}</text>
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
				trxObj:{},
				tlkObj:{},
				cubObj:{},
				languageInfo:{}
			};
		},
		onShow() {
			this.languageInfo = this.linkTo.showLanguage();
			this.getMsg();
		},
		methods:{
			goTo(){
				this.linkTo.navTo('../assetsHistory/assetsHistory');
			},
			getMsg(){
				this.get('api/gameWallet',{}).then((res)=>{
					res.data.res.forEach((val,ind)=>{
						if(val.currency_id==='1'){
							this.tlkObj =val;
						}else if(val.currency_id==='2'){
							this.cubObj = val;
						}else if(val.currency_id==='3'){
							this.trxObj =  val;
						}
						
					})
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

	.item{
		width: 95%;
		margin: 30rpx auto;
		background:linear-gradient(90deg,rgba(50,65,99,1) 0%,rgba(10,20,41,1) 100%);
		border-radius:15rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 30rpx 20rpx;
		opacity: .8;
		.icon{
			display: flex;
			flex-direction: row;
			align-items: center;
			image{
				width: 70rpx;
				margin-right: 15rpx;
			}
			text{
				font-weight: bold;
				color: white;
				font-size: 35rpx;
			}
		}
		.money{
			display: flex;
			flex-direction: column;
			text{
				font-size: 25rpx;
				color: #2BDAAA;
			}
		}
		.all_money{
			font-size: 33rpx;
			height: 100rpx;
			color: white;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-end;
			.small_text{
				font-size: 26rpx;
				color:rgba(142,162,193,1);
			}
		}
	}
	.history{
		display: flex;
		flex-direction: row-reverse;
		margin-right: 20rpx;
		view{
			display: flex;
			flex-direction: row;
			align-items: center;
			border: 1px solid #2BDAAA;
			box-sizing: border-box;
			padding: 8rpx 20rpx;
			border-radius: 5rpx;
			image{
				width: 30rpx;
				margin-right: 15rpx;
			}
			text{
				font-size: 28rpx;
				color: white;
			}
		}
	}
</style>
