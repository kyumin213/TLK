const fromTest = {
	data(){
		return{
			languageInfo:{},
			formData:{
				nickname:'',
				pwd:"",
				confirm_pwd:""
			},
			nicknameError:'钱包名称为必填项',
			pwdError:'密码为必填项',
			confirm_pwdError:'确认密码为必填项',
			mnemonicError:'助记词为必填项',
			privatekeyError:'私钥为必填项',
			
			nicknameHide:true,
			pwdHide:true,
			confirm_pwdHide:true,
			mnemonicHide:true,
			privatekeyHide:true,
			
			nicknamePass:false,
			pwdPass:false,
			confirm_pwdPass:false,
			mnemonicPass:false,
			privatekeyPass:false,
		}
	},
	onShow(){
		this.languageInfo = this.linkTo.showLanguage();
		this.nicknameError = this.languageInfo.walletErr_value1;
		this.pwdError = this.languageInfo.PassWordErr_value1;
		this.confirm_pwdError = this.languageInfo.PassWordErr_value1;
		this.mnemonicError = this.languageInfo.wordsErrVal;
		this.privatekeyError = this.languageInfo.secretKeyErrVal;
	},
	methods:{
	  createdPromise(bl){
	  	return new Promise((res,rej)=>{
	  		if(bl){
	  			res(bl)
	  		}else{
	  			rej(bl)
	  		}
	  		
	  	});
	  },
	  
	  testEmpty(testName,val){
	  	if(this.formData[testName] === ''){
	  		this[testName+'Error'] = val;
	  		this[testName+'Hide'] = false;
			this[testName+'Pass'] = false;
			console.log(testName,this[testName+'Hide'])
	  		return false
	  	}else{
	  		this[testName+'Hide'] = true;
			this[testName+'Pass'] = true;
	  		return true
	  	}
	  },
	  testNickname(testName,val){
	  	const reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
	  	if(reg.test(this.formData[testName])){
	  		this[testName+'Error'] = val;
	  		this[testName+'Hide'] = false;
			this[testName+'Pass'] = false;
	  		return false
	  	}else{
	  		this[testName+'Hide'] = true;
			this[testName+'Pass'] = true;
	  		return true
	  	}
	  },
	  testLength(testName,min,max,minText,maxText){
	  	if(this.formData[testName].length < min){
	  		this[testName+'Error'] = minText;
	  		this[testName+'Hide'] = false;
			this[testName+'Pass'] = false;
	  		return false
	  	}else if(this.formData[testName].length > max){
	  		this[testName+'Error'] = maxText;
	  		this[testName+'Hide'] = false;
			this[testName+'Pass'] = false;
	  		return false
	  	}else{
	  		this[testName+'Hide'] = true;
			this[testName+'Pass'] = true;
	  		return true
	  	}
	  },
	  testPassword(testName,testName2,val){
	  	if(this.formData[testName] !== this.formData[testName2]){
	  		this[testName+'Error'] = val;
	  		this[testName+'Hide'] = false;
			this[testName+'Pass'] = false;
	  		return false
	  	}else{
	  		this[testName+'Hide'] = true;
	  		this[testName2+'Hide'] = true;
			this[testName+'Pass'] = true;
			this[testName2+'Pass'] = true;
	  		return true
	  	}
	  },
	  testFormat(testName,val){
	  	// const reg = new RegExp("[^a-zA-Z0-9]" , "g");
	  	const reg = /^(\d+[a-zA-Z]+|[a-zA-Z]+\d+)([0-9a-zA-Z]*)$/;
	  	if(!reg.test(this.formData[testName])){
	  		this[testName+'Error'] = val;
	  		this[testName+'Hide'] = false;
			this[testName+'Pass'] = false;
	  		return false
	  	}else{
	  		this[testName+'Hide'] = true;
			this[testName+'Pass'] = true;
	  		return true
	  	}
	  },
	  onName(val){
	  	this.formData.nickname = val;
	  	//判断是否为空
	  	const test = this.createdPromise(this.testEmpty('nickname',this.languageInfo.walletErr_value1));
	  	test
	  	.then(res => {
			console.log(res)
	  		return this.createdPromise(this.testLength('nickname',3,15,this.languageInfo.walletErr_value2,this.languageInfo.walletErr_value4))
	  	})
	  	.then(res=>{
			console.log(res)
	  		return this.createdPromise(this.testNickname('nickname',this.languageInfo.walletErr_value3))
	  	})
		.catch(err=>{
			console.log(err)
		})
	  },
	  onPassWord(val){
	  	this.formData.pwd = val;
	  	const test = this.createdPromise(this.testEmpty('pwd',this.languageInfo.PassWordErr_value1));
	  	test
	  	.then(res => {
	  		return this.createdPromise(this.testLength('pwd',6,15,this.languageInfo.PassWordErr_value2,this.languageInfo.PassWordErr_value4))
	  	})
	  	.then(res => {
	  		return this.createdPromise(this.testFormat('pwd',this.languageInfo.PassWordErr_value3));
	  	})
	  	.then(res =>{
	  		return this.createdPromise(this.testPassword('pwd','confirm_pwd',this.languageInfo.PassWordErr_value5))
	  	})
		.catch(err=>{
			console.log(err)
		})
	  },
	  onConfirmPassword(val){
	  	this.formData.confirm_pwd = val;
	  	const test = this.createdPromise(this.testEmpty('confirm_pwd',this.languageInfo.PassWordErr_value1));
	  	test
	  	.then(res => {
	  		return this.createdPromise(this.testLength('confirm_pwd',6,15,this.languageInfo.PassWordErr_value2,this.languageInfo.PassWordErr_value4))
	  	})
	  	.then(res => {
	  		return this.createdPromise(this.testFormat('confirm_pwd',this.languageInfo.PassWordErr_value3));
	  	})
	  	.then(res =>{
	  		return this.createdPromise(this.testPassword('confirm_pwd','pwd',this.languageInfo.PassWordErr_value5))
	  	})
		.catch(err=>{
			console.log(err)
		})
	  },
	  onMnemonic(val){
	  	  //检验助记词
		  this.formData.mnemonic = val;
	  	  const test = this.createdPromise(this.testEmpty('mnemonic',this.languageInfo.wordsErrVal));
		  test
		  .catch(err=>{
		  	console.log(err)
		  })
	  },
	  onKey(val){
		  //检验key
		  this.formData.privatekey = val;
		  const test = this.createdPromise(this.testEmpty('privatekey',this.languageInfo.secretKeyErrVal));
		  test
		  .catch(err=>{
		  	console.log(err)
		  })
	  }
  }
};
  export default fromTest;