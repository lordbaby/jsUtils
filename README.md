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

###Hash操作类
针对window.location.hash进行增删改查  

1. 增加/修改 ```javascript    Hash.add({ key:value })```
2. 删除 ```javascript     Hash.remove([key1,key2])```
3. 查询 ```javascript     Hash.get('key')```
4. 清空 ```javascript     Hash.clear()```