export { default as BoardsBoard } from '../../components/Boards/Board.vue'
export { default as BoardsList } from '../../components/Boards/BoardsList.vue'
export { default as CardsCard } from '../../components/Cards/Card.vue'
export { default as ListsList } from '../../components/Lists/List.vue'
export { default as UINav } from '../../components/UI/Nav.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
