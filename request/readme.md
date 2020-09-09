## 微信小程序网络请求封装

### 使用
- 在小程序应用入口（app.js）引用该类，定义一个全局方法实例化该类，并传递基本的请求地址和头部信息
```
import request from './utils/request.js'
App({
	http() {
		return new request({
			base_url: 'https://im.mkinit.com/wp-json/wp/v2/',
			header: {
				Authorization: 'Bearer ' + wx.getStorageSync('token')
			},
			callback:(resolve,reject,res)=>{
				switch(res.statusCode){
					case 200:resolve(res);break
					case 401:console.log('未授权');break//统一处理未授权的问题
					default:reject(res)
				}
			}
		})
	}
})
```
- 然后在页面中使用
```
const app = getApp()//获取应用实例
const http = app.http()//获取实例中定义的请求方法
Page({
  onLoad: function () {
    http.request({//使用它
      url: 'info'
    }).then(res=>{
      console.log(res)
    })
  }
})
```

### 参数说明
- @constructor
- @params {String} base_url 基本的请求地址
- @params {Object} header 头部请求信息
- @params {Function} callback 回调函数，统一处理请求结果，callback需要接收3个参数：resolve,reject,res
- 
- @method request
- @params {String} url 请求的路由
- @params {String} method 请求方式，默认get
- @params {Object} header 额外的头部请求信息，如果有的话就和实例化时的header对象合并，否则使用实例化时的header
- @params {Object} data 请求数据
 