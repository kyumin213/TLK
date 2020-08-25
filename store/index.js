import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		formData:{},
		words:[],
		cub:{},
		tlk:{},
		market_type:true,//交易市场买入卖出高亮
		onBack:false,
		pages:"",//返回路径
		backnum:1,//返回页数
		winner:[],//接收数组
		noticeDetail:{},//公告详情对象
	},
    mutations: {
		SET_NOTICEDETAIL(state,data){
			state.noticeDetail = data
		},
		SET_FORMDATA(state,data){
			state.formData = data
		},
		SET_WINNER(state,data){
			state.winner = data
		},
		SET_BACKNUM(state,num){
			state.backnum = num;
		},
		SET_PAGES(state,url){
			state.pages = url;
		},
		SET_ONBACK(state,bl){
			state.onBack = bl
		},
		SET_WORDS(state,list){
			state.words = list
		},
		SET_TLK(state,obj){
			state.tlk = obj;
		},
		SET_CUB(state,obj){
			state.cub = obj
		},
		SET_MARKET_TYPE(state,type){
			state.market_type = type
		}
	},
	getters:{
		getformData(state){
			return state.formData
		}
	},
    actions: {}
})
export default store