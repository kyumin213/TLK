<template>
	<!--导入钱包-->
	<view class="importWallet">
		<tabTop left-icon="back"  right-text="" :title="languageInfo.importWallet" :open='false' />
		<view class="form">
			<view class="upload">
				<view class="upload-img"></view>
			</view>
			<view class="taps-box">
				<view class="taps">
					<view class="taps-title" :class="{'tapsActive':type === 1}" @tap="checkout(1)">{{languageInfo.words}}</view>
					<view class="taps-title" :class="{'tapsActive':type === 2}" @tap="checkout(2)">{{languageInfo.secretKey}}</view>
				</view>
			</view>
			<view class="form-input-box">
				<formInput 
				v-show='type === 1' :name='languageInfo.wordsTitle' 
				:tipVal='mnemonicError'  :hide='mnemonicHide'
				:pVal='languageInfo.wordsVal'
				@val='onMnemonic' />
				<formInput
				v-show='type === 2' :name='languageInfo.secretKeyTitle'
				:tipVal='privatekeyError'  :hide='privatekeyHide'
				:pVal='languageInfo.secretKeyVal'
				@val='onKey' />
				<formInput :name='languageInfo.walletName' :pVal='languageInfo.walletName_value' :tipVal='nicknameError' @val='onName' :hide='nicknameHide'/>
				<formInput :name='languageInfo.setPassWord' :pVal='languageInfo.setPassWord_value' :tipVal='pwdError' type='password' @val='onPassWord' :hide='pwdHide'/>
				<formInput :name='languageInfo.confirmPassWord' :pVal='languageInfo.confirmPassWord_value' :tipVal='confirm_pwdError' type='password' @val='onConfirmPassword' :hide='confirm_pwdHide'/>
			</view>
			<view class="next">
				<nextButton @next='next' :msg='languageInfo.nextStep'/>
			</view>
		</view>
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue';
	import formInput from '@/components/formInput.vue';
	import nextButton from '@/components/nextButton.vue';
	import fromTest from '@/util/fromTest.js';
	export default{
		components: {tabTop,formInput,nextButton},
		mixins: [fromTest],
		data(){
			return{
				languageInfo:{},
				type:1,
				privatekey:''
			}
		},
		onShow(){
			this.languageInfo = this.linkTo.showLanguage();
		},
		methods:{
			checkout(type){
				this.type = type;
			},
			onShow(){
				this.languageInfo = this.linkTo.showLanguage();
			},
			showToast(){
				uni.showToast({
					title:this.languageInfo.showToast,
					icon:'none'
				})
			},
			getImportWallet(data){
				this.post('api/importWallet',data)
				.then(res =>{
					console.log(res);
					uni.setStorageSync('token',res.data.res.token);
					uni.switchTab({
						url:'../index'
					})
				})
			},
			next(){
				const token = uni.getStorageSync('token');
				this.formData.type = this.type;
				if(this.type === 1){
					if(this.nicknamePass && this.pwdPass && this.confirm_pwdPass && this.mnemonicPass){
						const data = JSON.parse(JSON.stringify(this.formData));
						data.word = data.mnemonic;
						data.imei = uni.getStorageSync('uuid');
						delete data.mnemonic;
						delete data.key;
						this.getImportWallet(data);
					}else{
						this.showToast();
					};
				}else{
					if(this.nicknamePass && this.pwdPass && this.confirm_pwdPass && this.privatekeyPass){
						const data = JSON.parse(JSON.stringify(this.formData));
						data.word = data.mnemonic;
						data.imei = uni.getStorageSync('uuid');
						delete data.mnemonic;
						this.getImportWallet(data);
					}else{
						this.showToast()
					}
				}
				
				
			}
		},
		mounted(){
			// console.log(this.nicknameHide)
		}
	}
</script>

<style lang="scss" scoped>
	.importWallet{
		@include levelCen();
		@include bg();
		overflow: auto;
		.form{
			@include size(650rpx,auto,none);
			background: rgba(29,43,73,.9);
			margin-top: 52rpx;
			border-radius: 10rpx;
			box-sizing: border-box;
			padding-bottom: 68rpx;
			.taps-box{
				width: 100%;
				display: flex;
				justify-content: center;
				margin-bottom: 15rpx;
				.taps{
					@include size(561rpx,56rpx,none);
					border: 1rpx #2B66BC solid;
					box-sizing: border-box;
					.taps-title{
						@include size(50%,100%,none);
						@include cen();
						@include font(24rpx,#fff);
						float: left;
						box-sizing: border-box;
					}
					.border{
						border-right: 1rpx solid #2B66BC;
					}
				}
			}
			
			
			.upload{
				height: 100rpx;
				@include cen();
				margin-top: 50rpx;
				margin-bottom: 40rpx;
				.upload-img{
					@include size(100rpx,100rpx,none);
					@include icon('~@/static/index/icon.png');
					border-radius: 50%;
				}
			}
			
			.form-input-box{
				@include cen();
				flex-direction: column;
			}
			
			.next{
				margin-top: 50rpx;
			}
		}
		
		.tapsActive{
			background: linear-gradient(to right,#2A65BC,#079D74);
		}
	}
</style>
