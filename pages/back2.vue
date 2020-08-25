<template>
	<view class="myback">
		
	</view>
</template>

<script>
	export default {
		onShow(){
			const _this = this;
			// console.log('1212')
			setTimeout(()=>{
				_this.back()
			},1200)
			
		},
		methods:{
			 back() {  
				uni.navigateBack({  
					delta: 2  
				});  
			},
		},
	
		// mounted(){
		// 	setImmediate(()=>{
				
		// 	})
		// }
	}
</script>

<style lang="scss" scoped>
	.myback{
		width: 100%;
		height: 100vh;
		background: white ;
	}
</style>
