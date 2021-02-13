import $ from 'jquery'

export const scrollToTarget = (target, speed = 1000) => {
  $([document.documentElement, document.body]).animate(
    {
      scrollTop: $(target).offset().top
    },
    speed
  )
}
