import $ from 'jquery'

const wrapper = $('#modal-wrapper')
const modal = $('#modal')
export const initModal = () => {
  wrapper.addClass('transition ').addClass('duration-300')
  wrapper.on('transitionend webkitTransitionEnd oTransitionEnd', modalPlane)
  $(document).keyup(function (e) {
    if (e.keyCode == 27) {
      hideModal()
    }
  })
  $(document).mouseup(function (e) {
    if (!modal.is(e.target) && modal.has(e.target).length === 0) {
      hideModal()
    }
  })
}

const modalPlane = () => {
  if (wrapper.hasClass('opacity-100')) {
    $('body').addClass('overflow-hidden')
  } else {
    wrapper.css('z-index', '-10')
    $('body').removeClass('overflow-hidden')
  }
}

export const showModal = () => {
  wrapper.removeClass('opacity-0').addClass('opacity-100')
  wrapper.css('z-index', '100')
  modal.removeClass('scale-0').addClass('scale-100')
}

export const hideModal = () => {
  wrapper.removeClass('opacity-100').addClass('opacity-0')

  modal.removeClass('scale-100').addClass('scale-0')
}
