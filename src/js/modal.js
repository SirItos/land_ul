import $ from 'jquery'

const wrapper = $('#modal-wrapper')
const modal = $('#modal')
const state = {
  loader: false
}

/**
 * Инициализация модального окна
 * @returns void
 */
export const initModal = () => {
  wrapper.addClass('transition ').addClass('duration-300')
  wrapper.on('transitionend webkitTransitionEnd oTransitionEnd', modalPlane)
  $(document).keyup(function (e) {
    if (e.keyCode == 27) {
      if (state.loader) return
      hideModal()
    }
  })
  $(document).mouseup(function (e) {
    if (state.loader) return
    if (!modal.is(e.target) && modal.has(e.target).length === 0) {
      hideModal()
    }
  })
  $('.get-result').click(() => {
    downloadGuide()
  })

  $('.errorBtn').click(() => {
    hideModal()
  })
}

/**
 * Body без возможности скроло на заднем плане
 * @returns void
 */
const modalPlane = () => {
  if (wrapper.hasClass('opacity-100')) {
    $('body').addClass('overflow-hidden')
  } else {
    wrapper.css('z-index', '-10')
    $('body').removeClass('overflow-hidden')
  }
}

/**
 * Отображение модального окна.
 * Если есть флаг loader то отображается индикатор загрузки
 * @param {boolean} loader
 * @returns void
 */
export const showModal = ({ error = false, loader = false }) => {
  state.loader = loader
  const targetDialog = error ? '.errorDialog' : '.successDialog'
  if (loader) {
    $('.loader').removeClass('hidden')
    $('.successDialog').addClass('hidden')
    $('.errorDialog').addClass('hidden')
  } else {
    $('.loader').addClass('hidden')
    $(targetDialog).removeClass('hidden')
  }
  wrapper.removeClass('opacity-0').addClass('opacity-100')
  wrapper.css('z-index', '100')
  modal.removeClass('scale-0').addClass('scale-100')
}

/**
 * Скрыть модальное окноа
 * @returns void
 */
export const hideModal = () => {
  wrapper.removeClass('opacity-100').addClass('opacity-0')
  modal.removeClass('scale-100').addClass('scale-0')
}

/**
 * Вызов события клика на кнопку для скачивания
 * документа
 * @returns void
 */
const downloadGuide = () => {
  const a = document.querySelector('.get-result-link')
  a.click()
  hideModal()
}
