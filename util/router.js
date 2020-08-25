import store from '../store/index.js'
const $next = (url) => {
	//曾经横屏过
	let page = '';
	
	//横屏黑名单
	const blackList = [
		'game/laohu/laohu',
		'game/laohu/gameDeatil/gameDeatil',
	];
	
	//长度
	const len = blackList.length;
	
	//是否存在黑名单
	for(let item of blackList){
		if(item === url){
			page = item;
			break
		}
	};
	
	//是否存在参数;
	// const objArr = Object.keys(data);
	// //存在
	// if(objArr.length !== 0){
	// 	let parameter = '';
	// 	for(let item of objArr){
	// 		console.log(data.item)
	// 	}
	// }
	
	uni.navigateTo({
		url:'/pages/' + url,
	});
	// if(page !== ''){
	// 	//存在黑名单页面
	// 	store.commit('SET_PAGES',page);
	// 	uni.navigateTo({
	// 		url:"/pages/back",
	// 		//不能带.vue,会无法跳转
	// 		animationType:'none',
	// 	});
	// }else{
	// 	console.log(url)
		
	// }


}
export default {
	$next
}
