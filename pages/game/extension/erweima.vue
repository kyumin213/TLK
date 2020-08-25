<template>
	<view>
		<tabTop left-icon="back" :title="languageInfo.shareNow" />
		<view class="box">
			<view style="font-size: 34rpx;margin-bottom: 20rpx;">{{languageInfo.makeMoney}}</view>
			<view style="font-size: 28rpx;margin-bottom: 30rpx;">{{languageInfo.erweima}}：{{inviteCode}}</view>
			<image :src="qrCode" mode="widthFix"></image>
			<view class="hr"></view>
			<view style="font-size: 27rpx;">{{languageInfo.saomiao}}</view>
		</view>
		<view class="btn"><view @tap="btn">{{languageInfo.saveToAlbum}}</view></view>
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
				languageInfo: {},
				inviteCode:'',//邀请码
				qrCode:''//二维码
			};
		},
		onShow() {
			this.languageInfo = this.linkTo.showLanguage();
			this.myInviteCode()
			this.getQrCode()
		},
		methods:{
			// 我的邀请码
			myInviteCode(){
				let _this = this
				_this.get('api/myInviteCode').then(res=>{
					if(res.data.code == 200){
						_this.inviteCode = res.data.res.invite_code
					}
				})
			},
			// 二维码
			getQrCode(){
				let _this = this
				_this.get('api/expandShare').then(res=>{
					if(res.data.code == 200){
						_this.qrCode = (res.data.res.qrcode).replace(/[\r\n]/g,'')
					}
				})
			},
			btn(){
				  this.capture();
			},
			capture() {
			var pages = getCurrentPages();
			var page = pages[pages.length - 1];
			console.log(pages);
			var bitmap = null;
			var currentWebview = page.$getAppWebview();
			bitmap = new plus.nativeObj.Bitmap('amway_img');
			// 将webview内容绘制到Bitmap对象中
			currentWebview.draw(bitmap, function() {
			console.log('截屏绘制图片成功');
			bitmap.save("_doc/a.jpg", {}, function(i) {
			console.log('保存图片成功：' + JSON.stringify(i));
			uni.saveImageToPhotosAlbum({
			filePath: i.target,
			success: function() {
			bitmap.clear(); //销毁Bitmap图片
			uni.showToast({
			title: '保存图片成功',
			mask: false,
			duration: 1500
			});
			}
			});
			}, function(e) {
			console.log('保存图片失败：' + JSON.stringify(e));
			});
			}, function(e) {
			console.log('截屏绘制图片失败：' + JSON.stringify(e));
			});
			//currentWebview.append(amway_bit);
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
<style lang="scss" scope>
	.box{
		width: 90%;
		margin: 30rpx auto;
		background:rgba(30,44,74,0.8);
		border-radius:10rpx;
		text-align: center;
		box-sizing: border-box;
		padding: 50rpx 0;
		color: #2EEAB8;
		image{
			width: 200rpx;
			margin-bottom: 50rpx;
		}
		.hr{
			width: 80%;
			margin: 20rpx auto;
			background:rgba(132,152,184,1);
			height: 2rpx;
		}
	}
	.btn{
		position: absolute;
		bottom: 50rpx;
		width: 100%;
		text-align: center;
		view{
			width: 80%;
			margin: 0 auto;
			box-sizing: border-box;
			padding: 20rpx 0;
			font-size: 27rpx;
			color: white;
			background:linear-gradient(90deg,rgba(43,102,188,1),rgba(8,157,117,1));
			border-radius:6rpx;
		}
	}
</style>
