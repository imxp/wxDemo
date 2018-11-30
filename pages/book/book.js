import { BookModel } from '../../modules/book.js'

let bookModel = new BookModel()


Page({
  data: {
    books: [],
    searching: false
  },
  onSearching: function (event) {
    this.setData({
      searching: true
    })
  },
  onCancel: function (event) {
    this.setData({
      searching: false
    })
  },
  onLoad: function (options) {
    bookModel.getHotList().then((res) => {
      this.setData({
        books: res
      })
    })
  }
})