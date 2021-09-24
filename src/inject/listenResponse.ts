import { createInterceptor } from '@mswjs/interceptors'
import { interceptXMLHttpRequest } from '@mswjs/interceptors/lib/interceptors/XMLHttpRequest'

/**
 * XHR 响应监听
 * @param path 匹配请求地址
 * @param handler 触发回调
 */
const listenResponse = (path: string, handler: Function) => {
  try {
    const interceptor = createInterceptor({
      modules: [interceptXMLHttpRequest],
      resolver() {}
    })
    interceptor.on('response', (request, response) => {
      const matched = request.url.pathname === path
      matched && handler(response)
    })

    interceptor.apply()
  } catch (error: any) {
    console.error(`Yapi-Interface-Extension: ${error.message as string}`)
  }
}

export default listenResponse
