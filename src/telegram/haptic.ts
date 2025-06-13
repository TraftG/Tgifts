import { WebApp } from './telegram'

export type HapticMode =
  | 'light'
  | 'medium'
  | 'heavy'
  | 'rigid'
  | 'soft'
  | 'error'
  | 'success'
  | 'warning'
  | 'select'

export function callHaptic(mode: HapticMode = 'select'): void {
  switch (mode) {
    case 'select':
      WebApp.HapticFeedback.selectionChanged()
      break
    case 'error':
    case 'success':
    case 'warning':
      WebApp.HapticFeedback.notificationOccurred(mode)
      break
    default:
      WebApp.HapticFeedback.impactOccurred(mode)
  }
}
