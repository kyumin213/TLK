import Vue from 'vue'
import App from './App'
import request from './util/request.js'
import linkTo from './util/linkTo.js'
import Language from './util/language.js'
import store from './store'
import $next from 'util/router.js'
Vue.config.productionTip = false
Vue.prototype.fnc = request;
Vue.prototype.get = request.get;
Vue.prototype.post = request.post;
Vue.prototype.linkTo = linkTo;
Vue.prototype.Language = Language;
Vue.prototype.$store = store;
Vue.prototype.$next = $next.$next;
Vue.prototype.$back = false;
App.mpType = 'app'

// Vue.prototype.ScanAudio = function(){
//         var music = null;
//         music = uni.createInnerAudioContext(); //创建播放器对象
//         music.src= "static/game/music/sl.mp3"; //选择播放的音频
//         music.play(); //执行播放
// 		console.log(music.src)
// }


const app = new Vue({
	...App,
	store
})
app.$mount()
