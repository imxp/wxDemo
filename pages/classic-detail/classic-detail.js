Page({

  data: {
    cid: null,
    type: null
  },

  onLoad: function (options) {
    this.setData({
      cid: options.cid,
      type: options.type
    })
  },
})