import { ClassicModel } from '../../modules/classic.js'
import { BookModel } from '../../modules/book.js'

const classicModel = new ClassicModel()
const bookModel = new BookModel()

Page({

  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },

  onLoad: function (options) {
    this.userAuthorized()
    
  },

  onShow(){
    this.getMyBookCount()
    this.getMyFavor()
  },

  getMyBookCount(){
    bookModel.getMybBookCount().then((res)=>{
      this.setData({
        bookCount: res.count
      })
    })
  },

  getMyFavor(){
    classicModel.getMyFavor(res => {
      this.setData({
        classics: res
      })
    })
  },

  userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },

  onJumpToDetail(event){
    const cid = event.detail.cid
    const type = event.detail.type
    wx.navigateTo({
      url:`/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`
    })
  }
})