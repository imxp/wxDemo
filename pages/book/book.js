import { BookModel } from '../../modules/book.js'
import { random } from '../../util/common.js'

let bookModel = new BookModel()

Page({
  data: {
    books: [],
    searching: false,
    more: ''
  },
  onSearching(event) {
    this.setData({
      searching: true
    })
  },
  onCancel(event) {
    this.setData({
      searching: false
    })
  },

  onReachBottom(){
    this.setData({
      more: random(16)
    })
  },

  onLoad(options) {
    bookModel.getHotList().then((res) => {
      this.setData({
        books: res
      })
    })
  }
})