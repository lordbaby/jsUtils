/**
 * hash操作类
 */
(function(window,undefined){

	var hash=(function(){
		/**
		 * 获取hash
		 * @return {[type]} hash对象
		 */
		var getHash=function(){
			var params=window.location.hash?window.location.hash.substr(1).split('&'):[],
			    paramObj={};
			    for (var i = 0; i < params.length; i++) {
			     	var p=params[i].split('=');
			     	paramObj[p[0]]=decodeURIComponent(p[1]);
			     }; 
			     return paramObj;
		}
		/**
		 * 生成hash
		 * @param  {[type]} paramObj 将要添加的hash对象
		 * @return {[type]} undefined
		 */
		var toHash=function(paramObj){
			var str=[];
			for(var p in paramObj){
				str.push(p+'='+decodeURIComponent(paramObj[p]));
			}
			window.location.hash=str.join('&');
		}
		return {
			getHash=function(){
				return getHash();
			},
			get:function(key){
				var hash=getHash();
				if(key){
					return hash[key];
				}else{
					return hash;
				}				
			},
			add:function(paramObj){
				var hash=getHash();
				for(var p in hash){
					hash[p]=paramObj[p];
				}
				toHash(hash);
			},
			remove:function(key){
				var removeParams=(typeof(key)==='string')?[key]:key,
				hash=getHash();
				for (var i = 0; i < removeParams.length; i++) {
					delete hash[removeParams[i]];
				};
				toHash(hash);
			}
			clear:function(){
				toHash({});
			}
		}
	})();
	window.Hash=hash;
})(window);