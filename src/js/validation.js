import $ from 'jquery'

export const resetvalidationOnInput = (inputs) => {
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

export const validation = (state, target, rules) => {
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
