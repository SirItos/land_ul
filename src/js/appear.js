import $ from 'jquery'

export const appear = () => {
  const hiddenSegments = $('.segment')
  const startScrollPosition = $(document).scrollTop()
  // delay for render
  setTimeout(() => {
    hiddenSegments.each(function () {
      $(this).addClass('transition duration-700 ')
      if ($(this).data('delay')) {
        $(this).addClass(`delay-${$(this).data('delay')}`)
      }
      showThatIsAboveBelow($(this))
    })

    $(window).on('scroll', function () {
      hiddenSegments.each(function () {
        if (checkVisible($(this))) {
          appearElement($(this))
        }
      })
    })
  }, 200)
}

const showThatIsAboveBelow = (elem, startPosition) => {
  console.log()
  if (checkVisible(elem, 0, 'above') || checkVisible(elem)) {
    appearElement(elem)
  }
}

const appearElement = (elem) => {
  if (elem.hasClass('alreadyVisible')) return

  elem.removeClass('translate-y-10').removeClass('opacity-0')
  elem.addClass('alreadyVisible')
}

function checkVisible(elm, threshold, mode) {
  threshold = threshold || 0
  mode = mode || 'visible'

  var rect = elm[0].getBoundingClientRect()

  var viewHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight
  )
  var above = rect.bottom - threshold < 0
  var below = rect.top - viewHeight + threshold >= 0

  return mode === 'above' ? above : mode === 'below' ? below : !above && !below
}
