<template>
	<view>
		<tabTop left-icon="back" title="信息详情" />
		<view class="box">
			<view class="title">{{title}}</view>
			<view class="msg">{{msg}}</view>
		</view>
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue'
	export default {
		components: {
			tabTop
		},
		data() {
			return {
				title:'',
				msg:''
			};
		},
		onLoad(e) {
			let {id,title} = e;
			this.title = title;
			// id = '2';
			let data={id}
			this.get('api/messageDetails',data).then((res)=>{
				console.log(res)
				this.msg = res.data.res.detail;
			})
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
	.box{
		// width: 100%;
		text-align: center;
		padding-top: 30rpx;
		background: #2C405A;
		padding: 50rpx;
		margin: 20rpx;
		box-sizing: border-box;
		border-radius: 8rpx;
		.title{
			font-size: 30rpx;
			color: white;
			margin-bottom: 15rpx;
		}
		.msg{
			font-size: 32rpx;
			color: white;
		}
	}
</style>
