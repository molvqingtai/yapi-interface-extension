import { proxy } from 'ajax-hook'

const listenResponse = (path: string, handler: Function) => {
  proxy({
    onResponse: (response, _handler) => {
      const matched =
        new URL(location.origin + response.config.url).pathname === path
      matched && handler(response)
      _handler.next(response)
    }
  })
}

export default listenResponse
