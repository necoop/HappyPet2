const viewer = Vue.createApp({
  data() {
    return {
      pictures: [
        "Птички.jpg",
        "Рыбки.jpg",
        "Котик.jpg",
        "Кролики.jpg",
        "Собачки.jpg",
        "Черепаха.jpg",
      ],
      preview: false,
      previewPic: null,
      index: null,
      picName: null,
      picWidth: 0,
      picHeight: 0,
      borderVisibility: 'hidden',
      picTop: 0,
      picLeft: 0,
      screenWidth: 0,
      screenHeight: 0,
      naturalWidth: 0,
      naturalHeight: 0,
    };
  },
  created() {
    this.screenWidth = document.documentElement.clientWidth;
    this.screenHeight = document.documentElement.clientHeight;
    window.addEventListener("resize", this.onResize);
    // this.onResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    viewerClick(index) {
      this.preview = true;
      this.picName = this.pictures[index];
      setTimeout(this.drow, 100);
    },
    viewerOn() {
      if (this.preview) {
        this.preview = false;
        this.picWidth = 0;
        this.picHeight = 0;
        this.borderVisibility = 'hidden';
      }
    },
    drow() {
      this.naturalWidth = this.$refs.imagePreview.naturalWidth;
      this.naturalHeight = this.$refs.imagePreview.naturalHeight;

      this.picWidth = this.naturalWidth;
      this.picHeight = this.naturalHeight;


      if (this.screenWidth * 0.9 < this.picWidth) {
        let tmp = this.naturalWidth / this.naturalHeight;
        this.picWidth = this.screenWidth * 0.9;
        this.picHeight = this.picWidth / tmp;
      } 
      if (this.screenHeight * 0.9 < this.picHeight) {
        let tmp = this.naturalWidth / this.naturalHeight;
        this.picHeight = this.screenHeight * 0.9;
        this.picWidth = this.picHeight * tmp;
      } 

      this.picLeft = (this.screenWidth - this.picWidth) / 2;
      this.picTop = (this.screenHeight - this.picHeight) / 2;
      this.borderVisibility = 'visible';
      // console.log('Оригинальный размер ' + this.naturalWidth + ' x ' + this.naturalHeight);
      // console.log('Размер экрана ' + this.screenWidth + ' x ' + this.screenHeight);
      // console.log('Видимый размер ' + this.picWidth + ' x ' + this.picHeight);
    },
    onResize() {
      this.screenWidth = document.documentElement.clientWidth;
      this.screenHeight = document.documentElement.clientHeight;
      setTimeout(this.drow, 100);
    },
  },
  watch: {
    // screenWidth(newValue) {
    //   if (newValue * 0.9 < this.naturalWidth) {
    //     let tmp = this.naturalWidth / this.naturalHeight;
    //     this.picWidth = newValue * 0.9;
    //     this.picHeight = this.picWidth / tmp;

    //   }
    //   if (this.screenHeight * 0.9 < this.naturalHeight) {
    //     let tmp = this.naturalWidth / this.naturalHeight;
    //     this.picHeight = this.screenHeight * 0.9;
    //     this.picWidth = this.picHeight * tmp;
    //   }
    //   this.picLeft = (this.screenWidth - this.picWidth) / 2;
    //   this.picTop = (this.screenHeight - this.picHeight) / 2;
    //   // console.log(this.picWidth + ' x ' + this.picHeight);
    // },
    // screenHeight(newValue) {
    //   if (newValue * 0.9 < this.naturalHeight) {
    //     let tmp = this.naturalWidth / this.naturalHeight;
    //     this.picHeight = newValue * 0.9;
    //     this.picWidth = this.picHeight * tmp;
    //   }
    //   this.picLeft = (this.screenWidth - this.picWidth) / 2;
    //   this.picTop = (this.screenHeight - this.picHeight) / 2;
    // },
  },
});
viewer.mount("#play");
