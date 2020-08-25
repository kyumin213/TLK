<template>
	<view class="backup">
		<tabTop left-icon="back"  :title="languageInfo.backup" :open='false' />
		<view class="card">
			<view class="icon"></view>
			<text class="text">{{languageInfo.backupTitle}}</text>
		</view>
		<view class="title">
			<text>{{languageInfo.backupTaps}}</text>
		</view>
		<view class="content">
			<text>{{languageInfo.backupValue}}</text>
		</view>
		<!--列表-->
		<view class="lists">
			<view class="list" v-for="(item,index) in lists" :key='index'>
				<view class="icon-box">
					<view class="icon"></view>
				</view>
				<text class="list-text">{{item.txt}}</text>
			</view>
		</view>
		
		<nextButton ref='btn' :bottom='true' @next='next' :msg='languageInfo.nextStep'/>
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
				lists:[],
			}
		},
		onShow(){
			this.languageInfo = this.linkTo.showLanguage();
			this.lists = this.languageInfo.backupListVal;
			console.log(this.lists)
		},
		methods:{
			next(){
				uni.navigateTo({
					url:'../backups/backups'
				})
			}
		}
	}
</script>

<style lang="scss">
	.backup{
		@include levelCen();
		@include bg();
		.card{
			@include size(710rpx,100rpx,#1E2B49);
			border-radius: 8rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 22rpx;
			.icon{
				@include size(32rpx,32rpx,none);
				@include icon('~@/static/index/backup.png')
			}
			.text{
				@include font(24rpx,#FFFFFF);
				margin-left: 9rpx;
			}
		}
		
		.title{
			width: 100%;
			display: block;
			display: flex;
			justify-content: flex-start;
			@include font(30rpx,#fff);//因白色背景，所以暂时用黑色
			box-sizing: border-box;
			padding-left: 65rpx;
			margin-top: 45rpx;
		}
		
		.content{
			width: 100%;
			display: flex;
			justify-content: flex-start;
			@include font(30rpx,#99AFD1);
			box-sizing: border-box;
			padding-left: 65rpx;
			padding-top: 45rpx;
			padding-bottom: 45rpx;
		}
		
		.lists{
			width: 100%;
			.list{
				box-sizing: border-box;
				padding-left: 65rpx;
				display: flex;
				flex-direction: row;
				.icon-box{
					padding-top: 10rpx;
					padding-right: 11rpx;
					.icon{
						@include size(14rpx,15rpx,none);
						@include icon('~@/static/index/right.png')
					}
				}
				
				.list-text{
					width: 577rpx;
					@include font(22rpx,#fff);//因白色背景，所以暂时用黑色
				}
			}
		}
	}
</style>
