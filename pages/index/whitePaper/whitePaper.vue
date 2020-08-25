<template>
	<view class="whitePaper">
		<tabTop  title="白皮书" :open='false' />
		<!-- <view class="whitePaper-box" v-if="!checkoutlanguage">
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_en_US/whitepaper_en_US_00.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_en_US/whitepaper_en_US_01.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_en_US/whitepaper_en_US_02.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_en_US/whitepaper_en_US_03.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_en_US/whitepaper_en_US_04.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_en_US/whitepaper_en_US_05.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_en_US/whitepaper_en_US_06.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_en_US/whitepaper_en_US_07.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_en_US/whitepaper_en_US_08.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_en_US/whitepaper_en_US_09.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_en_US/whitepaper_en_US_10.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_en_US/whitepaper_en_US_11.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_en_US/whitepaper_en_US_12.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_en_US/whitepaper_en_US_13.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_en_US/whitepaper_en_US_14.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_en_US/whitepaper_en_US_15.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_en_US/whitepaper_en_US_16.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_en_US/whitepaper_en_US_17.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_en_US/whitepaper_en_US_18.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_en_US/whitepaper_en_US_19.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_en_US/whitepaper_en_US_20.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_en_US/whitepaper_en_US_21.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_en_US/whitepaper_en_US_22.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_en_US/whitepaper_en_US_23.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_en_US/whitepaper_en_US_24.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_en_US/whitepaper_en_US_25.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_en_US/whitepaper_en_US_26.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_en_US/whitepaper_en_US_27.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_en_US/whitepaper_en_US_28.png" mode='widthFix'></image>
			
		</view>
		
		
		<view class="whitePaper-box" v-if="checkoutlanguage">
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_zh_CN/whitepaper_zh_CN_00.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_zh_CN/whitepaper_zh_CN_01.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_zh_CN/whitepaper_zh_CN_02.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_zh_CN/whitepaper_zh_CN_03.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_zh_CN/whitepaper_zh_CN_04.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_zh_CN/whitepaper_zh_CN_05.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_zh_CN/whitepaper_zh_CN_06.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_zh_CN/whitepaper_zh_CN_07.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_zh_CN/whitepaper_zh_CN_08.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_zh_CN/whitepaper_zh_CN_09.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_zh_CN/whitepaper_zh_CN_10.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_zh_CN/whitepaper_zh_CN_11.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_zh_CN/whitepaper_zh_CN_12.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_zh_CN/whitepaper_zh_CN_13.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_zh_CN/whitepaper_zh_CN_14.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_zh_CN/whitepaper_zh_CN_15.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_zh_CN/whitepaper_zh_CN_16.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_zh_CN/whitepaper_zh_CN_17.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_zh_CN/whitepaper_zh_CN_18.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_zh_CN/whitepaper_zh_CN_19.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_zh_CN/whitepaper_zh_CN_20.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_zh_CN/whitepaper_zh_CN_21.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_zh_CN/whitepaper_zh_CN_22.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_zh_CN/whitepaper_zh_CN_23.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_zh_CN/whitepaper_zh_CN_24.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_zh_CN/whitepaper_zh_CN_25.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_zh_CN/whitepaper_zh_CN_26.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_zh_CN/whitepaper_zh_CN_27.png" mode='widthFix'></image>
			<image class="whitePaper-Image" src="~@/static/index/more/whitepaper_zh_CN/whitepaper_zh_CN_28.png" mode='widthFix'></image> -->
			
		</view>
	</view>
</template>

<script>
import tabTop from '@/components/tabTop.vue';
export default {
	components:{tabTop},
	data() {
		return {
			checkoutlanguage:true,
		};
	},
	onShow(){
		let lang = uni.getStorageSync('languageType');
		if(lang !== 'zh-cn'){
			this.checkoutlanguage = false;
		}else{
			this.checkoutlanguage = true;
		}
		console.log(this.checkoutlanguage)
	},
};
</script>

<style lang="scss" scoped>
	.whitePaper{
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