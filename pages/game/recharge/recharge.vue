<template>
	<view class="content">
		<tabTop left-icon="back" :title="languageInfo.recharge" />

		<view class="contenBg">
			<view class="conFlex">
				<view class="editBox">
					<view class="iconCenter">
						<image class="addIcon" src="../../../static/game/icon.png"></image>
					</view>
					<view class="itemBox">
						<form action="">
							<view class="listItems">
								<view class="colorTxt addressTxt listLabel">{{languageInfo.selectCurrency}} <label class="items"></label><label class="items"></label></view>

								<view class="disFlex">
									<picker  mode="selector" @change="translate" :value="index" :range="currencyItem" :range-key="'currency_name'">
										<input class="fz24 pl18 type" v-model="type" disabled :placeholder='languageInfo.pleaseSelectCurrency' placeholder-class='phcolor' />
									</picker>
								</view>
							</view>
							<view class="listItems">
								<view class="tipBox">
									<!-- <view class="tipTxt">{{languageInfo.currencyAccountNull}}</view> -->
								</view>
								<view class="colorTxt addressTxt listLabel">{{languageInfo.rechargeAmount}}<label class="items"></label><label class="items"></label></view>
								<view class="disFlex">
									<input type='number' @input="isAllAmount" v-model="num" class="colorTxt fz24 pl18" :placeholder="languageInfo.placeRechargeAmount" placeholder-class="phcolor" />
									<!-- <image class="successIcon" src="../../../static/right_icon.png"></image> -->
									<label class="allMoney" @tap="allMoney">{{languageInfo.whole}}</label>
								</view>

							</view>
							<view class="listItems">
								<view class="tipBox">
									<!-- <view class="tipTxt" v-show="moneyRule">充值金额不能大于余额</view> -->
								</view>
								<view class="colorTxt addressTxt listLabel">{{languageInfo.notes}}({{languageInfo.optional}})<label class="items"></label><label class="items"></label></view>
								<view class="disFlex">
									<input type='text' v-model="inp" class="colorTxt fz24 pl18" :placeholder="languageInfo.optional" placeholder-class="phcolor" />
									<!-- <image class="successIcon" src="../../../static/right_icon.png"></image> -->
								</view>
							</view>
							<view class="listItems" style="margin-bottom: 20rpx;height: auto;border: none;">
								<view class="tipBox">
								</view>
								<view style="display: flex;justify-content: space-between;align-items: center;" v-show="moneyIf">
									<view class="colorTxt addressTxt listLabel">{{languageInfo.available}}CUB<label class="items"></label><label class="items"></label></view>
								   <view style="font-size: 24rpx;color: #2DEAB7;">{{languageInfo.currentExchangeRate}} 1{{currency_name}} = {{boc}} CUB</view>
								</view>
							</view>
							<view style="font-size: 24rpx;color: white;margin-bottom: 30rpx;">{{languageInfo.gameAssetBalance}} {{money}} {{currency_name}}</view>
					<!-- 		<view class="feiyong">
								<view style="color: #2DEAB7;"><text>{{languageInfo.minersExpenses}}</text></view>
								<view style="color: white;"><text>1 JDT ≈ 1 ￥</text></view>
							</view> -->
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
				<view class="close" @tap="cancel"></view>
				<view class="title">{{languageInfo.pleaseInputPassword}}</view>
				<view class="input"><input type="password" value="" v-model="pwd" /></view>
				<view class="btn">
					<view class="yes" @tap="btn">{{languageInfo.determine}}</view>
					<view class="cancel" @tap="cancel">{{languageInfo.cancel}}</view>
				</view>
			</view>
		</uni-popup>
		<!-- 提示弹窗 -->
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
				msgModal:false, //提示弹窗
				msg:'',
				currencyItem: [],
				currency: null,
				index:'0',
				type:'',
				pwd:'',
				boc:'',
				num:'',
				inp:'',
				money:'',
				currency_name:'',
				moneyIf:false,
				languageInfo:{}
			}
		},
		onBackPress(options){
			console.log(options)
			if(options.from === 'backbutton'){
				//安卓物理返回
				uni.navigateBack({
					delta:this.$store.state.backnum,
				});
				this.$store.commit('SET_BACKNUM',1);
				return true
			}else{
				return false
			}
			
		},
		onShow() {
			// plus.screen.lockOrientation('portrait-primary');
			this.languageInfo = this.linkTo.showLanguage();
			// this.currencyItem[0].currency_id = this.languageInfo.pleaseSelectCurrency;
			this.getWithdraw();//币分类
			// // #ifdef APP-PLUS
			// plus.screen.lockOrientation('portrait-primary');
			// // #endif
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
					_this.num = parseFloat(money)-0.1
				} else if (types === 'TRX' && parseFloat(mon) > parseFloat(money)) {
					_this.num = parseFloat(money)-0.1
				}
			},
			// 选择币种
			translate: function(e) {
				console.log(this.currencyItem[e.detail.value].currency_id)
				if(this.currencyItem[e.detail.value].currency_id ==1){
					this.moneyIf = false
				}else{
					this.moneyIf = true
				}
				this.currency = e.detail.value;
				this.type = this.currencyItem[e.detail.value].currency_name;
				this.money = this.currencyItem[this.currency].num*1;
				this.currency_name = this.currencyItem[this.currency].currency_name;
				this.currency_id = this.currencyItem[e.detail.value].currency_id
			},
			allMoney(){
				let _this = this
				if(_this.currency===''){
					_this.msg = _this.languageInfo.pleaseSelectCurrency
					_this.msgModal = true
					setTimeout(()=>{
						_this.msgModal = false
					},2000)
					// this.linkTo.$noToast('请先选择币')
					return
				}
				this.num = this.currencyItem[this.currency].num*1;
			},
			next(){
				let _this = this
				let data = {
					currency_id:_this.currency_id,
					num:_this.num,
					remake:_this.inp
				}
				if(!data.currency_id||!data.num){
					_this.msg = _this.languageInfo.informationempty
					_this.msgModal = true
					setTimeout(()=>{
						_this.msgModal = false
					},2000)
					// this.linkTo.$noToast('信息不能为空');
					return
				}
				_this.$refs.popup.open();
				// this.post('api/doTransfer',data).then((res)=>{
				// 	console.log(res)
				// })
			},
			btn(){
				let data = {pwd:this.pwd};
				let obj = {
					currency_id:this.currencyItem[this.currency].currency_id,
					num:this.num,
					remake:this.inp
				}
				this.post('api/verifyPassword',data).then((res)=>{
					this.post('api/doTransfer',obj).then((res)=>{
						if(res.data.code == 200){
							uni.showToast({
								icon:'success'
							})
							setTimeout(()=>{
								uni.switchTab({
									url:'../game'
								})
							},1000)
						}
					})
				})
			},
			cancel(){
				this.$refs.popup.close();
			},
			getWithdraw(){
				this.get('api/transferIn').then((res)=>{
					console.log(res);
					this.currencyItem = res.data.res.currency_info;
					this.boc = res.data.res.boc
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
	.box{
		width: 650rpx;
		background: #075F4D;
		border-radius:15rpx;
		box-sizing: border-box;
		padding: 30rpx;
		.close{
			display: inline-block;
			width: 30rpx;
			height: 2rpx;
			background: #fff;
			transform: rotate(45deg);
			position:absolute;
			top: 30rpx;
			right: 20rpx;
		}
		.close::after{
			content: '';
			width: 30rpx;
			height: 2rpx;
			background: #fff;
			transform: rotate(90deg);
			position: absolute;
		}
		.title{
			text-align: center;
			color: white;
			font-size: 32rpx;
			margin-bottom: 30rpx;
		}
		.input{
			width: 90%;
			margin: 30rpx auto;
			background:rgba(18,25,42,0.5);
			border:1px solid rgba(45,234,183,1);
			border-radius:8rpx;
			text-indent: 10rpx;
			box-sizing: border-box;
			padding: 8rpx 0;
			text-align: center;
			color: #fff;
		}
		.btn{
			width: 80%;
			margin: 0 auto;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			view{
				background:rgba(18,25,42,0.5);
				border:1px solid rgba(45,234,183,1);
				border-radius:4px;
				box-sizing: border-box;
				color: white;
				font-size: 27rpx;
				padding: 15rpx 70rpx;
			}
		}
	}
	.feiyong{
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
	picker{
		width: 100%;
		position: relative;
	}
	picker::after {
		content:'';
		width: 0;
		height: 0;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		border-top: 6px solid #2DE9B7;
		position: absolute;
		right:10rpx;
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
	.type{
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
		.conFlex{
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
				position: relative;

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
