Component({
  properties: {
    like: Boolean,
    count: Number
  },
  data: {
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png'
  },
  methods: {
    onLike: function (event) {
      let like = this.properties.like
      let count = this.properties.count

      count = like?count-1:count+1
      this.setData({
        like: !like,
        count: count
      })

      let behavior = this.properties.like?'like':'cancel'
      this.triggerEvent('like',{
        behavior: behavior
      },{})
    }
  }
})
