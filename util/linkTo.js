import Language from './language.js';
import gameLanguage from './gameLanguage.js';
let navTo = (url,type="pop-in")=>{
	uni.navigateTo({
		url,
		animationType:type
	})
}


let backTo = (delta=1,type="pop-out")=>{
	uni.navigateBack({
		url,
		delta,
		animationType:type
	})
}

let $noToast = (title,icon="none")=>{
	uni.showToast({
		title,
		icon
	})
}


const getGameLanguage = ()=>{
	//获取游戏翻译语言
	const type = uni.getStorageSync('languageType');
	let language = null;
	switch (type) {
		case 'zh-cn':
			language = gameLanguage.ChinaLanguage;
			break;
		case 'en-us':
			language = gameLanguage.EnglisghLanguage;
			break;
		case 'ko-kr':
			language = gameLanguage.KoreanLanguage;
			break;
		case 'ja-jp':
			language = gameLanguage.JapanLanguage;
			break;
		default:
			break;
	};
	return language
}




let showLanguage = ()=>{
	let type = uni.getStorageSync('languageType');
	let languageInfo;
	switch (type) {
		case 'zh-cn':
			languageInfo = Language.ChinaLanguage;
			break;
		case 'en-us':
			languageInfo = Language.EnglisghLanguage;
			break;
		case 'ko-kr':
			languageInfo = Language.KoreanLanguage;
			break;
		case 'ja-jp':
			languageInfo = Language.JapanLanguage;
			break;
		default:
			break;
	}
	return languageInfo;
}
let showHtml = (str) =>{ //富文本解析
			return str
			
			.replace(str ? /&(?!#?\w+;)/g : /&/g, '&amp;')
			
			.replace(/&amp;nbsp;/g, "")
			
			.replace(/&lt;/g, "<")
			
			.replace(/&gt;/g, ">")
			
			.replace(/&quot;/g, "\"")
			
			.replace(/&#39;/g, "\'")
			
			}

export default{
	navTo,
	backTo,
	showHtml,
	$noToast,
	showLanguage,
	getGameLanguage
}