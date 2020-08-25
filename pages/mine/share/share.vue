<template>
	<view>
		<tabTop left-icon="back"  title="海报"  />
		<canvas canvss-id="share" style="width: 80%;height: 1000rpx;margin: 0 auto;"></canvas>
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue'
	
	export default {
		components: {tabTop},
		data() {
			return {
				
			}
		},
		onReady() {
			var ctx = uni.createCanvasContext('share');
			let bk = '/static/bk.jpg';
			 ctx.drawImage(bk, 0, 0, 600, 1000);
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
