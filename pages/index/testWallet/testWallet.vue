<template>
	<view class="testWallet">
		<!--验证备份-->
		<tabTop left-icon="back" :title="languageInfo.testBackups" :open='false' />
		<view class="text">
			<text>{{languageInfo.testBackupsVal}}</text>
		</view>
		<view class="push-box">
			<view class="list" v-for="(item,index) in pushLists" :key='index'>
				{{item.word}}
				<view class="hide" v-if="item" @tap="hide(index)">X</view>
			</view>
		</view>
		<view class="push-box show-box">
			<view class="list" v-for="(item,index) in showLists" v-if="index < 12 && item" :key='index' @tap="push(index)" >
				{{item.word}}
			</view>
		</view>
		<nextButton :bottom='true' msg='完成' @next='next' :msg='languageInfo.nextComplete'/>
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue';
	import nextButton from '@/components/nextButton.vue';
	export default{
		components: {tabTop,nextButton},
		data(){
			return{
				languageInfo:{},
				pushLists:[],
				showLists:[]
			}
		},
		onShow(){
			this.languageInfo = this.linkTo.showLanguage();
			console.log(this.lists)
		},
		methods:{
			push(index){
				if(this.pushLists.length > 11) return;
				this.showLists[index].index= index;
				this.pushLists.push(this.showLists[index]);
				delete this.showLists[index];
			},
			hide(index){
				const len = this.showLists.length;
				if(!len){
					this.showLists.push(this.pushLists[index]);
					return
				};
				const oldIndex = this.pushLists[index].index;
				this.$set(this.showLists,oldIndex,this.pushLists[index]);
				this.$nextTick(()=>{
					this.pushLists.splice(index,1)
				})
				
			},
			getWord(){
				if(!this.$store.state.words.res) return;
				const lists = JSON.parse(JSON.stringify(this.$store.state.words.res));
				let len = lists.length;
				let temp = lists.length
				const newArr = [];
				for(let i =0;i<len;i++){
					const index = Math.floor(Math.random() * temp);
					temp --;
					newArr.push(lists[index]);
					lists.splice(index,1);
				}
				// this.pushLists = this.$store.state.words.res;
				this.showLists = newArr;
			},
			postRegister(){
				const len = this.pushLists.length;
				let word = '';
				for(let i=0;i<len;i++){
					if(i === len -1 ){
						word+= this.pushLists[i].id;
					}else{
						word+= this.pushLists[i].id + ',';
					}
				};
				const data = {
					word,
					word_id:this.$store.state.words.word_id,
					nickname:this.$store.state.formData.nickname,
					pwd:this.$store.state.formData.pwd,
					confirm_pwd:this.$store.state.formData.confirm_pwd,
					imei:uni.getStorageSync('uuid'),
				}
				console.log(data)
				this.post('api/register',data)
				.then(res => {
					console.log(res)
					uni.setStorageSync('token',res.data.res.token);
					const token = uni.getStorageSync('token');
					console.log(token)
					uni.switchTab({
						url:"../index"
					});
					
				})
			},
			next(){
				const len = this.pushLists.length;
				if(len < 12){
					uni.showToast({
						title:this.languageInfo.testFail + '!',
						icon:'none'
					});
					return
				}
				for(let i =0;i<len;i++){
					if(this.pushLists[i].id !== this.$store.state.words.res[i].id){
						uni.showToast({
							title:this.languageInfo.testFail + '!',
							icon:'none'
						});
						return
					}
				};
				this.postRegister();
			}
		},
		mounted(){
			// this.pushLists = this.$store.state.words.res;
			this.getWord()
		}
	}
</script>

<style lang="scss" scoped>
	.testWallet{
		@include levelCen();
		@include bg()
		.text{
			width: 100%;
			box-sizing: border-box;
			padding-left: 33rpx;
			padding-top: 57rpx;
			padding-bottom: 29rpx;
			@include font(24rpx,#fff);//白色
			
		}
		.push-box{
			@include size(680rpx,360rpx,#1D2B49);
			border-radius: 10rpx;
			background: rgba(29,43,73,.8);
			box-sizing: border-box;
			padding-right: 10rpx;
			padding-top: 5rpx;
			.list{
				position: relative;
			}
			.hide{
				position: absolute;
				// border: 1rpx solid #fff;
				box-sizing: border-box;
				@include size(30rpx,30rpx,none);
				border-radius: 50%;
				right: 0;
				top: -15rpx;
				font-size: 18rpx;
				@include cen()
			}
		}
		.push-box>view:nth-of-type(3n+1){
			margin-left: 41rpx;
		}
		.show-box{
			background: none;
			padding-top: 17rpx;
			.list:before{
				display: none;
			}
		}
		.list{
			@include size(160rpx,50rpx,black);
			box-sizing: border-box;
			border: #2DE9B7 1rpx solid;
			border-radius: 25rpx;
			@include font(24rpx,#fff);
			@include cen();
			margin-top: 30rpx;
			margin-left: 60rpx;
			float: left;
		}
		
	}

</style>
