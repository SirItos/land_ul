import $ from 'jquery'
import { submitEvent } from './forma'
import { formRender } from './formRender'
const wrapper = $('#modal-wrapper')
const modal = $('#modal')
const modalForm = $('#modalForm')
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
    if (
      !modal.is(e.target) &&
      modal.has(e.target).length === 0 &&
      !modalForm.is(e.target) &&
      modalForm.has(e.target).length === 0
    ) {
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
 * Отображение врапера для модальных окон
 */
const showWrapper = () => {
  wrapper.removeClass('opacity-0').addClass('opacity-100')
  wrapper.css('z-index', '100')
}

/**
 * Отображение модального окна.
 * Если есть флаг loader то отображается индикатор загрузки
 * @param {boolean} loader
 * @returns void
 */
export const showModal = ({ error = false, loader = false }) => {
  state.loader = loader
  hideModal(false)
  const targetDialog = error ? '.errorDialog' : '.successDialog'
  if (loader) {
    $('.loader').removeClass('hidden').addClass('flex')
    $('.successDialog').addClass('hidden')
    $('.errorDialog').addClass('hidden')
  } else {
    $('.loader').addClass('hidden').removeClass('flex')
    $(targetDialog).removeClass('hidden')
  }
  showWrapper()
  modal.removeClass('hidden')
  modal.removeClass('scale-0').addClass('scale-100')
}

/**
 * Отображение модальной формы
 * @param {string} source
 * @returns void
 */
export const showModalForm = (source) => {
  const tariff = {
    light: 2790,
    medium: 4290,
    hardcore: 6990
  }

  hideModal(true)
  modalForm.removeClass('hidden')
  formRender({ target: '#modalForm', noBinding: true })

  modalForm.find('button').click((event) => {
    submitEvent(event, '#modalForm')
  })
  modalForm.removeClass('scale-0').addClass('scale-100')
  setTariff(tariff[source.dataset.tariff])
  showWrapper()
}

const setTariff = (tariff) => {
  modalForm.find('select').addClass('hidden').val(tariff)
  console.log(modalForm.find('select').val())
}

/**
 * Скрыть модальное окноа
 * @returns void
 */
export const hideModal = (destroy = true) => {
  wrapper.removeClass('opacity-100').addClass('opacity-0')
  modal.removeClass('scale-100').addClass('scale-0').addClass('hidden')
  modalForm.removeClass('scale-100').addClass('scale-0, hidden')
  if (modalForm.find('.form') && destroy) {
    modalForm.find('button').off('click', '**')
    modalForm.find('.form').remove()
  }
}

/**
 * Вызов события клика на кнопку для скачивания
 * документа
 * @returns void
 */
const downloadGuide = () => {
  hideModal()
  return
  // const a = document.querySelector('.get-result-link')
  // a.click()
}
