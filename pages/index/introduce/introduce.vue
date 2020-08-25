<template>
	<view class="introduce">
		<tabTop  title="项目介绍" :open='false' />
		<!-- <view class="whitePaper-box" v-if="checkoutlanguage">
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white00.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white01.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white03.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white04.png"  mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white05.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white06.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white007.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white07.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white08.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white09.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white10.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white11.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white12.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white13.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white14.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white15.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white16.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white17.png" mode='widthFix'></image>
			
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white18.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white19.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white20.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white21.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white22.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white23.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white24.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white25.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white26.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white27.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white28.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white29.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white30.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white31.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white32.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white33.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white34.png" mode='widthFix'></image>
			
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white35.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white36.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white37.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white38.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white39.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white40.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white41.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white42.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white43.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white44.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white45.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white46.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitep/white47.png" mode='widthFix'></image>
			
		</view>
		
		<view class="whitePaper-box" v-if="!checkoutlanguage">
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_00.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_01.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_02.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_03.png"  mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_04.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_05.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_06.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_07.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_08.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_09.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_10.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_11.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_12.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_13.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_14.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_15.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_16.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_17.png" mode='widthFix'></image>
			
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_18.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_19.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_20.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_21.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_22.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_23.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_24.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_25.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_26.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_27.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_28.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_29.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_30.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_31.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_32.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_33.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_34.png" mode='widthFix'></image>
			
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_35.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_36.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_37.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_38.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_39.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_40.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_41.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_42.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_43.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_44.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_45.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_46.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/plan_en_US/plan_en_US_47.png" mode='widthFix'></image>
			
		</view> -->
		
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue';
	export default{
		components:{tabTop},
		data(){
			return{
				checkoutlanguage:false,
			}
		},
		onShow(){
			let lang = uni.getStorageSync('languageType');
			if(lang !== 'zh-cn'){
				this.checkoutlanguage = false;
			}else{
				this.checkoutlanguage = true;
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
	.introduce{
		
		height: 100vh;
		
		.whitePaper-box{
			height: calc(100vh - 44px - 5rpx);
			overflow: auto;
			.whitePaper-Image{
				width: 100%;
				float: left; 
			}
		}
	}
</style>
