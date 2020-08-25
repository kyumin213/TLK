<template>
	<view class="createdWallet">
		<tabTop left-icon="back"  right-text="" :title="languageInfo.createdWallet" :open='false' />
		<view class="form">
			<view class="upload">
				<view class="upload-img"></view>
			</view>
			<view class="form-input-box">
				<formInput :name='languageInfo.walletName' :pVal='languageInfo.walletName_value' :tipVal='nicknameError' @val='onName' :hide='nicknameHide'/>
				<formInput :name='languageInfo.setPassWord' :pVal='languageInfo.setPassWord_value' :tipVal='pwdError' type='password' @val='onPassWord' :hide='pwdHide'/>
				<formInput :name='languageInfo.confirmPassWord' :pVal='languageInfo.confirmPassWord_value' :tipVal='confirm_pwdError' type='password' @val='onConfirmPassword' :hide='confirm_pwdHide'/>
			</view>
			<view class="next" @tap='next'>
				<nextButton :msg='languageInfo.nextStep'/>
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
		onShow(){
			this.languageInfo = this.linkTo.showLanguage();
		},
		data(){
			return{
				languageInfo:{},
			}
		},
		methods:{
			
			next(){
				if(this.nicknamePass && this.pwdPass && this.confirm_pwdPass){
					this.$store.commit('SET_FORMDATA',this.formData);
					uni.navigateTo({
						url:'../backup/backup'
					})
					
				}else{
					uni.showToast({
						title:'请完善资料！',
						icon:'none'
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">
	.createdWallet{
		@include levelCen();
		@include bg();
		.form{
			@include size(650rpx,810rpx,#4B556D);
			background-color: rgba(75,85,109,.9);
			align-self:center;
			margin-top: 52rpx;
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
				display: flex;
				flex-direction: column;
				justify-content: center;
			}
			
			.next{
				@include size(auto,66rpx,none);
				@include cen();
				margin-top: 50rpx;
			}
		}
	}
</style>
