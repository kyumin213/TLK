<template>
	<view>
		<tabTop left-icon="back" :title="languageInfo.assetRecords" />
		<view class="box">
			<view class="head">
				<view class="item" v-for="(item,index) in headList" :key="index">
					{{item}}
				</view>
			</view>
			<view class="msg">
				<view class="item" v-for="(item,index) in list" :key="index">
					<view class="">{{item.currency_name}}</view>
					<view class="" @tap="copy(item)">{{item.form_url}}</view>
					<view class="">{{item.num}}</view>
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
				headList:['币类','转账地址','金额'],
				list:[],
				languageInfo:{}
			};
		},
		onShow() {
			this.languageInfo = this.linkTo.showLanguage();
			this.headList = [this.languageInfo.currency,this.languageInfo.transferAddress,this.languageInfo.amountOfMoney]
			this.getMsg();
		},
		methods:{
			getMsg(){
				this.get('api/propertyTransferLog',{}).then((res)=>{
					console.log(res)
					this.list = res.data.res.data;
				})
			},
			copy(item){
				let {form_url} = item;
				uni.setClipboardData({
				    data: form_url,
				    success: function () {
				        console.log('success');
				    }
				});
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
		box-sizing: border-box;
		padding-bottom: 50rpx;
		width: 95%;
		margin: 20rpx auto;
		background:rgba(30,43,73,0.8);
		border:1px solid rgba(93,114,164,1);
		border-radius: 12rpx;
	}
	.head{
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid rgba(93,114,164,1);
		padding: 20rpx 0;
		.item{
			width: 30%;
			color: #2DEAB7;
			font-size: 28rpx;
			text-align: center;
		}
	}
	.msg{
		width: 100%;
		.item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid rgba(93,114,164,1);
			padding: 20rpx 0;
			view{
				white-space: nowrap;
				overflow: hidden;
				width: 30%;
				text-align: center;
				color: white;
				font-size: 28rpx;
			}
		}
	}
</style>
