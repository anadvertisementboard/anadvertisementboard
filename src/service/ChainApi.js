import Vue from 'vue'
import Web3 from 'web3'
import AddressData from '../contracts/AddressData.json'
import TokenABI from '../contracts/TokenABI.json'
import StewardABI from '../contracts/StewardABI.json'
import PriceABI from '../contracts/PriceABI.json'
import Device from '../contracts/Device.json'

function getWeb3(){
	try{
		if(window.web3!=null){
			if (typeof window.web3 !== 'undefined') {
       		 return new Web3(window.web3.currentProvider);
   			}else{
   				return null;
   			}
		}else{
			return null;
		}
			
	}catch(e){
		console.log(e)
		getWeb3()
	}
		
}
// function getEasyetz(){
// 	try{
// 		return easyetz.getAddress()
// 	}catch(e){
// 		console.log(e)
// 		setTimeout(function(){
// 			getEasyetz()
// 		},500)
		
// 	}
// }

export default{
	Initial:async function(){
		let web3 = getWeb3()
		let flat = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
		console.log("web3:",web3)
		if(web3!=null){
			let address = await web3.eth.getCoinbase()
			console.log("address:",address)
				let isLogin = false;
				let maseter = new web3.eth.Contract( StewardABI,AddressData.artAddress);
				let token = new web3.eth.Contract( TokenABI,AddressData.tokenAddress);
				let price = new web3.eth.Contract( PriceABI,AddressData.priceAddress);
			    Vue.prototype.$maseter = maseter;
			    Vue.prototype.$token = token;
			    Vue.prototype.$price = price;
				Vue.prototype.$web3 = web3
				Vue.prototype.$artAddress = AddressData.artAddress;
				Vue.prototype.$tokenAddress = AddressData.tokenAddress;
				Vue.prototype.$priceAddress = AddressData.priceAddress;
			if(address!=null){
				Vue.prototype.$address = address.toLowerCase();
				console.log("addresssss:",address);
				isLogin = true;
			}else{
				isLogin = false;
			}
			Vue.prototype.$trans.$emit("inithome",{"islogin":isLogin,"flat":flat,index:true});
		}else{
			Vue.prototype.$trans.$emit("inithome",{"islogin":false,"flat":flat,index:false});
		}
		
      	
	},
	// getFromApi:async function(method_name,params){
	// 	let url = "https://mainnet.infura.io/v3/8698b91d9bd4404a9af835f048f39145";
	// 	let result = await axios.post(url,{"Content-Type":"application/json",
	// 		"jsonrpc":"2.0",
	// 		"method":method_name,
	// 		"params": params,
	// 		"id":1
	// 	})
	// 	return result.data.result;
	// },

	timeFormat:function(now){
		var   year=now.getFullYear();
	    var   month=now.getMonth()+1;
	    var   date=now.getDate();
	    var   hour=now.getHours();
	    var   minute=now.getMinutes();
	    var   second=now.getSeconds();
			if(hour<10){
				hour="0"+hour;
			}
			if(minute<10){
				minute="0"+minute;
			}
			if(second<10){
				second="0"+second;
			}
	    return   year+"/"+month+"/"+date+" "+hour+":"+minute+":"+second;
	},
	pointNum:function(numbers){
		numbers = Number(numbers);
	  if(numbers==0){
	    numbers = "0.0000";
	  }else{
	    numbers = numbers/1000000000000000000;
	    numbers = String(numbers);
	    let index = numbers.indexOf('.');
	    if(index!=-1){
	      numbers = numbers.substr(0,index+5)
	    }
	  }
	  return numbers
	},
	zeroNum:function(numbers){
		numbers = numbers*1000000;
		numbers = String(numbers)+"000000000000"
		return numbers;
	},
	emitFunSuccess:function(text){
        Vue.prototype.$trans.$emit("tiptext",{
            "tiptext":text,
            "type":3
          })
	 },
	 emitFunError:function(text){
	 	Vue.prototype.$trans.$emit("tiptext",{
	        "tiptext":text,
	        "type":2
	      })
	 },
	savePoint:function(numbers){
		 numbers = String(numbers);
	    let index = numbers.indexOf('.');
	    if(index!=-1){
	      numbers = numbers.substr(0,index+5)
	    }
	    return numbers;
	},
	collectPatronage: async function(approveid){
		try{
			 await Vue.prototype.$maseter.methods.collectPatronage().send({
                  from:Vue.prototype.$address
                })
	      }catch(e){
	      	console.log("collectPatronage:",e)
	      }	
	},
	buy: async function(newprice,value,name){
		try{
			if(newprice<=0 || value<=0 || name==null || name==""){
				this.emitFunError("输入值>0");
				return;
			}
			  Vue.prototype.$maseter.methods.buy(this.zeroNum(newprice),name).send({
                  from:Vue.prototype.$address,
                  value:this.zeroNum(value)
                },(err,result)=>{
                	if(!err){
                		let that = this;
	                	setTimeout(function(){
	                		Vue.prototype.$trans.$emit("operate","success");
				 			that.emitFunSuccess("购买成功");
	                	},1000)
                	}
                	
                })
			 
	      }catch(e){
			console.log("buy:",e)
	      }	
	},
	changePrice: async function(newprice){
		try{
			if(newprice<=0){
				this.emitFunError("输入值>0");
				return;
			}
			  Vue.prototype.$maseter.methods.changePrice(this.zeroNum(newprice)).send({
                  from:Vue.prototype.$address
                },(err,result)=>{
                	if(!err){
                		let that = this;
	                	setTimeout(function(){
	                		Vue.prototype.$trans.$emit("operate","success");
				 			that.emitFunSuccess("修改价格成功");
	                	},1000)
                	}
                	
                })
			 
	      }catch(e){
			console.log("changePrice:",e)
	      }	
	},
	changeName:async function(newName){
		try{
			if(newName=="" || newName==null){
				this.emitFunError("名称不为空");
				return;
			}
			 Vue.prototype.$maseter.methods.changeName(newName).send({
                  from:Vue.prototype.$address
                },(err,result)=>{
                	if(!err){
                		let that = this;
	                	setTimeout(function(){
	                		Vue.prototype.$trans.$emit("operate","success");
				 			that.emitFunSuccess("修改名称成功");
	                	},1000)
                	}
                	
                	
                })
			 
	      }catch(e){
			console.log("changeName:",e)
	      }	
	},
	depositWei: async function(value){
		try{
			if(value<=0){
				this.emitFunError("输入值>0");
				return;
			}
			  Vue.prototype.$maseter.methods.depositWei().send({
                  from:Vue.prototype.$address,
                  value:this.zeroNum(value)
                },(err,result)=>{
                	if(!err){
                		let that = this;
	                	setTimeout(function(){
	                		Vue.prototype.$trans.$emit("operate","success");
				 			that.emitFunSuccess("充值成功");
	                	},1000)
                	}
                	
                })
			 
	      }catch(e){
			console.log("depositWei:",e)
	      }	
	},
	exit: async function(){
		try{
			console.log(Vue.prototype.$maseter)
			  Vue.prototype.$maseter.methods.exit().send({
                  from:Vue.prototype.$address
                },(err,result)=>{
                	if(!err){
                		let that = this;
	                	setTimeout(function(){
	                		Vue.prototype.$trans.$emit("operate","success");
				 			that.emitFunSuccess("提现成功");
	                	},1000)
                	}
                	
                })
	      }catch(e){
			console.log("exit:",e)
	      }	
	},
	withdrawArtistFunds: async function(){
		try{
			  Vue.prototype.$maseter.methods.withdrawArtistFunds().send({
                  from:Vue.prototype.$address
                },(err,result)=>{
                	if(!err){
                		let that = this;
	                	setTimeout(function(){
	                		Vue.prototype.$trans.$emit("operate","success");
				 			that.emitFunSuccess("提现成功");
	                	},1000)
                	}
                	
                })
			 
	      }catch(e){
			console.log("withdrawArtistFunds:",e)
	      }	
	},
	withdrawDeposit:async function(withwei){
		try{
			if(withwei<=0){
				this.emitFunError("输入值>0");
				return;
			}
			  Vue.prototype.$maseter.methods.withdrawDeposit(this.zeroNum(withwei)).send({
                  from:Vue.prototype.$address
                },(err,result)=>{
                	if(!err){
                		let that = this;
	                	setTimeout(function(){
	                		Vue.prototype.$trans.$emit("operate","success");
				 			that.emitFunSuccess("提现成功");
	                	},1000)
                	}
                	
                })
	      }catch(e){
			console.log("withdrawDeposit:",e)
	      }	
	},
	art_call:function(){
		return null;
	},
	artist_call:function(){
		return null;
	},
	artistFund_call:function(){
		return null;
	},
	currentCollected_call:function(){
		return null;
	},
	deposit_call:function(){
		return null;
	},
	depositAbleTowithdraw_call:function(){
		return null;
	},
	foreclosed_call:function(){
		return null;
	},
	foreclosureTime_call:function(){
		return null;
	},
	paid_call:function(){
		return null;
	},
	patronageOwed_call:function(){
		return null;
	},
	patronageOwedWithTimestamp_call:function(){
		return null;
	},
	patrons_call:function(){
		return null;
	},
	price_call:function(){
		return null;
	},
	state_call:function(){
		return null;
	},
	timeAcquired_call:function(){
		return null;
	},
	timeHeld_call:function(){
		return null;
	},
	state_call:function(){
		return null;
	},
	timeLastCollected_call:function(){
		return null;
	},
	totalCollected_call:function(){
		return null;
	},
	test:function(test){
		alert(test);
	}
}