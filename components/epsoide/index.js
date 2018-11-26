Component({
  properties: {
    index: Number
  },
  data: {
    year: 0,
    month: ''
  },
  methods: {

  },
  attached(){
    console.log(this.data);
    
  }
})
