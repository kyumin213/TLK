<template>
	<view>
		<tabTop left-icon="back" :title="languageInfo.exportWordMe" />
		<view class="contentBox">
			<view class="tips">{{languageInfo.pleasetakeGoodKey}}</view>
			<view class="wordItem">
				<view class="items" v-for="(item,index) in wordData" :key='index'>
					<label class="itemTxt">{{item.word}}</label>
				</view>
			</view>
			<view>
				<button class="saveTo" @tap="capture">{{languageInfo.saveToAlbumKey}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue'
	export default {
		data() {
			return {
				wordData: [],
				test: '',
				languageInfo: {}
			}
		},
		components: {
			tabTop
		},
		onLoad() {
			this.exportWord()
		},
		onShow() {
			this.languageInfo = this.linkTo.showLanguage();
		},
		methods: {
			// 全部助记词
			exportWord() {
				let _this = this
				_this.get('api/exportWord').then(res => {
					if (res.data.code == 200) {
						_this.wordData = res.data.res
					}
				})
			},
			// 保存至相册
			capture() {
				console.log(222)
				var pages = getCurrentPages();
				var page = pages[pages.length - 1];
				var bitmap = null;
				var currentWebview = page.$getAppWebview();
				bitmap = new plus.nativeObj.Bitmap('amway_img');
				// 将webview内容绘制到Bitmap对象中  
				currentWebview.draw(bitmap, function() {
					bitmap.save("_doc/a.jpg", {}, function(i) {
						uni.saveImageToPhotosAlbum({
							filePath: i.target,
							success: function() {
								bitmap.clear(); //销毁Bitmap图片  
								uni.showToast({
									icon:'success',
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
<style lang="scss" scoped>

	.contentBox {

		// position: relative;
		// top: 0;
		// left: 0;
		.tips {
			font-size: 30rpx;
			color: #fff;
			margin: 50rpx 54rpx 54rpx 64rpx;
			font-family: 'PingFang-SC-Regular';
			box-sizing: border-box;
		}

		.wordItem {
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			margin: 0 30rpx;
			box-sizing: border-box;
		}

		.items {
			width: 33.3%;
			text-align: center;
			margin-bottom: 28rpx;
			box-sizing: border-box;

			.itemTxt {
				display: inline-block;
				height: 50rpx;
				line-height: 50rpx;
				padding: 0 30rpx;
				border: 2rpx solid #2DEAB7;
				border-radius: 240rpx;
				color: #fff;
				font-size: 24rpx;
			}
		}

		.saveTo {
			position: fixed;
			left: 124rpx;
			right: 124rpx;
			bottom: 82rpx;
			height: 66rpx;
			line-height: 66rpx;
			font-size: 24rpx;
			color: #fff;
			border-radius: 4rpx;
			background: linear-gradient(left, #2B66BC, #079D75);
		}
	}
</style>
