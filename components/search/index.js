import { BookModel } from '../../modules/book.js'
import { KeywordModel } from '../../modules/keyword.js'
import { pagination } from '../behaviors/pagination.js'


const bookModel = new BookModel()
const keywordModel = new KeywordModel()

Component({
  behaviors: [pagination],
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    loadingCenter: false
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
    loadMore(){
      if(!this.data.q){
        return 
      }

      if(this.isLocked()){
        return
      }

      if(this.hasMore()){
        this.locked()
        bookModel.search(this.getCurrentStart(), this.data.q).then(res=>{
          this.setMoreData(res.books)
          this.unLcoked()
        }, ()=>{
          this.unLcoked()
        })
      }
      
    },

    onCancel(event) {
      this.triggerEvent('cancel',{},{})
      this.initialize()
    },

    onDelete(event) {
      this._closeResult()
      this.initialize()
    },

    onConfirm(event) {
      this._showLoadingCenter()
      this._showResult()

      const q = event.detail.value || event.detail.text
      this.setData({ q })

      bookModel.search(0, q).then((res) => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        keywordModel.addToHistory(q)
        this._hideLoadingCenter()
      })
    },

    _showResult(){
      this.setData({
        searching: true
      })
    },

    _closeResult(){
      this.setData({
        searching: false,
        q: ''
      })
    },

    _showLoadingCenter(){
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter(){
      this.setData({
        loadingCenter: false
      })
    }
  }
})
