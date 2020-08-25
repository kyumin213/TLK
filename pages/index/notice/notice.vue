<template>
	<!--官方公告-->
	<view class="notice">
		<tabTop :title="languageInfo.notice" :open='false'/>
		<view class="notice-box">
			<!---->
			<view class="notice-lists-box"  v-for="(item,index) in lists" :key='index'>
				<!--header-->
				<view class="notice-header">
					<view class="icon" :style="{'backgroundImage':item.icon}"></view>
					<view class="notice-title">
						<text class="ctitle">{{item.ctitle}}</text>
						<text class="title">{{item.title}}</text>
					</view>
					<view class="line"></view>
					<view class="more-btn">MORE</view>
				</view>
				<!--header-->
				<view class="notices">
					<view class="notice-list" @tap="navDetail(item)" v-for="(item,index) in item.lists" :key='index'>
						<view class="list-box">
							<text class="list-title">{{item.title}}</text>
							<text class="list-date">{{item.add_time}}</text>
						</view>
						<view class="more-tap-box">
							<view class="more-tap">
								<text class="more-tap-title"></text>
							</view>
						</view>
						
					</view>
				</view>
			</view>
			<!---->
		</view>
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue'
	export default{
		components:{tabTop},
		data(){
			return{
				languageInfo:{},
				lists:[
					{
						icon:'url(/static/index/gonggao.png)',
						ctitle:"官方公告",
						title:"Official announcement",
						lists:[]
					},
					{
						icon:'url(/static/index/kuaixun.png)',
						ctitle:"快讯",
						title:"news flash",
						lists:[]
					}
				]
			}
		},
		onShow(){
			this.languageInfo = this.linkTo.showLanguage();
		},
		methods:{
			navDetail(item){
				console.log(item)
				this.$store.commit('SET_NOTICEDETAIL',item);
				this.$next('index/noticeDetail/noticeDetail')
			},
			getData(){
				this.get('api/message',{
					type:2
				})
				.then(res=>{
					console.log(res);
					this.lists[0].ctitle = this.languageInfo.notice;
					this.lists[0].lists = res.data.res.data;
				})
				this.get('api/message',{
					type:3
				})
				.then(res=>{
					console.log(res);
					this.lists[1].ctitle = this.languageInfo.news;
					this.lists[1].lists = res.data.res.data
				})
			}
		},
		mounted(){
			this.getData();
		}
	}
</script>

<style lang="scss" scoped>
	.notice{
		@include levelCen();
		@include bg()
		.notice-box{
			@include cen();
			flex-direction: column;
			padding-top: 10rpx;
			.notice-lists-box{
				@include size(710rpx,auto,none);
				margin-top: 30rpx;
				.notice-header{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					box-sizing: border-box;
					.icon{
						@include size(44rpx,44rpx,none);
						background-size: 100%,100%;
						background-repeat: no-repeat;
					}
					.notice-title{
						display: flex;
						flex-direction: column;
						justify-content: center;
						margin-left: 10rpx;
						margin-right: 10rpx;
						.ctitle{
							box-sizing: border-box;
							@include font(28rpx,#fff);//白色
						}
						.title{
							@include font(24rpx,#2DEAB7);
						}
					}
					.line{
						height: 2rpx;
						flex: 1;
						background: #26846A;
						align-self:flex-end;
						margin-bottom: 5rpx;
					}
					.more-btn{
						@include size(100rpx,44rpx,#324163);
						border-radius: 35rpx;
						@include font(24rpx,#2DEAB7);
						align-self:flex-end;
						margin-bottom: 5rpx;
						@include cen();
						margin-left: 10rpx;
					}
					padding-bottom: 10rpx;
				}
				
				.notices{
					
					.notice-list{
						height: 120rpx;
						background:linear-gradient(90deg,rgba(50,65,99,1) 0%,rgba(10,20,41,1) 100%);
						border-radius: 10rpx;
						margin-top: 10rpx;
						box-sizing: border-box;
						padding-left: 30rpx;
						padding-right: 30rpx;
						display: flex;
						justify-content: flex-start;
						opacity: .8;
						.list-box{
							height: 120rpx;
							display: flex;
							flex-direction: column;
							justify-content: center;
							.list-title{
								@include font(28rpx,#fff);
							}
							.list-date{
								@include font(24rpx,#8EA2C1);
							}
						}
						
						.more-tap-box{
							height: 120rpx;
							display: flex;
							flex-direction: column;
							justify-content: center;
							margin-left: auto;
							.more-tap{
								@include size(24rpx,24rpx,none);
								box-sizing: border-box;
								border: 1rpx #2DEAB7 solid;
								border-radius: 50%;
								@include cen();
								.more-tap-title{
									// @include font(21rpx,#2DEAB7);
									width: 10rpx;
									height:10rpx;
									border-top: 2rpx solid #2DEAB7;
									border-right: 2rpx solid #2DEAB7;
									transform: rotate(45deg);
								}
							}
						}
						
					}
				}
			}
			
		}
	}
</style>
