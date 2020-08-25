<template>
	<view class="myback">
	</view>
</template>

<script>
	export default {
		
		methods:{
			 back() {  
				uni.navigateBack({  
					delta: 2  
				});  
			},
		},
		mounted(){
			// uni.navigateTo({
			// 	url:this.$store.state.pages
			// })
		}
	}
</script>

<style lang="scss" scoped>
	.myback{
		width: 100%;
		height: 100vh;
		background: transparent ;
	}
</style>
