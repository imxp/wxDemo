Component({ 
  options: {
    multipleSlots: true 
  },
  properties: {
    openType: String
  },

  data: {
  },

  methods: {
    onGetUserInfo(event){
      this.triggerEvent('getuserinfo', event.detail, {})
    }
  }
})
