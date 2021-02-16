import $ from 'jquery'
import 'jquery-mask-plugin'

import { resetvalidationOnInput, validation } from './validation'
import { sendRequest } from './api'
import { hideModal, showModal } from './modal'

const inputs = {
  tariff: {
    target: '.tariff',
    rules: [
      (val) => {
        return !!val || 'Необходимо выбрать тариф'
      }
    ]
  },
  phone: {
    target: 'input[type="tel"]',
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
    target: '.nickname',
    rules: [
      (val) => {
        return !!val
      }
    ]
  }
}
let withPrevent = true

export const initForm = (noBinding = false) => {
  initFormMask()
  resetvalidationOnInput(inputs)
  if (!noBinding) {
    $('#form .pay-form-submit').click((event) => {
      submitEvent(event)
    })
  }
}

export const submitEvent = (event, parent = '#form') => {
  if (withPrevent) {
    event.preventDefault()
    submitForm(inputs, parent)
  }
}

const initFormMask = () => {
  $('input[type="tel"]').mask('+7 (000) 000 00-00')
}

const clearForm = () => {
  for (let input in inputs) {
    $(inputs[input].target).val('')
  }
}

const submitForm = async (inputs, parent) => {
  const payload = {
    tariff: null,
    phone: null,
    nickname: null
  }

  let valid = true
  for (let input in inputs) {
    const target = $(parent).find(inputs[input].target)
    console.log($(target))
    console.log($(target).val())
    if (!target) return
    if (!validation($(target).val(), $(target).parent(), inputs[input].rules)) {
      valid = false
      break
    }
    payload[input] = $(target).val()
  }
  if (!valid) return

  await sendRequest(payload).then(
    (result) => {
      if (!result.status) {
        showModal({
          error: true
        })
        return
      }
      clearForm()
      if (!withPrevent) {
        hideModal()
        return
      }

      withPrevent = false
      $(parent).find('.pay-form-submit').click()
    },
    () => {
      clearForm()
      showModal({
        error: true
      })
      withPrevent = true
    }
  )
}
