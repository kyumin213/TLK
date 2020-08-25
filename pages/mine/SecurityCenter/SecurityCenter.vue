<template>
	<view>
		<tabTop left-icon="back" :title="languageInfo.securitySetting" />
		<view class="contentBox">
			<image class="headBg" src="~@/static/me/center/headBg.png"></image>
			<image class="userHead" v-if="headImg==''" @tap="upload" :src="suprizeImg"></image>
			<image class="userHead" v-else @tap="upload" :src="headImg"></image>
			<view class="fz24 userName">
				<label class="nameTxt">{{userName}}</label>
			</view>
			<view class="listBox">
				<view class="itemList" @tap="exportWord">
					<view class="listLeft">
						<image class="itemListIcon" src="~@/static/me/center/zhujici.png"></image>
						<label class="fz24">{{languageInfo.exportWordMe}}</label>
					</view>
					<view class="nextIcon"></view>
				</view>
				<view class="itemList" @tap="exportPrivateKey">
					<view class="listLeft">
						<image class="itemListIcon" src="~@/static/me/center/siyao.png"></image>
						<label class="fz24">{{languageInfo.exportPrivateKeyMe}}</label>
					</view>
					<view class="nextIcon"></view>
				</view>
				<view class="itemList" @tap="goTo('changePwd/changePwd')">
					<view class="listLeft">
						<image class="itemListIcon" src="~@/static/me/center/xiugai.png"></image>
						<label class="fz24">{{languageInfo.updatePwd}}</label>
					</view>
					<view class="nextIcon"></view>
				</view>
			</view>

		</view>
		<!-- 密码框 -->
		<view class="pwdModal" v-if="modalShow">
			<label class="close" @tap="closeModal"></label>
			<view class="pwdCon">
				<view class="pwdTxt">{{languageInfo.pleaseInputPassword}}</view>
				<view>
					<input type="password" v-model="pwd" class="pwdInp">
				</view>
				<view class="pwdBtnBox">
					<button class="pwdBtn" @tap="pwdSubmit">{{languageInfo.confirmPwd}}</button>
					<button class="pwdBtn" @tap="closeModal">{{languageInfo.cancelPwd}}</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue'
	export default {
		data() {
			return {
				userName: '',
				modalShow: false, //密码框
				userShow: true, //编辑昵称
				modalType: 1, //1、导出助记词,2、导出私钥
				pwd: '', //密码
				languageInfo:{},
				suprizeImg: '',
				headImg:''
			}
		},
		components: {
			tabTop
		},
		onLoad(option){
			this.randerPic()
			this.headImg = uni.getStorageSync('headImg')
			this.userName = option.names
		},
		onShow() {
			this.languageInfo = this.linkTo.showLanguage();
		},
		methods: {
			// 默认图片
			randerPic() {
				this.tagHash = {
					"1": {
						headUrl: '../../../static/me/personal/head1.png'
					},
					"2": {
						headUrl: '../../../static/me/personal/head2.png'
					},
					"3": {
						headUrl: '../../../static/me/personal/head3.png'
					},
					"4": {
						headUrl: '../../../static/me/personal/head4.png'
					},
					"5": {
						headUrl: '../../../static/me/personal/head5.png'
					}
				};
				let randomKeys = ["1", "2", "3", "4"];
				let index = Math.floor(Math.random() * 4);
				this.suprizeImg = this.tagHash[randomKeys[index]].headUrl;
			},
			// 跳转
			goTo(url) {
				this.linkTo.navTo(url);
			},
			
			// 上传头像图片
			upload: function() {
				let _this = this
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ["album"], //从相册选择
					success: function(res) {
						const tempFilePaths = res.tempFilePaths[0];
						let token = uni.getStorageSync("token");
						let languageType = uni.getStorageSync('languageType')
						if (token) {
							const uploadTask = uni.uploadFile({
								url: 'http://8.129.172.166:8098/api/uploadPicture',
								filePath: tempFilePaths,
								name: 'image',
								header: {
									token: token,
									lang: languageType
								},
								success: function(uploadFileRes) {
									let result = JSON.parse(uploadFileRes.data);
									_this.headImg = result.res.image
									uni.showToast({
										icon:'success'
									})	
								}
							});
						}
					},
					error: function(e) {
						console.log(e);
					}
				});
			},
			// 导出助记词
			exportWord() {
				let _this = this
				_this.modalShow = true
				_this.modalType = 1
			},
			// 导出助记词跳转
			pwdSubmit() {
				let _this = this
				let type = _this.modalType
				let data = {
					pwd: _this.pwd
				}
				_this.post('api/verifyPassword', data).then(res => {
					if (res.data.code == 200) {
						if (type == 1) {
							uni.navigateTo({
								url: './exportWord/exportWord'
							})
							_this.modalShow = false
							_this.pwd = ''
						} else if (type == 2) {
							uni.navigateTo({
								url: './exportPrivateKey/exportPrivateKey'
							})
							_this.modalShow = false
							_this.pwd = ''
						}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
					}
				}).catch(err => {
					console.log(err)
				})

			},
			// 导出私钥
			exportPrivateKey() {
				let _this = this
				_this.modalShow = true
				_this.modalType = 2
			},
			// 修改密码
			changePwd() {
				uni.navigateTo({
					url: 'changePwd/changePwd'
				})
			},
			// 关闭密码框
			closeModal() {
				let _this = this
				_this.modalShow = false
			},
			// 完成修改昵称
			editCancel() {
				let _this = this
				_this.userShow = true
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

	$colTxt:#2DEAB7;

	.fz24 {
		font-size: 24rpx;
	}

	.contentBox {
		position: relative;
		top: 0;
		left: 0;
		right: 0;
		box-sizing: border-box;

		.headBg {
			width: 176rpx;
			height: 176rpx;
			position: absolute;
			left: 50%;
			top: 40rpx;
			transform: translateX(-50%);
		}

		.userHead {
			position: absolute;
			left: 50%;
			top: 52rpx;
			transform: translateX(-50%);
			width: 150rpx;
			height: 150rpx;
			border-radius: 50%;
			background: #fff;
		}

		.userName {
			width: 240rpx;
			text-align: center;
			color: $colTxt;
			position: absolute;
			top: 248rpx;
			left: 50%;
			transform: translate(-50%);
		}

		.nameTxt {
			display: inline-block;
			height: 50rpx;
			line-height: 50rpx;
			font-size: 26rpx;
			text-shadow: 0 0 0.2em #0f192a,
				-0 -0 0.2em #0f192a;
		}

		.editNameInp {
			border: 2rpx solid #5F6C81;
			height: 50rpx;
			line-height: 50rpx;
		}

		.listBox {
			position: absolute;
			top: 346rpx;
			left: 0;
			right: 0;

			.itemList {
				width: 100%;
				height: 80rpx;
				background: #1E2B49;
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: $colTxt;
				padding: 0 62rpx;
				border-bottom: 2rpx solid #42537A;
				box-sizing: border-box;
				opacity: .8;
				.listLeft {
					display: flex;
					justify-content: flex-start;
					align-items: center;
				}

				.itemListIcon {
					width: 34rpx;
					height: 30rpx;
					margin-right: 18rpx;
				}
				.nextIcon{
					width: 16rpx;
					height:16rpx;
					border-top: 4rpx solid $colTxt;
					border-right: 4rpx solid $colTxt;
					transform: rotate(45deg);
				}
			}
		}
	}

	.pwdModal {
		position: absolute;
		top: 350rpx;
		left: 94rpx;
		right: 94rpx;
		background: #075F4D;
		height: 350rpx;
		box-sizing: border-box;
		border-radius: 14rpx;
		z-index: 99;
		animation: modal ease-in-out .3s;

		.close {
			display: inline-block;
			width: 20rpx;
			height: 2rpx;
			background: #fff;
			transform: rotate(45deg);
			position: absolute;
			top: 30rpx;
			right: 20rpx;
		}

		.close::after {
			content: '';
			width: 20rpx;
			height: 2rpx;
			background: #fff;
			transform: rotate(90deg);
			position: absolute;
		}

		.pwdCon {
			position: absolute;
			top: 60rpx;
			width: 100%;
			text-align: center;

			.pwdTxt {
				font-size: 30rpx;
				color: #fff;
			}

			.pwdInp {
				margin: 50rpx 30rpx 20rpx 30rpx;
				box-sizing: border-box;
				height: 66rpx;
				line-height: 166rpx;
				border: 2rpx solid #2DEAB7;
				border-radius: 4rpx;
				background: #0D3C3B;
				color: #fff;
			}

			.pwdBtnBox {
				display: flex;
				justify-content: space-between;
				margin: 0 30rpx;

				.pwdBtn {
					font-size: 24rpx;
					color: #fff;
					width: 200rpx;
					height: 66rpx;
					line-height: 66rpx;
					background: #0D3C3B;
					border: 2rpx solid #2DEAB7;
					border-radius: 4rpx;
				}
			}
		}
	}

	@keyframes modal {
		from {
			opacity: 0;
		}

		to {
			// width:100%;
			opacity: 1;
		}
	}
</style>
