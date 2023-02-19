import "client-only"

export const lockScroll = () => {
  document.body.style.paddingRight = `${
    window.innerWidth - document.body.offsetWidth
  }px`
  document.body.style.overflowY = "hidden"
}

export const unlockScroll = () => {
  document.body.style.overflowY = ""
  document.body.style.paddingRight = ""
}
