<template>
	<view class="myMask">
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			loading(){
				uni.showToast({
					title:"加载中...",
					icon:"none"
				})
			}
		},
		mounted(){
			
		}
	}
</script>

<style lang="scss">
	.myMask{
		@include size(100%,100vh,none);
		background: rgba(0,0,0,.8);
		position: fixed;
		left: 0;
		top: 0;
	}
</style>
