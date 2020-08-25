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
		onShow(){
			if(this.$store.state.onBack){
				this.$store.commit('SET_ONBACK',false);
				uni.navigateTo({
					url:'/pages/back2',
					animationType:'none'
				})
			}else{
				console.log(this.$store.state.pages)
				uni.navigateTo({
					url:/pages/+this.$store.state.pages
				})
			}
		},
		mounted(){
			console.log('1212')
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
