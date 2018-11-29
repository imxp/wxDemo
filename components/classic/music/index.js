import { classicBeh } from '../classic-beh'

const mMgr = wx.getBackgroundAudioManager()

Component({
  behaviors: [classicBeh],
  properties: {
    src: String,
    title: String
  },
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },
  attached: function (event) {
    this._recoverStatus()
    this._monitorSwitch()
  },
  methods: {
    onPlay: function (event) {
      if(!this.data.playing){
        this.setData({
          playing: true
        })
        mMgr.title = this.properties.title
        mMgr.src = this.properties.src
      }else{
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },

    _recoverStatus: function () {
      if(mMgr.paused){
        this.setData({
          playing: false
        })
        return 
      }
      if(mMgr.src == this.properties.src){
        this.setData({
          playing: true
        })
      }
    },

    _monitorSwitch: function () {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})
