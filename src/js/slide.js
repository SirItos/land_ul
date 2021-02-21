import 'slick-carousel/slick/slick.css'

// Подключение библиотек
import $ from 'jquery'
import 'slick-carousel'

export const initSlider = () => {
  $('#slider').slick({
    centerMode: true,
    slidesToShow: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000
  })
  createSlides()
  $('#comments').slick({
    centerMode: false,
    adaptiveHeight: false,
    responsive: true,
    slidesToShow: 3,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
    responsive: [
      {
        breakpoint: 786,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  })
}

const createSlides = () => {
  const slides = [
    '1.png',
    '2.png',
    '3.jpg',
    '4.jpg',
    '5.jpg',
    '6.jpg',
    '7.jpg',
    '8.jpg'
  ]

  const commentDom = $('#comments')

  slides.forEach((slide) => {
    const newEl = `<div class="px-2 pb-5 w-5/6">
     <div class="bg-white  rounded-lg  px-4 py-2  shadow-lg divide-y-2 divide-dashed divide-gray-300">
      <img src="./src/assets/feedback/${slide}" alt="">
      </div>
      </div>`

    commentDom.append(newEl)
  })
}
