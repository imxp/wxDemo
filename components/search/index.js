import { BookModel } from '../../modules/book.js'
import { KeywordModel } from '../../modules/keyword.js'


const bookModel = new BookModel()
const keywordModel = new KeywordModel()

Component({
  properties: {

  },

  data: {
    historyWords: [],
    hotWords: []
  },

  attached() {
    
    this.setData({
      historyWords: keywordModel.getHistory()
    })

    keywordModel.getHot().then((res) => {
      this.setData({
        hotWords: res.hot
      })
    })
  },

  methods: {
    onCancel: function (event) {
      this.triggerEvent('cancel',{},{})
    },
    onConfirm: function (event) {
      const word = event.detail.value
      keywordModel.addToHistory(word)
    }
  }
})
