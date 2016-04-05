/*
说起记忆这个功能，不难想起函数递归，比如斐波那契数列
0 1 1 2 3 5 8 13 21 34 55
一个斐波那契数字是之前两个数字之和
var fibo=function (n){
  return n < 2 ? n : fibo(n-1)+fibo(n-2);
}
fibo(10) //=>55
这样是可以工作的，仔细想想它做了很多无用的工作，很多值可能都被计算过。
为了减少运算量，采用数组来存储之前算过的值，以空间换时间。
var fibo=(function(){
  var memo=[0,1];
  var f=function(n){
     var result=memo[n];
     if(typeof result!=='number'){
        result=f(n-1)+f(n-2);
        memo[n]=result;
     }
     return result;
  }
  return f;
})()
这样大大减少了计算量，采用闭包模块化思维来写功能模块，把对外暴漏的接口写成函数返回，静态私有变量来存储结果

同样把这种技术编写一个带有记忆功能的函数 memoizer
1.函数首先要获取memo数组，和formula函数

var memoizer=function(memo,formula){
   var recur=function(n){
     var result=memo[n];
     if(typeof result!=='number'){
        result=formula(recur,n);
        memo[n]=result;
     }
     return result;
   }
   return recur;
}
//斐波那契数列
var fibo=memoizer([0,1],function(recur,n){
   return n<2 ? n : recur(n-1)+recur(n-2);
});
//阶乘函数 n!=(n-1)!*n // 0!=1 1!=1 2!=2 3!=6
var factorial=memoizer([1,1],function(recur,n){
  return n*recur(n-1);
})

*/
