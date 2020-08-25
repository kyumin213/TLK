<script>
	export default {
	
		onLaunch: function() {
			// #ifdef APP-PLUS
			plus.screen.lockOrientation('portrait-primary');
			 plus.navigator.setFullscreen(true);
			 plus.device.getInfo({
			 	success:e=>{
			 		console.log(e);
					uni.setStorageSync('uuid',e.uuid);
			 	},
			 	fail:e=>{
			 		console.log(e);
			 	}
			 });
			// #endif
			console.log('App Launch');
			// uni.setStorageSync('token','bf87Es/1H1VW4pRivDlD7aVEDHEHUYhKOI8wV8NK6jM');
			uni.setStorageSync('languageType','zh-cn')
			uni.setStorageSync('lang','zh-cn')
			uni.setStorageSync('statusTip', '1')
			uni.reLaunch({
				url: '/pages/startPage/startPage',
				animationType: 'pop-in',
				animationDuration: 300
			});
			// let token = uni.getStorageSync('token')
			// if(!token){
			// 	uni.redirectTo({
			// 		url:'pages/index/guidePage/guidePage'
			// 	})
			// }else{
			// 	uni.switchTab({
			// 		url:'pages/index/index'
			// 	})
			// }
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onBackPress(options){
			console.log('dsadas');
			// this.back();
			return true;
		},
		
		globalData:{
			//最顶层
			idData:{},
			socketTaskType:null,
			socketTaskFnc:{},
			gameMsg:null,
			wsOpen:{},//打开
			wsReceive:{},//接收
			wsClose:{}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	// page{
	// 	background-image: url(~@/static/bg.png);
	// 	background-size: 100% 100%;
	// }
</style>
