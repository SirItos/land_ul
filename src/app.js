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
  createSlides()
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
