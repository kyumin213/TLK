<template>
	<view class="content">
		<tabTop :title="languageInfo.tronTransfer" :open='false' />
		<view class="contenBg">
			<view class="conFlex">
				<view class="editBox">
					<view class="iconCenter">
						<image class="addIcon" src="~@/static/address/transfer.png"></image>
					</view>
					<view class="itemBox">
						<form>
							<view class="listItems">
								<view class="colorTxt addressTxt listLabel">{{languageInfo.selectCurrency}}<label class="items"></label><label
									 class="items"></label></view>
								<view class="disFlex">
									<picker @change="translate" :value="index" :range="currencyItem" mode="selector" style="width: 100%;">
										<input class="fz24 pl18 colorTxt inpWid" :placeholder='languageInfo.pleaseSelectCurrency' disabled v-model="currency"
										 placeholder-class='phcolor' />
									</picker>
								</view>
							</view>
							<view class="listItems">
								<view class="tipBox">
									<view class="tipTxt" v-show="currencyRule">{{languageInfo.currencyAccountNull}}</view>
								</view>
								<view class="colorTxt addressTxt listLabel">{{languageInfo.collectionWalletAddress}}<label class="items"></label><label
									 class="items"></label></view>
								<view class="disFlex addressList">
									<input type='text' class="colorTxt fz24 inpWid" @input="isNull" :placeholder="languageInfo.collectionWalletAddressPh"
									 v-model="address" placeholder-class="phcolor" />
									<view class="">
										<image class="icon1" src="~@/static/address/jilu_icon.png" @tap="goTo('../walletAddress/walletAddress')"></image>
										<image class="icon1 ml18" src="~@/static/address/saomiao_icon.png" @tap="getCode"></image>
									</view>
								</view>

							</view>
							<view class="listItems">
								<view class="tipBox">
									<view class="tipTxt" v-show="addressRule">{{languageInfo.walletAddressNull}}</view>
								</view>
								<view class="colorTxt addressTxt listLabel">{{languageInfo.PleaseFillInTheTransferAmount}}<label class="items"></label><label
									 class="items"></label></view>
								<view class="disFlex">
									<input type='number' class="colorTxt fz24 pl18 inpWid" :placeholder="languageInfo.inputTransferAmount" v-model="money"
									 @input="sumMoney" placeholder-class="phcolor" />
									<label class="allMoney" @tap="allBalance">{{languageInfo.allMoney}}</label>
								</view>

							</view>
							<view class="listItems">
								<view class="tipBox">
									<view class="tipTxt">
										<label class="colFFF" v-show="currency=='TLK'">{{languageInfo.availableBalance}} {{tlkBanlance}}</label>
										<label class="colFFF" v-show="currency=='TRX'">{{languageInfo.availableBalance}} {{trxBanlance}}</label>
										<label v-show="moneyRule&&money==''">{{languageInfo.transferAccountNull}}</label>
									</view>

								</view>
								<view class="colorTxt addressTxt listLabel">{{languageInfo.notes}}({{languageInfo.optional}})<label class="items"></label><label
									 class="items"></label></view>
								<view class="disFlex">
									<input type='text' class="colorTxt fz24 pl18 inpWid" :placeholder="languageInfo.optional" v-model='remarks'
									 placeholder-class="phcolor" />
								</view>

							</view>
							<view class="btnBox">
								<button class="preserBtn fz24 colFFF" @tap="nextSubmit">{{languageInfo.nextStep}}</button>
							</view>
						</form>
					</view>
				</view>
			</view>
			<!-- 密码框 -->
			<uni-popup ref="popup" type="center">
				<view class="box">
					<view class="close" @tap="closeModal"></view>
					<view class="title">{{languageInfo.pleaseInputPassword}}</view>
					<view class="input"><input type="password" value="" v-model="password" /></view>
					<view class="btn">
						<view class="yes" @tap="veriPassword">{{languageInfo.determine}}</view>
						<view class="cancel" @tap="closeModal">{{languageInfo.cancel}}</view>
					</view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	export default {
		components: {
			tabTop,
			uniPopup
		},
		data() {
			return {
				currencyItem: ['TLK', 'TRX'],
				currencyRule: false, //币种提示
				addressRule: false, //收货钱包地址提示
				moneyRule: false, //收货钱包地址提示
				currency: "", //币种
				address: '', //转账地址
				money: '', //转账金额
				remarks: '', //备注
				index: 0,
				tlkBanlance: '', //tlk余额
				trxBanlance: '', //trx余额
				currency_id: '', //币种id 1为TLK 3为TRX
				modalShow: false, //密码框
				password: '', //密码
				languageInfo: {}
			}
		},
		onShow() {
			this.initBalance()
			this.languageInfo = this.linkTo.showLanguage();
			let address = uni.getStorageSync('address')
			if (address) {
				this.address = address
			}
		},
		methods: {
			// 跳转
			goTo(url) {
				this.linkTo.navTo(url);
			},
			// 扫码
			getCode() {
				let _this = this
				uni.scanCode({
					success: function(res) {
						_this.address = res.result
					}
				});
			},
			// 非空验证
			isNull() {
				let _this = this
				let address = _this.address
				let money = _this.money
				if (address != '') {
					_this.addressRule = false
				}
				if (money != '') {
					_this.moneyRule = false
				}
			},
			// 密码验证
			veriPassword() {
				let _this = this
				let dataPwd = {
					pwd: _this.password
				}
				let data = {
					currency_id: _this.currency_id,
					num: _this.money,
					to_address: _this.address,
					note: _this.remarks
				}
				_this.post('api/verifyPassword', dataPwd).then(res => {
					if (res.data.code == 200) {
						_this.post('api/propertyTransfer', data).then(b => {
							if (b.data.code == 200) {
								uni.showToast({
									icon: 'success',
									duration: 1000
								});
								this.$refs.popup.close();
								setTimeout(() => {
									uni.switchTab({
										url: '../index'
									})
								}, 1000)
							} else {
								uni.showToast({
									title: b.data.message,
									icon: 'none'
								})
								_this.modalShow = false
							}
						})
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
					}
				})
			},
			// 关闭密码框
			closeModal() {
				let _this = this
				// _this.modalShow = false
				this.$refs.popup.close();
			},
			// 初始化tlk、trx余额
			initBalance() {
				let _this = this
				let tlk = uni.getStorageSync('tlk')
				let trx = uni.getStorageSync('trx')
				_this.tlkBanlance = tlk.replace(/\"/g, "")
				_this.trxBanlance = trx.replace(/\"/g, "")
			},
			// 选择币种
			translate: function(e) {
				let _this = this
				_this.index = e.detail.value
				let index = e.detail.value
				_this.currency = _this.currencyItem[index]
				_this.money = ''
				if (_this.currency === 'TLK') {
					_this.currency_id = 1
				}
				if (_this.currency === 'TRX') {
					_this.currency_id = 3
				}
				if (_this.currency != '') {
					_this.currencyRule = false
				}
				// model.animationEvents(this, 0, true, 400);
			},
			// 验证金额是否大于余额
			sumMoney(e) {
				let _this = this
				let mon = e.detail.value
				let types = _this.currency
				let tlk = _this.tlkBanlance
				let trx = _this.trxBanlance
				if (types === 'TLK' && parseFloat(mon) > parseFloat(tlk)) {
					_this.money = tlk
					_this.moneyRule = false
				} else if (types === 'TRX' && parseFloat(mon) > parseFloat(trx)) {
					_this.money = trx
					_this.moneyRule = false
				} else if (mon != '') {
					_this.moneyRule = false
				} else {
					_this.moneyRule = true
				}
			},
			// 下一步
			nextSubmit() {
				let _this = this
				let address = _this.address
				let moneyTrans = _this.money
				let curr = _this.currency
				if (curr == '') {
					_this.currencyRule = true
				}
				if (moneyTrans == '') {
					_this.moneyRule = true
				}
				if (address == '') {
					_this.addressRule = true
				} else {
					_this.moneyRule = false
					// _this.modalShow = true
					this.$refs.popup.open()
				}
			},
			// 点击全部
			allBalance() {
				let _this = this
				let types = _this.currency
				if (types === 'TLK') {
					_this.money = _this.tlkBanlance
				} else if (types === 'TRX') {
					_this.money = _this.trxBanlance
				}
			},
			// 钱包地址选择
			walletAddress() {
				uni.navigateTo({
					url: '../walletAddress/walletAddress'
				});
			}
		}
	}
</script>
<style>
	page {
		background-image: url(../../../static/bg.png);
		background-size: 100% 100%;
	}
</style>
<style lang="scss" scoped>
	view {
		line-height: 1;
	}

	.pl18 {
		padding-left: 18rpx;
		width: 70%;
	}

	.ml18 {
		margin-left: 18rpx;
	}

	.box {
		width: 650rpx;
		background: #075F4D;
		border-radius: 15rpx;
		box-sizing: border-box;
		padding: 50rpx 30rpx;

		.close {
			display: inline-block;
			width: 30rpx;
			height: 2rpx;
			background: #fff;
			transform: rotate(45deg);
			position: absolute;
			top: 30rpx;
			right: 20rpx;
		}

		.close::after {
			content: '';
			width: 30rpx;
			height: 2rpx;
			background: #fff;
			transform: rotate(90deg);
			position: absolute;
		}

		.title {
			text-align: center;
			color: white;
			font-size: 32rpx;
			margin-bottom: 30rpx;
		}

		.input {
			width: 90%;
			margin: 30rpx auto;
			background: rgba(18, 25, 42, 0.5);
			border: 1px solid rgba(45, 234, 183, 1);
			border-radius: 8rpx;
			text-indent: 10rpx;
			box-sizing: border-box;
			padding: 8rpx 0;
			text-align: center;
			color: #fff;
		}

		.btn {
			width: 80%;
			margin: 0 auto;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;

			view {
				background: rgba(18, 25, 42, 0.5);
				border: 1px solid rgba(45, 234, 183, 1);
				border-radius: 4px;
				box-sizing: border-box;
				color: white;
				font-size: 27rpx;
				padding: 15rpx 70rpx;
			}
		}
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

	.colFFF {
		color: #fff;
	}

	.mt48 {
		margin-top: 40rpx;
	}

	.contenBg {
		// position: fixed;
		width: 100%;
		height: calc(100vh - 44px);
		background: rgba(0, 0, 0, .4);

		// z-index: 10;
		.conFlex {
			display: flex;
			justify-content: space-between;
			margin: 80rpx 50rpx;
			background: #1D2B49;
			padding: 0 44rpx;
			box-sizing: border-box;
			opacity: .8;
			border-radius: 10rpx;
		}
	}

	.editBox {
		width: 100%;
	}

	.itemBox {
		// padding: 0 44rpx;

		.listItems {
			height: 142rpx;
			border-bottom: 2rpx solid #8397B7;
			box-sizing: border-box;

			.disFlex {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 20rpx 0 0;

				.icon1 {
					width: 46rpx;
					height: 46rpx;
				}

				.inpWid {
					width: 70%;
				}
			}

			.addressList {
				padding-top: 8rpx;
			}

		}

		.listItems:first-child {
			height: auto;
			padding-top: 44rpx;
			padding-bottom: 16rpx;
		}

		.tipTxt {
			display: inline-block;
			color: #F42F2F;
			font-size: 24rpx;
			height: 48rpx;
			padding-top: 9rpx;
		}

		.colFFF {
			color: #fff;
		}

		.tipBox {
			height: 46rpx;
			// margin-bottom: 10rpx;
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

		picker {
			position: relative;
		}

		picker::after {
			content: '';
			width: 0;
			height: 0;
			border-left: 5px solid transparent;
			border-right: 5px solid transparent;
			border-top: 6px solid #2DE9B7;
			position: absolute;
			right: 10rpx;
			bottom: 8rpx;
		}
	}

	.allMoney {
		font-size: 22rpx;
		color: #fff;
	}

	.iconCenter {
		text-align: center;
		margin: 50rpx 0 0 0;
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



	button::after {
		border: none;
	}

	.serviceChargeBox {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 60rpx;
		border: 2rpx solid #2DEAB7;
		font-size: 20rpx;
		padding: 0 18rpx;
		border-radius: 4rpx;
		margin-top: 48rpx;
	}

	.preserBtn {
		height: 67rpx;
		line-height: 67rpx;
		margin: 60rpx auto 80rpx auto;
		border-radius: 6rpx;
		background: linear-gradient(left, #2A65BC, #079D74);
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
</style>
