import { useRouter, type NavigationFailure } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'
import { WebApp } from './telegram'

type RouteValue = string | CallableFunction | null

export function useBackButton(route: RouteValue): {
  preventBackRoute: (value: boolean) => void
} {
  const router = useRouter()
  let isRoutePrevented = false

  function _callback(): Promise<void | NavigationFailure | undefined> | void {
    if (!isRoutePrevented) {
      if (typeof route === 'function') return route()
      if (route && window.history.length <= 2) return router.replace(route)

      return router.back()
    }
  }

  onMounted(() => {
    WebApp.BackButton.onClick(_callback)
    WebApp.BackButton.show()
  })

  onUnmounted(() => {
    WebApp.BackButton.offClick(_callback)
    WebApp.BackButton.hide()
  })

  function preventBackRoute(value: boolean): void {
    console.log('Back prevented: ', value)
    isRoutePrevented = value
  }

  return { preventBackRoute }
}
