<template>
	<view class="market">
		<tabTop :title='languageInfo.market' :open='false'/>
		<view class="market-top">
			<text class="title">TLK/CUB</text>
			<text class="number">{{this.curve}}%</text>
			<myTaps :name='languageInfo.marketTaps' @next='navMarketDetails' class='taps' color='#fff' icon='url(/static/transaction/market2.png)'/>
		</view>
		<view class="taps-box">
			<view class="taps">
				<view class="taps-title border" :class="{'tapsActive':taps}" @tap="checkout(true)">{{languageInfo.marketBuy}}</view>
				<view class="taps-title" :class="{'tapsActive2':!taps}" @tap="checkout(false)">{{languageInfo.marketSell}}</view>
			</view>
		</view>
		<view class="information">
			<view class="information-left">
				<view class="title">
					<text class="text">{{bottomTapsNum ==0? languageInfo.fiveTitle1:languageInfo.fiveTitle4}}</text>
					<text class="text">{{languageInfo.fiveTitle2}}</text>
					<text class="text">{{languageInfo.fiveTitle3}}</text>
				</view>
				<view class="lists" v-show="bottomTapsNum == 0">
					<view class="list" v-for="(item,index) in lists.list1" :key='index'>
						<text>{{lists.list1.length - index}}</text>
						<text>{{item.trade_price}}</text>
						<text>{{item.trade_num}}</text>
					</view>
				</view>
				<view class="newTransaction" v-show="bottomTapsNum === 0">
					<text class="newTransaction-left">{{languageInfo.fiveTitle4}}</text>
					<text class="newTransaction-right">{{lists.list2[0].trade_price}}</text>
				</view>
				<view class="lists" v-show="bottomTapsNum == 0">
					<view class="list" v-for="(item,index) in lists.list2" :key='index'>
						<text>{{index+1}}</text>
						<text>{{item.trade_price}}</text>
						<text>{{item.trade_num}}</text>
					</view>
				</view>
				<view class="lists" v-show="bottomTapsNum == 1">
					<view class="list" v-for="(item,index) in lists.list3" :key='index'>
						<text>{{getDate(item.trade_time)}}</text>
						<text>{{item.trade_price}}</text>
						<text>{{item.trade_num}}</text>
					</view>
				</view>
				<view class="detailed-box">
					<view class="detailed">
						<view 
						class="detailed-left" 
						@tap="onBottomTaps(index)" 
						:class="{bottomTapsActive:bottomTapsNum === index}" 
						v-for="(item,index) in bottomTaps" 
						:key='index'>
							<text>{{item.title}}</text>
						</view>
					</view>
				</view>
			</view>
			
			
			
			<view class="information-right">
				
				<view class="right-taps">
					<view class="right-taps-box" v-for="(item,index) in tapsList" :key='index'>
						<view class="left" @tap="onTaps(index)">
							<view class="empty"></view>
							<view class="real" v-show="index == tapsNum"></view>
						</view>
						<view class="right">
							<text>{{item.title}}</text>
						</view>
					</view>
				</view>
				
				<view class="from">
					<view class="from-input">
						<view class="title">{{languageInfo.fiveTitle2}}</view>
						<view class="count" v-show="tapsNum === 0">
							<view class="left" @tap="onReduce">-</view>
							<view class="content">
								<input class="content-input" type="number" :value="price" @input='getPrice'/>
							</view>
							<view class="right" @tap="onPlus">+</view>
						</view>
						<text class="low" v-show="tapsNum === 1">{{languageInfo.marketR_Title1Low}}</text>
					</view>
					<view class="from-input">
						<view class="title">{{languageInfo.marketR_Title2}}</view>
						<view class="input">
							<input class="left" type="number" @input='getNumber' value="" :placeholder="p" placeholder-style='color:#7A8AAE'/>
							<text class="right">TLK</text>
						</view>
					</view>
				</view>
				
				<view class="usable">
					<view class="left">{{languageInfo.marketR_Ava1}} {{balance}} {{type}}</view>
					<view class="right">{{languageInfo.marketR_Ava2}}</view>
				</view>
				<view class="right-bottom-box">
					<view class="turnover">
						<text class="left">{{languageInfo.marketR_BottomVal}}</text>
						<text class="mid">{{total}}</text>
						<text class="right">CUB</text>
					</view>
					<view class="buy" :class="{'tapsActive':taps,'tapsActive2':!taps}">
						<text class="buy-copy" @tap="poshEntryOrder">{{taps? languageInfo.marketBuy:languageInfo.marketSell}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue';
	import myTaps from '@/components/myTaps.vue';
	import nextButton from '@/components/nextButton.vue';
	import np from '@/util/np.js'
	export default{
		components:{tabTop,myTaps,nextButton},
		
		onShow(){
			this.getData();
			this.taps = this.$store.state.market_type;
			this.languageInfo = this.linkTo.showLanguage();
			this.bottomTaps[0].title = this.languageInfo.marketLeftTaps1;
			this.bottomTaps[1].title = this.languageInfo.marketLeftTaps2;
			this.tapsList[0].title = this.languageInfo.marketRightTaps1;
			this.tapsList[1].title = this.languageInfo.marketRightTaps2;
			this.p = this.languageInfo.marketR_Title2Val;
		},
		data(){
			return{
				p:'',
				languageInfo:{},
				taps:true,
				balance:0,
				type:'CUB',//货币类型
				curve:'',//汇率
				tapsNum:0,
				bottomTapsNum:0,
				price:0,
				total:0,
				number:0,//数量
				market_price:0,//市场价
				bottomTaps:[
					{
						title:'五档'
					},
					{
						title:"明细"
					}
				],
				tapsList:[
					{
						title:"限价",
 					},
					{
						title:"市价"
					}
				],
				lists:{
					list1:[],
					list2:[{
						trade_price:0
					}],
					list3:[],
				}
			}
		},
		computed:{
			getDate(){
				return date => {
					const newDate = new Date(date * 1000);
					const h = newDate.getHours();
					const m = newDate.getHours();
					const setH = h < 10 ? '0' + h:h;
					const setM = m < 10 ? '0' + m:m;
					return setH + ':' + setM;
				}
			}
		},
		methods:{
			navMarketDetails(){
				uni.navigateTo({
					url:'../marketDetails/marketDetails'
				})
			},
			checkout(bol){
				this.taps = bol;
				if(this.taps){
					this.balance = this.$store.state.cub.num;
					this.type = 'CUB';
				}else{
					this.balance = this.$store.state.tlk.num;
					this.type = 'TLK';
				}
			},
			onTaps(index){
				this.tapsNum = index;
				if(this.tapsNum == 0){
					this.getTotal(this.price,this.number);
				}else{
					this.getTotal(this.market_price,this.number);
				}
				console.log(this.total)
			},
			onBottomTaps(index){
				this.bottomTapsNum = index;
				this.getData(index+1,index+2)
			},
			getPrice(ev){
				this.price = ev.detail.value;
				if(ev.detail.value === '' || 
				   ev.detail.value === null || 
				   ev.detail.value === undefined ||
				   ev.detail.value < 0){
					this.price = 0;
				};
				this.getTotal(this.price,this.number);
			},
			getNumber(ev){
				this.number = ev.detail.value;
				if(this.tapsNum == 0){
					this.getTotal(this.price,this.number);
				}else{
					this.getTotal(this.market_price,this.number);
				}
			},
			getTotal(num1,num2){
				//总数
				this.total = 0;
				this.total = np.times(num1,num2)
			},
			onPlus(){
				this.price = np.plus(this.price,.001);
				this.getTotal(this.price,this.number);
			},
			onReduce(){
				const num = np.minus(this.price,.001);
				this.price = num < 0? 0:num;
				this.getTotal(this.price,this.number);
			},
			getNew(type,id){
				this.get('api/newTransfer',{type})
				.then(res => {
					this.lists['list'+id] = res.data.res;
					if(res.data.res[0]){
						this.price = res.data.res[0].trade_price;
					}
				})
			},
			getExchange(){
				//汇率
				this.get('api/tlkExchange')
				.then(res=>{
					console.log(res);
					this.curve = res.data.res.curve;
				})
			},
			getData(type,id){
				if(type === 1 ){
					this.get('api/handicap')
					.then(res => {
						this.lists.list1 = res.data.res
					});
				}
				this.getNew(type,id);
			},
			getBalance(){
				//获取最新钱包金额
				this.get('api/gameWallet')
				.then(res => {
					console.log(res);
					this.lists = res.data.res;
					for(let i=0;i<this.lists.length;i++){
						if(this.lists[i].currency_id == 1){
							this.$store.commit('SET_TLK',this.lists[i]);
							console.log(this.$store.state.tlk)
						}else if(this.lists[i].currency_id == 2){
							this.$store.commit('SET_CUB',this.lists[i]);
							console.log(this.$store.state.cub)
						}
					}
					
				})
			},
			getMarketPrice(){
				this.get('api/marketPrice')
				.then(res =>{
					this.market_price = res.data.res.market_price;
					console.log(res)
				})
			},
			showToast(val){
				uni.showToast({
					title:val,
					icon:'none'
				})
			},
			poshEntryOrder(){
				const data = {
					type:this.taps? 1 :2,
					entrust_num:this.number,
					entrust_money:this.total,
				};
				if(this.taps){
					if(this.price <=0 || this.price ==='' || this.price === undefined || this.price ===null){
						//价格没填，返回；
						this.showToast('请填写价格！');
						return
					}
					data.entrust_price = this.price;
				}
				if(this.number <=0 || this.number ==='' || this.number === undefined || this.number ===null){
					//没填数量直接返回；
					this.showToast('请填写数量！');
					return
				}else if(this.total <=0 || this.total ==='' || this.total === undefined || this.total ===null){
					//总金额为0返回
					this.showToast('交易额为0');
					return
				}
				if(this.taps){
					if(this.total > this.balance * 1){
						this.showToast('余额不足！');
						return
					}
				}else{
					if(this.number > this.balance * 1){
						console.log(this.number,this.balance)
						this.showToast('数量不够！');
						return
					}
				}
				
					
				this.post('api/entryOrder',data)
				.then(res => {
					this.showToast('交易成功！');
					this.getBalance()
				})
			}
		},
		
		mounted(){
			this.getData(1,2);
			this.getMarketPrice();
			this.getExchange();
			if(this.$store.state.cub.num){
				this.balance = this.$store.state.cub.num;
			};
			
		}
	}
</script>

<style lang="scss">
	.market{
		@include levelCen();
		@include bg();
		.market-top{
			@include size(710rpx,121rpx,none);
			background:linear-gradient(90deg,rgba(50,65,99,1) 0%,rgba(10,20,41,1) 100%);
			border-radius: 5rpx;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			padding-left: 60rpx;
			padding-right: 65rpx;
			.title{
				@include font(36rpx,#fff);
			}
			.number{
				margin-left: 11rpx;
				@include font(26rpx,#2DEAB7);
			}
			.taps{
				margin-left: auto;
			}
		}
		
		.taps-box{
			width: 100%;
			display: flex;
			justify-content: center;
			margin-bottom: 15rpx;
			margin-top: 30rpx;
			.taps{

				@include size(710rpx,56rpx,none);
				border: 1rpx #079D75 solid;
				box-sizing: border-box;
				.taps-title{
					@include size(50%,100%,none);
					@include cen();
					@include font(26rpx,#fff);
					float: left;
					box-sizing: border-box;
				}
			
			}
		}
		
		.information{
			display: flex;
			background:rgba(29,43,73,0.8);
			.information-left{
				@include size(356rpx,auto,none);
				min-height: 770rpx;
				// background:rgba(29,43,73,0.8);
				// padding-bottom: 19rpx;
				border-radius: 4rpx;
				border: 1rpx solid #5D72A4;

				box-sizing: border-box;
				position: relative;
				.title{
					@include size(100%,60rpx,none);
					@include font(26rpx,#2DE9B7);
					display: flex;
					justify-content: space-around;
					align-items: center;
					box-sizing: border-box;
					border-bottom: 1rpx #5D71A3 solid;
				}
				
				.newTransaction{
					height: 80rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					.newTransaction-left{
						@include font(26rpx,#CBCBCB);
					}
					.newTransaction-right{
						@include font(30rpx,#2DE9B7);
					}
				}
				
				.lists{
					.list{
						height: 55rpx;
						display: flex;
						justify-content: space-around;
						align-items: center;
						@include font(26rpx,#fff);
						box-sizing: border-box;
						border-bottom: .5rpx solid #5D71A3;
					}
				}
				
				.detailed-box{
					height: 50rpx;
					@include cen();
					// margin-top: 20rpx;
					position: absolute;
					bottom: 30rpx;
					left: 50%;
					transform: translateX(-50%);
					.detailed{
						@include size(270rpx,100%,none);
						@include font(26rpx,#fff);
						@include cen();
						.detailed-left{
							@include cen();
							@include size(50%,100%,#535F81);
							border-radius: 4rpx;
						}
						.detailed-right{
							@include cen();
							@include size(50%,100%,#535F81);
							border-radius: 4rpx;
						}
					}
				}
			}
			
			.information-right{
				@include size(356rpx,auto,none);
				padding-bottom: 19rpx;
				border-radius: 4rpx;
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: center;
				min-height: 770rpx;
				position: relative;
				.right-taps{
					width: 100%;
					display: flex;
					align-items: center;
					justify-content:space-around;
					margin-top: 28rpx;
					.right-taps-box{
						display: flex;
						align-items: center;
						.left{
							position: relative;
							@include size(31rpx,31rpx,none);
							.empty{
								@include size(31rpx,31rpx,none);
								background-image: linear-gradient(#2DE9B7,#2D6FD5);
								box-sizing: border-box;
								-webkit-mask: radial-gradient(transparent 13rpx, #000 14rpx);
								border-radius: 50%;
								position: absolute;
							}
							.real{
								@include size(17rpx,17rpx,none);
								background-image: linear-gradient(#2DE9B7,#2D6FD5);
								border-radius: 50%;
								position: absolute;
								left: 50%;
								top: 50%;
								transform:translate(-50%,-50%);
								z-index: 10;
							}
						}
						.right{
							@include font(26rpx,#fff);
							margin-left: 10rpx;
						}
					}
				}
				
				.from{
					display: flex;
					flex-direction: column;
					align-items: center;
					.from-input{
						@include size(286rpx,auto,none);
						.low{
							display: block;
							@include cen();
							border: 1rpx solid #5D71A4;
							box-sizing: border-box;
							@include size(286rpx,70rpx,#1D2B49);
							@include font(26rpx,#fff);
						}
						.title{
							@include size(286rpx,83rpx,none);
							@include font(26rpx,#fff);
							display: flex;
							align-items: center;
						}
						.count{
							@include size(286rpx,70rpx,#1D2B49);
							border: 1rpx solid #5D71A4;
							box-sizing: border-box;
							@include font(26rpx,#fff);
							display: flex;
							.left{
								@include size(69rpx,69rpx,#303E61);
								@include cen();
							}
							.content{
								flex: 1;
								box-sizing: border-box;
								border-right: 1rpx solid #5D71A4;
								border-left: 1rpx solid #5D71A4;
								@include cen();
								.content-input{
									@include size(100%,100%,none);
									@include font(26rpx,#fff);
									@include cen();
									text-align: center;
								}
							}
							.right{
								@include size(69rpx,69rpx,#303E61);
								@include cen();
							}
						}
						.input{
							@include size(286rpx,70rpx,#1D2B49);
							border: 1rpx solid #5D71A4;
							box-sizing: border-box;
							@include font(24rpx,#fff);
							display: flex;
							box-sizing: border-box;
							padding-left: 20rpx;
							padding-right: 20rpx;
							align-items: center;
							justify-content: space-between;
							.left{
								height: 100%;
								width: 150rpx;
								@include font(26rpx,#fff);
							}
							.right{
								@include font(26rpx,#fff)
							}
						}
						
					}
				}
				
				
				.usable{
					@include size(286rpx,57rpx,none);
					display: flex;
					justify-content: space-between;
					align-items: center;
					.left{
						@include font(16rpx,#A9A9A9);
					}
					.right{
						@include font(16rpx,#2CDEAF);
					}
				}
				
				
				.right-bottom-box{
					margin-top: auto;
					.turnover{
						//交易额
						@include size(286rpx,57rpx,none);
						display: flex;
						align-items: center;
						justify-content: space-between;
						.left{
							@include font(18rpx,#A9A9A9)
						}
						.mid{
							@include font(24rpx,#2DE9B7);
							margin-left: auto;
						}
						.right{
							@include font(18rpx,#A9A9A9)
						}
					}
					
					.buy{
						@include size(286rpx,67rpx,none);
						border-radius: 4rpx;
						@include font(24rpx,#fff);
						@include cen();
						align-self: auto;
					}
				}
				
			}
		}
		.tapsActive{
			background: linear-gradient(to right,#2A65BC,#079D74);
		}
		.tapsActive2{
			background: linear-gradient(to right,#9449E7,#136BBD);
		}
		.bottomTapsActive{
			background: #3B4769 !important;
		}
	}
</style>
