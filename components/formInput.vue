<template>
	<view class="form-input">
		<view class="form-title">
			<view class="title">
			{{name}}<text class="title-icon1"></text><text class="title-icon2"></text>
			</view>
		</view>
		<view class="input-box">
			<input class="input" @input='sendMsg' :type="type"  placeholder-style='color:#748193' :placeholder="pVal"/>
		</view>
		<view class="tips-box"><text class="tips" :class="{hide:hide}">{{tipVal}}</text></view>
	</view>
</template>

<script>
	export default {
		watch:{
			hide(val){
				console.log(val)
				// console.log('nisile')
			}
		},
		props:{
			name:String,
			pVal:String,
			tipVal:String,
			hide:{
				default:false
			},
			type:{
				default:'text'
			}
		},
		methods:{
			sendMsg(ev){
				this.$emit('val',ev.detail.value);
			}
		}
	}
</script>

<style lang="scss">
.form-input{
	@include size(560rpx,auto,none);
	box-sizing: border-box;
	align-self:center;
	margin-top: 10rpx;
	.form-title{
		@include font(26rpx,#2DE9B7);
		display: flex;
		align-items: center;
		.title{
			display: inline-block;
		}
		.title-icon1{
			display: inline-block;
			@include size(6rpx,6rpx,#2DE9B7);
			border-radius: 50%;
			margin-left: 9rpx;
			margin-bottom: 7rpx;
		}
		.title-icon2{
			display: inline-block;
			@include size(6rpx,6rpx,#4F6BFF);
			border-radius: 50%;
			margin-left: 5rpx;
			margin-bottom: 7rpx;
		}
	}
	
	.tips-box{
		display: flex;
		.tips{
			@include font(16rpx,#F42F2F);
			padding-top: 10rpx;
		}
	}
	
	
	.input-box{
		box-sizing: border-box;
		border-bottom: 1px solid rgba(131,151,183,1);
		.input{
			@include font(20rpx,#fff);
			padding-left: 18rpx;
			padding-top: 19rpx;
			padding-bottom: 19rpx;
			padding-right: 18rpx;
		}
	}
	
	.hide{
		visibility: hidden;
	}
}
</style>
