const slideList = [
  {
    ageNumber: 4,
    ageMonth: "месяца",
    picture: "rabbit.png",
    name: "Карликовый кролик",
    description: "Милый, пушистый комочек",
    kind: "Кролик",
    spice: "Грызун",
    price: 1350,
  },
  {
    ageNumber: 5,
    ageMonth: "месяцев",
    picture: "monkey.png",
    name: "Макака",
    description: "Смышлёный малыш",
    kind: "Обезьяна",
    spice: "Травоядное",
    price: 10200,
  },
  {
    ageNumber: 3,
    ageMonth: "месяца",
    picture: "mops.png",
    name: "Мопс",
    description: "Друг для всей семьи",
    kind: "Собака",
    spice: "Хищник",
    price: 6700,
  },
  {
    ageNumber: 1,
    ageMonth: "год",
    picture: "cat.png",
    name: "Британский котик",
    description: "Весёлый забияка",
    kind: "Кот",
    spice: "Диваноцараптор",
    price: 7600,
  },
  {
    ageNumber: 1,
    ageMonth: "месяц",
    picture: "cavy.png",
    name: "Морская свинка",
    description: "Забавный зверёк",
    kind: "Свинка",
    spice: "Млекопитающее",
    price: 1000,
  },
  {
    ageNumber: 2,
    ageMonth: "месяца",
    picture: "turtle.png",
    name: "Черепашка",
    description: "Реликтовое животное",
    kind: "Пресмыкающееся",
    spice: "Долгожитель",
    price: 1200,
  },
];

let slideData = [];
let tmpCatalogBtnRightClick;
let tmpCatalogBtnLeftClick;
let tmpIndicatorClick;

const catalogCarousel = Vue.createApp({
  data() {
    return {
      slideData,
      slideList,
      catalogSlideWidth: 367,
      circleActive: 0,
      bigSlide: true,
    };
  },
  created() {
    window.addEventListener("resize", this.onResize);
    this.onResize();

    if (!this.BigSlide) {
      // this.catalogSlideWidth = 250;
    } else {
      this.catalogSlideWidth = 367;
    }





    for (let i = 0; i < slideList.length; i++) {
      slideData[i] = slideList[i];
      slideData[i].price = slideData[i].price.toLocaleString();
      slideData[i].left =
        i * (this.catalogSlideWidth + 30) - this.catalogSlideWidth + 4 - 30;
      slideData[i].visible = true;
      slideData[i].animation = true;
    }
    this.firstSetUp();
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.bigSlide = window.innerWidth >= 500;
    },
    // Щелчок по кнопе вправо
    catalogBtnRightClick() {
      // Временная блокировка кнопки
      tmpCatalogBtnRightClick = this.catalogBtnRightClick;
      this.catalogBtnRightClick = null;

      setTimeout(this.unlockRightButton, 500);
      // Меняем индикатор
      this.circleActive = (this.circleActive + 1) % slideList.length;

      // Перемещаем слайды
      for (let i = 0; i < this.slideData.length; i++) {
        this.slideData[i].left =
          this.slideData[i].left - (this.catalogSlideWidth + 30);
        if (this.slideData[i].left < -this.catalogSlideWidth - 30 + 4) {
          this.slideData[i].visible = false;
          this.slideData[i].left =
            this.slideData[i].left +
            (this.catalogSlideWidth + 30) * this.slideData.length;
          setTimeout(this.makeVisible, 500, i);
        }
      }
    },

    // Щелчок по кнопе влево
    catalogBtnLeftClick() {
      // Временная блокировка кнопки
      tmpCatalogBtnLeftClick = this.catalogBtnLeftClick;
      this.catalogBtnLeftClick = null;
      setTimeout(this.unlockLeftButton, 500);
      // Меняем индикатор
      if (this.circleActive === 0) {
        this.circleActive = slideList.length - 1;
      } else this.circleActive = this.circleActive - 1;

      // Перемещаем слайды
      for (let i = 0; i < this.slideData.length; i++) {
        this.slideData[i].left =
          this.slideData[i].left + (this.catalogSlideWidth + 30);
        if (
          this.slideData[i].left >
          (this.catalogSlideWidth + 30) * (this.slideData.length - 2) + 4
        ) {
          this.slideData[i].visible = false;
          this.slideData[i].left =
            this.slideData[i].left -
            (this.catalogSlideWidth + 30) * this.slideData.length;
          setTimeout(this.makeVisible, 500, i);
        }
      }
    },
    makeVisible(i) {
      this.slideData[i].visible = true;
    },
    indicatorClick(index) {
      tmpIndicatorClick = this.indicatorClick;
      this.indicatorClick = null;
      setTimeout(this.unblockIndicatorClick, 500);
      let deltaMove;

      // Поиск активного слайда
      let activeSlide;

      activeSlide = this.circleActive;

      // Вычисляем на сколько слайдов необходимо сдвинуть слайдер и в какую сторону
      deltaMove = index - activeSlide;

      // Перемещаем индикатор
      this.circleActive = (this.circleActive + deltaMove) % slideList.length;

      if (deltaMove > 0) {
        const slide = (activeSlide + slideData.length) % slideData.length;
        for (let i = 0; i < deltaMove; i++) {
          let newElement = {
            ageNumber: slideList[slide + i].ageNumber,
            ageMonth: slideList[slide + i].ageMonth,
            picture: slideList[slide + i].picture,
            name: slideList[slide + i].name,
            description: slideList[slide + i].description,
            kind: slideList[slide + i].kind,
            spice: slideList[slide + i].spice,
            price: slideList[slide + i].price,
            visible: true,
            animation: true,
            left:
              (slideList.length - 1) * (this.catalogSlideWidth + 30) +
              4 +
              i * (this.catalogSlideWidth + 30),
          };
          this.slideData.push(newElement);
        }
      }

      if (deltaMove < 0) {
        let slide;
        if (activeSlide === 0) {
          slide = slideData.length - 1;
        } else slide = activeSlide - 1;
        for (let i = 0; i > deltaMove; i--) {
          let newElement = {
            ageNumber: slideList[slide + i].ageNumber,
            ageMonth: slideList[slide + i].ageMonth,
            picture: slideList[slide + i].picture,
            name: slideList[slide + i].name,
            description: slideList[slide + i].description,
            kind: slideList[slide + i].kind,
            spice: slideList[slide + i].spice,
            price: slideList[slide + i].price,
            visible: true,
            animation: true,
            left:
              -this.catalogSlideWidth -
              30 +
              4 +
              (i - 1) * (this.catalogSlideWidth + 30),
          };
          this.slideData.push(newElement);
        }
      }

      for (let i = 0; i < slideData.length; i++) {
        setTimeout(this.moveSlideUp, 10, i, deltaMove);
      }

      setTimeout(this.removeSlide, 500);
    },
    slideShift(slideNumber, shiftCoord) {
      this.slideData[slideNumber].animation = false;
      slideData[slideNumber].left = slideData[slideNumber].left + shiftCoord;
    },
    moveSlideUp(i, deltaMove) {
      this.slideData[i].left =
        slideData[i].left - (this.catalogSlideWidth + 30) * deltaMove;
    },
    removeSlide() {
      for (let i = 0; i < slideData.length; i++) {
        this.slideData[i].animation = false;
        if (
          slideData[i].left < -this.catalogSlideWidth - 30 + 4 ||
          slideData[i].left >
            (slideList.length - 2) * (this.catalogSlideWidth + 30) + 4
        ) {
          this.slideData.splice(i, 1);
          i--;
        }
        setTimeout(this.returnAnimation, 10);
      }
    },
    returnAnimation() {
      for (let i = 0; i < slideData.length; i++) {
        this.slideData[i].animation = true;
      }
    },
    unlockRightButton() {
      this.catalogBtnRightClick = tmpCatalogBtnRightClick;
    },
    unlockLeftButton() {
      this.catalogBtnLeftClick = tmpCatalogBtnLeftClick;
    },
    unblockIndicatorClick() {
      this.indicatorClick = tmpIndicatorClick;
    },
    firstSetUp() {
      for (let i = 0; i < slideList.length; i++) {
        slideData[i].left =
          i * (this.catalogSlideWidth + 30) - this.catalogSlideWidth + 4 - 30;
      }
    }
  },
  watch: {
    bigSlide(newBigSlide) {
      if (!newBigSlide) {
        this.catalogSlideWidth = 250;
      } else {
        this.catalogSlideWidth = 367;
      }
      this.firstSetUp();
    },
  },
});

catalogCarousel.mount("#catalog");
