<template>
	<view class="created-1">
		<tabTop left-icon="back"  right-text="测试" :title="languageInfo.created1" :open='false' />
		<view class="created-lists">
			<view class="created-lsit" v-for="(item,index) in lists" :key='index'>
				<view class="icon"></view>
				<view class="val">{{item.val}}</view>
				<view class="check" @tap="onCheck(index)">
					<view class="check-icon" v-if="item.check"></view>
				</view>
			</view>
		</view>
		<nextButton :bottom='true' :msg='languageInfo.nextStep'/>
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue';
	import nextButton from '@/components/nextButton.vue';
	export default{
		components: {tabTop,nextButton},
		data(){
			return{
				languageInfo:{},
				lists:[
					{
						val:'TRON',
						check:false,
						
					},
				]
			}
		},
		onShow(){
			this.languageInfo = this.linkTo.showLanguage();
		},
		methods:{
			getDeviceInfo(){
				plus.device.getInfo({
					success:function(e){
						console.log(e)
						// console.log('getDeviceInfo success: '+JSON.stringify(e));
					},
					fail:function(e){
						console.log(e)
						// console.log('getDeviceInfo failed: '+JSON.stringify(e));
					}
				});
			},
			onCheck(index){
				this.lists[index].check = !this.lists[index].check;
			}
		},
		mounted(){
			
			this.getDeviceInfo()
		}
	}
</script>

<style lang="scss">
	.created-1{
		height: 100vh;
		@include bg();
		.created-lsit{
			@include size(auto,100rpx,#1D2B49);
			@include font(24rpx,#FFFFFF);
			display: flex;
			align-items: center;
			position: relative;
			.icon{
				@include size(50rpx,50rpx,#fff);
				@include icon('~@/static/index/trx_icon.png');
				border-radius: 50%;
				margin-left: 45rpx;
			}
			.val{
				margin-left: 16rpx;
			}
			.check{
				@include size(34rpx,34rpx,none);
				@include cen();
				border-radius: 50%;
				position: absolute;
				right: 40rpx;
				
				.check-icon{
					@include size(100%,100%,#FFF);
					border-radius: 50%;
					@include icon('~@/static/right_icon.png');
				}
			}
		}
		
		.next{
			@include size(100%,66rpx,none);
			position: fixed;
			bottom: 83rpx;
			display: flex;
			justify-content: center;
			.next-button{
				@include size(500rpx,66rpx,none);
				@include font(24rpx,#fff);
				@include cen();
				background: linear-gradient(90deg,#2A65BC,#079D74);
				border-radius: 4rpx;
			}
		}
	}
</style>
