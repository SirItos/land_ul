// Подключение CSS
import './styles/app.css'
import 'slick-carousel/slick/slick.css'

// Подключение библиотек
import $ from 'jquery'
import 'slick-carousel'
import { initModal } from './js/modal'
import { initForm, sccrollToForm } from './js/forma'
import { appear } from './js/appear'

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

  $('.learn-more').click(function () {
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $('.first-elem').offset().top
      },
      600
    )
  })

  initModal()
  sccrollToForm()
  appear()
  initForm()
})
