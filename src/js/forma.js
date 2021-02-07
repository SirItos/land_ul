import { showModal, hideModal } from './modal'
import $ from 'jquery'

export const btnClick = () => {
  $('button').click(() => {
    showModal()
  })
}
