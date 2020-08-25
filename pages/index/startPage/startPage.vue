<template>
	<view>
		<image class="startImg" src="~@/static/start.gif"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			//APP端
			if (uni.getStorageSync('token')) { // 有token直接进入首页
				setTimeout(function() {
					uni.switchTab({
						url: '../index',
						animationType: 'pop-in',
						animationDuration: 300
					});
				}, 6000)
			} else {
				// 没有token进入登录页，
				// uni.reLaunch：关闭所有页面，打开到应用内的某个页面。
				// 在APP端，如果不使用这个API跳转，安卓点击物理返回时会回到启动页，影响用户使用。
				// 当有退出登录按钮时，也应该使用uni.reLaunch去跳转，这样安卓物理按键返回时就会正常提示再按一次退出登录。
				setTimeout(function() {
					uni.reLaunch({
						url: '../guidePage/guidePage',
						animationType: 'pop-in',
						animationDuration: 300
					});
				}, 6000)
			}
		},
		methods: {

		}
	}
</script>
<style scoped>
	uni-page-head {
		display: none;
	}

	.startImg {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100vh;

	}
</style>
