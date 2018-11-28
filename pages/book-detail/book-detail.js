import { BookModel } from '../../modules/book.js'

const  bookModel = new BookModel

Page({
  data: {
    book: null,
    comments: [],
    likeStatus: false,
    likeCount: 0

  },
  onLoad: function (options) {
    const bid = options.bid
    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)

    detail.then((res) => {
      this.setData({
        book: res
      })
      console.log(res);
      
    })

    comments.then((res) => {
      this.setData({
        comments: res
      })
      console.log(res);
      
    })

    likeStatus.then((res) => {
      this.setData({
        likeCount: res.like_status,
        likeCount: res.fav_nums
      })
      console.log(res);
      
    })
  }
})