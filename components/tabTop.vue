<template>
	<view>
		<view >
			<uni-nav-bar @clickRight="clickRight" :class="{box:open}"  class="box" :color="color" :left-icon="leftIcon" status-bar :right-text="rightText" :title="title"></uni-nav-bar>
			<view class="hr"></view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components: {uniNavBar},
		props:{
			leftIcon:{
				default:'back'
			},
			rightText:{
				default:''
			},
			title:{
				default:'导航栏组件'
			},
			color:{
				default:'#2DEAB7'
			},
			open:{
				//是否隐藏头部背景图
				default:true,
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			clickLeft(){
				this.$emit('');
				console.log('111')
			},
			clickRight(){
				this.$emit('clickRight');
			}
		}
	}
</script>

<style>
	.box{
		width: 100%;
		background-color: rgba(0,0,0,.6);
/* 		background-image: url(../static/head.png) !important;
		background-size: 100% 100%; */
		/* background: url(../static/head.png) no-repeat !important; */
	}
	.hr{
		width: 100%;
		height: 2rpx;
		margin-top: -2rpx;
		background:linear-gradient(90deg,rgba(45,112,214,1) 0%,rgba(45,234,183,1) 100%);
	}
</style>
