<template>
	<view class="next" :class="{'next-active':bottom}" @tap="next">
		<view class="next-button">
			<text>{{msg}}</text>
		</view>
	</view>
</template>

<script>
	/**
	 * msg:String 按钮内容
	 * bottom:Boolean 是否定位于底部
	 * */
	export default {
		data(){
			return{
				languageInfo:{},
			}
		},
		props:{
			bottom:{
				default:false
			},
			msg:{
				default:'下一步'
			}
		},

		methods:{
			next(url){
				this.$emit('next','')
			}
		}
	}
</script>

<style lang="scss">
	.next{
		@include size(100%,66rpx,none);
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
	.next-active{
		/* #ifdef APP-PLUS */
			position: fixed;
			bottom: 82rpx;
		/* #endif */
	}
</style>
