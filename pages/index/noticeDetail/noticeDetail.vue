<template>
	<view class="noticeDetail">
		<tabTop title="公告详情"  />
		<view class="noticeDetail-box">
			<view class="noticeDetail-top">
				{{title}}
			</view>
			<view class="noticeDetail-body">
				{{detail}}
			</view>
		</view>
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue';
	export default{
		components: {tabTop},
		data(){
			return{
				
				noticeDetail:{},
				title:'',
				text:'',
				detail:""
			}
		},
		mounted(){
			this.noticeDetail = this.$store.state.noticeDetail;
			console.log(this.$store.state.noticeDetail)
			let d = uni.getStorageSync('languageType');
			switch (d) {
				case 'Chinese':
					this.detail = this.noticeDetail.detail;
					this.title = this.noticeDetail.title;
					break;
				case 'English':
					this.detail = this.noticeDetail.en_content;
					this.title = this.noticeDetail.en_title;
					break;
				case 'Korean':
					this.detail = this.noticeDetail.kn_content;
					this.title = this.noticeDetail.kn_title;
					break;
				case 'Japanese':
					this.detail = this.noticeDetail.jp_content;
					this.title = this.noticeDetail.jp_title;
					break;
				default:
					this.detail = this.noticeDetail.detail;
					this.title = this.noticeDetail.title;
					break;
			}
		}
	}
</script>

<style lang="scss">
	.noticeDetail{
		@include levelCen();
		@include bg();
		.noticeDetail-box{
			@include size(710rpx,auto,none);
			background:linear-gradient(90deg,rgba(50,65,99,1) 0%,rgba(10,20,41,1) 100%);
			border-radius:10px;
			margin-top: 10rpx;
			.noticeDetail-top{
				@include size(100%,120rpx,none);	
				@include font(22rpx,#fff);
				@include cen();
			}
			.noticeDetail-body{
				@include font(26rpx,#8EA2C1);
				box-sizing: border-box;
				padding-left: 31rpx;
				padding-right: 31rpx;
				padding-bottom: 40rpx;
			}
		}
		
	}
</style>
