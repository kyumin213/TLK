<template>
	<view>
		<tabTop left-icon="back" :title="languageInfo.officialAnnouncement" />
		<view class="gonggao_con">
			<view class="item" v-for="(item,index) in gonggaoList" :key="index" @tap="goTo(item)">
				<view class="text">
					<text class="title" v-if="type==='Chinese'">{{item.title}}</text>
					<text class="title" v-if="type==='English'">{{item.en_title}}</text>
					<text class="title" v-if="type==='Korean'">{{item.kn_title}}</text>
					<text class="title" v-if="type==='Japanese'">{{item.jp_title}}</text>
					<text class="time" >{{item.add_time}}</text>
				</view>
				<view class="detail" v-if="type==='Chinese'">{{item.detail}}</view>
				<view class="detail" v-if="type==='English'">{{item.en_content}}</view>
				<view class="detail" v-if="type==='Korean'">{{item.kn_content}}</view>
				<view class="detail" v-if="type==='Japanese'">{{item.jp_content}}</view>
				<view class="hr">
					
				</view>
				<view class="icon">
					<view class="">{{languageInfo.details}}</view>
					<view class="">></view>
					<!-- <image src="../../../static/game/quan.png" mode="widthFix"></image> -->
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
		},
		methods:{
			getMessage(num,call){
				let data = {page:'1',rowNum:'10',type:num};
				this.get('api/message',data).then((res)=>{
					call(res.data.res.data)
				})
			},
			goTo(item){
				let {id,title} = item;
				this.linkTo.navTo(`./noticeDetail?id=${id}&&title=${title}`)
			},
		}
	}
</script>

<style>
	page {
		background-image: url(~@/static/bg.png);
		background-size: 100% 100%;
	}
</style>
<style lang="scss">
	.gonggao_con{
		width: 95%;
		box-sizing: border-box;
		margin: 30rpx auto;
		.item{
			display: flex;
			// justify-content: space-between;
			flex-direction: column;
			align-items: center;
			background:linear-gradient(90deg,rgba(50,65,99,1) 0%,rgba(10,20,41,1) 100%);
			margin-bottom: 15rpx;
			box-sizing: border-box;
			padding: 30rpx;
			border-radius:10rpx;
			
			.hr{
				width: 100%;
				height: 2rpx;
				background: #8EA2C1;
				margin: 20rpx 0;
			}
			.text{
				width: 100%;
				display: flex;
				// flex-direction: column;
				justify-content: space-between;
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
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: white;
				font-size: 30rpx;
				image{
					width: 35rpx;
				}
			}
		}
	}
	.detail{
		width: 100%;
		text-align: left;
		font-size: 25rpx;
		color: #8EA2C1;
		white-space: nowrap;
		text-overflow:ellipsis;
		overflow: hidden;
	}
</style>
