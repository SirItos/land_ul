import { showModal, hideModal } from './modal'
import $ from 'jquery'

const testForm = {
  MerchantLogin: 'demo',
  OutSum: 1,
  Description: 'Гайд Правильного питания',
  SignatureValue: null
}

export const btnClick = () => {
  $('button:not(.get-result)').click(() => {
    // formSubmit()
    showModal()
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
