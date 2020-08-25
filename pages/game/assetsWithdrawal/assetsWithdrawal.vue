<template>
	<view class="content">
		<tabTop left-icon="back" :title="languageInfo.withdrawalOfAssets" />

		<view class="contenBg">
			<view class="conFlex">
				<view class="editBox">
					<view class="iconCenter">
						<image class="addIcon" src="../../../static/game/icon.png"></image>
					</view>
					<view class="itemBox">
						<form action="">
							<view class="listItems">
								<view class="colorTxt addressTxt listLabel">{{languageInfo.selectCurrency}} <label class="items"></label><label
									 class="items"></label></view>

								<view class="disFlex">
									<picker mode="selector" @change="translate" :value="index" :range="currencyItem" :range-key="'currency_name'">
										<input class="fz24 pl18 type" disabled v-model="type" :placeholder='languageInfo.pleaseSelectCurrency'
										 placeholder-class='phcolor' />
									</picker>
									<!-- <label class="selectIcon"></label> -->
								</view>
							</view>
							<view class="listItems">
								<view class="tipBox">
									<!-- <view class="tipTxt">钱包地址为必填项</view> -->
								</view>
								<view class="colorTxt addressTxt listLabel">{{languageInfo.withdrawalAmount}}<label class="items"></label><label
									 class="items"></label></view>
								<view class="disFlex">
									<input type='number' @input="isAllAmount" v-model="num" class="colorTxt fz24 pl18" :placeholder="languageInfo.PleaseWithdrawalAmount"
									 placeholder-class="phcolor" />
									<!-- <image class="successIcon" src="../../../static/right_icon.png"></image> -->
									<label class="allMoney" @tap="allMoney">{{languageInfo.whole}}</label>
								</view>

							</view>
							<view class="listItems">
								<view class="tipBox">
									<!-- <view class="tipTxt">转账金额为必填项</view> -->
								</view>
								<view class="colorTxt addressTxt listLabel">{{languageInfo.notes}}({{languageInfo.optional}})<label class="items"></label><label
									 class="items"></label></view>
								<view class="disFlex">
									<input type='text' v-model="inp" class="colorTxt fz24 pl18" :placeholder="languageInfo.optional"
									 placeholder-class="phcolor" />
									<!-- <image class="successIcon" src="../../../static/right_icon.png"></image> -->
								</view>
							</view>
							<view class="listItems" style="margin-bottom: 20rpx;height: auto;border: none;">
								<view class="tipBox">
									<!-- <view class="tipTxt">转账金额为必填项</view> -->
								</view>
								<view style="display: flex;justify-content: space-between;align-items: center;" v-show="moneyIf">
									<view class="colorTxt addressTxt listLabel">{{languageInfo.available}}TRX<label class="items"></label><label
										 class="items"></label></view>
									<view style="font-size: 24rpx;color: #2DEAB7;">{{languageInfo.currentExchangeRate}} 1{{currency_name}} = {{boc}}
										TRX</view>
								</view>
								<!-- <view class="disFlex">
									<input type='text' class="colorTxt fz24 pl18" placeholder="选填" placeholder-class="phcolor" />
								</view> -->
							</view>
							<view style="font-size: 24rpx;color: white;margin-bottom: 30rpx;">{{languageInfo.gameAssetBalance}} {{money}}
								{{currency_name}}</view>
							<view class="feiyong">
								<view style="color: #2DEAB7;"><text>{{languageInfo.minersExpenses}}</text></view>
								<!-- <view style="color: white;"><text>1 {{currency_name}}</text></view> -->
								<view>
									<text v-for="(item,index) in serviceData" :key="index">
										<text style="color: white;" v-if="type == item.currency_name">{{item.ti_fee}}</text>
										<text style="color: white;" v-if="type == item.currency_name">{{item.currency_name}}</text>
									</text>
								</view>
							</view>
							<view class="btnBox">
								<button class="preserBtn fz24" @tap="next">{{languageInfo.nextStep}}</button>
							</view>
						</form>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="box">
				<view class="close" @tap="cancel">x</view>
				<view class="title">{{languageInfo.pleaseInputPassword}}</view>
				<view class="input"><input type="password" value="" v-model="pwd" /></view>
				<view class="btn">
					<view class="yes" @tap="btn">{{languageInfo.determine}}</view>
					<view class="cancel" @tap="cancel">{{languageInfo.cancel}}</view>
				</view>
			</view>
		</uni-popup>
		<view class="noYetTip" v-show="msgModal">
			{{msg}}
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
				msgModal:false, //自定义提示
				msg:'',
				currencyItem: [{
					currency_id: '请选择'
				}],
				currency: 0,
				index: '0',
				type: '',
				pwd: '',
				boc: '',
				num: '',
				inp: '',
				money: '',
				currency_name: '',
				moneyIf: false,
				languageInfo: {},
				serviceData:[] //矿工费
			}
		},
		mounted() {
			this.type = this.currencyItem[0].currency_id;
			this.getWithdraw(); //币分类
		},
		onShow() {
			this.languageInfo = this.linkTo.showLanguage();
			// this.currencyItem[0].currency_id = this.languageInfo.pleaseSelectCurrency;
		},
		methods: {
			// 验证金额是否大于余额
			isAllAmount(e) {
				let _this = this
				let mon = e.detail.value
				let types = _this.currency_name
				let tlk = _this.tlkBanlance
				let trx = _this.trxBanlance
				let money = _this.money
				console.log(_this.money)
				if (types === 'TLK' && parseFloat(mon) > parseFloat(money)) {
					_this.num = parseFloat(money)
				} else if (types === 'CUB' && parseFloat(mon) > parseFloat(money)) {
					_this.num = parseFloat(money)
				}
			},
			// 选择币种
			translate: function(e) {
				if (this.currencyItem[e.detail.value].currency_id === '1') {
					this.moneyIf = false
				} else {
					this.moneyIf = true
				}
				this.currency = e.detail.value;
				this.type = this.currencyItem[e.detail.value].currency_name;
				this.money = this.currencyItem[this.currency].num * 1;
				this.currency_name = this.currencyItem[this.currency].currency_name;
			},
			allMoney() {
				let _this = this
				if (_this.currency === '') {
					_this.msg = _this.languageInfo.pleaseSelectCurrency
					_this.msgModal = true
					setTimeout(()=>{
						_this.msgModal = false
					},2000)
					return
				}
				_this.num = _this.currencyItem[_this.currency].num * 1;
			},
			next() {
				let _this = this
				let ids = _this.currencyItem[_this.currency].currency_id
				console.log(ids)
				let data = {
					currency_id: _this.currencyItem[_this.currency].currency_id,
					num: _this.num,
					remake: _this.inp
				}
				if (!_this.type || !_this.num) {
					_this.msg = _this.languageInfo.informationempty
					_this.msgModal = true
					setTimeout(()=>{
						_this.msgModal = false
					},2000)
					// this.linkTo.$noToast('信息不能为空');
					return
				}
				this.$refs.popup.open();
				// this.post('api/doWithdraw',data).then((res)=>{
				// 	console.log(res)
				// })
			},
			btn() {
				let data = {
					pwd: this.pwd
				};
				let obj = {
					currency_id: this.currencyItem[this.currency].currency_id,
					num: this.num,
					remake: this.inp
				}
				this.post('api/verifyPassword', data).then((res) => {
					if (res.data.code == 200) {
						this.post('api/doWithdraw', obj).then((d) => {
							if (d.data.code == 200) {
								uni.showToast({
									icon: 'success'
								})
								setTimeout(() => {
									uni.switchTab({
										url: '../game'
									})
								}, 1000)
							}
						})
					}
				})
			},
			cancel() {
				this.$refs.popup.close();
			},
			getWithdraw() {
				this.get('api/withdraw', {}).then((res) => {
					console.log(res);
					this.currencyItem = res.data.res.currency_info;
					this.serviceData = res.data.res.servicecharge
					this.boc = (1/(res.data.res.boc)).toFixed(2);
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
	// 自定义提示
	.noYetTip {
		padding: 12rpx 20rpx;
		background: rgba(0, 0, 0, .5);
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		color: #fff;
		font-size: 26rpx;
		border-radius: 8rpx;
	}
	.box {
		width: 650rpx;
		background: #075F4D;
		border-radius: 15rpx;
		box-sizing: border-box;
		padding: 30rpx;

		.close {
			text-align: right;
			color: white;
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
			color: #fff;
			text-align: center;
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

	.feiyong {
		width: 100%;
		margin: 0 auto;
		border: 1px solid #2DEAB7;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;
		box-sizing: border-box;
		padding: 15rpx 10rpx;
	}

	view {
		line-height: 1;
	}

	picker {
		position: relative;
		width: 100%;
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

	.pl18 {
		padding-left: 18rpx;
		width: 70%;
	}

	.ml18 {
		margin-left: 18rpx;
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

	.type {
		color: #748194;
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
		width: 100%;
		.conFlex {
			display: flex;
			justify-content: space-between;
			margin: 50rpx 50rpx;
			background: #1D2B49;
			padding: 0 44rpx 50rpx 44rpx;
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
			color: #F42F2F;
			font-size: 16rpx;
			height: 48rpx;
			padding-top: 9rpx;
			// margin-bottom: 20rpx;
		}

		.tipBox {
			height: 46rpx;
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

		.selectIcon {
			width: 0;
			height: 0;
			border-left: 5px solid transparent;
			border-right: 5px solid transparent;
			border-top: 6px solid #2DE9B7;
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

	.preserBtn {
		height: 67rpx;
		line-height: 67rpx;
		color: #fff;
		margin-top: 80rpx;
		border-radius: 6rpx;
		background: linear-gradient(left, #2A65BC, #079D74);
		background: -ms-linear-gradient(left, #2A65BC, #079D74);
		background: -webkit-linear-gradient(left, #2A65BC, #079D74);
		background: -moz-linear-gradient(left, #2A65BC, #079D74);
	}
</style>
