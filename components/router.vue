<template>
	<view class="navRouter" :class="{'navActive':show}" >
		<view class="down" @tap="down">
			路由
		</view>
		<view class="nav-lists">
			<button type="default" @tap="getToken">获取TOKEN</button>
			<navigator url="./created/created-1" hover-class="navigator-hover">
				<button type="default">选择低层公链</button>
			</navigator>
			<navigator url="./createdWallet/createdWallet" hover-class="navigator-hover">
				<button type="default">创建钱包</button>
			</navigator>
			<navigator url="./backup/backup" hover-class="navigator-hover">
				<button type="default">备份提示</button>
			</navigator>
			<navigator url="./testWallet/testWallet" hover-class="navigator-hover">
				<button type="default">验证备份</button>
			</navigator>
			<navigator url="./importWallet/importWallet" hover-class="navigator-hover">
				<button type="default">导入钱包</button>
			</navigator>
			<navigator url="./index/index" hover-class="navigator-hover">
				<button type="default">首页</button>
			</navigator>
			<navigator url="./more/more" hover-class="navigator-hover">
				<button type="default">更多</button>
			</navigator>
			<navigator url="./notice/notice" hover-class="navigator-hover">
				<button type="default">官方公告</button>
			</navigator>
			<navigator url="./checkout/checkout" hover-class="navigator-hover">
				<button type="default">切换钱包</button>
			</navigator>
			<navigator url="./backups/backups" hover-class="navigator-hover">
				<button type="default">备份助记词</button>
			</navigator>
			<navigator url="../transaction/market/market" hover-class="navigator-hover">
				<button type="default">交易市场</button>
			</navigator>
			<navigator url="../transaction/marketDetails/marketDetails" hover-class="navigator-hover">
				<button type="default">交易市场详情</button>
			</navigator>
			<navigator url="../transaction/order/order" hover-class="navigator-hover">
				<button type="default">订单记录</button>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false
			};
		},
		methods:{
			down(){
				this.show = !this.show;
			},
			getToken(){
				console.log(uni.getStorageSync('token'));
				// #ifdef APP-PLUS
				 plus.device.getInfo({
				 	success:function(e){
				 		console.log(e);
						uni.showToast({
							title:uni.getStorageSync('uuid',e.uuid)
						})
				 		// console.log('getDeviceInfo success: '+JSON.stringify(e));
				 	},
				 	fail:function(e){
				 		console.log(e)
				 		// console.log('getDeviceInfo failed: '+JSON.stringify(e));
				 	}
				 });
				// #endif
			}
		},
		mounted(){
			
		}
	}
</script>

<style lang="scss" scoped>
	.navRouter{
		@include size(280rpx,auto,white);
		position: fixed;
		left: 0;
		top: 30rpx;
		overflow: hidden;
		.nav-lists{
			max-height: 1050rpx;
			overflow: auto;
		}
		.down{
			@include size(100%,80rpx,none);
			@include font(36rpx,#000);
			@include cen();
		}
	}
	.navActive{
		height: 80rpx;
	}
</style>
