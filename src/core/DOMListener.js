import { capitalize } from '@/core/utils'

function getMethodName(methodName) {
  return 'on' + capitalize(methodName)
}

export class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) throw new Error('No $root provided for DOMListener')
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    // console.log(this.listeners, this.$root)
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      if (!this[method]) {
        throw new Error(
          `Method ${method} is not implemented in ${this.name || ''} Component`
        )
      }
      this[method] = this[method].bind(this)
      this.$root.on(listener, this[method])
    })
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}
