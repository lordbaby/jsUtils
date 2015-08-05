####例子
```javascript
  // 挑战目标：
  //   获取闭包内的 handler 变量，提交给 check，弹出 win 成功
  //   不能有交互
  //   兼容主流浏览器
  (function() {
      var handler = function(e) {
          if (e.target == document) {
              // ...
          }
      };
      
      document.addEventListener('click', handler);
  
      window.check = function(arg) {
          if (arg == handler) {
              alert('win');
          }
      };
  })();
  // 这里写挑战代码：
````
细心的coder会发现check函数中if里用的是==而非=== 这里就突破点，在js中==在判断之前会进隐式转换
比如<code>console.log("1"==1) //true</code>,这里"1"会隐式转换为数字1然后在比较。
先补补脑==
* 首先如果==前后出现NaN，一律返回false。
* 再看==前后有没有布尔，有布尔将布尔转为数字（false=0，true=1）
* 接着看==前后有没有字符串，如果有字符串，则有三种情况
  1. 对方是对象，对象使用toString进行转换。
  2. 对方是数字，字符串转数字
  3. 对方是字符串，直接比较
  4. 其他返回false
* 如果是数字与对象进行比较，则对象使用valueOf进行转换
* null、undefined比较不进行类型转换，但它们两个相等
####举几个例子巩固
````javascript
  console.log(NaN==null) //false
  console.log(0==false) //true
  console.log("abc"=={toString:function(){return "abc"}}) //true
  console.log(1=="1")//true
  console.log(1=={valueOf:function(){return 1;}}) //true
  console.log(null==0) //false
  console.log(undefined==0)//false
  console.log({toString:function(){return "abc"},valueOf:function(){return 1}}==1)//true 这里valueOf的优先级比toString要高
  console.log({toString:function(){return "abc"},valueOf:function(){return 1}}=="abc") //false
  
````
回到上面的代码要想arg==handler 这里利用隐式转换将arg的this指向handler即可
````javascript
    var innerFun
        tmpFun=Function.prototype.valueOf,
        Function.prototype.valueOf=function(e){
            innerFun=this;
        }
    check(1);
    Function.prototype.valueOf=tmpFun;
    check(innerFun);
````
