<template>
	<view class="backups">
		<tabTop :title="languageInfo.backups" :open='false'/>
		<view class="backups-box">
			<view class="backups-top">
				<text class="backups-text">{{languageInfo.backupsVal}}</text>
			</view>
			<view class="push-box show-box">
				<view class="list" v-for="(item,index) in lists" v-if="index < 12" :key='index' @tap="push(index)">
					{{item.word}}
				</view>
			</view>
		</view>
		<nextButton :bottom='true' @next='next' :msg='languageInfo.nextStep'/>
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
				lists:[]
			}
		},
		onShow(){
			this.languageInfo = this.linkTo.showLanguage();
			console.log(this.lists)
		},
		methods:{
			getWord(){
				this.get('api/word')
				.then(res => {
					console.log(res)
					this.lists = res.data.res.res;
					this.$store.commit('SET_WORDS',res.data.res);
				})
			},
			next(){
				uni.navigateTo({
					url:'../testWallet/testWallet'
				})
			}
		},
		mounted(){
			this.getWord()
		}
	}
</script>

<style lang="scss">
	.backups{
		height: 100vh;
		@include bg();
		.backups-box{
			@include cen();
			flex-direction: column;
			.backups-top{
				width: 100%;
				@include font(30rpx,#fff);
				box-sizing: border-box;
				padding-left: 75rpx;
				margin-top: 52rpx;
			}
		}
		.push-box{
			@include size(680rpx,360rpx,none);
			border-radius: 10rpx;
			box-sizing: border-box;
			padding-right: 10rpx;
			padding-top: 5rpx;
		}
		.push-box>view:nth-of-type(3n+1){
			margin-left: 41rpx;
		}
		.list{
			@include size(160rpx,50rpx,none);
			box-sizing: border-box;
			background: rgba(18,25,42,0.5);
			border: #2DE9B7 1rpx solid;
			border-radius: 25rpx;
			@include font(24rpx,#fff);
			@include cen();
			margin-top: 30rpx;
			margin-left: 60rpx;
			float: left;
		}
	}
</style>
