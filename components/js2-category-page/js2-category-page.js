// components/js2-category-page/js2-category-page.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categories:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    current_floor: 0, //当前楼层，通过菜单点击控制
		menu_index: 0, //当前菜单序号，用于渲染高亮状态
		floor: [], //所有楼层到顶部的距离和元素高度
		menu_item_h: 0, //菜单项的高度
		menu_top: 0, //设置菜单的滚动高度
		window_h:0,//屏幕高度
  },
    ready(){
      wx.getSystemInfo({
        success: res => {
          this.data.window_h = res.windowHeight
        },
      })
  
      //获取每个分类列表到顶部的距离
      this.createSelectorQuery().selectAll('.goods-item').boundingClientRect(res => {
        res.forEach(item => {
          console.log(item)
          this.data.floor.push({
            top:item.top,
            height:item.height
          })
        })
      }).exec()
  
      //获取分类菜单项的高度（所有菜单项需要等高）
      this.createSelectorQuery().select('.category-item').boundingClientRect(res => {
        this.data.menu_item_h = res.height
      }).exec()
    },
  

  /**
   * 组件的方法列表
   */
  methods: {
    scrollTo(event) { //菜单点击事件
      const index = Number(event.currentTarget.dataset.index)
      this.setData({
        current_floor: index,
        menu_index: index,
        menu_top: (index - 3) * this.data.menu_item_h//显示当前菜单项的前三个，如果有
      })
    },
    onScroll(event) { //滚动事件
      const scroll_top = event.detail.scrollTop //要滚动的高度
      const floor = this.data.floor//各个楼层到顶部的距离和元素高度
      if (scroll_top <= floor[0].height) {
        this.setData({
          menu_index: 0,
          menu_top: 0
        })
        return
      }
      //滚动距离超过内容项高度，设置当前菜单项高亮
      for (let i = 1; i < floor.length; i++) {
        if (scroll_top <= floor[i].top+this.data.window_h/2) {
          this.setData({
            menu_index: i,
            menu_top: (i - 3) * this.data.menu_item_h
          })
          return
        }
      }
    }
  },
})
