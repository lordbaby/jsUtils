/*
发布订阅模式，可现实先发布后订阅
比如商城中用户登录之后获取用户信息，再渲染用户导航，有时会出现用户信息获取完了（开始发布事件），导航模块代码还没加载完（即还没订阅事件）
特别是用了一些模块化惰性加载技术后
*/
var Event2 = (function() {
    var global = this,
        Event2,
        _default = 'default';
    Event2 = (function() {
        var _listen,
            _trigger,
            _remove,
            _slice = Array.prototype.slice,
            _shift = Array.prototype.shift,
            _unshift = Array.prototype.unshift,
            namespaceCache = {},
            _create,
            find,
            each = function(arr, fn) {
                var ret;
                for (var i = 0; i < arr.length; i++) {
                    var n = arr[i];
                    ret = fn.call(n, i, n);
                }
                return ret;
            }

        _listen = function(key, fn, cache) {
            if (!cache[key]) {
                cache[key] = [];
            }
            cache[key].push(fn);
        }

        _remove = function(key, cache, fn) {
            if (cache[key]) {
                if (fn) {
                    for (var i = cache[key].length; i >= 0; i--) {
                        if (cache[key][i] === fn) {
                            cache[key].splice(i, 1)
                        }
                    };
                } else {
                    cache[key] = [];
                }
            }
        }

        _trigger = function() {
            var cache = _shift.call(arguments),
                key = _shift.call(arguments),
                args = arguments,
                _self = this,
                ret,
                stack = cache[key];
            if (!stack || !stack.length) {
                return;
            }
            return each(stack, function() {
                return this.apply(_self, args);
            })
        }

        _create = function(ns) {
            var namespace = ns || _default;
            var cache = {},
                offlineStack = [],
                ret = {
                    listen: function(key, fn, last) {
                        _listen(key, fn, cache);
                        if (offlineStack === null) {
                            return;
                        }
                        if (last === 'last') {
                            offlineStack.length && offlineStack.pop()();
                        } else {
                            each(offlineStack, function() {
                                this();
                            })
                        }
                        offlineStack = null;
                    },
                    one: function(key, fn, last) {
                        _remove(key, cache);
                        this.listen(key, fn, last);
                    },
                    remove: function(key, fn) {
                        _remove(key, cache, fn);
                    },
                    trigger: function() {
                        var fn, args, _self = this;
                        _unshift.call(arguments, cache);
                        args = arguments;
                        fn = function() {
                            return _trigger.apply(_self, args);
                        }
                        if (offlineStack) {
                            return offlineStack.push(fn);
                        }
                        return fn();
                    }
                }
            return namespace ? (namespaceCache[namespace] ? namespaceCache[namespace] : namespaceCache[namespace] = ret) : ret;
        }
        return {
            create: _create,
            one: function(key, fn, last) {
                var event = this.create();
                event.one(key, fn, last);
            },
            remove: function(key, fn) {
                var event = this.create();
                event.remove(key, fn);
            },
            listen: function(key, fn, last) {
                var event = this.create();
                event.listen(key, fn, last);
            },
            trigger: function() {
                var event = this.create();
                event.trigger.apply(this, arguments);
            }
        }
    })();
    return Event2;
})()


//先触发
Event2.create('ns1').trigger('click',1);
//后订阅
setTimeout(function(){
	Event2.create('ns1').listen('click',function(a){
		console.log(a); //output :1
	})
},2000)

Event2.create('ns2').trigger('click',2);

setTimeout(function(){
	Event2.create('ns2').listen('click',function(a){
		console.log(a);//output :2
	})
},3000)
