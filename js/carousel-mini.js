const slide = [
  { name: "Птицы", img: "bird.png" },
  { name: "Рыбки", img: "fish.png" },
  { name: "Собаки", img: "dog.png" },
  { name: "Котики", img: "cat.png" },
];

let slideOrder = [];
let activeSlide = 0;
const slideWidth = 277;
let numberVisibleSlides = 2;
let btnContainerWidth = slideWidth * numberVisibleSlides - 34;
let btnMiniSliderRight = btnContainerWidth + 73;
let scrollWidth = btnContainerWidth - 93 * 2;
let runnerWidth = scrollWidth / slide.length;
let rightBtnActive;
let leftBtnActive;

setSlideOrder();
function setSlideOrder() {
  for (let i = 0; i < slide.length; i++) {}
}

setFirstSlidePosition();
function setFirstSlidePosition() {
  for (let i = 0; i < slide.length; i++) {
    slideOrder[i] = slide[i];
    slideOrder[i].index = i;
    slideOrder[i].left = slideWidth * i - slideWidth + 4;
    if (i < numberVisibleSlides + 2) {
      slideOrder[i].visible = true;
    } else {
      slideOrder[i].visible = false;
    }
  }
}

const carousel__mini = Vue.createApp({
  data() {
    return {
      slideWidth,
      numberVisibleSlides,
      btnContainerWidth,
      btnMiniSliderRight,
      scrollWidth,
      slideOrder,
      btnRightDisable: false,
      btnLeftDisable: false,
      drag: false,
      runnerCoordX: 0,
      startRunnerX: 0,
      runnerStartX: 0,
      runnerCurrientX: 0,
      runnerWidth,
      runnerTransition: "0.5s",
      sliderBoxTransition: "0.5s",
      bigWindows: true,
    };
  },
  created() {
    window.addEventListener("resize", this.onResize);
    this.onResize();
    this.btnContainerWidth = slideWidth * numberVisibleSlides - 34;
    this.btnMiniSliderRight = this.btnContainerWidth + 73;
    this.scrollWidth = this.btnContainerWidth - 93 * 2;
    this.runnerWidth = this.scrollWidth / slide.length;
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.bigWindows = window.innerWidth >= 664;
    },
    dragRunnerStart(event) {
      this.drag = true;
      this.runnerStartX = event.clientX;
      event.preventDefault();
      this.startRunnerX = this.runnerCoordX;
    },
    dragRunner(event) {
      this.runnerCurrientX = event.clientX;
      if (this.drag) {
        this.runnerShiftX = this.runnerCurrientX - this.runnerStartX;
        this.runnerCoordX = this.runnerShiftX + this.startRunnerX;
        if (this.runnerCoordX > this.scrollWidth - this.runnerWidth)
          this.runnerCoordX = this.scrollWidth - this.runnerWidth;
        if (this.runnerCoordX < 0) this.runnerCoordX = 0;
      }
    },
    dragRunnerStop(event) {
      this.drag = false;
      let newCoord = 0;
      for (let i = 0; i < this.slideOrder.length; i++) {
        if (
          Math.abs(
            (i * (this.scrollWidth - this.runnerWidth)) /
              (this.slideOrder.length - 1) -
              this.runnerCoordX
          ) <
          (this.scrollWidth - this.runnerWidth) /
            (this.slideOrder.length - 1) /
            2
        ) {
          newCoord =
            (i * (this.scrollWidth - this.runnerWidth)) /
            (this.slideOrder.length - 1);
          break;
        }
      }
      this.runnerCoordX = newCoord;
    },
    miniSliderUp() {
      // Перемещаем бегунок по шкале при нажатии на кнопу "вперёд"
      this.runnerCoordX =
        this.runnerCoordX +
        (this.scrollWidth - this.runnerWidth) / (this.slideOrder.length - 1);
      // Перенос ползунка на другую сторону при достижении окончания шкалы
      if (this.runnerCoordX > this.scrollWidth - this.runnerWidth) {
        this.runnerCoordX = this.runnerCoordX - this.scrollWidth;
      }

      // Сообщаем бегунку, что он перемещается по нажатию правой кнопки
      rightBtnActive = true;

      // Блокируем повторное нажатие кнопки до окончания анимации прокрутки
      this.btnRightDisable = true;
      setTimeout(this.unblockRightBtn, 500);
    },
    miniSliderDown() {
      // Перемещаем бегунок по шкале при нажатии на кнопу "назад"
      this.runnerCoordX =
        this.runnerCoordX -
        (this.scrollWidth - this.runnerWidth) / (this.slideOrder.length - 1);
      // Перенос ползунка на другую сторону при достижении окончания шкалы
      if (this.runnerCoordX < 0) {
        this.runnerCoordX = this.runnerCoordX + this.scrollWidth;
      }

      // Сообщаем бегунку, что он перемещается по нажатию левой кнопки
      leftBtnActive = true;

      // Блокируем повторное нажатие кнопки до окончания анимации прокрутки
      this.btnLeftDisable = true;
      setTimeout(this.unblockLeftBtn, 500);
    },

    // Разблокировка кнопок по окончанию анимации
    unblockRightBtn() {
      this.btnRightDisable = false;
    },
    unblockLeftBtn() {
      this.btnLeftDisable = false;
    },
    setSlideVisible(slideNumber) {
      slideOrder[slideNumber].visible = true;
    },

    dragLeave(event) {
      this.drag = false;
    },
    onScrollClick(event) {
      if (event.offsetX - this.runnerWidth / 2 < 0) {
        this.runnerCoordX = 0;
      } else if (event.offsetX + this.runnerWidth / 2 > this.scrollWidth) {
        this.runnerCoordX = this.scrollWidth - this.runnerWidth;
      } else {
        this.runnerCoordX = event.offsetX - this.runnerWidth;
      }

      let newCoord = 0;
      for (let i = 0; i < this.slideOrder.length; i++) {
        if (
          Math.abs(
            (i * (this.scrollWidth - this.runnerWidth)) /
              (this.slideOrder.length - 1) -
              (event.offsetX - this.runnerWidth / 2)
          ) <
          (this.scrollWidth - this.runnerWidth) /
            (this.slideOrder.length - 1) /
            2
        ) {
          newCoord =
            (i * (this.scrollWidth - this.runnerWidth)) /
            (this.slideOrder.length - 1);
          break;
        }
      }
      this.runnerCoordX = newCoord;
    },
  },
  watch: {
    drag(dragStatus) {
      if (dragStatus) {
        this.runnerTransition = null;
        this.sliderBoxTransition = null;
      } else {
        this.runnerTransition = "0.5s";
        this.sliderBoxTransition = "0.5s";
      }
    },

    // Перемещаем слайды при перемещении ползунка
    runnerCoordX(newRunnerCoordX) {
      for (let i = 0; i < slideOrder.length; i++) {
        this.slideOrder[i].left =
          slideWidth * i -
          (slideWidth - 4) -
          (slide.length - 1) *
            slideWidth *
            (newRunnerCoordX / (this.scrollWidth - this.runnerWidth));

        // Перебрасываем слайды с одной стороны в другую
        if (this.slideOrder[i].left < -(slideWidth - 4)) {
          slideOrder[i].visible = false;
          this.slideOrder[i].left =
            this.slideOrder[i].left + slideWidth * slideOrder.length;
        }
        if (
          slideOrder[i].left >
          slideWidth * (slide.length - 2) + 4 + slideWidth / 2
        ) {
          slideOrder[i].left = slideOrder[i].left - slideWidth * slide.length;
        }
        if (
          slideOrder[i].left > -(slideWidth - 3) &&
          slideOrder[i].left < (numberVisibleSlides + 1) * slideWidth + 4
        ) {
          slideOrder[i].visible = true;
        } else {
          slideOrder[i].visible = false;
        }

        // Прячем перескакивающие ПО КНОПКАМ слайды
        if (!this.drag) {
          // По правой кнопке
          if (rightBtnActive === true) {
            if (slideOrder[i].left === numberVisibleSlides * slideWidth + 4) {
              slideOrder[i].visible = false;
              rightBtnActive = false;
              setTimeout(this.setSlideVisible, 500, i);
            }
          }
          // По левой кнопке
          if (leftBtnActive === true) {
            if (slideOrder[i].left === -273) {
              slideOrder[i].visible = false;
              leftBtnActive = false;
              setTimeout(this.setSlideVisible, 500, i);
            }
          }
        }
      }
    },
    bigWindows(newBigWindow) {
      if (newBigWindow) {
        numberVisibleSlides = 2;
      } else numberVisibleSlides = 1;
      this.btnContainerWidth = slideWidth * numberVisibleSlides - 34;
      this.btnMiniSliderRight = this.btnContainerWidth + 73;
      this.scrollWidth = this.btnContainerWidth - 93 * 2;
      this.runnerWidth = this.scrollWidth / slide.length;
    },
  },
});

carousel__mini.mount("#carousel__mini__container");
