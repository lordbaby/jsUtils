/*
	字符串系列
 */

//计算字符串长度（字节）

String.prototype.strLen=function(){
	var len=0;
	for(var i=0;i<this.length;i++){
		if(this.charCodeAt(i)>255||this.charCodeAt(i)<0) len+=2; else len++;
	}
	return len;
}

//将字符串拆成字符存入数组
String.prototype.strToChars=function(){
	var chars=[];
	for (var i = 0; i < this.length; i++) {
		chars[i]=[this.substr(i,1),this.isCHS(i)];
	};
	String.prototype.charsArray=chars;
	return chars;
}

//判断某个字是否是汉字

String.prototype.isCHS=function(i){
	if(this.charCodeAt(i)>255||this.charCodeAt(i)<0){
		return true;
	}else{
		return false;
	}
}
//截取字符串（从startd到end个字节）
String.prototype.subCHStr=function(start,end){
	var len=0;
	var str='';
	this.strToChars();
	for (var i = 0; i < this.length; i++) {
		//true代表汉字
		if(charsArray[i][1]){
			len+=2;
		}else{
			len++;
		}
		if(end<len){
			return str;
		}else if(start<len){
			str+=this.charsArray[i][0];
		}
	}
	return str;
}
//