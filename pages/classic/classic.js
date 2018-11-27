import { ClassicModel } from '../../modules/classic.js'
import { LikeModel } from '../../modules/like.js'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({
  data: {
    classic: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },
  onLike: function (event) {
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },

  onNext: function (event) {
    this._updateClassic('next')
  },
  
  onPrevious: function (event) {
    this._updateClassic('previous')    
  },

  _updateClassic: function (nextOrPrevious) {
    let index = this.data.classic.index
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },

  _getLikeStatus: function (artID, category) {
    likeModel.getClassicLikeStatus(artID, category, (res) => {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },

  onLoad: function (options) {
    classicModel.getLatest((res) => {
      this.setData({
        classic: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
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