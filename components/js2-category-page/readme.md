## 使用
 - 在页面的json配置文件中使用：
 ```json
 "usingComponents": {
    "js2-category-page": "/components/js2-category-page/js2-category-page"
  }
 ```
 - 在页面的wxml结构文件中使用：
 ```
 <js2-category-page categories="{{categories}}"></js2-category-page>
 ```
 - 当前示例的数据结构是：
 ```
 categories: [{
 	name:'男装',
 	goods:[{
 		title:'男装1'
 		}]
 	},{
 	name:'女装',
 	goods:[{
 		title:'女装1'
 	}]
 }]
 ```

## 该组件只做了基本的联动功能，实际渲染数据和结构请根据项目需求修改。

![image](https://github.com/mkinit/wechat-applet/raw/master/components/js2-category-page/demo.gif)