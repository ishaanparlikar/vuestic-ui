<template>
  <div
    v-if="visible"
    class="va-backtop"
    role="button"
    :aria-label="tp($props.ariaLabel)"
    tabindex="1"
    :style="computedStyle"
    @click="scrollToTop"
    @keydown.enter.stop="scrollToTop"
  >
    <slot>
      <va-button
        aria-hidden="true"
        icon="va-arrow-up"
        :color="color"
      />
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useComponentPresetProp, useTranslation } from '../../composables'
import { VaButton } from '../va-button'
import { isServer } from '../../utils/ssr'
import { warn } from '../../utils/console'

export default defineComponent({
  name: 'VaBacktop',
  components: { VaButton },
  props: {
    ...useComponentPresetProp,
    target: {
      type: [Object, String] as PropType<Element | string | undefined>,
      default: undefined,
    },
    visibilityHeight: { type: Number, default: 300 },
    speed: { type: Number, default: 50 },
    verticalOffset: { type: String, default: '1rem' },
    horizontalOffset: { type: String, default: '1rem' },
    color: { type: String, default: '' },
    horizontalPosition: {
      type: String as PropType<'right' | 'left'>,
      default: 'right',
      validator: (value: string) => ['right', 'left'].includes(value),
    },
    verticalPosition: {
      type: String as PropType<'bottom' | 'top'>,
      default: 'bottom',
      validator: (value: string) => ['bottom', 'top'].includes(value),
    },
    ariaLabel: { type: String, default: '$t:backToTop' },
  },
  setup (props) {
    const targetScrollValue = ref(0)

    const computedStyle = computed(() => ({
      [props.verticalPosition]: props.verticalOffset,
      [props.horizontalPosition]: props.horizontalOffset,
    }))

    let targetElement: Element | Window

    const getTargetElement = (): Element | Window => {
      if (!props.target) {
        return window
      }
      if (typeof props.target === 'string') {
        const target = document.querySelector(props.target) as Element
        if (!target) {
          warn(`Target element [${props.target}] is not found, falling back to window.`)
          return window
        }
        return target
      }
      return props.target as Element
    }

    const scrolled = ref(false)
    const interval = ref(0)
    const scrollToTop = () => {
      if (scrolled.value) { return }

      scrolled.value = true

      if (targetElement instanceof Window) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })

        return
      }

      interval.value = window.setInterval(() => {
        if (targetElement instanceof Element) {
          if (targetElement.scrollTop === 0) {
            clearInterval(interval.value)
            scrolled.value = false
          } else {
            const next = Math.floor(targetElement.scrollTop - props.speed)
            targetElement.scrollTo(0, next)
          }
        }
      }, 15)
    }

    const handleScroll = () => {
      targetScrollValue.value = targetElement instanceof Window
        ? targetElement.scrollY
        : targetElement.scrollTop
    }

    const server = isServer()

    const visible = computed(() => {
      if (server) {
        return false
      }
      return targetScrollValue.value > props.visibilityHeight
    })

    if (!server) {
      onMounted(() => {
        targetElement = getTargetElement()
        targetElement.addEventListener('scroll', handleScroll, true)
      })
      onBeforeUnmount(() => targetElement?.removeEventListener('scroll', handleScroll))
    }

    return {
      computedStyle,
      visible,
      scrollToTop,
      ...useTranslation(),
    }
  },
})
</script>

<style lang="scss">
@import "variables";

.va-backtop {
  position: var(--va-backtop-position);
  top: var(--va-backtop-top);
  left: var(--va-backtop-left);
  right: var(--va-backtop-right);
  bottom: var(--va-backtop-bottom);
  cursor: var(--va-backtop-cursor);
  z-index: var(--va-backtop-z-index);
  font-family: var(--va-font-family);
}
</style>
