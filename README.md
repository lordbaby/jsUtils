# jsUtils
JavaScript工具仓库

###客户端通用消息门户框架
针对页面中多个iframe间的通信  

1. 主页面引用mp.js,注册window
2. iframe中的页面引用mp.js
3. 发送消息  
```javascript
	MP.send('msg',{ key:value }/,options);
```
4. 接受消息  

```javascript
	MP.on('msg',function(data){
	 //data.key
   })
```
5. 效果  

	![mp_01](/images/mp_01.png)