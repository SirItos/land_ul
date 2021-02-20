// Подключение CSS
import './styles/app.css'

import $ from 'jquery'
import { hideModal, initModal } from './js/modal'
import { formRender } from './js/formRender'
import { appear } from './js/appear'
import { scrollToTarget } from './js/scrolling'
import { showModalForm, showModal } from './js/modal'
import { initSlider } from './js/slide.js'
import { sendRequest } from './js/api'

$(document).ready(() => {
  $('.learn-more').click(function () {
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $('.first-elem').offset().top
      },
      600
    )
  })
  initSlider()
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
  paymentStatus()
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
let alreadyAsk = false
const paymentStatus = async (id) => {
  if (alreadyAsk) return
  alreadyAsk = true
  showModal({ loader: true })
  await sendRequest(
    {
      id
    },
    'checkPayment.php'
  ).then(
    (result) => {
      if (result) {
        showModal({ error: false })
        return
      }
      hideModal()
      alreadyAsk = false
    },
    () => {
      showModal({ error: true })
      alreadyAsk = false
    }
  )
}

window.paymentStatus = paymentStatus
