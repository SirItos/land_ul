// Подключение CSS
import './styles/app.css'
import 'slick-carousel/slick/slick.css'

// Подключение библиотек
import $ from 'jquery'
import 'slick-carousel'
import { initModal } from './js/modal'
import { formRender } from './js/formRender'
import { appear } from './js/appear'
import { scrollToTarget } from './js/scrolling'
import { showModalForm } from './js/modal'

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
    adaptiveHeight: false,
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
  appear()
  ViewportHeight()
  formRender({ target: '#form' })
  $('.scrollToTariff').click(() => {
    scrollToTarget('#tarrifs')
  })

  $('.buy_btn').click((event) => {
    showModalForm(event.target)
  })
})

const ViewportHeight = () => {
  let vh = window.innerHeight * 0.01
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`)

  // We listen to the resize event
  window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  })
}
