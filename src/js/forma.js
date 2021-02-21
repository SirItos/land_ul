import $ from 'jquery'
import 'jquery-mask-plugin'
import md5 from 'js-md5'

import { resetvalidationOnInput, validation } from './validation'
import { sendRequest } from './api'
import { showModal } from './modal'

const inputs = {
  tariff: {
    target: '.tariff',
    rules: [
      (val) => {
        return !!val || 'Необходимо выбрать тариф'
      }
    ]
  },
  email: {
    target: 'input[type="email"]',
    rules: [
      (val) => {
        return !!val
      },
      (val) => {
        if (!val) return true
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
        return emailPattern.test(val) || 'Email указан неверно'
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

export const initForm = (parent = '#form', noBinding = false) => {
  // initFormMask()

  resetvalidationOnInput(inputs)
  if (!noBinding) {
    $(`${parent} .pay-form-submit`).click((event) => {
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
    email: null,
    nickname: null
  }

  let valid = true
  for (let input in inputs) {
    const target = $(parent).find(inputs[input].target)

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
      // if (!withPrevent) {
      //   hideModal()
      //   return
      // }
      // localStorage.setItem('orderId', result.id)
      withPrevent = false
      submitPyaForm(result.id, payload)
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

const getTariffDescription = (tariff) => {
  const desc = {
    2790: '«Один в поле воин»',
    4290: '«Мне нужна поддержка»',
    6990: '«Путь: рука за руку»'
  }

  return desc[tariff]
}

const submitPyaForm = (orderId, payload) => {
  const payForm = $('#pay-form-hidden')
  const rounder_tarrif = Number(payload.tariff * 0.9345794392523364).toFixed(2)
  $('#order_id').val(orderId)
  $('#sign').val(
    md5(`Olya_Kukuts:${rounder_tarrif}:${orderId}:tsB1Aq2wxG1WPqsT2b0B`)
  )
  $('#desc').val(getTariffDescription(payload.tariff))
  $('#payEmail').val(payload.email)
  $('#summ').val(rounder_tarrif)

  showModal({ loader: true })
  payForm.submit()
  // hideModal()
}
