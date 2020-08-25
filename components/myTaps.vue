<template>
	<view class="myTaps" @tap="next">
		<view class="icon" :style="{'background-image':icon}"></view>
		<view class="title-box"  :style="{'color':color}">
			<text>{{name}}</text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				iconImage:''
			}
		},
		props:{
			name:String,
			color:{
				default:"#000"
			},
			icon:''
		},
		methods:{
			next(){
				this.$emit('next')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myTaps{
		@include size(221rpx,61rpx,none);
		border: 1rpx solid #2DEAB7;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 4rpx;
		.icon{
			@include size(30rpx,30rpx,none);
			@include icon('')
		}
		.title-box{
			margin-left: 10rpx;
			@include font(24rpx,black);
		}
	}
</style>
