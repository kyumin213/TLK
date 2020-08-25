<template>
	<view class="myGame">
		<view class="myGame-box">
			<view class="head">
				<view class="left">
					<view class="img1"><text>{{tlk.num}}</text></view>
					<view class="img2"><text>{{cub.num}}</text></view>
				</view>
				<view class="right" @tap="back"><text>{{languageInfo.leaveYourSeat}}</text></view>
			</view>
			
			<view class="people">
				<view class="all" v-for="(item,index) in list" :key="index"  :class="'active'+index" >
					<view  :class="[ind===index?'bk':'']"  >
						<view class="item">
							<text class="name">{{item.nickname}}</text>
							<image src="~@/static/game/user.png" mode="widthFix"></image>
							<view class="num">
								<image src="~@/static/game/jinbi.png" mode="widthFix"></image>
								<text>100CUB</text>
							</view>
						</view>
					</view>
					<view class="duzhu" v-show="duzhuIf">
						<view class="bei">
							<text>X1</text>
							<image src="~@/static/game/bei.png" mode="widthFix"></image>
						</view>
						<view class="jinbi">
							<image src="~@/static/game/jinbi.png" mode="widthFix"></image>
							<text>100</text>
						</view>
					</view>
				</view>
				<!-- <view class="xiazhu" v-show="timeIf">
					<image src="~@/static/game/start.png" mode="widthFix"></image>
					<view class="biao"><text>{{time}}</text></view>
				</view> -->
			
				<!-- <view class="xiazhu_btn" v-show="stopIf">
					<image src="~@/static/game/stop.png" mode="widthFix"></image>
				</view>
				<view class="xiazhu_btn" v-show="penddingIf">
					<image src="~@/static/game/jinxing.png" mode="widthFix"></image>
				</view> -->
				<!-- <view class="xiazhu_btn" v-show="Success">
					<view class="bk">
						<view class="posi"><text>{{languageInfo.successfulAuction}}</text></view>
						<view class="msg">
							<text style="font-weight: bold;">{{winner.num}}{{winner.currency_name}}</text>
							<text>{{languageInfo.congratulations}}{{winner.nickname}}{{languageInfo.successfulAuction}}</text>
						</view>
					</view>
				</view> -->
				<!-- <view class="xiazhu_btn" v-show="jiangliIf">
					<view class="bk">
						<view class="posi"><text>{{languageInfo.prizeSettlement}}</text></view>
						<view class="box">
							<view class="my">
								<text>{{languageInfo.myPrize}}</text>
								<text>{{winner.num}}{{winner.currency_name}}</text>
							</view>
							<view class="other">
								<view class="title">{{languageInfo.otherPrizes}}</view>
								<view class="list">
									<view class="val" v-for="(item,index) in idData" :key="index">
										<text>{{item.nickname}}</text>
										<text>{{item.num}}{{item.currency_name}}</text>
									</view>
								</view>
							</view>
							<view class="Btn">
								<view class="btn1" @tap="init">{{languageInfo.keepPlaying}}</view>
								<view class="btn2" @tap="tuichu"><text>{{languageInfo.test12}}</text></view>
							</view>
						</view>
					</view>
				</view> -->
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		watch:{
			'$store.state.winner'(newVal){
				console.log(newVal)
				this.list = newVal;
				const newArr = JSON.parse(JSON.stringify(newVal));
				this.winner = newArr.pop();
				this.idData = newArr;
				this.zhuanquan();
			}
		},
		data() {
			return {
				list: [
					{
						nickname:'121',
						num:"2121",
					},
				],
				time:5,
				timeIf:false,
				btnIf:false,
				ind:0,
				stopIf:false,
				penddingIf:false,
				duzhuIf:false,
				Success:false,
				jiangliIf:false,//是否继续窗口
				addressList:[],
				languageInfo: {},
				show:true,
				idData:[
					{
						nickname:'1212',
						num:'1212'
					},
				
				],
				winner:{},//获胜者
				loadIngNum:5,//加载时间
				timer:'',//定时器
				tlk:{},
				cub:{},
			};
		},
		onShow() {
			
			this.languageInfo = this.linkTo.showLanguage();
			// console.log(getApp().globalData.gameMsg);
			// const AppData = getApp().globalData.gameMsg.idData;
			// this.list = JSON.parse(JSON.stringify(getApp().globalData.gameMsg.idData));
			// this.list.push(getApp().globalData.gameMsg.winner);
			this.idData =  getApp().globalData.idData;
			// this.winner =  getApp().globalData.gameMsg.winner;
			// this.test()
		},
		mounted(){
			//倒计时
			// this.getMatching()
			this.$store.commit('SET_ONBACK',true);
			this.getWallet(true);
			
		},
		methods: {
			getWallet(loading){
				//获取钱包
				this.get('api/gameWallet')
				.then(res =>{
					console.log(res);
					const len = res.data.res.length;
					for(let i = 0;i<len;i++){
						if(res.data.res[i].currency_id == 1){
							//TLK
							this.tlk = res.data.res[i];
						}else if(res.data.res[i].currency_id == 2){
							//CUB
							this.cub = res.data.res[i];
						}
					};
					if(loading){
						this.getMatching();
					}
					
				})
			},
			showToast(val){
				uni.showToast({
					title:val,
					icon:'none'
				})
			},
			getlanguageType(){
				const languageType = uni.getStorageSync('languageType');
				let lang;
				switch (languageType) {
					case 'Chinese':
						lang = 'zh-cn';
						break;
					case 'English':
						lang = 'en-us';
						break;
					case 'Korean':
						lang = 'ko-kr';
						break;
					case 'Japanese':
						lang = 'ja-jp';
						break;
					default:
						lang = 'zh-cn';
						break;
				};
				return lang
			},
			getJson(data){
				return JSON.parse(data);
			},
			getMatching(){
				//匹配中
				const _this = this;
				uni.showLoading({
					title:'匹配中...'
				});
				clearInterval(this.timer);
				this.timer = setInterval(()=>{
					console.log(_this.loadIngNum)
					if(_this.loadIngNum === 0){
						//5秒后匹配机器人;
						clearInterval(_this.timer);
						uni.hideLoading();
						_this.loadIngNum = 5;
						//获取ws对象
						const ws = getApp().globalData.socketTaskFnc;
						const lang = this.getlanguageType();
						const token = uni.getStorageSync('token');
						//给服务端发送type，用于匹配机器人
						const val = `token=${token}&lang=${lang}&type=2`;
						console.log(val)
						ws.send({
							data:val
						});
						
					}
					_this.loadIngNum -= 1;
				},1000)
			},
			test(){
				this.testSet =  setInterval(()=>{
					if(this.time<=1){
						this.timeIf = false;
						// this.btnIf = true;
						this.timeFnc();
						return
					}
					this.time--;
				},1000)
			},
			timeFnc(){
				clearInterval(this.testSet);
				this.timeFncSet = setTimeout(()=>{
					// this.btnIf = false;
					this.stopIf = true;
					this.duzhuIf = true;
					this.pendding();
				},2000)
			},
			back() {
				const ws = getApp().globalData.socketTaskFnc;
				ws.close({code:1000});
				uni.navigateBack({
					delta: 1
				})
			},
			xiazhu(){
				clearTimeout(this.timeFncSet);
				// this.btnIf = false;
				this.stopIf = true;
				this.pendding()
			},
			pendding(){
				clearTimeout(this.timeFncSet);
				this.penddingFnc = setTimeout(()=>{
					this.stopIf = false;
					this.penddingIf = true;
					this.zhuanquan();
				},1000)
			},
			zhuanquan(){
				clearTimeout(this.penddingFnc);
				this.zhuanquanFnc = setInterval(()=>{
					this.ind++;
					if(this.ind>=10){
						this.ind=0
					}
				},100)
				this.zqFnc = setTimeout(()=>{
					clearInterval(this.zhuanquanFnc);
					this.ind = 100;
					this.penddingIf = false;
					this.Success = true;
					this.jiangpin();
					this.getWallet();
				},5000)
			},
			jiangpin(){
				clearTimeout(this.zqFnc);
				this.jiangpinFnc = setTimeout(()=>{
					this.Success  = false;
					this.jiangliIf = true;
				},2000)
			},
			
			init(url){
				//初始化，重新进入游戏
				const lang = this.getlanguageType();
				const token = uni.getStorageSync('token');
				const WsOpen = getApp().globalData.socketTaskType;
				this.list = [];
				this.jiangliIf = false;
				if(!WsOpen){
					//开启WS
					const token = uni.getStorageSync('token');
					const val = `token=${token}&lang=${lang}&type=1`;
					getApp().globalData.socketTaskFnc = uni.connectSocket({
					    url: 'ws://8.129.172.166:9502',
						success:(res)=>{
							console.log('创建WS成功');
						},
						fail:(err)=>{
							getApp().globalData.socketTaskType = false;
						}
					});
					
					//WS监听打开
					const ws =getApp().globalData.socketTaskFnc;
					ws.onOpen(res=>{
						//这里有个坑：连续出发多个WS，该OPEN监听会无效
						getApp().globalData.socketTaskType = true;
						console.log('WS连接已经打开');
						//WS发送消息
						ws.send({
							data:val
						})
					})
					
					//接收服务器信息
					ws.onMessage(res=>{
						const json = this.getJson(res.data);
						console.log(json)
						if(json.error != 0){
							this.showToast(json.msg);
						}else{
							//等于0时，进入游戏
							this.getMatching();
						}
						if(json.winner){
							let newJson = json.idData;
							newJson.push(json.winner);
							this.$store.commit('SET_WINNER',newJson);
							ws.close({code:1000});
						}
					})
					
					//监听WS连接关闭
					ws.onClose(res=>{
						console.log('WS已关闭');
						getApp().globalData.socketTaskType = false;
					})
				}
			},
			jixu(){
				clearTimeout(this.jiangpinFnc);
				this.jiangliIf = false;
				this.duzhuIf = false;
				uni.showLoading({
				    title: '匹配中...'
				});
				let d = uni.getStorageSync('languageType');
				let lang;
				switch (d) {
					case 'Chinese':
						lang = 'zh-cn';
						break;
					case 'English':
						lang = 'en-us';
						break;
					case 'Korean':
						lang = 'ko-kr';
						break;
					case 'Japanese':
						lang = 'ja-jp';
						break;
					default:
						break;
				}
				let token = uni.getStorageSync('token');
				
				
				getApp().globalData.socketTaskFnc =uni.connectSocket({
				    url: 'ws://8.129.172.166:9502',
					success:(res)=>{
						// console.log('1111')
						getApp().globalData.socketTaskType = true;
					},
					fail:(err)=>{
						getApp().globalData.socketTaskType = false;
					}
				});
				
				const SocketTask = getApp().globalData.socketTaskFnc;
				let val = `token=${token}&lang=${lang}&type=1`
				setTimeout(()=>{
					SocketTask.send({
						 data: val,
						 success:(res)=>{
							 console.log(res)
							 
						 }
					})
								
					SocketTask.onMessage((res)=>{
						if(JSON.parse(res.data).winner){
							SocketTask.close({code:100,reason:'测试1'})
							getApp().globalData.gameMsg = JSON.parse(res.data);
								uni.navigateTo({
									url
								})
						}else{
							this.linkTo.$noToast(JSON.parse(res.data).msg)
						}
						uni.hideLoading()
					})
				},1000)
				setTimeout(()=>{
				let data = `token=${token}&lang=${lang}&type=2`;
					SocketTask.send({
						 data,
						 success:(res)=>{
							 console.log(res)
							 
						 }
					})
					let test= SocketTask.onMessage((res)=>{
						if(JSON.parse(res.data).winner){
							SocketTask.close({code:100,reason:'测试2'})
							getApp().globalData.gameMsg = JSON.parse(res.data);
								uni.navigateTo({
									url
								})
						}else{
							this.linkTo.$noToast(JSON.parse(res.data).msg)
						}
					})
						uni.hideLoading()
					this.test();
				},5000)
				
			},
			tuichu(){
				clearTimeout(this.jiangpinFnc)
				this.jiangliIf = false;
				getApp().globalData.socketTaskType = false;//WS开关开启
				const ws = getApp().globalData.socketTaskFnc;
				ws.close({code:1000});
				uni.navigateBack({
					delta:1
				})
			}
		},
		onHide() {
			clearTimeout(this.timeShow);
			getApp().globalData.gameMsg = {}
		}
	}
</script>
<style>
	page{
		background: url(~@/static/game/big_bk.png) no-repeat;
		background-size: 100% 100%;
	}
</style>

<style lang="scss" scoped>
	.myGame{
		width: 100vh;
		height: 100vw;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		.myGame-box{
			width: 100vh;
			height: 100vw;
			background: rgba(0,0,0,.5);
			transform:rotate(90deg);
			transform-origin: 50% 50%;
			@include icon('~@/static/game/big_bk.png');
		}

	}
	

	.active1 {
		position: absolute;
		top: 150rpx;
		left: 0;
	}

	.active2 {
		position: absolute;
		top: 170rpx;
		left: 140rpx;
	}

	.active3 {
		position: absolute;
		top: 170rpx;
		left: 280rpx;
	}

	.active4 {
		position: absolute;
		top: 170rpx;
		left: 420rpx;
	}

	.active5 {
		position: absolute;
		top: 150rpx;
		left: 580rpx;
	}

	.active6 {
		position: absolute;
		top: 40rpx;
		left: 580rpx;
	}

	.active7 {
		position: absolute;
		top: 0rpx;
		left: 420rpx;
	}

	.active8 {
		position: absolute;
		top: 0rpx;
		left: 280rpx;
	}

	.active9 {
		position: absolute;
		top: 0rpx;
		left: 140rpx;
	}

	.head {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 5rpx;
		.left {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-left: 30rpx;
			.img1 {
				background: url(~@/static/game/tlkinp.png) no-repeat;
				width: 219rpx;
				height: 54rpx;
				background-size: 100% 100%;
				display: flex;
				flex-direction: row-reverse;
				font-size: 19rpx;
				line-height: 54rpx;
				color: #FFF597;
				padding-right: 30rpx;
				margin-right: 15rpx;
			}

			.img2 {
				background: url(~@/static/game/cubinp.png) no-repeat;
				width: 219rpx;
				height: 54rpx;
				background-size: 100% 100%;
				display: flex;
				flex-direction: row-reverse;
				font-size: 19rpx;
				line-height: 54rpx;
				color: #FFF597;
				padding-right: 30rpx;
			}
		}

		.right {
			background: url(~@/static/game/yellow_bk.png) no-repeat;
			background-size: 100% 100%;
			color: #7F1E0B;
			@include size(138rpx,47rpx,none);
			font-size: 18.27rpx;
			@include cen();
		}
	}

	.people {
		// background: green;
		width: 90%;
		margin: 0 auto;
		height: 200rpx;
		position: relative;
		top: 0;
		.bk{
			background: url(~@/static/game/shadow.png) no-repeat;
			background-size: 100% 100%;
			width: 70rpx;
			height: 110rpx;
		}
		.duzhu{
			position: absolute;
			top: 0;
			right: 0rpx;
			// background: green;
			.bei{
				display: flex;
				flex-direction: row;
				align-items: center;
				font-size: 20rpx;
				color: #FDFFB5;
				image{
					width: 30rpx;
				}
			}
			.jinbi{
				display: flex;
				flex-direction: row;
				align-items: center;
				image{
					width: 15rpx;
					margin-right: 10rpx;
				}
				font-size: 15rpx;
				color: #EED4A3;
			}
		}
		
		.item {
			width: 70rpx;
			height: 100rpx;
			background: url(~@/static/game/User_icon.png) no-repeat;
			background-size: cover;
			font-size: 12rpx;
			color: white;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 8rpx;
			.name {
				margin-bottom: 10rpx;
			}
			.num{
				display: flex;
				flex-direction: row;
				align-items: center;
				image{
					width: 12rpx;
					margin: 0;
				}
			}
			image {
				width: 70%;
				margin-bottom: 10rpx;
			}
		}
	}
	.xiazhu{
		position: absolute;
		left: 50%;
		top: 60%;
		transform: translate(-50%,-50%);
		display: flex;
		flex-direction: row;
		align-items: center;
		.biao{
			background: url(~@/static/game/naozhong.png) no-repeat;
			background-size: 100% 100%;
			font-size: 16rpx;
			width: 40rpx;
			height: 40rpx;
			align-items: center;
			justify-content: center;
			line-height: 45rpx;
			font-weight: 600;
			display: flex;
			align-self: flex-end;
		}
	}
	.xiazhu_btn{
		position: absolute;
		left: 50%;
		top: 60%;
		transform: translate(-50%,-50%);
		display: flex;
		flex-direction: row;
		align-items: center;
		// position: relative;
		.bk{
			width: 420rpx;
			height: 250rpx;
			background: url(~@/static/game/shaw_bk.png) no-repeat;
			background-size: cover;
			position: relative;
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;
			.box{
				width: 90%;
				margin: 0 auto;
				padding-top: 40rpx;
				.my{
					width: 90%;
					margin: 10rpx auto;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 15rpx;
					color: #49121E;
					box-sizing: border-box;
					padding: 10rpx 15rpx;
					font-weight: bold;
					background: #AD96A9;
				}
			}
			.other{
				width: 90%;
				margin: 10rpx auto;
				color: #49121E;
				box-sizing: border-box;
				padding: 10rpx 5rpx;
				font-weight: bold;
				background: #AD96A9;
				font-size: 13rpx;
				.title{
					text-align: left;
					margin-bottom: 5rpx;
				}
				.list{
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					align-items: center;
					// margin-bottom: 10rpx;
					.val{
						width: 30%;
						display: flex;
						flex-direction: column;
						align-items: center;
						margin: 5rpx;
						text{
							white-space: nowrap;
						}
						image{
							width: 25rpx;
							// margin-right: 5rpx;
						}
					}
				}
			}
			.Btn{
				display: flex;
				justify-content: space-around;
				align-items: center;
				.btn1,.btn2{
					height: 25rpx;
					background: url(~@/static/game/small_btn.png) no-repeat;
					background-size: 100% 100%;
						font-size: 13rpx;
						color: white;
						padding: 5rpx 10rpx;
						line-height: 26rpx;
				}
			}
			.posi{
				position: absolute;
				width: 100%;
				top: -10rpx;
				text{
					font-size: 27rpx;
					color: white;
					
				}
			}
			.msg{
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 20rpx;
				color: white;
			}
		}
		.close{
			position: absolute;
			top: 10rpx;
			right: 10rpx;
			width: 25rpx;
			image{
				width: 25rpx;
			}
		}
		.img1{
			background: url(~@/static/game/blue_bk.png) no-repeat;
			background-size: 100% 100%;
			width: 80rpx;
			height: 30rpx;
			text-align: center;
			line-height: 30rpx;
			font-size: 15rpx;
			color: white;
			margin-right: 50rpx;
		}
		.img2{
			background: url(~@/static/game/yellow_bk.png) no-repeat;
			background-size: 100% 100%;
			width: 80rpx;
			height: 30rpx;
			text-align: center;
			line-height: 30rpx;
			font-size: 15rpx;
			color: white;
		}
	}
</style>
