<template>
	<view>
		<tabTop left-icon="back" :title="languageInfo.myDirectRecord" />

		<view class="guize">
			<view class="right">
				<image src="../../../static/game/jilu.png" mode="widthFix"></image>
				<text>{{languageInfo.myDirectUserRecord}}</text>
			</view>
			<view class="left">{{languageInfo.directPush}}：{{totalPer}}</view>
		</view>
		<view class="item" v-for="(item,index) in expandData" :key='index'>
			<view class="left">
				<text class="title">{{item.user.nickname}}</text>
				<text class="ma">{{item.user.username}}</text>
			</view>
			<view class="center">
				<text class="text">{{languageInfo.level}}：</text>
				<text class="type">V{{item.user.level}}</text>
			</view>
			<view class="right">
				<view class=""><text>{{languageInfo.communitylevel}}：</text><text class="text">{{item.team}}</text></view>
				<view class=""><text>{{languageInfo.gamesCompletedToday}}：</text><text class="text">{{item.num}}{{languageInfo.bureau}}</text></view>
			</view>
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
				expandData:[],
				totalPer:'',
				languageInfo: {}
				
			}
		},
		onShow() {
			this.getPerson()
			this.languageInfo = this.linkTo.showLanguage();
		},
		methods: {
			getPerson() {
				let _this = this
				let data = {
					expand_type: 1
				}
				_this.get('api/myDirectExpand', data).then(res => {
					if (res.data.code == 200) {
						let list = res.data.res.data
						for(let i = 0;i<list.length;i++){
							let name = list[i].user.username
							list[i].user.username = name.substr(0, 3) + '****' + name.substr(name.length - 4)
						}
						_this.expandData = res.data.res.data
						_this.totalPer = res.data.res.total
					}
				})
			}
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
	.guize {
		width: 95%;
		margin: 20rpx auto;
		box-sizing: border-box;
		padding: 30rpx 25rpx;
		background: linear-gradient(90deg, rgba(50, 65, 99, 1) 0%, rgba(10, 20, 41, 1) 100%);
		border-radius: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: white;

		.left {
			font-size: 26rpx;
		}

		.right {
			display: flex;
			flex-direction: row;
			align-items: center;
			// border: 1px solid #2DEAB7;
			box-sizing: border-box;
			padding: 10rpx 20rpx;
			border-radius: 5rpx;

			image {
				width: 30rpx;
				height: 46rpx;
				margin-right: 10rpx;
			}

			text {
				font-size: 28rpx;
			}
		}
	}

	.item {
		width: 95%;
		height: 160rpx;
		margin: 20rpx auto;
		box-sizing: border-box;
		padding: 30rpx 25rpx;
		background: linear-gradient(90deg, rgba(50, 65, 99, 1) 0%, rgba(10, 20, 41, 1) 100%);
		border-radius: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.left {
			width: 40%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			color: white;

			.title {
				font-size: 35rpx;
			}

			.ma {
				font-size: 25rpx;
			}
		}

		.center {
			width: 20%;
			height: 100%;
			text-align: center;
			display: flex;
			flex-direction: row;
			align-items: flex-start;
			font-size: 30rpx;
			text-align: center;

			.text {
				color: white;
			}

			.type {
				color: #2EEAB8;
			}
		}

		.right {
			width: 40%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 25rpx;
			color: white;
			text-align: right;

			.text {
				color: #2EEAB8;
			}
		}
	}
</style>
