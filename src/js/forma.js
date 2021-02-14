import $ from 'jquery'
import 'jquery-mask-plugin'
import { scrollToTarget } from './scrolling'
import { resetvalidationOnInput, validation } from './validation'
import { sendRequest } from './api'
import { hideModal } from './modal'

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
let withPrevent = true
export const initForm = () => {
  initFormMask()
  resetvalidationOnInput(inputs)
  $('#pay-form-submit').click((event) => {
    if (withPrevent) {
      event.preventDefault()
      submitForm(inputs)
    }
  })
}

const initFormMask = () => {
  $('input[type="tel"]').mask('+7 (000) 000 00-00')
}

const clearForm = () => {
  for (let input in inputs) {
    $(inputs[input].target).val('')
  }
}

export const sccrollToForm = () => {
  $('button:not(.get-result)').click(() => {
    scrollToTarget('#pay-form')
  })
}

const submitForm = async (inputs) => {
  const payload = {
    phone: null,
    nickname: null
  }
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
    payload[input] = $(inputs[input].target).val()
  }
  if (!valid) return

  await sendRequest(payload)
    .then((result) => {
      clearForm()
      withPrevent = false
      $('#pay-form-submit').click()
    })
    .catch((error) => {
      clearForm()
    })
  hideModal()
}

const setInputVal = () => {}
