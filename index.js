let mousedown = false
let offset = {
  top: 0,
  left: 0,
}
const primary = document.querySelector('#primary')

document.querySelector('#primary .title').addEventListener('mousedown', (e) => {
  mousedown = true

  let bounding = e.target.getBoundingClientRect()

  offset.left = e.clientX - bounding.left
  offset.top = e.clientY - bounding.top
})

window.addEventListener('mousemove', debounce(duplicate, 2))

function duplicate(e) {
  if (mousedown) {
    primary.style.left = `${e.clientX - offset.left}px`
    primary.style.top = `${e.clientY - offset.top}px`

    let clone = primary.cloneNode(true)
    clone.removeAttribute('id')
    document.body.appendChild(clone)
  }
}

window.addEventListener('mouseup', (e) => {
  mousedown = false
})

function debounce(func, timeout = 100) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}
