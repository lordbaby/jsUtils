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
String.prototype.trim = function () { return this.replace(/(^\s*)|(\s*$)/g, ""); } //删除首尾空格
String.prototype.trimEnd = function (suffix) { var pos = this.indexOf(suffix, this.length - suffix.length); if (pos == -1) return this; return this.substr(0, pos); } //删除指定的结束字符串
String.prototype.endsWith = function (suffix) { return this.indexOf(suffix, this.length - suffix.length) !== -1; } //检查是否以指定字符串结束
String.prototype.occurs = function (ch) { return this.split(ch).length - 1; } //统计指定字符出现的次数
String.prototype.isDigit = function () { var s = this.trim(); return (s.replace(/\d/g, "").length == 0); } //检查是否由数字组成
String.prototype.isAlpha = function () { return (this.replace(/\w/g, "").length == 0); } //检查是否由数字字母和下划线组成
String.prototype.isNumOrABC = function () { return (this.replace(/^[0-9A-Za-z]*$/, "").length == 0); } //检查是否为数字和字母
String.prototype.isNumber = function () { var s = this.trim(); return (s.search(/^[+-]?[0-9.]*$/) >= 0); } //检查是否为数
String.prototype.isCurrency = function () { var s = this.trim(); return (s.search(/^[￥]?[+-]?[0-9]+(\.\d{0,2})?$/) >= 0); } //检查是否货币
String.prototype.isCurrency_p = function () { var s = this.trim(); return (s.search(/^[￥]?[+]?[0-9]+(\.\d{0,2})?$/) >= 0); } //检查是否货币(正数)
String.prototype.isAllNumber = function () { var s = this.trim(); return (s.search(/^[0-9]*$/) >= 0); } //检查是否为纯数字
String.prototype.isExt = function () { var s = this.trim(); return (s.search(/^\.[a-zA-Z]*$/) >= 0); } //检查是否为扩展名
String.prototype.lenb = function () { return this.replace(/[^\x00-\xff]/g, "**").length; } //返回字节数
String.prototype.isInChinese = function () { return (this.length != this.replace(/[^\x00-\xff]/g, "**").length); } //检查是否包含汉字
String.prototype.isValidChar = function () { var s = this.trim(); return (s.search(/^([a-zA-Z0-9]|[_-]|\+|[\u4e00-\u9fa5])+$/) >= 0); } //检查
String.prototype.isChinese = function () { var s = this.trim(); return (s.search(/^([\u4e00-\u9fa5])+$/) >= 0); } //是否为汉字
String.prototype.isEmail = function () { var strr; var mail = this; var re = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/; return re.test(mail); } //简单的email检查
String.prototype.isIP = function () { var s = this.trim(); return (s.search(/^((1?\d?\d|(2([0-4]\d|5[0-5])))\.){3}(1?\d?\d|(2([0-4]\d|5[0-5])))$/) >= 0); } //检查是否为IP地址
String.prototype.isDate = function () { var p; var re1 = /(\d{4})[年./-](\d{1,2})[月./-](\d{1,2})[日]?$/; var re2 = /(\d{1,2})[月./-](\d{1,2})[日./-](\d{2})[年]?$/; var re3 = /(\d{1,2})[月./-](\d{1,2})[日./-](\d{4})[年]?$/; if (re1.test(this)) { p = re1.exec(this); return new Date(p[1], p[2], p[3]); } if (re2.test(this)) { p = re2.exec(this); return new Date(p[3], p[1], p[2]); } if (re3.test(this)) { p = re3.exec(this); return new Date(p[3], p[1], p[2]); } return false; } //简单的日期检查，成功返回日期对象
String.prototype.isInList = function (list) { var re = eval("/[" + list + "]/"); return re.test(this); } //检查是否有列表中的字符字符
String.prototype.replaceAll = function (findstr, replacestr, ignoreCase) { if (!RegExp.prototype.isPrototypeOf(findstr)) { return this.replace(new RegExp(findstr, (ignoreCase ? "gi" : "g")), replacestr); } else { return this.replace(findstr, replacestr); } }
String.prototype.isIdCardNum = function (num) { var s = this.trim(); if ((s.search(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/) >= 0)) { return true } else return false; };

function QueryString(item) { var sValue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)", "i")); return sValue ? sValue[1] : sValue; }

/*drag div*/
var offset_x;
var offset_y;
function StartMove(oEvent, div_id) {
    var whichButton;
    if (document.all && oEvent.button == 1) whichButton = true;
    else { if (oEvent.button == 0) whichButton = true; }
    if (whichButton) {
        var oDiv = div_id;
        offset_x = parseInt(oEvent.clientX - oDiv.offsetLeft);
        offset_y = parseInt(oEvent.clientY - oDiv.offsetTop);
        document.documentElement.onmousemove = function (mEvent) {
            var eEvent;
            if (document.all) eEvent = event;
            else { eEvent = mEvent; }
            var oDiv = div_id;
            var x = eEvent.clientX - offset_x;
            var y = eEvent.clientY - offset_y;
            oDiv.style.left = (x) + "px";
            oDiv.style.top = (y) + "px";
        }
    }
}

function StopMove(oEvent) { document.documentElement.onmousemove = null; }
function Close(o) { var oDiv; if (typeof (o) == 'object') { oDiv = o; } else { oDiv = document.getElementById(o); } oDiv.style.display = "none"; }
function RemoveDiv(divId) { var rmDiv = document.getElementById(divId); if (rmDiv) document.body.removeChild(rmDiv); }

function SetHome(obj, vrl) {
    try {
        obj.style.behavior = 'url(#default#homepage)'; obj.setHomePage(vrl);
    }
    catch (e) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }
            catch (e) {
                alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将[signed.applets.codebase_principal_support]设置为'true'");
            }
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage', vrl);
        }
    }
}

function AddFavorite(sURL, sTitle) {
    try {
        window.external.addFavorite(sURL, sTitle);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(sTitle, sURL, "");
        }
        catch (e) {
            alert("对不起，您的浏览器不支持此操作!\n请您使用菜单栏或Ctrl+D收藏本站。");
        }
    }
}

function Loading(divId, containerId) {
    var div = document.createElement("div");
    div.id = divId;
    div.style.position = "absolute";
    div.style.top = "50%";
    div.style.left = "50%";
    div.style.width = "190px";
    div.style.height = "30px";
    div.style.lineHeight = "30px";
    div.style.fontSize = "12px";
    div.style.border = "1px solid #333";
    div.style.paddingLeft = "25px";
    div.style.marginLeft = "-80px";
    div.style.marginTop = "-15px";
    div.style.backgroundImage = "url(images/loading.gif)";
    div.style.backgroundRepeat = "no-repeat";
    div.style.backgroundPosition = "5px center";
    div.style.backgroundColor = "#FFEBA7";
    div.style.zIndex = 10000;
    div.innerHTML = "正在请求数据，请耐心等待...";
    if (containerId)
        document.getElementById(containerId).appendChild(div);
    else
        document.body.appendChild(div);
}

//SetCookie('the_cookie', 'the_value', {expires: 7, path: '/', domain: 'huitu.com', secure: true});
function SetCookie(name, value, options) {
    var expires = '', path = '', domain = '', secure = '';
    if (options) {
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var exp;
            if (typeof options.expires == 'number') {
                exp = new Date();
                exp.setTime(exp.getTime() + options.expires * 24 * 60 * 60 * 1000);
            }
            else {
                exp = options.expires;
            }
            expires = ';expires=' + exp.toUTCString();
        }
        path = options.path ? '; path=' + options.path : '';
        domain = options.domain ? ';domain=' + options.domain : '';
        secure = options.secure ? ';secure' : '';
    }
    document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
}

function GetCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return decodeURIComponent(arr[2]); return null;
}

function DelCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = GetCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

document.getElementsByClassName = function (className) {
    var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
    var allElements = document.getElementsByTagName("*");
    var results = [];

    var element;
    for (var i = 0; (element = allElements[i]) != null; i++) {
        var elementClass = element.className;
        if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass))
            results.push(element);
    }

    return results;
}

/***********集合************/
//class Hashtable:散列
Hashtable = function () {
    this.hash = new Array();

    Hashtable.prototype.Clear = function () {
        this.hash = new Array();
    }

    Hashtable.prototype.ContainsKey = function (key) {
        var exists = false;
        if (this.hash[key] != null) {
            exists = true;
        }
        return exists;
    }

    Hashtable.prototype.ContainsValue = function (value) {
        var contains = false;
        if (value != null) {
            for (var i in this.hash) {
                if (this.hash[i] == value) {
                    contains = true;
                    break;
                }
            }
        }
        return contains;
    }

    Hashtable.prototype.Get = function (key) {
        return this.hash[key];
    }

    Hashtable.prototype.IsEmpty = function () {
        return (parseInt(this.size()) == 0) ? true : false;
    }

    Hashtable.prototype.GetKeys = function () {
        var keys = new Array();
        for (var i in this.hash) {
            if (this.hash[i] != null)
                keys.push(i);
        }
        return keys;
    }

    Hashtable.prototype.Put = function (key, value) {
        if (key == null || value == null) {
            return;
        }
        else {
            this.hash[key] = value;
        }
    }

    Hashtable.prototype.Remove = function (key) {
        var rtn = this.hash[key];
        this.hash[key] = null;
        return rtn;
    }

    Hashtable.prototype.GetSize = function () {
        var size = 0;
        for (var i in this.hash) {
            if (this.hash[i] != null) {
                size++;
            }
        }
        return size;
    }

    Hashtable.prototype.ToString = function () {
        var result = "";
        for (var i in this.hash) {
            if (this.hash[i] != null)
                result += "{" + i + "},{" + this.hash[i] + "}\n";
        }
        return result;
    }

    Hashtable.prototype.GetValues = function () {
        var values = new Array();
        for (var i in this.hash) {
            if (this.hash[i] != null)
                values.push(this.hash[i]);
        }
        return values;
    }

    Hashtable.prototype.EntrySet = function () {
        return this.hash;
    }
}

//class Queue:队列
Queue = function () {
    this.queue = [];
    this.queueSpace = 0;

    Queue.prototype.GetSize = function () {
        return this.queue.length - this.queueSpace;
    }

    Queue.prototype.IsEmpty = function () {
        return (this.queue.length == 0);
    }

    Queue.prototype.Enqueue = function (element) {
        this.queue.push(element);
    }

    Queue.prototype.Dequeue = function () {
        var element = undefined;

        if (this.queue.length) {
            element = this.queue[this.queueSpace];

            if (++this.queueSpace * 2 >= this.queue.length) {
                this.queue = this.queue.slice(this.queueSpace);
                this.queueSpace = 0;
            }
        }

        return element;
    }

    Queue.prototype.GetOldestElement = function () {
        var element = undefined;
        if (this.queue.length) {
            element = this.queue[this.queueSpace];
        }
        return element;
    }
}

//class ArrayList
ArrayList = function () {
    this.elems = [];
    this.elementCount = 0;

    ArrayList.prototype.GetSize = function () {
        return this.elementCount;
    }

    ArrayList.prototype.Add = function (element) {
        this.EnsureCapacity(this.elementCount + 1);
        this.elems[this.elementCount++] = element;
        return true;
    }

    ArrayList.prototype.AddElementAt = function (index, element) {
        if (index > this.elementCount || index < 0) {
            return;
        }
        this.EnsureCapacity(this.elementCount + 1);
        for (var i = this.elementCount + 1; i > index; i--) {
            this.elems[i] = this.elems[i - 1];
        }
        this.elems[index] = element;
        this.elementCount++;
    }

    ArrayList.prototype.SetElementAt = function (index, element) {
        if (index > this.elementCount || index < 0) {
            return;
        }
        this.elems[index] = element;
    }

    ArrayList.prototype.ToString = function () {
        var str = "";
        for (var i = 0; i < this.elementCount; i++) {
            if (i > 0) {
                str += "|";
            }
            str += this.elems[i];
        }
        str += "";
        return str;
    }

    ArrayList.prototype.Get = function (index) {
        if (index >= this.elementCount) {
            return;
        }
        return this.elems[index];
    }

    ArrayList.prototype.Remove = function (index) {
        if (index >= this.elementCount) {
            return null;
        }
        var oldData = this.elems[index];
        for (var i = index; i < this.elementCount - 1; i++) {
            this.elems[i] = this.elems[i + 1];
        }
        this.elems[this.elementCount - 1] = null;
        this.elementCount--;
        return oldData;
    }

    ArrayList.prototype.IsEmpty = function () {
        return elementCount == 0;
    }

    ArrayList.prototype.IndexOf = function (elem) {
        for (var i = 0; i < this.elementCount; i++) {
            if (this.elems[i] == elem) {
                return i;
            }
        }
        return -1;
    }

    ArrayList.prototype.LastIndexOf = function (elem) {
        for (var i = this.elementCount - 1; i >= 0; i--) {
            if (this.elems[i] == elem) {
                return i;
            }
        }
        return -1;
    }

    ArrayList.prototype.Contains = function (elem) {
        return this.IndexOf(elem) >= 0;
    }

    ArrayList.prototype.EnsureCapacity = function (minCapacity) {
        var oldCapacity = this.elems.length;
        if (minCapacity > oldCapacity) {
            var oldData = this.elems;
            var newCapacity = parseInt((oldCapacity * 3) / 2 + 1);
            if (newCapacity < minCapacity) {
                newCapacity = minCapacity;
            }
            this.elems = new Array(newCapacity);
            for (var i = 0; i < oldCapacity; i++) {
                this.elems[i] = oldData[i];
            }
        }
    }
}

function CreateFlash(id, swfurl, w, h, v) {
    var str = "<object classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" codebase=\"http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0\" width=\"" + w + "\" height=\"" + h + "\" id=\"" + id + "\" align=\"middle\">";
    str += "<param name=\"allowScriptAccess\" value=\"always\">";
    str += "<param name=\"quality\" value=\"high\">";
    str += "<param name=\"movie\" value=\"" + swfurl + "\">";
    str += '<param name=\"wmode\" value=\"transparent\">';
    str += "<param name=\"flashvars\" value=\"" + v + "\">";
    str += "<embed src=\"" + swfurl + "\" flashvars=\"" + v + "\" wmode=\"transparent\" quality=\"high\" width=\"" + w + "\" height=\"" + h + "\" name=\"" + id + "\" align=\"middle\" allowScriptAccess=\"always\" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\">";
    str += "</object>";
    document.write(str);
}

//限制数字输入，"jqueryObject"：jquery对象; "domObject" ： dom对象
function inputIntegerLimit(obj, objType) {
    var limitReg = /\D/;
    if (objType == "jqueryObject") {
        var val = obj.val();
        if (limitReg.test(val)) {
            var index = val.search(limitReg);
            obj.val(val.substring(0, index));
        }
    }
    if (objType == "domObject") {
        var val = obj.value;
        if (limitReg.test(val)) {
            var index = val.search(limitReg);
            obj.value = val.substring(0, index);
        }
    }
}

//限制数字输入，"jqueryObject"：jquery对象; "domObject" ： dom对象
function inputPhoneIntegerLimit(obj, objType) {
    var limitReg = /[^\d-]/g;
    if (objType == "jqueryObject") {
        var val = obj.val();
        if (val) {
            obj.val(val.replace(limitReg, ""))
        }
    }
    if (objType == "domObject") {
        var val = obj.value;
        if (val) {
            obj.value = val.replace(limitReg, "");
        }
    }
}


//滚动js
var timerList = {};
function animateScroll(element, childTagName) {
    if (element.attr("id")) {
        var id = element.attr("id")
    } else {
        var id = element.attr("class")
    }
    setInter();

    element.hover(function () { clearInterval(timerList[id]) }, function () { setInter() });

    function setInter() {
        timerList[id] = setInterval(function () {
            var height = element.find(childTagName + ":last").height();
            element.find(childTagName + ":last").css({ "height": "0px", "opacity": "0" }).prependTo(element);
            element.find(childTagName + ":first").animate({ "height": height + "px" }, 1000).animate({ "opacity": 1 }, 500);
        }, 3000);
    }
}
