<template>
	<view class="notice-header">
		<view class="icon" v-show="icon"></view>
		<view class="notice-title">
			<text class="ctitle">{{cTitle}}</text>
			<text class="title">{{title}}</text>
		</view>
		<view class="line"></view>
		<view class="more-btn" v-show="more">{{btn}}</view>
	</view>
</template>

<script>
	export default {
		props:{
			cTitle:String,
			title:String,
			more:{
				default:true
			},
			icon:{
				default:true
			},
			btn:{
				default:"MORE"
			},
			
		}
	}
</script>

<style lang="scss">
	.notice-header{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		box-sizing: border-box;
		.icon{
			@include size(44rpx,44rpx,#999);
		}
		.notice-title{
			display: flex;
			flex-direction: column;
			justify-content: center;
			margin-left: 10rpx;
			margin-right: 10rpx;
			.ctitle{
				box-sizing: border-box;
				@include font(22rpx,#fff);//白色
			}
			.title{
				@include font(14rpx,#2DEAB7);
			}
		}
		.line{
			height: 2rpx;
			flex: 1;
			background: #26846A;
			align-self:flex-end;
			margin-bottom: 5rpx;
		}
		.more-btn{
			@include size(81rpx,33rpx,#324163);
			border-radius: 35rpx;
			@include font(18rpx,#2DEAB7);
			align-self:flex-end;
			margin-bottom: 5rpx;
			@include cen();
			margin-left: 10rpx;
		}
		padding-bottom: 10rpx;
	}
</style>
