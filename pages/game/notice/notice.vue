<template>
	<view>
		<tabTop left-icon="back" :title="languageInfo.officialAnnouncement" />
		<view class="gonggao">
			<view class="icon">
				<image src="../../../static/game/32.png" mode="widthFix"></image>
				<view class="text">
					<text style="color: white;font-size: 30rpx;">{{languageInfo.officialAnnouncement}}</text>
					<text style="font-size: 25rpx;color: #2DEAB7;">Official announcement</text>
				</view>
			</view>
			<view class="hr">
				
			</view>
			<view class="more" @tap="Link('./gongGaoList')">
				<image src="../../../static/game/34.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="gonggao_con">
			<view class="item" v-for="(item,index) in gonggaoList" :key="index" @tap="goTo(item)">
				<view class="text">
					<text class="title" v-if="type==='Chinese'">{{item.title}}</text>
					<text class="title" v-if="type==='English'">{{item.en_title}}</text>
					<text class="title" v-if="type==='Korean'">{{item.kn_title}}</text>
					<text class="title" v-if="type==='Japanese'">{{item.jp_title}}</text>
					<text class="time">{{item.add_time}}</text>
				</view>
				<view class="icon">
					<image src="../../../static/game/quan.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		
		<!--  -->
		
		<view class="gonggao">
			<view class="icon">
				<image src="../../../static/game/33.png" mode="widthFix"></image>
				<view class="text">
					<text style="color: white;font-size: 30rpx;">{{languageInfo.newsFlash}}</text>
					<text style="font-size: 25rpx;color: #2DEAB7;">news flash</text>
				</view>
			</view>
			<view class="hr" style="width: 55%;">
				
			</view>
			<view class="more"  @tap="Link('./kuaiXunList')">
				<image src="../../../static/game/34.png" mode="widthFix"></image>
			</view>
		</view>
		
		<view class="gonggao_con">
			<view class="item" v-for="(item,index) in kuaixunList" :key="index" @tap="goTo(item)">
				<view class="text">
					<text class="title">{{item.title}}</text>
					<text class="time">{{item.add_time}}</text>
				</view>
				<view class="icon">
					<image src="../../../static/game/quan.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue'
	export default {
		components: {
			tabTop
		},
		data() { 
			return {
				gonggaoList:[],
				kuaixunList:[],
				languageInfo:{},
				type:''
			};
		},
		onShow() {
			this.languageInfo = this.linkTo.showLanguage();
			this.type = uni.getStorageSync('languageType');

			this.getMessage(2,(res)=>{
				console.log(res)
				this.gonggaoList = res;
			});
			this.getMessage(3,(res)=>{
				this.kuaixunList = res;
			});
			
		},
		methods:{
			getMessage(num,call){
				let data = {page:'1',rowNum:'3',type:num};
				this.get('api/message',data).then((res)=>{
					call(res.data.res.data)
				})
			},
			goTo(item){
				let {id,title} = item;
				this.linkTo.navTo(`./noticeDetail?id=${id}&&title=${title}`)
			},
			Link(url){
				console.log(url)
				this.linkTo.navTo(url);
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
	.gonggao{
		width: 95%;
		margin: 30rpx auto;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		.icon{
			display: flex;
			flex-direction: row;
			align-items: center;
			image{
				width: 50rpx;
				margin-right: 20rpx;
			}
			.text{
				display: flex;
				flex-direction: column;
				font-size: 25rpx;
				width: 100%;
				text{
					white-space: nowrap;
					overflow: hidden;
				}
			}
		}
		.hr{
			width: 37%;
			height: 50rpx;
			border-bottom: 2rpx solid #26846A;
		}
		.more{
			width: 100rpx;
			display: flex;
			align-items: flex-end;
			image{
				width: 100%;
			}
		}
	}
	.gonggao_con{
		width: 95%;
		box-sizing: border-box;
		margin: 30rpx auto;
		.item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			background:linear-gradient(90deg,rgba(50,65,99,1) 0%,rgba(10,20,41,1) 100%);
			margin-bottom: 15rpx;
			box-sizing: border-box;
			padding: 30rpx;
			border-radius:10rpx;
			opacity: .8;
			.text{
				display: flex;
				flex-direction: column;
				.title{
					color: white;
					font-size: 30rpx;
				}
				.time{
					color: #8DA1C0;
					font-size: 27rpx;
				}
			}
			.icon{
				width: 35rpx;
				image{
					width: 100%;
				}
			}
		}
	}
</style>
