import { proxy } from 'ajax-hook'

const listenResponse = (path: string, handler: Function) => {
  proxy({
    onResponse: (response, _handler) => {
      try {
        const matched = response.config.url.includes(path)
        matched && handler(response)
      } catch (error: any) {
        console.error('Yapi-Interface-Extension:', error.message)
      } finally {
        _handler.next(response)
      }
    }
  })
}

export default listenResponse
