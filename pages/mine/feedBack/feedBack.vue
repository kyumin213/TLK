<template>
	<view>
		<tab-top left-icon="back" :title="languageInfo.feedBack" />
		<view class="container">
			<view class="conBox">
				<view class="mb30">
					<label class="icon">></label>
					<label class="tipTxt">{{languageInfo.placeFeedBack}}</label>
				</view>
				<textarea class="textBox" maxlength='500' name="textarea" v-model="feedBack" />
				<button class="submitBtn" @tap='submitFeed'>{{languageInfo.submitFeedBack}}</button>
		</view>
		</view>
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue'
	export default {
		data() {
			return {
				feedBack:'',
				languageInfo:{}
			}
		},
		components:{
			tabTop
		},
		onShow() {
			this.languageInfo = this.linkTo.showLanguage();
		},
		methods: {
			// 意见反馈
			submitFeed(){
				let _this = this
				let data = {
					feedback:_this.feedBack
				}
				_this.post('api/feedback',data).then(res=>{
					if(res.data.code == 200){
						uni.showToast({
							icon:'success',
							duration:1000
						})
						  setTimeout(() => {
						       uni.switchTab({
						          url:'../mine'
						        })
						 }, 600);
					
					}else{
						uni.showToast({
							title:res.data.message,
							icon:'none'
						})
					}
				}).catch(err=>{
					console.log(err)
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
	$colTxt:#2DEAB7;
	.mb30{
		margin-bottom: 30rpx;
	}
	.container{
		margin: 50rpx 64rpx;
		box-sizing: border-box;
		.conBox{
			width: 100%;
			height: 100%;
			.textBox{
				width: 100%;
				height: 240rpx;
				border: 2rpx solid $colTxt;
				color: #fff;
				padding: 10rpx;
				font-size: 24rpx;
				background-color: rgba(14,21,30,.5);
				margin: auto;
				box-sizing: border-box;
			}
		}
		.icon{
				color: $colTxt;
				margin-right: 10rpx;
				
			}
			.tipTxt{
				color: $colTxt;
				font-size: 24rpx;
				color: #fff;
			}
		
		.submitBtn{
			position: fixed;
			left: 124rpx;
			right: 124rpx;
			bottom: 80rpx;
			height: 66rpx;
			line-height: 66rpx;
			border-radius: 4rpx;
			background: linear-gradient(left,#2B66BC,#079D75);
			color: #fff;
			font-size: 24rpx;
		}
	}

</style>
