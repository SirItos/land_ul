import { showModal, hideModal } from './modal'
import $ from 'jquery'
import 'jquery-mask-plugin'
import { scrollToTarget } from './scrolling'

const testForm = {
  MerchantLogin: 'demo',
  OutSum: 1,
  Description: 'Гайд Правильного питания',
  SignatureValue: null
}

const inputs = {
  phone: {
    target: $('input[type="tel"]'),
    rules: [
      (val) => {
        return !!val
      },
      (val) => {
        if (!val) return true

        return val.length === 18 || 'Укажите полный номер телефона'
      }
    ]
  },
  nickname: {
    target: $('.nickname'),
    rules: [
      (val) => {
        return !!val
      }
    ]
  }
}

export const initForm = () => {
  initFormMask()
  resetvalidationOnInput()
  $('#pay-form-submit').click((event) => {
    event.preventDefault()
    submitForm(inputs)
  })
}

const initFormMask = () => {
  $('input[type="tel"]').mask('+7 (000) 000 00-00')
}

export const btnClick = () => {
  $('button:not(.get-result)').click(() => {
    scrollToTarget('#pay-form')
    // formSubmit()
    // showModal()
  })
}

const formSubmit = () => {
  fillInputs()
  $('#pay-form').submit()
}

const fillInputs = () => {
  for (const item in testForm) {
    const domItem = $(`input[name="${item}"]`)
    domItem.val(testForm[item])
  }
}

const resetvalidationOnInput = () => {
  for (let input in inputs) {
    inputs[input].target.on('input', function () {
      const errorDiv = $(this).parent().find('.error div')

      if (errorDiv.hasClass('-translate-y-10')) return
      errorDiv.addClass('-translate-y-10')
      $(inputs[input].target)
        .removeClass('ring-red-200')
        .addClass('ring-teal-200')
    })
  }
}

const validation = (state, target, rules) => {
  let status = true
  for (let key in rules) {
    const result = rules[key](state)
    if ($(target).css('display') === 'none') {
      break
    }
    const erroDiv = $(target).find('.error div')
    if (!result || typeof result === 'string') {
      erroDiv.removeClass('-translate-y-10')
      if (typeof result === 'string') {
        erroDiv.html(result)
      } else {
        erroDiv.html('Необходимо заполнить поле')
      }
      $(target)
        .find('input')
        .removeClass('ring-teal-200')
        .addClass('ring-red-200')
      $(target).find('input').focus()

      status = false

      break
    }

    $(target)
      .find('input')
      .removeClass('ring-red-200')
      .addClass('ring-teal-200')
  }

  return status
}

const submitForm = (inputs) => {
  let valid = true
  for (let input in inputs) {
    if (
      !validation(
        $(inputs[input].target).val(),
        $(inputs[input].target).parent(),
        inputs[input].rules
      )
    ) {
      valid = false
      break
    }
  }
  if (!valid) return

  sendRequest()
}

const clearForm = () => {
  for (let input in inputs) {
    $(inputs[input].target).val('')
  }
}

const sendRequest = async () => {
  showModal(true)
  setTimeout(() => {
    hideModal()
    clearForm()
  }, 5000)
}
