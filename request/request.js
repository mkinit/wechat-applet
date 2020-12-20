/*
 *@constructor
 *@params {String} base_url 基本的请求地址
 *@params {Function} callback 回调函数，统一处理请求结果
 *
 *@method request
 *@params {String} url 请求的路由
 *@params {String} method 请求方式，默认get
 *@params {Object} header 额外的头部请求信息
 *@params {Object} data 请求数据
 */
export default class {
	constructor({
		base_url,
		callback
	}) { //接收在app.js实例化时传过来的基本请求地址和头部信息
		this.base_url = base_url
		this.callback = callback
	}
	request({
		url,
		method = 'get',
		header,
		data
	}) { //数据请求方法
		if (!this.base_url) {
			wx.showToast({
				icon: 'none',
				title: '未定义基本api地址'
			})
			return
		}
		if (!this.callback) {
			wx.showToast({
				icon: 'none',
				title: '未定义统一处理回调函数'
			})
			return
		}
		if (typeof this.callback !== 'function') {
			wx.showToast({
				icon: 'none',
				title: '回调函数必须是函数'
			})
			return
		}
		return new Promise((resolve, reject) => {
			wx.request({
				method: method ? method : 'get',
				url: this.base_url + url,
				header: {
					token:wx.getStorageSync('token'),
					...header
				},
				data: data ? data : {},
				success: res => {
					this.callback(resolve, reject, res)
				},
				fail: err => {
					wx.showToast({
						icon: 'none',
						title: '网络错误'
					})
				}
			})
		})
	}
}