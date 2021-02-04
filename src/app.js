// Подключение CSS
import './styles/app.sass'
import 'slick-carousel/slick/slick.css'

// Подключение библиотек
import $ from 'jquery'
import 'slick-carousel'

$(document).ready(() => {
  $('#slider').slick({
    centerMode: true,

    slidesToShow: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000
  })
  $('#comments').slick({
    centerMode: false,
    responsive: true,
    slidesToShow: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000
  })
})
