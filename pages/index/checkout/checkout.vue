<template>
	<!--切换钱包-->
	<view class="checkout">
		<tabTop :title="languageInfo.checkoutWallet" :open='false'/>
		<view class="checkout-box">
			<view class="left">
				<view class="current">
					<view class="current-img">
						
					</view>
				</view>
			</view>
			<view class="right">
				<view class="right-top">
					<text class="title">TRON</text>
					<view class="add" @tap="hide"></view>
				</view>
				<view class="lists">
					<view @tap="checkoutUser(index)" class="list" v-for="(item,index) in lists" :key='index'>
						<view class="list-box">
							<text class="list-title">{{item.nickname}}</text>
							<text class="list-secret">{{item.username}}</text>
						</view>
						<view class="list-check">
							<view class="real" v-show="num == index"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<addWallet :show='show' @hide='hide' :addWallet='languageInfo.addWallet' :importName='languageInfo.importWallet' @import='navImport' @created='navCreated'/>
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue';
	import addWallet from '@/components/addWallet.vue';
	export default{
		components:{tabTop,addWallet},
		onShow(){
			this.languageInfo = this.linkTo.showLanguage();
		},
		data(){
			return{
				languageInfo:{},
				lists:[],
				num:0,
				show:false,
			}
		},
		methods:{
			hide(){
				this.show = !this.show;
			},
			navImport(){
				uni.navigateTo({
					url:'../importWallet/importWallet'
				})
			},
			navCreated(){
				uni.navigateTo({
					url:"../createdWallet/createdWallet"
				})
			},
			getData(){
				const token = uni.getStorageSync('token');
				console.log(token)
				this.get('api/myAccount')
				.then(res=>{
					console.log(res)
					this.lists = res.data.res
					this.nowUser();
				})
			},
			nowUser(){
				console.log('dsads')
				const len = this.lists.length;
				const token = uni.getStorageSync('token');
				let index = 0;
				for(let i = 0;i<len;i++){
					console.log(this.lists[i].token)
					if(token === this.lists[i].token){
						this.num = i;
						return
					};
				};
				
			},
			checkoutUser(index){
				this.post('api/accountSwop',{
					username:this.lists[index].username,
					imei:uni.getStorageSync('uuid')
					// imei:'869741044063658,869741044203031'
				})
				.then(res=>{
					uni.setStorageSync('token',res.data.res.token);
					console.log(res.data.res.token);
					console.log(uni.getStorageSync('token'))
					uni.switchTab({
						url:'../index'
					})
				})
			}
		},
		mounted(){
			this.getData();
		}
	}
</script>

<style lang="scss" scoped>
	.checkout{
		display: flex;
		flex-direction: column;
		height: 100vh;
		@include bg();
		.checkout-box{
			display: flex;
			flex: 1;
			.left{
				width: 142rpx;
				height: 100%;
				.current{
					@include size(142rpx,142rpx,none);
					@include cen();
					.current-img{
						@include size(80rpx,80rpx,none);
						@include icon('~@/static/index/trx_icon.png')
					}
				}
			}
			.right{
				flex: 1;
				height: 100%;
				box-sizing: border-box;
				padding-left: 20rpx;
				.right-top{
					height: 100rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					box-sizing: border-box;
					border-bottom: 1rpx solid #2BDAAA;
					padding-right: 40rpx;
					.title{
						@include font(30rpx,#fff);
					}
					.add{
						@include size(30rpx,30rpx,none);
						@include icon('~@/static/index/+.png');
					}
				}
				
				.lists{
					box-sizing: border-box;
					padding-right: 20rpx;
					padding-top: 10rpx;
					.list{
						height: 121rpx;
						background: linear-gradient(90deg,rgba(50,65,99,1) 0%,rgba(10,20,41,1) 100%);
						margin-top: 10rpx;
						border-radius: 15rpx;
						display: flex;
						align-items: center;
						box-sizing: border-box;
						padding-right: 20rpx;
						opacity: .8;
						.list-box{
							height: 100%;
							display: flex;
							flex-direction: column;
							justify-content: center;
							box-sizing: border-box;
							padding-left: 30rpx;
							padding-right: 20rpx;
							
							.list-title{
								@include font(26rpx,#fff);
							}
							.list-secret{
								@include font(18rpx,#2BDAAA);
							}
						}
						
						.list-check{
							@include size(31rpx,31rpx,none);
							position: relative;
							margin-left: auto;
							.empty{
								@include size(31rpx,31rpx,none);
								background-image: linear-gradient(#2DE9B7,#2D6FD5);
								box-sizing: border-box;
								-webkit-mask: radial-gradient(transparent 13rpx, #000 14rpx);
								border-radius: 50%;
								position: absolute;
							}
							.real{
								@include size(31rpx,31rpx,none);
								@include icon('~@/static/index/right2.png');
								position: absolute;
								left: 50%;
								top: 50%;
								transform:translate(-50%,-50%);
								z-index: 10;
							}
						}
					}
				}
			}
		}
	}
</style>
