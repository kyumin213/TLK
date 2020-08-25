<template>
	<view>
		<tabTop left-icon="back" :title="languageInfo.selectTransferAddress" />
		<view class="container">
			<view class="listItemBox" v-for="(item,index) in addressData" :key='index' :index='index' @tap="selectAddress(index)">
				<view class="listItem">
					<view>
						<view class="addressTxt colorTxt">{{item.nickname}}</view>
						<view class="addressDes">{{item.address}}({{item.remake}})</view>
					</view>
					<view>
						<image v-show="select==index" class="selectIcon" src="~@/static/right_icon.png"></image>
					</view>
				</view>
			</view>
			<view class="btnBox">
				<button class="btn addressTxt mb10" @tap="addWallet">{{languageInfo.addWalletAddress}}</button>
				<button v-if="addressData.length>0" class="btn addressTxt" @tap="next">{{languageInfo.nextStep}}</button>
			</view>
		</view>

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
				select: 0,
				modalShow:false,
				modalType:1,
				address:'',
				addressData: [],
				languageInfo:{}
			}
		},
		onLoad(){
			this.getwalletAddress()
		},
		onShow() {
			this.languageInfo = this.linkTo.showLanguage();
		},
		methods: {
			// 收款钱包地址列表
			getwalletAddress(){
				let _this = this
				_this.get('api/directory').then(res=>{
					if(res.data.code == 200){
						_this.addressData = res.data.res
					}else{
						uni.showToast({
							title: res.data.message,
							icon:'none'
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			},
		
			// 新建钱包地址
			addWallet() {
				uni.navigateTo({
					url: "../editAddress/editAddress"
				})
			},
			// 选择收款钱包地址
			selectAddress(index) {
				let _this = this
				_this.select = index
				let ind = _this.select
				_this.address = _this.addressData[ind].address
				
			},
			// 下一步
			next(){
				let _this = this
				let index = _this.select
				_this.address = _this.addressData[index].address
				// let address = _this.address
				uni.setStorageSync('address',_this.address)
				uni.navigateBack({
					
				})
				
			},

			// 导出助记词跳转
			pwdSubmit(){
				let _this = this
				let type = _this.modalType
				if(type == 1){
					uni.navigateTo({
						url:'./exportWord/exportWord'
					})
					_this.modalShow = false
				} else if(type == 2){
					uni.navigateTo({
						url:'./exportPrivateKey/exportPrivateKey'
					})
					_this.modalShow = false
				}
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
<style scoped lang="scss">

	.colorTxt {
		color: #2DE9B7;
	}

	.listItem {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 100rpx;
		background-color: #1D2B49;
		padding: 0 34rpx;
		box-sizing: border-box;
		border-bottom: 2rpx solid #42527A;
	}

	.itemLeft {
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.addressTxt {
		font-size: 24rpx;
	}

	.addressDes {
		font-size: 18rpx;
		color: #8DA1C1;
	}

	.selectIcon {
		width: 34rpx;
		height: 34rpx;
		background-size: cover;
	}

	.btnBox {
		position: fixed;
		bottom: 83rpx;
		left: 50%;
		transform: translateX(-50%);
	}

	.mb10 {
		margin-bottom: 10rpx;
	}

	.btn {
		width: 560rpx;
		height: 66rpx;
		line-height: 66rpx;
		color: #fff;
		border-radius: 4rpx;
		background: linear-gradient(left, #2A65BC, #079D74);
	}
</style>
