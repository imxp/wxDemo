Component({
  options: {
    multipleSlots: true
  },
  externalClasses: ['tag-class'],
  properties: {
    text: String
  },
  data: {

  },
  methods: {
    onTap: function (event) {
      this.triggerEvent('tapping', {
        text: this.properties.text
      })
    }
  }
})
