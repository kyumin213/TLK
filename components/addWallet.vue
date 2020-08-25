<template>
	<view class="addWallet" v-show="show" @tap="close">
		<view class="addWallet-box">
			<view class="add">{{addWallet}}</view>
			<view class="btn" @tap="navCreated">
				<view class="icon1">
					
				</view>
				<view>{{addWallet}}</view>
				</view>
			<view class="btn" @tap="navImport">
				<view class="icon2">
					
				</view>
				<view>
					{{importName}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			importName:'',
			addWallet:'',
			show:{
				default: false,
				languageInfo:{},
			}
		},
		onShow(){
			this.languageInfo= this.linkTo.showLanguage();
		},
		methods:{
			
			close(){
				this.$emit('hide');
			},
			navImport(){
				this.$emit('import');
			},
			navCreated(){
				this.$emit('created');
			}
		}
	}
</script>

<style lang="scss">
.addWallet{
	@include size(100%,100vh,none);
	position: fixed;
	left: 0;
	top: 0;
	background: rgba(0,0,0,.5);
	z-index: 10;
	.addWallet-box{
		@include size(561rpx,351rpx,#075F4D);
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		border-radius: 8rpx;
		z-index: 11;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.add{
			display: flex;
			justify-content: center;
			width: 100%;
			padding-top:60rpx ;
			@include font(30rpx,#fff);
		}
		.btn{
			@include size(501rpx,67rpx,#12192A);
			background:rgba(18,25,42,0.5);
			box-sizing: border-box;
			border: #2DEAB7 1rpx solid;
			border-radius: 3rpx;
			@include font(24rpx,#fff);
			margin-top:20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.icon1{
			@include size(30rpx,30rpx,none);
			@include icon('~@/static/index/chuangjian.png');
			margin-right: 10rpx;
		}
		.icon2{
			@include size(30rpx,30rpx,none);
			@include icon('~@/static/index/daoru.png');
			margin-right: 10rpx;
		}
	}
}
</style>
