<template>
	<view>
		<tab-top left-icon='back' :title='languageInfo.updatePwd'></tab-top>
		<view class="contenBg">
			<view class="conFlex">
				<view class="editBox">
					<view class="iconCenter">
						<image class="addIcon" src="~@/static/me/center/icon.png"></image>
					</view>
					<view class="itemBox">
						<view class="listItems">
							<view class="colorTxt addressTxt listLabel">{{languageInfo.enterOldPwd}}<label class="items"></label><label class="items"></label></view>
							<view class="disFlex">
								<input type='password' class="colorTxt fz24 pl18" @blur='changeInp' :placeholder="languageInfo.placeEnterOldPwd" v-model="oldPwd" placeholder-class="phcolor" />
							</view>

						</view>
						<view class="listItems">
							<view class="tipBox">
								<view class="tipTxt" v-show="oldRule">{{languageInfo.oldPwdNull}}</view>
							</view>
							<view class="colorTxt addressTxt listLabel">{{languageInfo.enterNewPwd}}<label class="items"></label><label class="items"></label></view>
							<view class="disFlex">
								<input type='password' class="colorTxt fz24 pl18"  @blur='changeInp' :placeholder="languageInfo.placeEnterNewPwd" v-model="newPwd" placeholder-class="phcolor" />
							</view>

						</view>
						<view class="listItems">
							<view class="tipBox">
								<view class="tipTxt" v-show="newPwdRule">{{languageInfo.newPwdNull}}</view>
							</view>
							<view class="colorTxt addressTxt listLabel">{{languageInfo.confirmNewPwd}}<label class="items"></label><label class="items"></label></view>
							<view class="disFlex">
								<input type='password' class="colorTxt fz24 pl18"  @input='changeInp' :placeholder="languageInfo.placeConfirmNewPwd" v-model="confirPwd" placeholder-class="phcolor" />
							</view>
						</view>
						<view class="tipBox">
							<view class="tipTxt" v-show="newPwd!=''&&confirPwd!=''&&newPwd!=confirPwd">{{languageInfo.twoPwdAtypism}}</view>
							<view class="tipTxt" v-show="confirPwdRule">{{languageInfo.confirmPwdNull}}</view>
						</view>
						<view class="btnBox">
							<button class="preserBtn fz24" @tap="confirmUpdate">{{languageInfo.confirmChange}}</button>
						</view>
					</view>
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
				cmfirPwdRule:false,
				oldRule:false,
				newPwdRule:false,
				confirPwdRule:false,
				oldPwd: '',
				newPwd: '',
				confirPwd: '',
				languageInfo:{}
			}
		},
		components: {
			tabTop
		},
		onShow() {
			this.languageInfo = this.linkTo.showLanguage();
		},
		methods: {
			// 旧密码输入验证
			changeInp(){
				let _this = this
				let old = _this.oldPwd
				let newPwd = _this.newPwd
				let confirm = _this.confirPwd
				if(old != ''){
					_this.oldRule = false
				}if(newPwd != ''){
					_this.newPwdRule = false
				}if(confirm != ''){
					_this.confirPwdRule = false
				}else{
					return;
				}
			},
			// 确认修改
			confirmUpdate(){
				let _this = this
				let old = _this.oldPwd
				let newPwd = _this.newPwd
				let confirm = _this.confirPwd
				let data = {
					old_pwd:_this.oldPwd,
					pwd:_this.newPwd,
					confirm_pwd:_this.confirPwd
				}
				if(old == ''){
					_this.oldRule = true
				}if(newPwd == ''){
					_this.newPwdRule = true
				}if(confirm == ''){
					_this.confirPwdRule = true
				} else{
					_this.post('api/changePassword',data).then(res=>{
						if(res.data.code == 200){
							uni.showToast({
								title:'修改成功',
								icon:'success',
								duration: 1000,
							})
							setTimeout(()=>{
							uni.navigateBack()
							},600)
						}else{
							uni.showToast({
								title:res.data.message,
								icon:'none'
							})
						}
					}).catch(err=>{
						console.log(err)
					})
				}
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

	view {
		line-height: 1;
	}
	input{
		width: 100%;
	}
	.pl18 {
		padding-left: 18rpx;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.fz24 {
		font-size: 24rpx;
	}

	.phcolor {
		color: #748193;
	}

	.colorTxt {
		color: #2DE9B7;
	}

	.mt48 {
		margin-top: 40rpx;
	}

	.contenBg {
		position: relative;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		z-index: 9999;

		.conFlex {
			height: 928rpx;
			display: flex;
			justify-content: space-between;
			margin: 50rpx 50rpx;
			background: #1D2B49;
			padding: 50rpx 44rpx 0 44rpx;
			box-sizing: border-box;
			opacity: .8;
			border-radius: 10rpx;

			.editBox {
				width: 100%;
			}
		}
	}



	.itemBox {
		.listItems {
			height: 140rpx;
			border-bottom: 2rpx solid #8397B7;
			box-sizing: border-box;
		}

		.listItems:first-child {
			height: auto;
			padding-top: 44rpx;
			padding-bottom: 16rpx;
		}

		.tipTxt {
			color: #F42F2F;
			font-size: 16rpx;
			height: 48rpx;
			padding-top: 9rpx;
			// margin-bottom: 20rpx;
		}

		.tipBox {
			height: 48rpx;
			box-sizing: border-box;
		}

		.listLabel {
			display: flex;
			align-items: center;
			justify-content: flex-start;
		}

		.items {
			display: inline-block;
			width: 6rpx;
			height: 6rpx;
			border-radius: 50%;
			background: #2DE9B7;
			margin-left: 9rpx;
		}

		.items:nth-child(2) {
			background: #4F6BFF;
		}
	}

	.iconCenter {
		text-align: center;
	}

	.addressTxt {
		font-size: 26rpx;
	}

	.addIcon {
		width: 100rpx;
		height: 100rpx;
	}

	.successIcon {
		width: 30rpx;
		height: 30rpx;
	}

	.disFlex {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 20rpx 0 0;
	}

	button::after {
		border: none;
	}

	.btnBox {
		// padding-bottom: 59rpx;
	}

	.preserBtn {
		height: 67rpx;
		line-height: 67rpx;
		color: #fff;
		margin-top: 80rpx;
		border-radius: 6rpx;
		background: linear-gradient(left, #2A65BC, #079D74);
	}
</style>
