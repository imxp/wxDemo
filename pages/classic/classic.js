import { ClassicModel } from '../../modules/classic.js'
import { LikeModel } from '../../modules/like.js'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({
  data: {
    classic: null
  },
  onLike: function (event) {
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },
  onLoad: function (options) {
    classicModel.getLatest((res) => {
      this.setData({
        classic: res
      })
    })
  },
  onReady: function () {
    
  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})