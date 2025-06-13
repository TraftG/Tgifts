import { WebApp } from './telegram'

export type PopupParams = {
  title?: string
  message: string
  buttons?: PopupButton[]
}

export type PopupButton = {
  id?: string
} & (
  | {
      type: 'default' | 'destructive'
      text: string
    }
  | {
      type: 'ok' | 'close' | 'cancel'
    }
)

export async function useAlert(message: string): Promise<boolean> {
  if (!WebApp.isVersionAtLeast('6.2')) {
    return confirm(message)
  }

  return new Promise<boolean>((resolve) => {
    WebApp.showAlert(message, () => {
      resolve(true)
    })
  })
}

export async function useConfirm(message: string): Promise<boolean> {
  if (!WebApp.isVersionAtLeast('6.2')) {
    return confirm(message)
  }

  return new Promise<boolean>((resolve) => {
    WebApp.showConfirm(message, (response) => {
      resolve(response)
    })
  })
}

export async function usePopup(params: PopupParams): Promise<boolean> {
  if (!WebApp.isVersionAtLeast('6.2')) return confirm(params.message)

  return new Promise<boolean>((resolve) => {
    WebApp.showPopup(params, (id) => {
      resolve(id === '1')
    })
  })
}
