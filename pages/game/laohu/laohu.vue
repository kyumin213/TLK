<template>
	<view class="lion">
		<view class="lion-box">
			<!--狮子王匹配页面-->
			<view class="head">
				<view class="left">
					<view class="user1" @tap="seeUser">
						<image src="~@/static/game/user.png" mode="widthFix"></image>
						<text>USER</text>
					</view>
					<view class="jdt">
						<text>{{tlkNum}}</text>
					</view>
					<view class="tcny">
						<text>{{cubNum}}</text>
					</view>
				</view>
				<view class="right">
					<image src="~@/static/game/tuichu.png" @tap="goBack" mode="widthFix" style="width: 60rpx;"></image>
				</view>
			</view>
			<!-- 游戏界面 -->
			<view class="game-Box">
				<!--游戏LOGO-->
				<view class="game-Logo"></view>

				<!--低倍场-->
				<view class="game-low" @tap="goTo('./gameDeatil/gameDeatil')">
					<view class="game-taps">
						{{languageInfo.lowPowerField}}
					</view>
					<view class="game-val">
						{{languageInfo.bottomNote}}：100CUB
					</view>
					<view class="game-val2">
						{{languageInfo.test10}}
					</view>
					<view class="game-icon"></view>
					<view class="game-bottom">
						{{gl.matching}}
					</view>
				</view>
				<!--高倍-->
				<view class="game-height" @tap="goTo()">
					<view class="game-taps game-tapsActive">
						{{languageInfo.highPowerField}}
					</view>
					<view class="game-val game-ValActive">
						{{languageInfo.bottomNote}}：200CUB
					</view>
					<view class="game-val2 game-ValActive">
						{{languageInfo.test11}}
					</view>
					<view class="game-icon2"></view>
					<view class="game-bottom game-bottomActive">
						{{gl.matching}}
					</view>
				</view>

			</view>

			<view class="bottom">
				<!-- 合约特权按钮 -->
				<image v-if="lang=='zh-cn'" src="~@/static/game/heyue.png" @tap="seeTequan" class="heyue" mode="widthFix"></image>
				<image v-if="lang=='en-us'" src="~@/static/game/vip-en.png" @tap="seeTequan" class="heyue" mode="widthFix"></image>
				<image v-if="lang=='ja-jp'" src="~@/static/game/vip-jp.png" @tap="seeTequan" class="heyue" mode="widthFix"></image>
				<image v-if="lang=='ko-kr'" src="~@/static/game/vip-kr.png" @tap="seeTequan" class="heyue" mode="widthFix"></image>
				<!-- 邀请绑定按钮 -->
				<image v-if="lang=='zh-cn'" src="~@/static/game/yaoqing.png" @tap="seeYaoqing" mode="widthFix"></image>
				<image v-if="lang=='en-us'" src="~@/static/game/bindIcon-en.png" @tap="seeYaoqing" mode="widthFix"></image>
				<image v-if="lang=='ja-jp'" src="~@/static/game/bindIcon-jp.png" @tap="seeYaoqing" mode="widthFix"></image>
				<image v-if="lang=='ko-kr'" src="~@/static/game/bindIcon-kr.png" @tap="seeYaoqing" mode="widthFix"></image>
				<!-- 游戏记录按钮 -->
				<image v-if="lang=='zh-cn'" src="~@/static/game/youxi.png" @tap="seeYouxi" mode="widthFix"></image>
				<image v-if="lang=='en-us'" src="~@/static/game/rec-en.png" @tap="seeYouxi" mode="widthFix"></image>
				<image v-if="lang=='ja-jp'" src="~@/static/game/rec-jp.png" @tap="seeYouxi" mode="widthFix"></image>
				<image v-if="lang=='ko-kr'" src="~@/static/game/rec-kr.png" @tap="seeYouxi" mode="widthFix"></image>
				<!-- 设置按钮 -->
				<image v-if="lang=='zh-cn'" src="~@/static/game/shezhi.png" @tap="seeSetting" mode="widthFix"></image>
				<image v-if="lang=='en-us'" src="~@/static/game/setIcon-en.png" @tap="seeSetting" mode="widthFix"></image>
				<image v-if="lang=='ja-jp'" src="~@/static/game/setIcon-jp.png" @tap="seeSetting" mode="widthFix"></image>
				<image v-if="lang=='ko-kr'" src="~@/static/game/setIcon-kr.png" @tap="seeSetting" mode="widthFix"></image>
			</view>

			<!--用户-->
			<view class="user" v-show="userIf">
				<view class="box" :class="{'personEn':lang=='en-us','personJp':lang=='ja-jp','personKr':lang=='ko-kr'}">
					<view class="top">
						<image src="~@/static/game/user.png" mode="widthFix"></image>
						<view class="">
							<text>{{languageInfo.nickname}}：{{userObj.nickname}}</text>
							<text>{{languageInfo.accountID}}：{{userObj.ID}}</text>
						</view>
						<view class="">
							<text>{{languageInfo.user}}：{{userObj.level}}</text>
							<text>{{gl.minersReward}}：{{userObj.bonus_coefficient}}%</text>
						</view>
					</view>
					<view class="center">
						<view class="jdt">
							<text>{{tlkNum}}</text>
						</view>
						<view class="tcny">
							<text>{{cubNum}}</text>
						</view>
					</view>
					<view class="di">
						<view class="">
							<text>{{languageInfo.totalGamesPlayed}}：{{userObj.gameTotal}}</text>
							<text>{{languageInfo.winningAuctionRate}}：{{userObj.winRate}}%</text>
						</view>
						<view class="">
							<text>{{languageInfo.numberOfGamesAvailableToday}}：{{userObj.lun_num}}</text>
							<text>{{languageInfo.gamesCompletedToday}}：{{userObj.today_num}}</text>
						</view>
					</view>
					<view class="x" @tap="close">
						<image src="~@/static/game/x.png" mode="widthFix"></image>
					</view>
				</view>
			</view>


			<!--特权-->
			<view class="tequan" v-show="tequanIf">
				<view class="item" :class="{'vipEn':lang=='en-us','vipJp':lang=='ja-jp','vipKr':lang=='ko-kr'}">
					<view class="top">
						<view class="left">
							<text>{{languageInfo.contractGrade}}</text>
							<image src="~@/static/game/svip.png" mode="widthFix"></image>
							<text style="color: #FFD278;">{{heyueObj.contract_grade}}</text>
						</view>
						<view class="right">
							<text>{{languageInfo.gamesCompletedToday}}：{{heyueObj.today_num}}{{gl.contractNum}}</text>
						</view>
					</view>
					<view class="text"><text>{{languageInfo.contractDailyGameNumberGift}}：{{heyueObj.day_num}}{{gl.contractNum}}</text></view>
					<view class="text"><text>{{languageInfo.contractExpirationTime}}：{{heyueObj.expire_time}}</text></view>
					<view class="btn" @tap="suocang"><text>{{languageInfo.test13}}</text></view>
					<view class="guize"><text>{{languageInfo.contractRules}}</text>
						<image @tap="seeGuize" src="~@/static/game/wenhao.png" mode="widthFix"></image>
					</view>
					<view class="x" @tap="closeTequan">
						<image src="~@/static/game/x.png" mode="widthFix"></image>
					</view>
				</view>
			</view>

			<view class="suocang" v-show="suocangIf">
				<view class="item" :class="{'ruleEn':lang=='en-us','ruleJp':lang=='ja-jp','ruleKr':lang=='ko-kr'}">
					<view class="top">
						<text>{{languageInfo.lockUpAmount}}</text>
						<view class="select" @tap="seeSelect">
							<view>{{selectText}}</view>
							<image src="../../../static/game/sanjiao.png" mode="widthFix"></image>
						</view>
						<view class="select_item" v-show="selectIf">
							<text v-for="(item,index) in selectList" :key="index" @tap="closeSelect(item)">{{item.tlk_num + ' TLK'}}</text>
						</view>
					</view>
					<view class="yue"><text>{{languageInfo.availableBalance}}：{{yue}}</text></view>
					<view class="suoding" @tap="suoding"><text>{{languageInfo.lockUp}}</text></view>
					<view class="jilu">
						<text class="jilu_title">{{languageInfo.lockUpRecord}}</text>
						<view class="child">
							<view class="jilu_bk">
								<text>{{languageInfo.lockTime}}</text>
								<text>{{languageInfo.lockUpAmount}}</text>
							</view>
							<view class="list" v-for="(item,index) in suoList" :key="index">
								<text>{{item.add_time}}</text>
								<text>{{item.lock_num*1}}</text>
							</view>

						</view>
					</view>
					<view class="back" @tap="backSuoCang">
						<image src="~@/static/game/back.png" mode="widthFix"></image>
					</view>
					<view class="x" @tap="closeSuoCang">
						<image src="~@/static/game/x.png" mode="widthFix"></image>
					</view>
				</view>
			</view>

			<!--分享-->
			<view class="share" v-show="yaoqingIf">
				<view class="item" :class="{'bindEn':lang=='en-us','bindJp':lang=='ja-jp','bindKr':lang=='ko-kr'}">
					<view class="x" @tap="closeYaoqing">
						<image src="~@/static/game/x.png" mode="widthFix"></image>
					</view>
					<view class="left-icon" v-show="bindId === 1 || bindId===2" @tap="nextBind(0)"></view>
					<view class="add" v-show="bindId === 1">
						{{gl.addBind}}
					</view>
					<view class="code" v-show="bindId === 1">
						<view class="code-left">{{gl.getCode}}</view>
						<view>
							<input type="text" value="" @input='getValue' />
						</view>
					</view>
					<view class="msg" v-show="bindId === 0">
						<view class="msg-left"><text>{{languageInfo.myInvitationCode}}</text></view>
						<view class="msg-right">
							<view>
								<text>{{shareObj.inviteCode}}</text>
								<text @tap="copy">{{languageInfo.copy}}</text>
							</view>
						</view>
					</view>
					<view class="msg" v-show="bindId === 0">
						<view class="msg-left">
							<text>{{languageInfo.invitationRelationship}}</text>
						</view>
						<view class="msg-right" v-if="shareObj.is_bind !==1">
							<text @tap="nextBind(1)">{{gl.unbind}}</text>
						</view>
						<view class="msg-right" v-if="shareObj.is_bind ===1">
							<text>{{gl.bound}}</text>
						</view>

					</view>
					<!--邀请绑定-->
					<view class="msg" v-show="bindId === 0">
						<view class="msg-left">
							<text>{{gl.myCommunity}}：{{shareObj.team}}</text>
						</view>
						<view class="msg-right">
							<view class="people">
								<view class="peo1">
									<view class="peo1-img"></view>
									<text>{{shareObj.direct}}{{gl.people}}</text>
								</view>
								<view class="peo1">
									<view class="peo1-img2"></view>
									<text>{{shareObj.indirect}}{{gl.people}}</text>
								</view>
							</view>
						</view>
					</view>
					<!--推广记录-->
					<view class="promote" v-show="bindId === 2">
						<text>{{gl.earned}}：</text>
						<text>{{pandReward.total}} TLK </text>
					</view>
					<view class="promote" v-show="bindId === 2">
						<text>{{gl.accumulated}}：</text>
						<text>{{pandReward.tickets}} TLK</text>
					</view>
					<view class="promote" v-show="bindId === 2">
						<text>{{gl.time}}</text>
						<text>{{gl.amount}}</text>
					</view>
					<scroll-view @scrolltolower='getPersonScroll' class="promote-scroll" scroll-y="true" v-show="bindId === 2">
						<view class="scroll-list" v-for="(item,index) in this.promotionList">
							<text>{{item.add_time}}</text>
							<text>{{item.num}}</text>
						</view>
					</scroll-view>

					<view class="next" v-show="bindId === 1" @tap="postBindUser">
						{{gl.confirmBinding}}
					</view>
					<view class="next" @tap="nextBind(2)" v-show="bindId === 0">
						{{gl.rewards}}>>
					</view>
				</view>
			</view>
			<view class="history" v-show="historyIf">
				<view class="item">
					<view class="back" @tap="backHistory">
						<image src="../../../static/game/back.png" mode="widthFix"></image>
					</view>
					<view class="x" @tap="closeHistory">
						<image src="../../../static/game/x.png" mode="widthFix"></image>
					</view>
					<view class="msg">
						<text>{{languageInfo.accumulatedIncome}}</text>
						<text>{{total}} TLK</text>
					</view>
					<view class="msg">
						<text>{{languageInfo.test16}}</text>
						<text>{{tickets}} TLK</text>
					</view>
					<view class="msg">
						<text>{{languageInfo.user}}</text>
						<text>{{languageInfo.amountOfMoney}}</text>
					</view>

					<view class="list" v-for="(item,index) in tuiGuangList" :key="index">
						<text>{{item.nickname}}</text>
						<text>{{item.num}}JDT </text>
					</view>

				</view>
			</view>

			<!--游戏记录-->
			<view class="youxi" v-show="youxiIf">
				<view class="item" :class="{'enBg':lang=='en-us','jpBg':lang=='ja-jp','krBg':lang=='ko-kr'}">
					<view class="x" @tap="closeYouxi">
						<image src="~@/static/game/x.png" mode="widthFix"></image>
					</view>
					<view class="msg">
						<text>{{languageInfo.time}}</text>
						<text>{{languageInfo.stake}}</text>
						<text>{{languageInfo.reward}}</text>
					</view>

					<scroll-view class="list-box" :scroll-y='true' @scrolltolower="getLoad">
						<view class="list" v-for="(item,index) in historyList" :key="index">
							<text>{{item.add_time}}</text>
							<text class="mid">{{languageInfo.ticketRebate}}</text>
							<text>{{item.money}} {{item.currency_name}} </text>
						</view>
					</scroll-view>

				</view>
			</view>
			<!-- 游戏设置 -->
			<view class="setting" v-show="settingIf">
				<view class="item" :class="{'setEn':lang=='en-us','setJp':lang=='ja-jp','setKr':lang=='ko-kr'}">
					<view class="x" @tap="closeSetting">
						<image src="~@/static/game/x.png" mode="widthFix"></image>
					</view>
					<view class="check">
						<text>{{languageInfo.bgm}}</text>
						<view class="check_btn">
							<view :class="[!audioIf?'active':'']" @tap="setSet(false)"><text v-show="audioIf">ON</text></view>
							<view :class="[audioIf?'active':'']" @tap="setSet(true)"><text v-show="!audioIf">OFF</text></view>
						</view>
					</view>
				</view>
			</view>
			<!-- 弹窗横屏提示 -->
			<view class="noYetTip" v-show="jsonMsgShow">
				{{jsonMsg}}
			</view>
		</view>
	</view>
</template>

<script>
	var innerAudioContext = uni.createInnerAudioContext();
	export default {
		data() {
			return {
				lang: '',
				jsonMsgShow: false, //游戏错误返回提示
				jsonMsg: '',
				userIf: false,
				tequanIf: false,
				guizeIf: false,
				suocangIf: false,
				selectIf: false,
				yaoqingIf: false,
				historyIf: false,
				youxiIf: false,
				settingIf: false,
				audioIf: false,
				test: true,
				historyList: [], //游戏记录
				languageInfo: {},
				selectList: [],
				suoList: [],
				heyueObj: {},
				shareObj: {},
				tuiGuangList: [],
				selectText: '请选择',
				userObj: {},
				tlkNum: '',
				cubNum: '',
				yue: '',
				tickets: '',
				total: '',
				sockerFlog: false,
				bindId: 0, //绑定区域切换
				bindCode: "", //邀请码
				gamePage: 1, //游戏记录页数
				loadOpen: true, //滚动开关
				contract: [], //h合约数组
				promotionPage: 1, //推广页数
				promotionPageNum: 10, //推广页数
				promotionOpen: true, //首次点击获取推广页数，只执行一次！
				promotionList: [], //列表
				gl: {}, //游戏翻译语言
				pandReward: {
					//个人推广奖励
					total: 0,
					tickets: 0
				}
			};
		},
		onLoad() {
			this.plays();
			this.lang = uni.getStorageSync('lang')
			console.log(this.lang)
		},
		mounted() {

			// let d = uni.getStorageSync('languageType');
			// this.$next('game/recharge/recharge')
			this.selectText = this.gl.choose;
			this.get('api/myGameLog', {
				rowNum: 15
			}).then((res) => {
				console.log(res)
				this.historyList = res.data.res.data;
			}) //游戏记录
			this.get('api/contract', {}).then((res) => {
				this.selectList = res.data.res;
			}) //合约列表
			this.get('api/myContract', {}).then((res) => {
				// console.log(res)

				this.suoList = res.data.res
			}) //合约记录
			this.get('api/myContractDetails', {}).then((res) => {
				console.log(res)
				this.heyueObj = res.data.res;
			}) //合约详情
			this.get('api/inviteBindingDetails', {}).then((res) => {
				this.shareObj = res.data.res;
				console.log(this.shareObj)
			}) //邀请绑定
			this.get('api/personExpandLog', {
				expand_type: 1
			}).then((res) => {
				// console.log(res)
				this.tuiGuangList = res.data.res.data;
			}) //个人推广记录
			this.get('api/myGameDetails', {}).then((res) => {
				// console.log(res)
				this.userObj = res.data.res;
			}) //个人推广记录
			this.get('api/gameWallet', {}).then((res) => {
				res.data.res.forEach((val, ind) => {
					if (val.currency_id === '1') {
						this.tlkNum = val.num;
					} else if (val.currency_id === '2') {
						//为什m么*2
						this.cubNum = val.num;
					}
				})
			}) //游戏钱包
			this.get('api/myGameExpandReward', {}).then((res) => {
				this.tickets = res.data.res.tickets;
				this.total = res.data.res.total;
			}) //我的推广奖励

		},
		onHide() {
			// setTimeout(()=>{
			// // #ifdef APP-PLUS
			// 	plus.screen.lockOrientation('portrait-primary');
			// // #endif
			// },1000)
		},
		onShow() {
			this.languageInfo = this.linkTo.showLanguage();
			this.gl = this.linkTo.getGameLanguage();
			console.log(this.gl)

		},
		onBackPress(options) {
			const ws = getApp().globalData.socketTaskFnc;
			getApp().globalData.socketTaskType = false;
			innerAudioContext.pause();
			this.$store.commit('SET_ONBACK', true);

			if (options.from === 'backbutton') {
				//安卓物理返回
				uni.navigateBack({
					delta: 1
				});
				return true
			} else {
				return false
			};
			ws.close();
		},
		methods: {
			getPandReward() {
				//获取我的推广奖励
				this.get('api/myGameExpandReward')
					.then(res => {
						console.log(res)
						this.pandReward = res.data.res;
						console.log(this.pandReward)
					})
			},
			getPersonInit() {
				//获取个人推广记录
				//首次进入执行完毕，返回
				this.getPandReward();
				if (!this.promotionOpen) return;
				this.getPersonScroll();

			},
			getPersonScroll() {
				//获取个人推广记录(滚动)
				const data = {
					expand_type: 1,
					page: this.promotionPage,
					rowNum: this.promotionPageNum,
				}
				this.promotionPage++;
				this.get('api/personExpandLog', data)
					.then(res => {
						console.log(res);
						this.promotionList = res.data.res.data;
						this.promotionOpen = false;
					})
			},
			plays() {
				innerAudioContext.autoplay = true;
				innerAudioContext.loop = true
				innerAudioContext.src = 'http://8.129.172.166:8098/music/sl.mp3';
				innerAudioContext.play()
			},
			setSet(bool) {
				if (bool == false) {
					this.audioIf = true
					innerAudioContext.pause()
				} else if (bool == true) {
					innerAudioContext.play()
					this.audioIf = false
				}
			},
			getContract() {
				//获取合约规则
				this.get('api/contract')
					.then(res => {
						console.log(res)
						this.contract = res.data.res;
					})
			},
			getLoad() {
				//滚动条事件
				if (!this.loadOpen) return;
				this.gamePage++;
				this.get('api/myGameLog', {
						page: this.gamePage,
						rowNum: 15,
					})
					.then(res => {
						if (res.data.res.data.length === 0) {
							this.gamePage--;
							this.loadOpen = false;
							return;
						};
						this.historyList = this.historyList.concat(res.data.res.data);
						console.log(this.historyList)
					})
			},
			seeUser() {
				this.userIf = true;
			},
			getValue(e) {
				console.log(e)
				this.bindCode = e.detail.value;
			},
			postBindUser() {
				//绑定用户
				const data = {
					invite_code: this.bindCode
				};
				if (data === '') {
					uni.showToast({
						title: '请输入邀请码'
					})
				};
				this.post('api/bindUser', data)
					.then(res => {
						console.log(res)
						uni.showToast({
							icon:'success',
						});
						this.yaoqingIf = false;
						this.bindId = 0;
					})
			},
			close() {
				this.userIf = false;
			},
			closeTequan() {
				this.tequanIf = false;
			},
			seeTequan() {
				this.tequanIf = true;
				this.get('api/myContractDetails', {}).then((res) => {
					console.log(res);
				})
			},
			closeGuize() {
				// this.tequanIf = false;
				this.guizeIf = false;
			},
			seeGuize() {

				this.tequanIf = false;
				this.guizeIf = true;
				this.getContract();
			},
			back() {
				this.tequanIf = true;
				this.guizeIf = false;
			},
			suocang() {
				this.tequanIf = false;
				this.suocangIf = true;

			},
			seeSelect() {
				this.selectIf = true;
			},
			closeSelect(item) {
				console.log(item);
				this.selectIf = false;
				let {
					id,
					tlk_num
				} = item;
				this.yue = tlk_num;
				this.suocangId = id;
				this.selectText = item.tlk_num + ' TLK'
			},
			suoding() {
				let _this= this
				if (!_this.suocangId) {
					_this.jsonMsg = _this.languageInfo.thereOpenContract
					_this.jsonMsgShow = true
					setTimeout(()=>{
						_this.jsonMsgShow = false
					},2000)
					// this.linkTo.$noToast('请先选择')
					return;
				}
				this.post('api/buyContract', {
					contract_id: this.suocangId
				}).then((res) => {
					console.log(res)
				}) //购买合约
			},
			closeSuoCang() {
				this.suocangIf = false;
				this.tequanIf = false;
			},
			backSuoCang() {
				this.tequanIf = true;
				this.suocangIf = false;
			},
			getJson(data) {
				return JSON.parse(data);
			},
			copy() {
				uni.setClipboardData({
					data: `${this.shareObj.inviteCode}`,
					success: function() {
						console.log('success');
					}
				});
			},
			seeYaoqing() {
				this.yaoqingIf = true;
			},
			closeYaoqing() {
				this.yaoqingIf = false;
			},
			seeHistory() {
				this.yaoqingIf = false;
				this.historyIf = true
			},
			backHistory() {
				this.yaoqingIf = true;
				this.historyIf = false
			},
			closeHistory() {
				this.historyIf = false
			},
			seeYouxi() {
				this.youxiIf = true;
			},
			closeYouxi() {
				this.youxiIf = false;
			},
			seeSetting() {
				this.settingIf = true;
			},
			closeSetting() {
				this.settingIf = false;
			},

			showToast(val) {
				uni.showToast({
					title: val,
					icon: 'none'
				})
			},
			goTo(url) {
				let _this = this
				if (!url) {
					_this.jsonMsgShow = true
					_this.jsonMsg = _this.languageInfo.notYetOpen
					setTimeout(() => {
						_this.jsonMsgShow = false
					}, 2000)
					// this.linkTo.$noToast('暂未开放');
					return;
				};
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
						lang = 'zh-cn';
						break;
				}

				const WsOpen = getApp().globalData.socketTaskType;
				if (!WsOpen) {
					//开启WS
					const token = uni.getStorageSync('token');
					const val = `token=${token}&lang=${lang}&type=1`;
					getApp().globalData.socketTaskFnc = uni.connectSocket({
						url: 'ws://8.129.172.166:9502',
						success: (res) => {
							console.log('创建WS成功');
						},
						fail: (err) => {
							getApp().globalData.socketTaskType = false;
						}
					});

					//WS监听打开
					const ws = getApp().globalData.socketTaskFnc;
					ws.onOpen(res => {
						//这里有个坑：连续出发多个WS，该OPEN监听会无效
						getApp().globalData.socketTaskType = true;
						console.log('WS连接已经打开');
						console.log(val)
						//WS发送消息
						ws.send({
							data: val
						});
						// console.log(val)
					})

					//接收服务器信息
					ws.onMessage(res => {
						let _this = this
						const json = this.getJson(res.data);
						this.jsonMsg = json.msg
						// console.log(json)
						if (json.error != 0) {
							_this.jsonMsg = json.msg
							_this.jsonMsgShow = true
							setTimeout(() => {
								_this.jsonMsgShow = false
							}, 2000)
						} else {
							//等于0时，进入游戏
							this.$next('game/laohu/gameDeatil/gameDeatil');
						};
						if (json.winner) {
							let newJson = json.idData;
							newJson.push(json.winner);
							this.$store.commit('SET_WINNER', newJson);
							ws.close({
								code: 1000
							});
						}
					})

					//监听WS连接关闭
					ws.onClose(res => {
						console.log('WS已关闭')
						getApp().globalData.socketTaskType = false;
					})
				}
			},

			goBack() {
				//还有在游戏页面返回该值会true
				this.$store.commit('SET_ONBACK', true);
				uni.navigateBack({
					delta: 1
				})
			},
			nextBind(id) {
				//去绑定
				this.bindId = id;
				if (id == 2) {
					//推广记录
					this.getPersonInit()
				}

			},
			bangding() {
				this.get('api/bindUser', {
					invite_code: this.shareObj.inviteCode
				}).then((res) => {
					this.linkTo.$noToast(`${res.data.message}`);
					this.get('api/inviteBindingDetails', {}).then((res) => {
						this.shareObj = res.data.res;
						console.log(this.shareObj)
					}) //邀请绑定
				}) //邀请绑定
			}
		},
	}
</script>


<style lang="scss" scoped>
	// 自定义提示
	.noYetTip {
		padding: 10rpx 20rpx;
		background: rgba(0, 0, 0, .8);
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		color: #fff;
		font-size: 26rpx;
		border-radius: 8rpx;
	}

	.lion {
		width: 100vh;
		height: 100vw;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);

		.lion-box {
			width: 100vh;
			height: 100vw;
			background: rgba(0, 0, 0, .5);
			transform: rotate(90deg);
			transform-origin: 50% 50%;
			@include icon('~@/static/game/bg2.png');
		}

		//头部
		.head {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left {
				display: flex;
				flex-direction: row;
				align-items: center;
				background: url(~@/static/game/xingzhuang.png) no-repeat;
				background-size: cover;

				.user1 {
					display: flex;
					flex-direction: row;
					align-items: center;
					font-size: 25rpx;
					color: white;

					image {
						width: 90rpx;
						margin-right: 15rpx;
					}

					text {
						margin-right: 15rpx;
					}
				}

				.jdt {
					background: url(~@/static/game/tlkinp.png) no-repeat;
					background-size: cover;
					font-size: 26rpx;
					width: 400rpx;
					height: 80rpx;
					color: #FFF698;
					text-align: center;
					line-height: 80rpx;
					padding-right: 50rpx;
					margin-right: 30rpx;
				}

				.tcny {
					background: url(~@/static/game/cubinp.png) no-repeat;
					background-size: cover;
					font-size: 26rpx;
					width: 400rpx;
					height: 80rpx;
					color: #FFF698;
					text-align: center;
					line-height: 80rpx;
					padding-right: 50rpx;
					margin-right: 30rpx
				}
			}

			.right {
				display: flex;
				flex-direction: row;
				align-items: center;

				image {
					width: 80rpx;
					margin: 0 20rpx;
				}
			}
		}


		.child {
			.list {
				width: 100% !important;

				text {
					width: 50%;
					text-align: center;
				}
			}
		}

		.active {
			background: linear-gradient(0deg, rgba(233, 113, 37, 1) 0%, rgba(251, 239, 153, 1) 100%) !important;
		}

		.setting {
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
			// padding-top: 50rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.item {
				width: 969rpx;
				height: 641rpx;
				// width: 1000rpx;
				background: url(~@/static/game/setting.png) no-repeat;
				background-size: 100% 100%;
				position: relative;
				display: flex;
				flex-direction: column;
				padding-top: 160rpx;
				box-sizing: border-box;

				.check {
					display: flex;
					justify-content: center;
					align-items: center;
					color: white;
					width: 80%;
					margin: 0 auto;
					font-size: 24rpx;

					text {
						margin-right: 30rpx;
					}

					.check_btn {
						display: flex;
						flex-direction: row;
						align-items: center;

						// background:linear-gradient(0deg,rgba(233,113,37,1) 0%,rgba(251,239,153,1) 100%);
						view {
							background: #601405;
							border-radius: 4rpx;
							width: 90rpx;
							height: 45rpx;
							text-align: center;
							line-height: 48rpx;
						}
					}
				}
			}
			.setEn{
				width: 969rpx;
				height: 641rpx;
				background: url(~@/static/game/set-en.png) no-repeat;
				background-size: 100% 100%;
				position: relative;
				display: flex;
				flex-direction: column;
				padding-top: 160rpx;
				box-sizing: border-box;
			}
			.setJP{
				width: 969rpx;
				height: 641rpx;
				background: url(~@/static/game/set-jp.png) no-repeat;
				background-size: 100% 100%;
				position: relative;
				display: flex;
				flex-direction: column;
				padding-top: 160rpx;
				box-sizing: border-box;
			}
			.setKr{
				width: 969rpx;
				height: 641rpx;
				background: url(~@/static/game/set-kr.png) no-repeat;
				background-size: 100% 100%;
				position: relative;
				display: flex;
				flex-direction: column;
				padding-top: 160rpx;
				box-sizing: border-box;
			}
		}

		.youxi {
			position: absolute;
			top: 0;
			// transform: translateY(-50%);
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
			display: flex;
			justify-content: center;
			align-items: center;

			.item {
				width: 969rpx;
				height: 641rpx;
				overflow: auto;
				background: url(~@/static/game/youxi_bk.png) no-repeat;
				background-size: 100% 100%;
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				box-sizing: border-box;

				.msg {
					width: 520rpx;
					height: 44rpx;
					background: rgba(247, 172, 114, 1);
					border-radius: 4px;
					@include font(20rpx, #7F1E0B);
					font-weight: bold;
					display: flex;
					justify-content: space-around;
					align-content: center;
					margin-top: 140rpx;

					text {
						width: 33.33%;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}

				.list-box {
					@include size(520rpx, 300rpx, none);
					margin-top: 21rpx;
					overflow: auto;

					.list {
						@include size(100%, auto, none);
						@include font(24rpx, #FFFFFF);
						padding-top: 3rpx;
						padding-bottom: 3rpx;
						display: flex;
						justify-content: space-around;

						text {
							width: 33.33%;
							display: flex;
							align-items: center;
						}

						.mid {
							justify-content: center;
						}
					}
				}

			}

			.krBg {
				background: url(~@/static/game/kr-gameLog.png) no-repeat;
				width: 969rpx;
				height: 641rpx;
				overflow: auto;
				background-size: 100% 100%;
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				box-sizing: border-box;
			}

			.enBg {
				background: url(~@/static/game/en-gameLog.png) no-repeat;
				width: 969rpx;
				height: 641rpx;
				overflow: auto;
				background-size: 100% 100%;
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				box-sizing: border-box;
			}

			.jpBg {
				background: url(~@/static/game/jp-gameLog.png) no-repeat;
				width: 969rpx;
				height: 641rpx;
				overflow: auto;
				background-size: 100% 100%;
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				box-sizing: border-box;
			}

		}

		.history {
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
			display: flex;
			justify-content: center;

			.item {
				width: 1000rpx;
				background: url(../../../static/game/tuiguangjilu.png) no-repeat;
				background-size: 100% 85%;
				position: relative;
				display: flex;
				flex-direction: column;
				padding-top: 120rpx;
				box-sizing: border-box;

				.msg {
					width: 60%;
					margin: 10rpx auto;
					background: #F7AC72;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-radius: 5rpx;
					color: #7F1D0B;
					font-size: 26rpx;
					padding: 8rpx 0;
					font-weight: 600;

					text {
						width: 30%;
						text-align: center;
					}
				}

				.list {
					width: 65%;
					margin: 5rpx auto;
					display: flex;
					justify-content: space-between;
					align-items: center;
					color: white;
					font-size: 22rpx;
					padding: 8rpx 50rpx 8rpx 0;

					text {
						width: 30%;
						text-align: center;
						white-space: nowrap;
						overflow: hidden;
					}
				}

				.back {
					position: absolute;
					top: 50rpx;
					left: 110rpx;

					image {
						width: 50rpx;
					}
				}
			}
		}

		.x {
			position: absolute;
			top: 57rpx;
			right: 131rpx;

			image {
				width: 50rpx;
			}
		}

		.left-icon {
			@include size(39rpx, 39rpx, none);
			@include icon('~@/static/game/left.png');
			position: absolute;
			left: 108rpx;
			top: 57rpx;
		}

		.share {
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
			display: flex;
			justify-content: center;
			align-items: center;

			.item {
				width: 969rpx;
				height: 641rpx;
				overflow: auto;
				background: url(~@/static/game/bangding.png) no-repeat;
				background-size: 100% 100%;
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				box-sizing: border-box;
				padding-top: 140rpx;

				.promote {
					@include size(520rpx, 43rpx, #F7AC72);
					background: rgba(247, 172, 114, 1);
					border-radius: 4px;
					@include font(20rpx, #7F1E0B);
					font-weight: bold;
					display: flex;
					justify-content: space-between;
					align-items: center;
					box-sizing: border-box;
					padding-left: 40rpx;
					padding-right: 40rpx;
					margin-top: 21rpx;
				}

				.promote-scroll {
					@include size(520rpx, 170rpx, none);
					margin-top: 18rpx;

					.scroll-list {
						width: 100%;
						@include font(16rpx, #fff);
						display: flex;
						justify-content: space-between;
					}
				}

				.add {
					@include font(35rpx, #FFCF50);
					font-weight: bold;
				}

				.code {
					@include size(390rpx, 44rpx, #F7AC72);
					border-radius: 4rpx;
					display: flex;
					align-items: center;
					margin-top: 50rpx;
					@include font(20rpx, #7F1E0B);

					view {
						@include size(50%, 24rpx, none);
						@include cen();
						font-weight: bold;

						input {
							@include font(20rpx, #7F1E0B);
							@include cen();
							box-sizing: border-box;
							padding-left: 31rpx;
							padding-right: 31rpx;
						}
					}

					.code-left {
						border-right: 2rpx #7F1E0B solid;
					}
				}

				.next {
					@include size(390rpx, 58rpx, none);
					border-radius: 8rpx;
					background: linear-gradient(0deg, rgba(233, 113, 37, 1) 0%, rgba(252, 240, 154, 1) 100%);
					@include font(24rpx, #7F1E0B);
					@include cen();
					font-weight: bold;
					margin-top: 52rpx;
				}

				.msg {
					width: 520rpx;
					height: 44rpx;
					background: rgba(247, 172, 114, 1);
					border-radius: 4px;
					margin-top: 22rpx;
					display: flex;
					justify-content: space-around;
					align-items: center;
					font-weight: 600;
					@include font(20rpx, #7F1E0B);

					.msg-left {
						width: 50%;
						display: flex;
						align-items: center;
						box-sizing: border-box;
						padding-left: 39rpx;
					}

					.msg-right {
						width: 50%;
						display: flex;
						align-items: center;
						box-sizing: border-box;
						justify-content: flex-end;
						padding-right: 39rpx;
					}

					.people {
						display: flex;
						justify-content: space-between;

						.peo1 {
							display: flex;
							align-items: center;

							.peo1-img {
								@include size(22rpx, 26rpx, none);
								@include icon('~@/static/game/people.png');
							}

							.peo1-img2 {
								@include size(34rpx, 26rpx, none);
								@include icon('~@/static/game/peoples.png');
								margin-left: 32rpx;
							}
						}
					}
				}

				.tuiguang {
					width: 520rpx;
					height: 50rpx;
					margin: 40rpx auto;
					background: url(~@/static/game/tequanbtn.png) no-repeat;
					background-size: 100% 100%;
					color: #7F1E0B;
					font-size: 24rpx;
					text-align: center;
					line-height: 48rpx;
					font-weight: 600;
				}
			}
			.bindEn{
				width: 969rpx;
				height: 641rpx;
				overflow: auto;
				background: url(~@/static/game/bind-en.png) no-repeat;
				background-size: 100% 100%;
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				box-sizing: border-box;
				padding-top: 140rpx;
			}
			.bindJp{
				width: 969rpx;
				height: 641rpx;
				overflow: auto;
				background: url(~@/static/game/bind-jp.png) no-repeat;
				background-size: 100% 100%;
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				box-sizing: border-box;
				padding-top: 140rpx;
			}
			.bindKr{
				width: 969rpx;
				height: 641rpx;
				overflow: auto;
				background: url(~@/static/game/bind-kr.png) no-repeat;
				background-size: 100% 100%;
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				box-sizing: border-box;
				padding-top: 140rpx;
			}
		}

		.suocang {
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
			// padding-top: 50rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.item {
				width: 969rpx;
				height: 641rpx;
				background: url(~@/static/game/rule-zn.png) no-repeat;
				background-size: 100% 100%;
				position: relative;
				display: flex;
				flex-direction: column;
				padding-top: 120rpx;
				box-sizing: border-box;

				.top {
					width: 60%;
					display: flex;
					flex-direction: row;
					align-items: center;
					margin: 10rpx auto;
					position: relative;

					.select_item {
						width: 420rpx;
						position: absolute;
						background: #7F1D0B;
						top: 50rpx;
						right: 50rpx;
						color: white;
						border: 1px solid #FBE993;
						display: flex;
						flex-direction: column;

						text {
							width: 100%;
							border-bottom: 1px solid #FBE993;
						}
					}

					text {
						font-size: 24rpx;
						color: white;
						margin-right: 30rpx;
					}

					.select {
						width: 420rpx;
						height: 50rpx;
						background: url(~@/static/game/tequanbtn.png) no-repeat;
						background-size: 100% 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						box-sizing: border-box;
						padding: 0 20rpx;
						color: #7F1E0B;
						font-size: 15rpx;

						text {
							color: #7F1E0B;
						}

						image {
							width: 20rpx;
						}
					}
				}

				.yue {
					text-align: right;
					font-size: 22rpx;
					color: white;
					width: 75%;
					margin-bottom: 20rpx;
				}

				.suoding {
					width: 420rpx;
					height: 50rpx;
					background: url(~@/static/game/tequanbtn.png) no-repeat;
					background-size: 100% 100%;
					margin: 0 auto;
					color: #7F1E0B;
					font-size: 24rpx;
					text-align: center;
					line-height: 48rpx;
				}

				.jilu {
					width: 70%;
					margin: 0 auto;

					.jilu_title {
						color: white;
						font-size: 28rpx;
						font-weight: bold;
						margin-bottom: 10rpx;
					}

					.jilu_bk {
						width: 80%;
						margin: 0 auto;
						background: #F7AC72;
						display: flex;
						justify-content: space-around;
						align-items: center;
						font-size: 24rpx;
						color: #7F1E0B;
						padding: 10rpx 0;
						border-radius: 5rpx;
					}

					.list {
						width: 80%;
						margin: 5rpx auto;
						display: flex;
						justify-content: space-around;
						align-items: center;
						font-size: 24rpx;
						color: white;
						padding-right: 30rpx;
					}
				}

				.back {
					position: absolute;
					top: 50rpx;
					left: 110rpx;

					image {
						width: 50rpx;
					}
				}
			}
			.ruleEn{
				width: 969rpx;
				height: 641rpx;
				background: url(~@/static/game/rule-en.png) no-repeat;
				background-size: 100% 100%;
				position: relative;
				display: flex;
				flex-direction: column;
				padding-top: 120rpx;
				box-sizing: border-box;
			}
			.ruleJp{
				width: 969rpx;
				height: 641rpx;
				background: url(~@/static/game/rule-jp.png) no-repeat;
				background-size: 100% 100%;
				position: relative;
				display: flex;
				flex-direction: column;
				padding-top: 120rpx;
				box-sizing: border-box;
			}
			.ruleKr{
				width: 969rpx;
				height: 641rpx;
				background: url(~@/static/game/rule-kr.png) no-repeat;
				background-size: 100% 100%;
				position: relative;
				display: flex;
				flex-direction: column;
				padding-top: 120rpx;
				box-sizing: border-box;
			}
		}

		//合约规则
		.heyue_guize {
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
			// padding-top: 50rpx;
			display: flex;
			justify-content: center;

			.item {
				width: 969rpx;
				height: 641rpx;
				overflow: auto;
				background: url(~@/static/game/guize.png) no-repeat;
				background-size: 100% 100%;
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				box-sizing: border-box;
				padding-top: 140rpx;

				.msg {
					width: 580rpx;
					height: 320rpx;
					margin: 0 auto;
					font-size: 18rpx;
					color: white;
					overflow: auto;
					font-size: 24rpx;
				}


				.back {
					position: absolute;
					top: 50rpx;
					left: 110rpx;

					image {
						width: 50rpx;
					}
				}
			}
		}

		.tequan {
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
			// padding-top: 50rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.item {
				width: 969rpx;
				height: 641rpx;
				overflow: auto;
				background: url(~@/static/game/tequan.png) no-repeat;
				background-size: 100% 100%;
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				box-sizing: border-box;
				padding-top: 140rpx;

				.top {
					width: 60%;
					margin: 20rpx auto;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.left {
						display: flex;
						flex-direction: row;
						align-items: center;
						color: white;
						font-size: 24rpx;

						image {
							width: 40rpx;
						}
					}

					.right {
						color: white;
						font-size: 24rpx;
					}
				}

				.text {
					width: 60%;
					margin: 0 auto;
					color: white;
					font-size: 24rpx;
					margin-bottom: 25rpx;
				}

				.btn {
					width: 40%;
					margin: 30rpx auto;
					font-size: 24rpx;
					padding: 15rpx 35rpx;
					font-weight: bold;
					color: #7F1E0B;
					background: url(../../../static/game/tequanbtn.png) no-repeat;
					background-size: 100% 100%;
				}

				.guize {
					font-size: 24rpx;
					color: white;
					display: flex;
					flex-direction: row;
					align-items: center;
					margin: 0 auto;

					text {
						margin-right: 10rpx;
					}

					image {
						width: 35rpx;
					}
				}
			}
			.vipEn{
				width: 969rpx;
				height: 641rpx;
				overflow: auto;
				background: url(~@/static/game/vipBg-en.png) no-repeat;
				background-size: 100% 100%;
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				box-sizing: border-box;
				padding-top: 140rpx;
			}
			.vipJp{
				width: 969rpx;
				height: 641rpx;
				overflow: auto;
				background: url(~@/static/game/vipBg-jp.png) no-repeat;
				background-size: 100% 100%;
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				box-sizing: border-box;
				padding-top: 140rpx;
			}
			.vipKr{
				width: 969rpx;
				height: 641rpx;
				overflow: auto;
				background: url(~@/static/game/vipBg-kr.png) no-repeat;
				background-size: 100% 100%;
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				box-sizing: border-box;
				padding-top: 140rpx;
			}
		}

		//用户信息
		.user {
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
			display: flex;
			justify-content: center;
			align-items: center;

			.box {
				width: 969rpx;
				height: 641rpx;
				background: url(~@/static/game/user_bk.png) no-repeat;
				background-size: 100% 100%;
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-top: 110rpx;
				box-sizing: border-box;

				.top {
					width: 650rpx;
					display: flex;
					flex-direction: row;
					align-items: center;

					image {
						width: 100rpx;
						margin-right: 15rpx;
						border: 2rpx solid white;
						border-radius: 10rpx;
					}

					view {
						display: flex;
						flex-direction: column;
						font-size: 27rpx;
						color: white;
						margin-right: 15rpx;
					}
				}

				.center {
					width: 65%;
					margin: 20rpx auto;
					display: flex;
					// flex-direction: row;
					justify-content: space-between;
					align-items: center;

					.jdt {
						background: url(~@/static/game/tlkinp.png) no-repeat;
						width: 280rpx;
						height: 45rpx;
						background-size: 100% 100%;
						font-size: 24rpx;
						color: #FFF597;
						display: flex;
						flex-direction: row-reverse;
						line-height: 40rpx;
						padding-right: 10rpx;
					}

					.tcny {
						background: url(~@/static/game/cubinp.png) no-repeat;
						width: 280rpx;
						height: 45rpx;
						background-size: 100% 100%;
						font-size: 24rpx;
						color: #FFF597;
						display: flex;
						flex-direction: row-reverse;
						line-height: 40rpx;
						padding-right: 10rpx;
					}
				}

				.di {
					width: 650rpx;
					height: 134rpx;
					background: url(~@/static/game/user_yel.png) no-repeat;
					background-size: 100% 100%;
					display: flex;
					flex-direction: column;
					padding-top: 30rpx;

					// align-items: center;
					view {
						display: flex;
						flex-direction: row;
						align-items: center;
						color: #7F1E0B;
						font-weight: bold;
						font-size: 26rpx;
						margin-bottom: 20rpx;
						box-sizing: border-box;
						padding: 0 20rpx;

						text {
							margin-right: 30rpx;
						}
					}
				}
			}
			.personEn{
				width: 969rpx;
				height: 641rpx;
				background: url(~@/static/game/person-en.png) no-repeat;
				background-size: 100% 100%;
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-top: 110rpx;
				box-sizing: border-box;
			}
			.personKr{
				width: 969rpx;
				height: 641rpx;
				background: url(~@/static/game/person-kr.png) no-repeat;
				background-size: 100% 100%;
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-top: 110rpx;
				box-sizing: border-box;
			}
			.personJp{
				width: 969rpx;
				height: 641rpx;
				background: url(~@/static/game/person-jp.png) no-repeat;
				background-size: 100% 100%;
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-top: 110rpx;
				box-sizing: border-box;
			}

		}

		@keyframes move {
			0% {
				transform: rotate(15deg);
			}

			20% {
				transform: rotate(-15deg);
			}

			40% {
				transform: rotate(15deg);
			}

			60% {
				transform: rotate(-15deg);
			}

			80% {
				transform: rotate(15deg);
			}

			90% {
				transform: rotate(0deg);
			}

			100% {
				transform: rotate(15deg);
			}
		}


		.game-Box {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			margin-top: 40rpx;

			.vip {
				width: 80rpx;
				margin-right: 50rpx;
			}

			.shizi {
				width: 1500rpx;
				margin-right: 50rpx;
				animation: move 4s linear infinite;
				position: relative;
			}

			.game-Logo {
				//logo
				@include size(612rpx, 435rpx, none);
				@include icon("~@/static/game/logo.png");
				margin-right: auto;
				margin-left: 34rpx;
				margin-top: 77rpx;
			}

			.game-low {
				//第一张图片
				width: 319rpx;
				height: 468rpx;
				background: linear-gradient(0deg, rgba(192, 94, 12, 1), rgba(255, 160, 80, 1));
				border-radius: 30rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				overflow: hidden;
				margin-right: 32rpx;

				.game-icon {
					@include size(226rpx, 164rpx, none);
					@include icon('~@/static/game/gameIcon2.png')
				}
			}

			.game-height {
				//第一张图片
				width: 319rpx;
				height: 468rpx;
				background: linear-gradient(0deg, rgba(103, 157, 0, 1), rgba(182, 238, 75, 1));
				border-radius: 30rpx;
				margin-right: 39rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				overflow: hidden;

				.game-icon2 {
					@include size(165rpx, 165rpx, none);
					@include icon('~@/static/game/gameIcon.png')
				}
			}

			.game-taps {
				//匹配文案
				font-family: Hiragino Sans GB;
				@include size(100%, auto, none);
				@include font(62rpx, #fff);
				text-shadow: 0px 5px 2px rgba(168, 81, 0, 1);
				@include cen();
				margin-top: 10rpx;
			}

			.game-tapsActive {
				text-shadow: 0px 5px 2px rgba(89, 135, 0, 1);
			}

			.game-val {
				@include size(210rpx, 45rpx, none);
				background: rgba(207, 113, 33, 1);
				border-radius: 21rpx;
				@include font(17rpx, #fff);
				@include cen();
				margin-top: 13rpx;
			}

			.game-val2 {
				@include size(210rpx, 45rpx, none);
				background: rgba(207, 113, 33, 1);
				border-radius: 21rpx;
				@include font(17rpx, #fff);
				@include cen();
				margin-top: 7rpx;
			}

			.game-ValActive {
				background: rgba(111, 166, 4, 1);
				border-radius: 21px;
			}

			.game-bottom {
				@include size(100%, 81rpx, none);
				background: linear-gradient(90deg, rgba(214, 114, 30, .5), rgba(255, 196, 146, .5), rgba(214, 114, 30, .5));
				margin-top: auto;
				@include font(50rpx, #fff);
				font-family: Hiragino Sans GB;
				text-shadow: 0px 5px 1px rgba(163, 78, 0, 1);
				@include cen();
			}

			.game-bottomActive {

				text-shadow: 0px 5px 2px rgba(89, 135, 0, 1);
			}

			.game-bottomActive {

				background: linear-gradient(90deg, rgba(128, 194, 0, .5), rgba(180, 235, 76, .5), rgba(128, 194, 0, .5));
			}

			.img3 {
				width: 735rpx;
				height: 458rpx;
				border-radius: 30rpx;
				// background: url(../../../static/game/heng2.png) no-repeat;
				@include icon('~@/static/game/low.png');
				background-size: cover;
				margin-right: 50rpx;
				position: relative;
				display: flex;
				flex-direction: row-reverse;

				.item {
					width: 100%;
					display: flex;
					flex-direction: column;
					align-items: flex-start;

					image {
						width: 180rpx;
					}
				}

				.title {
					width: 100%;
					font-size: 45rpx;
					color: white;
					text-align: center;
					margin-top: 30rpx;
					font-weight: 600;

				}

				.text1 {
					width: 100%;
					font-size: 22rpx;
					color: white;
					text-align: center;
					line-height: 30rpx;
					margin-top: 42rpx;
				}

				.text2 {
					width: 100%;
					font-size: 22rpx;
					color: white;
					text-align: center;
					line-height: 30rpx;
					margin-top: 25rpx;
					font-size: 15rpx;
				}

				.myimg-2 {
					width: 85% !important;
					position: absolute;
					bottom: 5rpx;
					left: 50%;
					transform: translateX(-50%);
				}

				.pipei {
					color: white;
					font-size: 40rpx;
				}
			}
		}

		.bottom {
			position: absolute;
			bottom: 0;
			width: 55%;
			background: url(../../../static/game/shaw.png) no-repeat;
			background-size: cover;
			display: flex;
			flex-direction: row;
			align-items: center;
			align-self: flex-end;
			padding-top: 15rpx;

			.heyue {
				width: 300rpx;
			}

			image {
				width: 80rpx;
				margin-right: 60rpx;
			}
		}
	}
</style>
